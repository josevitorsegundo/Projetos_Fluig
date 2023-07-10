function displayFields(form, customHTML) {
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);

	try {
		var ATIVIDADE = Number(getValue("WKNumState")) ? Number(getValue("WKNumState")) : INICIO;
		var MODO = form.getFormMode();
		var userID = getValue("WKUser");

		var usuario = fluigAPI.getUserService().getCurrent();
		var dataAtual = dataCorrente("dd/MM/yyyy");
		var horaAtual = dataCorrente("HH:mm");
		var customJS = "<script>";

		form.setValue("currentNome", usuario.getFullName());
		form.setValue("currentLogin", usuario.getLogin());

		if (MODO == "ADD") {
			form.setValue("solicitanteMatricula", usuario.getCode());
			form.setValue("solicitanteNome", usuario.getFullName());
			form.setValue("solicitanteEmail", usuario.getEmail());
			form.setValue("solicitanteTelefone", usuario.getValueExtData("UserRamal"));
			form.setValue("solicitanteDepartamento", usuario.getValueExtData("UserProjects"));
			form.setValue("dataCriacao", dataAtual);
		}
		
		if(ATIVIDADE == APROV_RELATORIOS_PGTO_GRH_17){
			form.setValue("relatPgtoRespGrhMat", usuario.getCode());
			form.setValue("relatPgtoRespGrhNome", usuario.getFullName());
			form.setValue("relatPgtoGrhData", dataAtual);
			form.setValue("relatPgtoGrhHora", horaAtual);
		}
		
		if(ATIVIDADE == APROV_PGTO_FOLHA_DRH_18){
			form.setValue("relatPgtoRespDrhMat", usuario.getCode());
			form.setValue("relatPgtoRespDrhNome", usuario.getFullName());
			form.setValue("relatPgtoDrhData", dataAtual);
			form.setValue("relatPgtoDrhHora", horaAtual);
		}
		
		if(ATIVIDADE == REALIZAR_PGTO_FOLHA_195){
			form.setValue("relatPgtoRespMat", usuario.getCode());
			form.setValue("relatPgtoRespNome", usuario.getFullName());
			form.setValue("relatPgtoData", dataAtual);
			form.setValue("relatPgtoHora", horaAtual);
		}
		
		if(ATIVIDADE == APROV_FGTS_GRH_100){
			form.setValue("fgtsRespGrhMat", usuario.getCode());
			form.setValue("fgtsRespGrhNome", usuario.getFullName());
			form.setValue("fgtsGrhData", dataAtual);
			form.setValue("fgtsGrhHora", horaAtual);
		}
		
		if(ATIVIDADE == APROV_FGTS_DRH_102){
			form.setValue("fgtsRespDrhMat", usuario.getCode());
			form.setValue("fgtsRespDrhNome", usuario.getFullName());
			form.setValue("fgtsDrhData", dataAtual);
			form.setValue("fgtsDrhHora", horaAtual);
		}
		
		if(ATIVIDADE == REALIZAR_PGTO_FGTS_210){
			form.setValue("fgtsRespMat", usuario.getCode());
			form.setValue("fgtsRespNome", usuario.getFullName());
			form.setValue("fgtsData", dataAtual);
			form.setValue("fgtsHora", horaAtual);
		}
		
		if(ATIVIDADE == APROV_IRRF_GRH_112){
			form.setValue("inssRespGrhMat", usuario.getCode());
			form.setValue("inssRespGrhNome", usuario.getFullName());
			form.setValue("inssGrhData", dataAtual);
			form.setValue("inssGrhHora", horaAtual);
		}
		
		if(ATIVIDADE == APROV_IRRF_DRH_111){
			form.setValue("inssRespDrhMat", usuario.getCode());
			form.setValue("inssRespDrhNome", usuario.getFullName());
			form.setValue("inssDrhData", dataAtual);
			form.setValue("inssDrhHora", horaAtual);
		}
		
		if(ATIVIDADE == REALIZAR_PGTO_IRRF_217){
			form.setValue("inssRespMat", usuario.getCode());
			form.setValue("inssRespNome", usuario.getFullName());
			form.setValue("inssData", dataAtual);
			form.setValue("inssHora", horaAtual);
		}

		if(ATIVIDADE == APROV_DARF_INSS_GRH_122){
			form.setValue("darfInssRespGrhMat", usuario.getCode());
			form.setValue("darfInssRespGrhNome", usuario.getFullName());
			form.setValue("darfInssGrhData", dataAtual);
			form.setValue("darfInssGrhHora", horaAtual);
		}
		
		if(ATIVIDADE == APROV_DARF_INSS_DRH_124){
			form.setValue("darfInssRespDrhMat", usuario.getCode());
			form.setValue("darfInssRespDrhNome", usuario.getFullName());
			form.setValue("darfInssDrhData", dataAtual);
			form.setValue("darfInssDrhHora", horaAtual);
		}
		
		if(ATIVIDADE == APROV_ARQUIVOS_CONTABEIS_24){
			form.setValue("arqContabRespMat", usuario.getCode());
			form.setValue("arqContabRespNome", usuario.getFullName());
			form.setValue("arqContabData", dataAtual);
			form.setValue("arqContabHora", horaAtual);
		}
		
		if(ATIVIDADE == REALIZAR_PGTO_DARF_INSS_225){
			form.setValue("darfInssRespMat", usuario.getCode());
			form.setValue("darfInssRespNome", usuario.getFullName());
			form.setValue("darfInssData", dataAtual);
			form.setValue("darfInssHora", horaAtual);
		}


		customJS += "function getAtividade(){ return '" + ATIVIDADE + "'};";
		customJS += "function getMode(){ return '" + MODO + "'};";
		customJS += "function getUser(){ return '" + usuario.getCode() + "'};";
		customJS += "function getCompany(){ return '" + getValue("WKCompany") + "'};";
		customJS += "function getMobile(){ return '" + form.getMobile() + "'};";
		customJS += "function getDocumentId(){ return '" + form.getDocumentId() + "'};";
		customJS += "</script>"
		customHTML.append(customJS)
		

	} catch (err) {
		throw "function " + arguments.callee.name + " => " + err.toString();
	}
}

/**
 * Retorna a data atual formatada
 * @param {String} format Parâmetro obrigatório, formato de retorno da data
 * @return {String} Retorna a data atual formatada
 * @author Sérgio Machado
 */
function dataCorrente(format) {
	try {
		var locale = java.util.Locale("pt", "BR");
		var hoje = java.util.Calendar.getInstance();
		var dt = (java.text.SimpleDateFormat(format, locale)).format(hoje.getTime());
		return dt;
	} catch (err) {
		throw "function " + arguments.callee.name + " => " + err.toString();
	}
}

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