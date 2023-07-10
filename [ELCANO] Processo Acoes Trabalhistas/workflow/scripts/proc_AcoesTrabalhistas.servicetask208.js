function servicetask208(attempt, message) {
	
	try { 
		 //var atividade           = getValue('WKNumState');
	     var numSolicitacao      = getValue("WKNumProces");
	     var funcionario         = hAPI.getCardValue("nomeExFuncionario");
	     var Solicitante         = hAPI.getCardValue("solicitanteNome");
	        
		 var parametros = new java.util.HashMap();
        parametros.put("subject", "Abertura do processo de Ações Trabalhistas - Elcano");
        parametros.put("TITULO", "Ações Trabalhistas");
        parametros.put("RODAPE", "<i>E-mail automático. Por favor, não responda.</i>");
        
        var corpo = layoutEmailNotificacao(numSolicitacao, funcionario, Solicitante);
        parametros.put("CORPO", corpo);

        //Destinatarios
        var destinatarios = new java.util.ArrayList();
        
        var cG1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "DRH", "DRH", ConstraintType.SHOULD);
        var cG2 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", "GRH", "GRH", ConstraintType.SHOULD);     
        var datasetColleagueGroup = DatasetFactory.getDataset('colleagueGroup', null, new Array(cG1, cG2), null);
        
        for (var i=0; i < datasetColleagueGroup.rowsCount; i++){
       	 var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", datasetColleagueGroup.getValue(i, "colleagueGroupPK.colleagueId"), datasetColleagueGroup.getValue(i, "colleagueGroupPK.colleagueId"), ConstraintType.MUST);
       	 var datasetColleague = DatasetFactory.getDataset('colleague', null, new Array(c1), null);	        	 
       	 
       	 destinatarios.add(datasetColleague.getValue(0, "mail")); //remover comentário depois
        }
        
        //Adicionar destinários do grupo DRH e GRH
        //destinatarios.add("vivian.matos@xplanning.com.br");
        log.info(destinatarios);	         

        notifier.notify('fluigadmin', "tpl_email_template_elcano", parametros, destinatarios, "text/html");
	}catch (e) {        
       log.error("Erro ao enviar e-mail de abertura 'Fluxo Ação Trabalhista'" + "| ERRO:" + e.toString());
       throw e;
   }
}

/***
 * @Notificação Abertura 
 */
function layoutEmailNotificacao(numSolicitacao, funcionario, solicitante) {

    var corpo = "<p> Prezados, uma nova solicitação de Ação Trabalhista foi iniciada. </p>";
//    corpo += "<p> <strong>Nº Solicitação Fluig: </strong> " + numSolicitacao + "</p>";
    corpo += "<p> <strong>Nº Solicitação Fluig: </strong> " + "<a href=https://devfluig.xplanning.com.br/portal/p/01/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=" + numSolicitacao + ">" + numSolicitacao + "</a>" + "</p>";
    corpo += "<p> <strong>Funcionário: </strong> " + funcionario + "</p>";
    corpo += "<p> <strong>Solicitante: </strong> " + solicitante + "</p>";

    return corpo;

}