function displayFields(form,customHTML){ 

    form.setShowDisabledFields(true);

	var atividade 		= getValue("WKNumState");
	var atividadeProx	= getValue("WKNextState");
	var usuario   	  	= getValue('WKUser');
	var idForm    		=  getValue('WKFormId');
	
	customHTML.append("<script> var MODE = '" + form.getFormMode() + "';</script>");
	customHTML.append("<script> var CURRENT_STATE = '" + atividade + "';</script>");
	customHTML.append("<script> var NEXT_STATE = '" + atividadeProx + "';</script>");
	customHTML.append("<script>function getWKNumState(){ return '" + atividade + "'; }</script>");
	customHTML.append("<script>function getFormMode(){ return '" + form.getFormMode() + "'; }</script>");
	customHTML.append("<script>function getIdForm(){ return '" + idForm + "'; }</script>");
	customHTML.append("<script>function getUser(){ return '" + getValue("WKUser") + "'; }</script>");
	customHTML.append("<script>function getCompany(){ return '" + getValue("WKCompany") + "'; }</script>");
	customHTML.append("<script>function getMobile(){ return '" + form.getMobile() + "'; }</script>");	
	
	customHTML.append("<script>");
	customHTML.append(" $('.bpm-mobile-trash-column').hide();");
	customHTML.append("</script>");
	
	var usuario = fluigAPI.getUserService().getCurrent();
	
	var modo = form.getFormMode();
	
	var dataCorrente = obterDataCorrente();
	var horaCorrente = obterHoraCorrente();	
	
	if (modo == "ADD"){
		
		form.setValue("solicitanteMatricula", usuario.getCode());
		form.setValue("solicitanteNome", usuario.getFullName());
		form.setValue("solicitanteEmail", usuario.getEmail());
		form.setValue("solicitanteTelefone", usuario.getValueExtData("UserRamal"));
		form.setValue("solicitanteDepartamento", usuario.getValueExtData("UserProjects"));
		form.setValue("dataCriacao", dataCorrente);
		
	}
	
	var indexes = form.getChildrenIndexes("tabelaAnexos");
	for (var i = 0; i < indexes.length; i++) {
		if (form.getValue('anexoDocumento___' + indexes[i]) != ""){
			form.setVisibleById("btnAnexoDocumento___" + indexes[i], false);
		}
	}
	
	var indexes = form.getChildrenIndexes("tabelaApendices");
	for (var i = 0; i < indexes.length; i++) {
		if (form.getValue('anexoApendice___' + indexes[i]) != ""){
			form.setVisibleById("btnAnexoApendice___" + indexes[i], false);
		}
	}
	
	if ((atividade == ABERTURA_0) || (atividade == INICIO_6)){
		form.setVisibleById("div_anexos_rg", false);
		form.setVisibleById("div_anexos_ctps", false);
		form.setVisibleById("div_anexos_contrato", false);
		form.setVisibleById("div_anexos_comprovante_residencia", false);
		form.setVisibleById("div_anexos_ficha_financeira", false);
		form.setVisibleById("div_anexos_ficha_registro", false);
		form.setVisibleById("div_citacao", false);
		
		form.setVisibleById("panel_analiseDiretor", false);
		form.setVisibleById("panel_analiseSubsidioDRH", false);
		form.setVisibleById("panel_analiseSubsidioJuridico", false);
		form.setVisibleById("panel_EscritorioAdvocacia", false);
		form.setVisibleById("panel_demandasProcesso", false);
		form.setVisibleById("panel_testemunhas", false);
		form.setVisibleById("panel_dadosPericia", false);
		form.setVisibleById("panel_ArquivamentoProcesso", false);
	}
	
	if (atividade == ANEXAR_CITACAO_8){
		form.setVisibleById("div_anexos_rg", false);
		form.setVisibleById("div_anexos_ctps", false);
		form.setVisibleById("div_anexos_contrato", false);
		form.setVisibleById("div_anexos_comprovante_residencia", false);
		form.setVisibleById("div_anexos_ficha_financeira", false);
		form.setVisibleById("div_anexos_ficha_registro", false);
		
		form.setVisibleById("panel_analiseDiretor", false);
		form.setVisibleById("panel_analiseSubsidioDRH", false);
		form.setVisibleById("panel_analiseSubsidioJuridico", false);
		form.setVisibleById("panel_EscritorioAdvocacia", false);
		form.setVisibleById("panel_demandasProcesso", false);
		form.setVisibleById("panel_testemunhas", false);
		form.setVisibleById("panel_dadosPericia", false);
		form.setVisibleById("panel_ArquivamentoProcesso", false);
	}
	
	if (atividade == INSERIR_ANEXOS_OBRIGATORIOS_175){
		
		form.setVisibleById("panel_analiseDiretor", false);
		form.setVisibleById("panel_analiseSubsidioDRH", false);
		form.setVisibleById("panel_analiseSubsidioJuridico", false);
		form.setVisibleById("panel_EscritorioAdvocacia", false);
		form.setVisibleById("panel_demandasProcesso", false);
		form.setVisibleById("panel_testemunhas", false);
		form.setVisibleById("panel_dadosPericia", false);
		form.setVisibleById("panel_ArquivamentoProcesso", false);
	}
	
	if (atividade == ANALISAR_SOLICITACAO_24){
		
		form.setVisibleById("panel_analiseSubsidioDRH", false);
		form.setVisibleById("panel_analiseSubsidioJuridico", false);
		form.setVisibleById("panel_EscritorioAdvocacia", false);
		form.setVisibleById("panel_demandasProcesso", false);
		form.setVisibleById("panel_testemunhas", false);
		form.setVisibleById("panel_dadosPericia", false);
		form.setVisibleById("panel_ArquivamentoProcesso", false);
	}
	
	if (atividade == ELABORAR_SUBSIDIOS_25){
		
		form.setValue("elaboradorSubsidios", usuario.getFullName());
		form.setValue("dataSubsidios", dataCorrente);
		form.setValue("horaSubsidios", horaCorrente);
		
		form.setVisibleById("panel_analiseSubsidioDRH", false);
		form.setVisibleById("panel_analiseSubsidioJuridico", false);
		form.setVisibleById("panel_EscritorioAdvocacia", false);
		form.setVisibleById("panel_demandasProcesso", false);
		form.setVisibleById("panel_testemunhas", false);
		form.setVisibleById("panel_dadosPericia", false);
		form.setVisibleById("panel_ArquivamentoProcesso", false);
	}
	
	if (atividade == ANALISAR_SUBSIDIOS_26){
		
		form.setValue("diretor", usuario.getFullName());
		form.setValue("dataAnaliseSubsidioDRH", dataCorrente);
		form.setValue("horaAnaliseSubsidioDRH", horaCorrente);
		
		form.setVisibleById("panel_analiseSubsidioJuridico", false);
		form.setVisibleById("panel_EscritorioAdvocacia", false);
		form.setVisibleById("panel_demandasProcesso", false);
		form.setVisibleById("panel_testemunhas", false);
		form.setVisibleById("panel_dadosPericia", false);
		form.setVisibleById("panel_ArquivamentoProcesso", false);
	}
	
	if (atividade == AJUSTAR_SUBSIDIOS_32){
		
		form.setVisibleById("panel_analiseSubsidioJuridico", false);
		form.setVisibleById("panel_EscritorioAdvocacia", false);
		form.setVisibleById("panel_demandasProcesso", false);
		form.setVisibleById("panel_testemunhas", false);
		form.setVisibleById("panel_dadosPericia", false);
		form.setVisibleById("panel_ArquivamentoProcesso", false);
	}
	
	if (atividade == ANALISAR_DOCUMENTACOES_37){
		
		form.setValue("juridico", usuario.getFullName());
		form.setValue("dataAnaliseSubsidioJuridico", dataCorrente);
		form.setValue("horaAnaliseSubsidioJuridico", horaCorrente);
		
		form.setVisibleById("panel_EscritorioAdvocacia", false);
		form.setVisibleById("panel_demandasProcesso", false);
		form.setVisibleById("panel_testemunhas", false);
		form.setVisibleById("panel_dadosPericia", false);
		form.setVisibleById("panel_ArquivamentoProcesso", false);
		
		/*var indexes = form.getChildrenIndexes("tabelaAnexos");
		for (var i = 0; i < indexes.length; i++) {
			if (form.getValue('anexoDocumento___' + indexes[i]) != ""){
				form.setVisibleById("btnAnexoDocumento___" + indexes[i], false);
			}
		}*/
	}
	
	if (atividade == ENVIAR_EMAIL_ESC_ADIVOC_161){
		
		form.setVisibleById("panel_demandasProcesso", false);
		form.setVisibleById("panel_testemunhas", false);
		form.setVisibleById("panel_dadosPericia", false);
		form.setVisibleById("panel_ArquivamentoProcesso", false);
		
		if (form.getValue('passarPeloRH') == ""){
			form.setVisibleById("analisar_decisao_escritorio", false);
		}
		
		form.setVisibleById("divAnexarContestacao", false);
		form.setVisibleById("btnAnexos", false);
		
		
		/*var indexes = form.getChildrenIndexes("tabelaAnexos");
		for (var i = 0; i < indexes.length; i++) {
			if (form.getValue('anexoDocumento___' + indexes[i]) != ""){
				form.setVisibleById("btnAnexoDocumento___" + indexes[i], false);
			}
		}*/
	}
	
	if (atividade == ANALISAR_DEC_ESCRITORIO_54){
		
		form.setVisibleById("panel_demandasProcesso", false);
		form.setVisibleById("panel_testemunhas", false);
		form.setVisibleById("panel_dadosPericia", false);
		form.setVisibleById("panel_ArquivamentoProcesso", false);
		
	}
	

	/*if (modo != "VIEW") {
		if(atividade == ELABORAR_SUBSIDIOS_25){
			form.setValue("elaboradorSubsidios", usuario.getFullName());
			form.setValue("dataSubsidios", dataCorrente);
			form.setValue("horaSubsidios", horaCorrente);
		}
		
		if(atividade == ANALISAR_SUBSIDIOS_26){			
			form.setValue("diretor", usuario.getFullName());
			form.setValue("dataAnaliseSubsidioDRH", dataCorrente);
			form.setValue("horaAnaliseSubsidioDRH", horaCorrente);
			
			
			form.setVisibleById("panel_analiseSubsidioJuridico", true);
		}
		
		if(atividade == ANALISAR_DOCUMENTACOES_37){			
			form.setValue("juridico", usuario.getFullName());
			form.setValue("dataAnaliseSubsidioJuridico", dataCorrente);
			form.setValue("horaAnaliseSubsidioJuridico", horaCorrente);
			
			if (form.getValue("justificativaJuridico") != ""){
				form.setVisibleById("panel_analiseSubsidioJuridico", true);
			}
		}
		
		var indexes = form.getChildrenIndexes("tabelaAnexos");
		for (var i = 0; i < indexes.length; i++) {
			if (form.getValue('anexoDocumento___' + indexes[i]) != ""){
				form.setVisibleById("btnAnexoDocumento___" + indexes[i], false);
			}
		}
	}*/	
	
	if (atividade != 0 && atividade != 6){
		form.setVisibleById("btnAnexoNotificacao", false);
	}
	
	if ((atividade != 161) && (atividade != 54) && (atividade != 65) && (atividade != 86) && (atividade != 87) && (atividade != 100)){
		form.setVisibleById("switchIdentidade", false);
		form.setVisibleById("switchCTPS", false);
		form.setVisibleById("switchContrato", false);
		form.setVisibleById("switchComprovante", false);
		form.setVisibleById("switchFicha", false);
		form.setVisibleById("switchRegistro", false);
		form.setVisibleById("switchNotificacao", false);
		form.setVisibleById("switchCitacao", false);
	}
	
	if (atividade != 175){
		form.setVisibleById("btnAnexoIdentidade", false);
		form.setVisibleById("btnAnexoCTPS", false);
		form.setVisibleById("btnAnexoContrato", false);
		form.setVisibleById("btnAnexoComprovante", false);
		form.setVisibleById("btnAnexoFicha", false);
		form.setVisibleById("btnAnexoRegistro", false);
	}
	
	if (atividade != 8){
		form.setVisibleById("btnAnexoCitacao", false);
	}
	
	if (atividade == 25){
		form.setVisibleById("div_switchApendice", false);
		form.setVisibleById("div_switchEnviarApendice", false);
		form.setVisibleById("div_switchEnviarAdicional", false);
	}
	
	if ((atividade != 25) && (atividade != 32)){
		form.setVisibleById("btnAnexoSubsidios", false);
	}
}

/**
 * @OBTEM DATA HORA 
 * @returns 
 */

function obterDataCorrente(){

	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy");
	return formatoData.format(dateCorrente);

}  

function addZeroDate(i) {
	  if (i < 10) {
	    i = "0" + i;
	  }
	  return i;
}


/**
 * @OBTEM DATA HORA 
 * @returns 
 */
function obterHoraCorrente() {
    var date = new Date();
    var dateNow = addZeroDate(date.getHours())+':' + 
                  addZeroDate(date.getMinutes());
    return dateNow;
}