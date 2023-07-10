function servicetask333(attempt, message) {
	log.info("==> servicetask333 procFechamentoFolhaPgto: publicarNoGED");
	try {
		publicarNoGED();
	} catch (e) {
		log.error("==> procFechamentoFolhaPgto: " + e);
		throw e;
	}
}

function publicarNoGED(){ 
	//RAIZ / DP / FECHAMENTO DE FOLHA / ANO COMPETENCIA / MÊS COMPETENCIA
	//É necessário criar a primeira pasta logo após a pasra Raíz padrão do Fluig
	
	var pastaDP = obterIdPasta(0, "DP", true);
	if (pastaDP <= 0){
		throw "Não foi possível encontrar/criar a pasta DP no GED.";
	} 
	
	var pastaFechamentoFolha = obterIdPasta(pastaDP, "Fechamento de Folha", true);
	if (pastaFechamentoFolha <= 0){
		throw "Não foi possível encontrar/criar a pasta Template no GED.";
	} 
	
	var periodoCompetencia = hAPI.getCardValue("mesCompetencia");
	var pastaAno = obterIdPasta(pastaFechamentoFolha, periodoCompetencia.split("/")[1] , true);
	if (pastaAno <= 0){
		throw "Não foi possível encontrar/criar a pasta Ano "+periodoCompetencia.split("/")[2];
	}
	
	var pastaMes = obterIdPasta(pastaAno, periodoCompetencia.split("/")[0] , true);
	if (pastaMes <= 0){
		throw "Não foi possível encontrar/criar a pasta Mês "+periodoCompetencia.split("/")[1];
	} 
	
	moverArquivo(pastaMes);
}

function obterIdPasta(parentId, nomePasta, criarSeNaoExistir){
	
	var f0 = DatasetFactory.createConstraint("documentPK.companyId", getValue('WKCompany'), getValue('WKCompany'), ConstraintType.MUST); // empresa
	var f1 = DatasetFactory.createConstraint("documentType", "1", "1", ConstraintType.MUST); // tipo pasta
    var f2 = DatasetFactory.createConstraint("activeVersion", "true", "true", ConstraintType.MUST); // versão ativa
    var f3 = DatasetFactory.createConstraint("deleted", "false", "false", ConstraintType.MUST); // não esta deletado
    var f4 = DatasetFactory.createConstraint("parentDocumentId", parentId, parentId, ConstraintType.MUST); // parent        
    var f5 = DatasetFactory.createConstraint("documentDescription", nomePasta, nomePasta, ConstraintType.MUST); // nome da pasta
    
    var constraints = new Array(f0, f1, f2, f3, f4, f5);
    var dataset = DatasetFactory.getDataset("document", null, constraints, null);
  
    if (dataset.rowsCount > 0){
    	return dataset.getValue(0, "documentPK.documentId");
    } else {
    	if (criarSeNaoExistir){
    		var folderDto = docAPI.newDocumentDto();
    		folderDto.setDocumentDescription(nomePasta); // nome da pasta
    		folderDto.setDocumentType("1"); // tipo pasta
    		folderDto.setParentDocumentId(parentId); // Id da pasta principal onde vão ser criadas as pastas filhas
    		folderDto.setInheritSecurity(true);
    		folderDto.setColleagueId("fluigadmin"); 
    		var folder = docAPI.createFolder(folderDto, null, null);
    		log.info("function obterIdPasta - folder.getDocumentId():  "+folder.getDocumentId());
    		return folder.getDocumentId();    		
    	} else {
    		return -1;
    	} // else if
    } // else if
    return -1;
} // obterIdPasta

function moverArquivo(idPasta){
	log.info("==> servicetask333 procFechamentoFolhaPgto: moverArquivo " + idPasta);
	
	var anexos = hAPI.listAttachments();
	   	
	var calendar = java.util.Calendar.getInstance().getTime();
	for ( var i = 0; i < anexos.size(); i++) {
				
		var anexo = anexos.get(i);
		anexo.setParentDocumentId(idPasta);
		
		log.info("anexos.size(): "+anexos.size()+" - anexo.getDocumentDescription(): "+anexo.getDocumentDescription())
		
		if(anexo.getDocumentDescription() == "documentoAnexo"){
			
			var nomePersonalizado = "Nome personalizado do arquivo";
			
			anexo.setAdditionalComments(nomePersonalizado);
			anexo.setVersionDescription(nomePersonalizado);
			anexo.setDocumentDescription(nomePersonalizado);
			
		} 
				
		anexo.setExpires(false);
		anexo.setCreateDate(calendar);
		anexo.setInheritSecurity(true);
		anexo.setTopicId(1);
		anexo.setUserNotify(false);
		anexo.setValidationStartDate(calendar);
		anexo.setVersionOption("0");
		anexo.setUpdateIsoProperties(true);
		anexo.setUpdateIsoProperties(true);
		anexo.setColleagueId(getValue("WKUser")); 
		anexo.setPublisherId("fluigadmin");
		hAPI.publishWorkflowAttachment(anexo);
		
		log.dir(anexo);
	} // for anexos
} // moverArquivo