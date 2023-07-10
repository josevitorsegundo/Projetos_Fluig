function enableFields(form){
    var activity     = getValue("WKNumState"); 
    var fieldsEnabled = [];
	var fieldsDisabled = [];

	if (activity != 0) {
		//disableAllFields(form);
	}
	
	fieldsEnabled.push("origem");
	
	if(activity != ABERTURA_0 && activity != INICIO_6) {
		fieldsDisabled.push("zoomExFuncionario");
	}

	if(activity != ANEXAR_CITACAO_8 ) {
		fieldsDisabled.push("btnDownloadNotificacaoAnexo");
		//fieldsEnabled.push("btnDonwloadNotificacaoAnexo");
		//fieldsDisabled.push("btnViewerNotificacaoAnexo");
		//fieldsEnabled.push("btnViewerNotificacaoAnexo");		
		fieldsDisabled.push("numeroProcesso");		
		fieldsDisabled.push("representanteReclamente");		
	}
	
	if(activity != INSERIR_ANEXOS_OBRIGATORIOS_175 ) {
		//fieldsEnabled.push("zoomExFuncionario");
	}
	
	if(activity != ANALISAR_SOLICITACAO_24 ){		
		fieldsDisabled.push("descricaoAnaliseDiretor");
		
		var tabelaAnexosAdicionais = form.getChildrenIndexes("documentos");
		if (tabelaAnexosAdicionais.length > 0){		
			for (var i = 0; i < tabelaAnexosAdicionais.length; i++) {				
				//form.setVisible("btnViewerTable___"+tabelaAnexosAdicionais[i], false);
				//form.setVisible("_btnViewerTable___"+tabelaAnexosAdicionais[i], false);
				//form.setVisible("btnDownloadTable___"+tabelaAnexosAdicionais[i], false);
				//form.setVisible("_btnDownloadTable___"+tabelaAnexosAdicionais[i], false);				
				//form.setVisible("docAdicionais___"+tabelaAnexosAdicionais[i], false);
				//form.setVisible("_docAdicionais___"+tabelaAnexosAdicionais[i], false);										
			}
		}
	}
	
	if (activity != ELABORAR_SUBSIDIOS_25) {
		var tabelaAnexosApendices = form.getChildrenIndexes("tabelaAnexosApendices");
		if (tabelaAnexosApendices.length > 0){		
			for (var i = 0; i < tabelaAnexosApendices.length; i++) {			
				//form.setVisible("btnDownloadAnexoApendice___"+tabelaAnexosApendices[i], false);
				//form.setVisible("btnViewerAnexoApendice___"+tabelaAnexosApendices[i], false);
				
				//form.setVisible("alterarApendice___"+tabelaAnexosApendices[i], false);
				//form.setVisible("_alterarApendice___"+tabelaAnexosApendices[i], false);
				//form.setVisible("enviarApendiceEscritorioSim", false);				
				//form.setVisible("enviarApendiceEscritorioSim___"+tabelaAnexosApendices[i], false);
				//form.setVisible("_enviarApendiceEscritorioSim___"+tabelaAnexosApendices[i], false);								
				//form.setVisible("enviarApendiceEscritorioNao", false);								
				//form.setVisible("enviarApendiceEscritorioNao___"+tabelaAnexosApendices[i], false);
				//form.setVisible("_enviarApendiceEscritorioNao___"+tabelaAnexosApendices[i], false);								
			}
		}
	}
	
	if (activity != ANALISAR_SUBSIDIOS_26){
		fieldsDisabled.push("decisaoDRH");		
		fieldsDisabled.push("justificativaDRH");		
	}
	
	if (activity != ANALISAR_DOCUMENTACOES_37){
		fieldsDisabled.push("decisaoJuridico");		
		fieldsDisabled.push("justificativaJuridico");		
	}
	
	/*if (activity != ENVIAR_EMAIL_ESC_ADIVOC_161){
		fieldsDisabled.push("emailEscritrioAdvocacia");		
	}*/
	
	if (activity != ANALISAR_DEC_ESCRITORIO_54){
		fieldsDisabled.push("passarPeloRH");		
		fieldsDisabled.push("decisaoEscritorio");		
	}
	
	if (activity != ACOMPANHAR_PROCESSO_JUR_65){
		fieldsDisabled.push("novaDemandas");	
		fieldsDisabled.push("tipoPericia");
	}
	
	if ((activity != VERIFICAR_DEMANDA_DRH_86) && (activity != VERIFICAR_DEMANDA_GRH_87)){
		fieldsDisabled.push("peritoAssisnte");
	}
	
	disabledFieldList(form, fieldsDisabled);	
	enabledFieldList(form, fieldsEnabled);
}

function disableAllFields(form) {
	var fields = form.getCardData();
	var keys = fields.keySet().toArray();
	for (var k in keys) {
		var field = keys[k];
		form.setEnabled(field, false);
	}
}

function disabledFieldList(form, fields) {
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i], false);
	}
}

function enabledFieldList(form, fields) {
	for (var i = 0; i < fields.length; i++) {
		form.setEnabled(fields[i], true);
	}
}