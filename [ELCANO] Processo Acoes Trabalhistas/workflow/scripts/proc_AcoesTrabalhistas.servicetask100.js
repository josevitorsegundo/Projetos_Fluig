function servicetask100(attempt, message) {
	log.info('servicetask100 => Inserir Arquivos Referentes aos arquivos GED do Fluig');
	//Obs.: Caso o fluxo passe mais de uma vez por esta atividade, somente os
	//documentos nunca anexados ao GED serão incluídos.
	try{
		publicarNoGED();
	}catch(error){
		log.error("servicetask100 ==> error publication GED: " + error);
		log.error("Error -> Linha: "+error.lineNumber+" -> Message: "+error.message)
		log.error(error);
		throw error;
	}	
}

function publicarNoGED(){ 
	
	/*var pastaElcano = obterIdPasta(0, "Elcano", true);
	if (pastaElcano <= 0){
		throw "Não foi possível encontrar/criar a pasta Elcano no GED.";
	} */
	
	var pastaJuridicoRH = obterIdPasta(0, "Jurídico RH", true);
	if (pastaJuridicoRH <= 0){
		throw "Não foi possível encontrar/criar a pasta Jurídico RH no GED.";
	}
	
	var pastaProcessos = obterIdPasta(pastaJuridicoRH, "Processos", true);
	if (pastaProcessos <= 0){
		throw "Não foi possível encontrar/criar a pasta Processos no GED.";
	}	
	
	var cpf_Nome = hAPI.getCardValue("zoomExFuncionario");	
	var folder_cpf_Nome = obterIdPasta(pastaProcessos, cpf_Nome , true);
	if (folder_cpf_Nome <= 0){
		throw "Não foi possível encontrar/criar a pasta "+cpf_Nome;
	}	
	
	moverArquivo(folder_cpf_Nome);
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

function obterIdDocumento(parentId, nomePasta, criarSeNaoExistir){
	
	var f0 = DatasetFactory.createConstraint("documentPK.companyId", getValue('WKCompany'), getValue('WKCompany'), ConstraintType.MUST); // empresa
	var f1 = DatasetFactory.createConstraint("documentType", "1", "1", ConstraintType.MUST_NOT); // tipo pasta
    var f2 = DatasetFactory.createConstraint("activeVersion", "true", "true", ConstraintType.MUST); // versão ativa
    var f3 = DatasetFactory.createConstraint("deleted", "false", "false", ConstraintType.MUST); // não esta deletado
    var f4 = DatasetFactory.createConstraint("parentDocumentId", parentId, parentId, ConstraintType.MUST); // parent        
    var f5 = DatasetFactory.createConstraint("documentDescription", nomePasta, nomePasta, ConstraintType.MUST); // nome da pasta
    
    var constraints = new Array(f0, f1, f2, f3, f4, f5);
    var dataset = DatasetFactory.getDataset("document", null, constraints, null);
  
    if (dataset.rowsCount > 0){
    	//return dataset.getValue(0, "documentPK.documentId");
    	return -1
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
    		return 0;
    	} // else if
    } // else if
    return 0;
} // obterIdPasta


function moverArquivo(idPasta){
	log.info("==> servicetask100 Inserir Arquivos Referentes aos Subsídios no GED do Fluig: moverArquivo " + idPasta);
	
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
		
		if (obterIdDocumento(idPasta, anexo.getDocumentDescription(), false)== -1) {
			log.info("Anexo : "+anexo.getDocumentDescription()+" já publicado! ");
			continue;
		} else {		
			hAPI.publishWorkflowAttachment(anexo);
		}
		
		log.dir(anexo);
	} // for anexos
} // moverArquivo