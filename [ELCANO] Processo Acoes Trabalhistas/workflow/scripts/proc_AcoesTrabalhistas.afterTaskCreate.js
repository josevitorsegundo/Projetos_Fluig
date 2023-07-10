function afterTaskCreate(colleagueId){
	var next = parseInt(getValue("WKNextState"));
	log.info("afterTaskCreate INFODEV "+ next);
	
	/*if (next == 8){
		//Associar datasets Colleague e colleagueGroup
		//grupo DRH e GRH
		try { 
			 //var atividade           = getValue('WKNumState');
		     var numSolicitacao      = getValue("WKNumProces");
		     var funcionario         = hAPI.getCardValue("nomeExFuncionario");
		     var Solicitante         = hAPI.getCardValue("solicitanteNome");
		        
		     log.info("ENVIO DE E-MAIL,  afterTaskCreate activy 8: " + numSolicitacao);
		     
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
	        	 
	        	 //destinatarios.add(datasetColleague.getValue(0, "mail")); //remover comentário depois
	         }
	         
	         //Adicionar destinários do grupo DRH e GRH
	         log.info("### procAcoesTrabalhistas afterTaskCreate activy 8 - destinatarios");
	         destinatarios.add("vivian.matos@xplanning.com.br");
	         log.info(destinatarios);	         
	         // destinatarios.add("luana.arantes@xplanning.com.br");
	         // destinatarios.add("vivian.matos@xplanning.com.br");

	         notifier.notify('fluigadmin', "tpl_email_template_elcano", parametros, destinatarios, "text/html");
		}catch (e) {        
	        log.error("Erro ao enviar e-mail de abertura 'Fluxo Ação Trabalhista'" + "| ERRO:" + e.toString());
	        throw e;
	    }
	}*/
	
	if(next == 54){
		/*log.info("ENVIO DE E-MAIL,  afterTaskCreate activy 54: " + getValue("WKNumProces"));
        var atividade           = getValue('WKNumState');
        var numSolicitacao      = getValue("WKNumProces");
        var funcionario         = hAPI.getCardValue("nomeExFuncionario");
        var Solicitante         = hAPI.getCardValue("solicitanteNome");
        var atividadeDestino    = hAPI.getCardValue("atividadeEnvioEmail");
        var urlAmbiente         = fluigAPI.getPageService().getServerURL();	
        
        var emailEscritrioAdvocacia = hAPI.getCardValue("emailEscritrioAdvocacia");
		 
	 try {
        *//**
         * @Escritório de Advocacia
         *//*
        //Parâmetros
        var parametros = new java.util.HashMap();

        parametros.put("subject", "E-mail a ser enviado ao escritório de advocacia");
        parametros.put("TITULO", "Ações Trabalhistas");
        parametros.put("RODAPE", "<i>E-mail automático. Por favor, não responda.</i>");
        var docs = hAPI.listAttachments();
        
     // Monta a lista de links a serem enviados no E-mail				
	     for (var i = 0; i < docs.size(); i++) {
	    	 var doc = docs.get(i);
 					
//	    	 if(doc.getDocumentDescription() == "Devices (1)"){
	    	 parametros.put("LINK_ARQUIVO", fluigAPI.getDocumentService().getDownloadURL(doc.getDocumentId()))
//	    	 }
	    	 
//	    	 if(doc.getDocumentDescription() == "anexoAgASO"){
//					param.put("LINK_ARQUIVO_1", fluigAPI.getDocumentService().getDownloadURL(doc.getDocumentId()))
//		    	 }
	    	 
	     }

        hAPI.setCardValue("urlAmbiente", urlAmbiente);
        
        //Destinatarios
        var destinatarios = new java.util.ArrayList();
        destinatarios.add("vivian.matos@xplanning.com.br");
        log.info(destinatarios);
        
        //Array com os anexos que serão enviados no email
   	 	var anexos = [];	

        // Lista com os anexos presentes na solicitação
        var docs = hAPI.listAttachments();
        
        // Monta a lista de anexos a serem enviados no E-mail				
        for (var i = 0; i < docs.size(); i++) {
            var doc = docs.get(i);
            
            var arquivo = fluigAPI.getDocumentService().getDownloadURL(doc.getDocumentId());
            if (hAPI.getCardValue("switchEnviarRgHide") == "s"){
            	if (doc.getDocumentDescription() == hAPI.getCardValue("anexoIdentidade")){
            		anexos.push({
                    	filename: doc.getDocumentDescription(),
        			    path:  arquivo + '',
        			    
                    }) 
            	}
            }
            
            if (hAPI.getCardValue("switchEnviarCtpsHide") == "s"){
            	if (doc.getDocumentDescription() == hAPI.getCardValue("anexoCTPS")){
            		anexos.push({
                    	filename: doc.getDocumentDescription(),
        			    path:  arquivo + '',
        			    
                    }) 
            	}
            }
            
            if (hAPI.getCardValue("switchEnviarContratoHide") == "s"){
            	if (doc.getDocumentDescription() == hAPI.getCardValue("anexoContrato")){
            		anexos.push({
                    	filename: doc.getDocumentDescription(),
        			    path:  arquivo + '',
        			    
                    }) 
            	}
            }
            
            if (hAPI.getCardValue("switchEnviarComprovanteResHide") == "s"){
            	if (doc.getDocumentDescription() == hAPI.getCardValue("anexoComprovante")){
            		anexos.push({
                    	filename: doc.getDocumentDescription(),
        			    path:  arquivo + '',
        			    
                    }) 
            	}
            }
            
            if (hAPI.getCardValue("switchEnviarFichaFinHide") == "s"){
            	if (doc.getDocumentDescription() == hAPI.getCardValue("anexoFicha")){
            		anexos.push({
                    	filename: doc.getDocumentDescription(),
        			    path:  arquivo + '',
        			    
                    }) 
            	}
            }
            
            if (hAPI.getCardValue("switchEnviarFichaRegistroHide") == "s"){
            	if (doc.getDocumentDescription() == hAPI.getCardValue("anexoRegistro")){
            		anexos.push({
                    	filename: doc.getDocumentDescription(),
        			    path:  arquivo + '',
        			    
                    }) 
            	}
            }
            
            if (hAPI.getCardValue("switchEnviarNotificacaoHide") == "s"){
            	if (doc.getDocumentDescription() == hAPI.getCardValue("anexoNotificacao")){
            		anexos.push({
                    	filename: doc.getDocumentDescription(),
        			    path:  arquivo + '',
        			    
                    }) 
            	}
            }
            
            if (hAPI.getCardValue("switchEnviarCitacaoHide") == "s"){
            	if (doc.getDocumentDescription() == hAPI.getCardValue("anexoCitacao")){
            		anexos.push({
                    	filename: doc.getDocumentDescription(),
        			    path:  arquivo + '',
        			    
                    }) 
            	}
            }
            
            if (hAPI.getCardValue("switchEnviarSubsidioHide") == "s"){
            	if (doc.getDocumentDescription() == hAPI.getCardValue("anexoSubsidios")){
            		anexos.push({
                    	filename: doc.getDocumentDescription(),
        			    path:  arquivo + '',
        			    
                    }) 
            	}
            }
            
            var indexes = hAPI.getChildrenIndexes("tabelaAnexos");
    	    for(var k = 0; k < indexes.length; k++) {
    	    	if (hAPI.getCardValue("switchEnviarAdicionalHide___" + indexes[k]) == "s"){
    	    		if (doc.getDocumentDescription() == hAPI.getCardValue("anexoDocumento___" + indexes[k])){
    	            	anexos.push({
    	                filename: doc.getDocumentDescription(),
    	                path:  arquivo + '',
    	        			    
    	                }) 
    	            }
    	         }
    	    }
    	    
    	    var indexes2 = hAPI.getChildrenIndexes("tabelaApendices");
    	    for(var p = 0; p < indexes2.length; p++) {
    	    	if (hAPI.getCardValue("switchEnviarApendiceHide___" + indexes2[p]) == "s"){
    	    		if (doc.getDocumentDescription() == hAPI.getCardValue("anexoApendice___" + indexes2[p])){
    	            	anexos.push({
    	                filename: doc.getDocumentDescription(),
    	                path:  arquivo + '',
    	        			    
    	                }) 
    	            }
    	         }
    	    }
            
            
            anexos.push({
            	filename: doc.getDocumentDescription(),
			    path:  arquivo + '',
			    
            })            
    		
    	}
        
        var corpo = layoutEmailNotificacaoLinks(emailEscritrioAdvocacia, funcionario, Solicitante, anexos);
        parametros.put("CORPO", corpo);
        
        notifier.notify('fluigadmin', "tpl_email_elcano_anexo", parametros, destinatarios, "text/html");
        
    } catch (e) {

        hAPI.setCardValue("errorAtividade", atividade);
        hAPI.setCardValue("errorMensagem", e.toString());
        log.error("Erro ao enviar e-mail 'Fluxo Ação Trabalhista':" + numSolicitacao + "| ERRO:" + e.toString());
        throw e;
    }
		
	}else{
		log.info("afterTaskCreate INFODEV else nextvalue"+ next);
	}*/
}

/***
 * @Email Anexos 
 *//*
function layoutEmailNotificacaoLinks(emailEscritrioAdvocacia, funcionario, solicitante, anexos) {

    var corpo = "<p> " + emailEscritrioAdvocacia + "</p>";
//    corpo += "<p> <strong>Funcionário</strong> " + funcionario + "</p>";
//    corpo += "<p> <strong>Solicitante:</strong> " + solicitante + "</p>";
    corpo += "<br /> <br /> <p> <strong>Lista de anexos:</strong> </p>";
    for (var i=0; i<anexos.length; i++ ){   
    	var j = i + 1;
    	corpo += "Documento " + j + ": " + "<a href=" + anexos[i].path + ">" + anexos[i].filename + "</a>" + "</p>";
    }

    return corpo;

}

//Obtêm a extensão da string da url do anexo
function obterExtensao(string){
	var extensao = '.' + string.split('.').pop();
	return extensao
}


// Função para alterar \n para a tag br
function adicionarBr(texto){
	texto = texto.split('\n');
	for (var i = 0; i < texto.length; i++) {
	  texto[i] = texto[i] + "<br>";
	}
	return texto.join('');
}

//Função pra validar se um email é válido
function validarEmail(email) {
  var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
  if (email == '' || !er.test(email)) {
  	return false;
  } else{
  	return true
  }*/
}