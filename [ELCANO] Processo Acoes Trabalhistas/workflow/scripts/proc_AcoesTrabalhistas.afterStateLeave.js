function afterStateLeave(sequenceId){

    var atividade = getValue('WKNumState');
    var numProcess= getValue("WKNumProces");
    var date = getCurrentDate();
	var time = getCurrentTime();

    if(atividade != 106 || atividade != 108  || atividade != 13){

        hAPI.setCardValue("atividadeAnterior",atividade);
        hAPI.setCardValue("atividadeCorrente",sequenceId);
        hAPI.setCardValue("numSolicitacao",numProcess);
    }
    
    if (atividade == 25){
    	hAPI.setCardValue("dataSubsidios", date);
    	hAPI.setCardValue("horaSubsidios", time);
    }
    
    if (atividade == 26){
    	hAPI.setCardValue("dataAnaliseSubsidioDRH", date);
    	hAPI.setCardValue("horaAnaliseSubsidioDRH", time);
    }
    
    if (atividade == 37){
    	hAPI.setCardValue("dataAnaliseSubsidioJuridico", date);
    	hAPI.setCardValue("horaAnaliseSubsidioJuridico", time);
    }
    
    if (atividade == 54 && hAPI.getCardValue("decisaoEscritorio") != "aprovado"){
    	hAPI.setCardValue("switchEnviarRgHide", "");
    	hAPI.setCardValue("switchEnviarCtpsHide", "");
    	hAPI.setCardValue("switchEnviarContratoHide", "");
    	hAPI.setCardValue("switchEnviarComprovanteResHide", "");
    	hAPI.setCardValue("switchEnviarFichaFinHide", "");
    	hAPI.setCardValue("switchEnviarFichaRegistroHide", "");
    	hAPI.setCardValue("switchEnviarNotificacaoHide", "");
    	hAPI.setCardValue("switchEnviarCitacaoHide", "");
    	hAPI.setCardValue("switchEnviarSubsidioHide", "");
    	
    	var indexes = hAPI.getChildrenIndexes("tabelaAnexos");
	    for(var i = 0; i < indexes.length; i++) {
	    	hAPI.setCardValue("switchEnviarAdicionalHide___" + indexes[i], "");
	    }
	    
	    var indexes2 = hAPI.getChildrenIndexes("tabelaApendices");
	    for(var j = 0; j < indexes2.length; j++) {
	    	hAPI.setCardValue("switchEnviarApendiceHide___" + indexes2[j], "");
	    }
    }
    
    if (atividade == 65){
    	var indexes = hAPI.getChildrenIndexes("tabelaDemandasProcesso");
	    for(var k = 0; k < indexes.length; k++) {
	    	hAPI.setCardValue("anexouAtividade___" + indexes[k], "65");
	    }
    }
    
    if (atividade == 87){
    	try { 
			 //var atividade           = getValue('WKNumState');
		     var numSolicitacao      = getValue("WKNumProces");
		     var funcionario         = hAPI.getCardValue("nomeExFuncionario");
		     var Solicitante         = hAPI.getCardValue("solicitanteNome");
		        
			 var parametros = new java.util.HashMap();
	         parametros.put("subject", "Verificação de demandas do processo de Ações Trabalhistas");
	         parametros.put("TITULO", "Ações Trabalhistas");
	         parametros.put("RODAPE", "<i>E-mail automático. Por favor, não responda.</i>");
	         
	         var corpo = layoutEmailNotificacaoDRH(numSolicitacao, funcionario, Solicitante);
	         parametros.put("CORPO", corpo);

	         //Destinatarios
	         var destinatarios = new java.util.ArrayList();
	         
	         var cG1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "DRH", "DRH", ConstraintType.SHOULD);
	         var datasetColleagueGroup = DatasetFactory.getDataset('colleagueGroup', null, new Array(cG1), null);
	         
	         for (var i=0; i < datasetColleagueGroup.rowsCount; i++){
	        	 var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", datasetColleagueGroup.getValue(i, "colleagueGroupPK.colleagueId"), datasetColleagueGroup.getValue(i, "colleagueGroupPK.colleagueId"), ConstraintType.MUST);
	        	 var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(c1), null);	        	 
	        	 
	        	 destinatarios.add(datasetColleague.getValue(0, "mail")); //remover comentário depois
	         }
	         
	         log.info(destinatarios);	         

	         notifier.notify('fluigadmin', "tpl_email_template_elcano", parametros, destinatarios, "text/html");
		}catch (e) {        
	        log.error("Erro ao enviar e-mail de abertura 'Fluxo Ação Trabalhista'" + "| ERRO:" + e.toString());
	        throw e;
	    }
    }


}

function layoutEmailNotificacaoDRH(numSolicitacao, funcionario, solicitante) {

    var corpo = "<p> Prezados, o Gerente realizou a tarefa de verificar as demandas do processo de Ações Trabalhistas. </p>";
//    corpo += "<p> <strong>Nº Solicitação Fluig: </strong> " + numSolicitacao + "</p>";
    corpo += "<p> <strong>Nº Solicitação Fluig: </strong> " + "<a href=https://devfluig.xplanning.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numSolicitacao + ">" + numSolicitacao + "</a>" + "</p>";
    corpo += "<p> <strong>Funcionário: </strong> " + funcionario + "</p>";
    corpo += "<p> <strong>Solicitante: </strong> " + solicitante + "</p>";

    return corpo;

}

function getCurrentDate() {
	return (new java.text.SimpleDateFormat('dd/MM/yyyy')).format(new Date());
}

function getCurrentTime() {
	return (new java.text.SimpleDateFormat('HH:mm')).format(new Date());
}