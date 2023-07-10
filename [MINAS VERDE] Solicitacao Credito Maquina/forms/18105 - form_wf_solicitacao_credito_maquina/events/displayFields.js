function displayFields(form,customHTML){
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);	
	
	var ATIVIDADE = Number(getValue("WKNumState")) ? Number(getValue("WKNumState")) : INICIO_4;	
	var MODO = form.getFormMode();
	
	customHTML.append("<script>function getAtividade(){ return " + ATIVIDADE + "; }</script>");
	customHTML.append("<script>function getWKNumState(){ return " + ATIVIDADE + "; }</script>");
	customHTML.append("<script>function getMode(){ return '" + MODO + "'; }</script>");
	customHTML.append("<script>function getFormMode(){ return '" + MODO + "'; }</script>");
	customHTML.append("<script>function getUser(){ return '" + getValue("WKUser") + "'; }</script>");
	customHTML.append("<script>function getEmail(){ return '" + getValue("WKUser") + "'; }</script>");
	customHTML.append("<script>function getCompany(){ return " + getValue("WKCompany") + "; }</script>");
	customHTML.append("<script>function getMobile(){ return " + form.getMobile() + "; }</script>");
	customHTML.append("<script>function getDocumentId(){ return " + form.getDocumentId() + "; }</script>");
	
	
	
	var usuario = fluigAPI.getUserService().getCurrent();
	if (MODO == "ADD"){		
		form.setValue("solicitanteNome", usuario.getFullName());
		form.setValue("solicitanteEmail", usuario.getEmail());		
		
		var dataCorrente = obterDataCorrente();
		form.setValue("dataCriacao", dataCorrente.split(" ")[0]);
		form.setValue("horaCriacao", dataCorrente.split(" ")[1]);
		//form.setValue("situacao", "Novo");
	}	
	
	setaDadosAprovacao(ATIVIDADE, form, usuario.getFullName(), getValue("WKUser"), MODO);
}

function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm");
	return formatoData.format(dateCorrente);
}

function setaDadosAprovacao(activity, form, name, userID, mode) {
	if(mode != "VIEW"){
		var dataCorrente = obterDataCorrente();
		if (activity == APROVACAO_DIRETORIA_21) {
			form.setValue("nomeDiretor", name);
			//form.setValue("codAprovador", userID);
			form.setValue("dataDecDiretor", dataCorrente.split(" ")[0]);
			form.setValue("horaDecDiretor", dataCorrente.split(" ")[1]);
		}
		if (activity == APROVACAO_GERENTE_REGIONAL_38) {
			form.setValue("nomeGerRegional", name);
			//form.setValue("codAprovador", userID);
			form.setValue("dataDecGerRegional", dataCorrente.split(" ")[0]);
			form.setValue("horaDecGerRegional", dataCorrente.split(" ")[1]);
		}
		if (activity == REALIZAR_ANALISE_CREDITO_23) {
			form.setValue("nomeAnalistCred", name);
			//form.setValue("codAprovador", userID);
			form.setValue("dataAnalistCred", dataCorrente.split(" ")[0]);
			form.setValue("horaDecAnalistCred", dataCorrente.split(" ")[1]);
		}
		if (activity == CONFIRMAR_PAGAMENTO_59) {
			form.setValue("nomeFinanceiro", name);
			//form.setValue("codAprovador", userID);
			form.setValue("dataDecFinanceiro", dataCorrente.split(" ")[0]);
			form.setValue("horaDecFinanceiro", dataCorrente.split(" ")[1]);
		}
		if (activity == LIBERACAO_CREDITO_57) {
			form.setValue("nomeAnalistCredLib", name);
			//form.setValue("codAprovador", userID);
			form.setValue("dataDecAnalistCredLib", dataCorrente.split(" ")[0]);
			form.setValue("horaDecAnalistCredLib", dataCorrente.split(" ")[1]);
		}
		if (activity == NOTIFICAR_CLIENTE_41) {
			form.setValue("nomeAdministLoja", name);
			//form.setValue("codAprovador", userID);
			form.setValue("dataDecAdministLoja", dataCorrente.split(" ")[0]);
			form.setValue("horaDecAdministLoja", dataCorrente.split(" ")[1]);
		}
		if (activity == ANEXAR_COMPROVANTE_PAGAMENTO_46) {
			form.setValue("nomeAdministLoja", name);
			//form.setValue("codAprovador", userID);
			form.setValue("dataDecAdministLoja", dataCorrente.split(" ")[0]);
			form.setValue("horaDecAdministLoja", dataCorrente.split(" ")[1]);
		}
	}
}