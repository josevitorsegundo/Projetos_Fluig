function enableFields(form) {

	var ATIVIDADE = Number(getValue("WKNumState")) ? Number(getValue("WKNumState")) : INICIO;
	
	form.setEnabled("dataCriacao", false);
	form.setEnabled("solicitanteNome", false);
	form.setEnabled("solicitanteEmail", false);
	form.setEnabled("solicitanteTelefone", false);
	form.setEnabled("solicitanteDepartamento ", false);

	if (ATIVIDADE != INICIO) {
		form.setEnabled("zoomColigada", false);
		form.setEnabled("mesCompetencia", false);
	} else {
		//Checklist Contracheques
		form.setEnabled("checkboxContracheque", true);
		form.setEnabled("msgContracheque", true);
		form.setEnabled("enviarContrachMar", true);
		form.setEnabled("disponibContracheque", true);
		form.setEnabled("emailCentralBrasil", true);
	}
	
	if (ATIVIDADE != REGISTRAR_LANCAMENTOS_5) {
		// CheckList de Lançamentos
		form.setEnabled("checkboxLancamentos", false);
		form.setEnabled("grupoEventos", false);
		form.setEnabled("lancarFerias", false);
		form.setEnabled("admissoes", false);
		form.setEnabled("afastamentos", false);
		form.setEnabled("pagAutonomo", false);
		form.setEnabled("LancamentoPensoes", false);
		form.setEnabled("promocoes", false);
		form.setEnabled("movFolha", false);
		form.setEnabled("demissoes", false);
		form.setEnabled("lancamentoLiqRescisao", false);
		form.setEnabled("lancarFinalizarFerias", false);
		form.setEnabled("lancamentoRessarc", false);
		form.setEnabled("difSalarial", false);
		form.setEnabled("pagSubstituicao", false);
		form.setEnabled("pagDiferencasFunc", false);
		form.setEnabled("descMedicamentos", false);
		form.setEnabled("reembolsoVacina", false);
		
		// Acordo Coletivo
		form.setEnabled("checkboxAcordoColetivo", false);
		form.setEnabled("acordoColetivoAdm", false);
		form.setEnabled("acordoColetivoMar", false);
		form.setEnabled("alteracaoSalarialDir", false);
		
		// Abono / Prêmio
		form.setEnabled("checkboxAbonoPremio", false);
		form.setEnabled("abonoAdm", false);
		form.setEnabled("premioMar", false);
		form.setEnabled("abonoDir", false);
		
		// Conferências
		form.setEnabled("checkboxConferencias", false);
		form.setEnabled("conferirEventos", false);
		form.setEnabled("conferirPlanilhasCadastros", false);
		form.setEnabled("conferirPlanilhasLancamentos", false);
		form.setEnabled("conferirPensoes", false);
		form.setEnabled("conferirEnvelopes", false);
		form.setEnabled("conferenciaAjustesPS", false);
		form.setEnabled("conferenciaAjustesPD", false);
		form.setEnabled("conferenciaAjustesVA", false);
		form.setEnabled("conferenciaAjustesVR", false);
		form.setEnabled("conferenciaAjustesVT", false);
		form.setEnabled("conferenciaAjustesEmprestimo", false);
		form.setEnabled("conferenciaAjustesSeguro", false);
		form.setEnabled("conferenciaAjustesPrevidencia", false);		
		form.setEnabled("confAjustEducativa", false);
		form.setEnabled("confAjustSindical", false);
		form.setEnabled("confAjustEstacionamento", false);
		form.setEnabled("confAjustTerceirizadoRH", false);
		form.setEnabled("confAjustJovemAprendiz", false);
		form.setEnabled("confAjustTerceirizadoSaudeOcup", false);
		form.setEnabled("confAjustConsultoriaDP", false);
		form.setEnabled("confAjustIntegracoesSisrat", false);		
		form.setEnabled("bloquearFolha", false);
		form.setEnabled("lancarFeriasProxMes", false);
		form.setEnabled("salvarHistorico", false);
		
		// Alteração FAP
		form.setEnabled("checkboxAlteracaoFAP", false);
		form.setEnabled("alteracoesValores", false);
		
		// Gerar Provisões / Encargos
		form.setEnabled("checkboxGerarProvisoes", false);
		form.setEnabled("provisoesFerias", false);
		form.setEnabled("gerarEncargos", false);
		form.setEnabled("gerarEncargosProv", false);
	} else {
		//Checklist Contracheques
		form.setEnabled("checkboxContracheque", true);
		form.setEnabled("msgContracheque", true);
		form.setEnabled("enviarContrachMar", true);
		form.setEnabled("disponibContracheque", true);
		form.setEnabled("emailCentralBrasil", true);
	}
	
	if (ATIVIDADE != IMPORTAR_SECOES_SISRAT_146) {
		form.setEnabled("importarSISRAT", false);
	} else {
		//Checklist Contracheques
		form.setEnabled("checkboxContracheque", true);
		form.setEnabled("msgContracheque", true);
		form.setEnabled("enviarContrachMar", true);
		form.setEnabled("disponibContracheque", true);
		form.setEnabled("emailCentralBrasil", true);
	}

	if(ATIVIDADE != GERAR_ARQUIVOS_CONTABEIS_43){	
		form.setEnabled("checkboxArqContabeis", false);
		form.setEnabled("arquivosContabFolha", false);
		form.setEnabled("arquivosContabEncargos", false);
		form.setEnabled("arquivosContabProv", false);
		
		
		form.setEnabled("checkboxArqContabeisTXT", false);
		form.setEnabled("arquivosContabFolhaTXT", false);
		form.setEnabled("arquivosContabFolhaTXT2", false);
		form.setEnabled("arquivosContabFolhaTXT3", false);
		form.setEnabled("arquivosContabEncargosTXT", false);
		form.setEnabled("arquivosContabProvTXT", false);
		
		
		form.setEnabled("checkboxProvisoesContab", false);
		form.setEnabled("gerarPlanilhasNET", false);
		form.setEnabled("enviarArqContabeis", false);
		disableInputTable(form, "tblArqContabAnexos", "visivelFinArqContab");		
	} else {
		//Checklist Contracheques
		form.setEnabled("checkboxContracheque", true);
		form.setEnabled("msgContracheque", true);
		form.setEnabled("enviarContrachMar", true);
		form.setEnabled("disponibContracheque", true);
		form.setEnabled("emailCentralBrasil", true);
	}
	
	if(ATIVIDADE != GERAR_RESUMOS_FOLHA_48){		
		form.setEnabled("checkboxGerarResumosFolha", false);
		form.setEnabled("resumoGeral", false);
		form.setEnabled("resumoAdm", false);
		form.setEnabled("resumoAdmSemAprendiz", false);
		form.setEnabled("resumoAdmAprendiz", false);
		form.setEnabled("resumoMar", false);
		form.setEnabled("resumoAutonomos", false);
		form.setEnabled("resumoDemitidos", false);
		form.setEnabled("resumoDiretor", false);
		form.setEnabled("resumoFolhaPag", false);
		form.setEnabled("analisarResumos", false);		
	} else {
		//Checklist Contracheques
		form.setEnabled("checkboxContracheque", true);
		form.setEnabled("msgContracheque", true);
		form.setEnabled("enviarContrachMar", true);
		form.setEnabled("disponibContracheque", true);
		form.setEnabled("emailCentralBrasil", true);
	}
	
	if(ATIVIDADE != GERAR_RUBRICAS_ESOCIAL_53){
		form.setEnabled("checkboxEsocial", false);
		form.setEnabled("conferirEventosTabela", false);
		form.setEnabled("conferirEventosNaoPer", false);
		form.setEnabled("criarPerApuracao", false);
		form.setEnabled("gerarXML1200", false);
		form.setEnabled("gerarXML1210", false);
		form.setEnabled("integrarTAF1200", false);
		form.setEnabled("integrarTAF1210", false);
		form.setEnabled("enviarRET1200", false);
		form.setEnabled("enviarRET1210", false);
		form.setEnabled("atualizarRmTaf", false);
		form.setEnabled("fechEventosPeriodicos", false);
		form.setEnabled("fechEventosPeriodicos1298", false);
		form.setEnabled("gerarTAF", false);
		form.setEnabled("conferenciaEncargos", false);				
	} else {
		//Checklist Contracheques
		form.setEnabled("checkboxContracheque", true);
		form.setEnabled("msgContracheque", true);
		form.setEnabled("enviarContrachMar", true);
		form.setEnabled("disponibContracheque", true);
		form.setEnabled("emailCentralBrasil", true);
	}
	
	if(ATIVIDADE != DISPONIBILIZAR_CONTRACHEQUES_58){
		//form.setEnabled("checkboxContracheque", false);
		//form.setEnabled("msgContracheque", false);
		//form.setEnabled("enviarContrachMar", false);
		//form.setEnabled("disponibContracheque", false);
		//form.setEnabled("emailCentralBrasil", false);
	} else {
		form.setEnabled("checkboxContracheque", true);
		form.setEnabled("msgContracheque", true);
		form.setEnabled("enviarContrachMar", true);
		form.setEnabled("disponibContracheque", true);
		form.setEnabled("emailCentralBrasil", true);
	}
	
	if(ATIVIDADE != GERAR_RELATORIO_PAGAMENTOS_63){
		form.setEnabled("checkboxFolhaPgto", false);
		form.setEnabled("emitirPlanilha", false);
		form.setEnabled("emitirRelFunc", false);
		form.setEnabled("emitirRelPens", false);
		form.setEnabled("emitirRelPens2", false);
		form.setEnabled("emitirRelPratic", false);
		disableInputTable(form, "tblReltPgtoAnexos", "visivelFinRelPgto");		
	} else {
		//Checklist Contracheques
		form.setEnabled("checkboxContracheque", true);
		form.setEnabled("msgContracheque", true);
		form.setEnabled("enviarContrachMar", true);
		form.setEnabled("disponibContracheque", true);
		form.setEnabled("emailCentralBrasil", true);
	}
	
	form.setEnabled("relatPgtoRespGrhMat", false);
	form.setEnabled("relatPgtoRespGrhNome", false);
	form.setEnabled("relatPgtoGrhData", false);
	form.setEnabled("relatPgtoGrhHora", false);
	if(ATIVIDADE != APROV_RELATORIOS_PGTO_GRH_17){
		form.setEnabled("decisaoGRH", false);
		form.setEnabled("motivoReprovacaoGRH", false);
	}
	
	form.setEnabled("relatPgtoRespDrhMat", false);
	form.setEnabled("relatPgtoRespDrhNome", false);
	form.setEnabled("relatPgtoDrhData", false);
	form.setEnabled("relatPgtoDrhHora", false);
	
	if(ATIVIDADE != APROV_PGTO_FOLHA_DRH_18){
		form.setEnabled("decisaoDRH", false);
		form.setEnabled("motivoReprovacaoDRH", false);
	}
	
	form.setEnabled("relatPgtoRespMat", false);
	form.setEnabled("relatPgtoRespNome", false);
	form.setEnabled("relatPgtoData", false);
	form.setEnabled("relatPgtoHora", false);
	
	if(ATIVIDADE != REALIZAR_PGTO_FOLHA_195){
		form.setEnabled("relatPgtoRealizado", false);
		form.setEnabled("relatPgtoMotivo", false);
	}
	
	if(ATIVIDADE != GERAR_ARQ_BANCARIOS_184){
		form.setEnabled("checkboxArqBancarios", false);
		form.setEnabled("importacaoFolha", false);
		form.setEnabled("importarCISA", false);
		form.setEnabled("conferirArquivos", false);
	}
	
	if(ATIVIDADE != FGTS_ADM_MAR_72){
		form.setEnabled("checkboxFgtsAdm", false);
		form.setEnabled("folhaPagAdm", false);
		form.setEnabled("folhaPagAdmAprendiz", false);
		form.setEnabled("flagsFGTS", false);
		form.setEnabled("compararFolhaAnalitica", false);
		form.setEnabled("gerarSEFIP", false);
		form.setEnabled("importarAppSEFIP", false);
		form.setEnabled("analisarInconsistencias", false);
		form.setEnabled("salvarSFP", false);
		form.setEnabled("gerarRelSEFIP", false);
		form.setEnabled("analisarValoresBI", false);
		form.setEnabled("conectividadeSocial", false);
		form.setEnabled("salvarZIP", false);
		form.setEnabled("transmitirZIP", false);
		form.setEnabled("salvarXmlPdf", false);
		form.setEnabled("appSEFIP", false);
		form.setEnabled("imprimirSalvarGED", false);
		form.setEnabled("pagamentoGRF", false);
		form.setEnabled("backupSEFIP", false);
		form.setEnabled("arquivarDoc", false);
				
		form.setEnabled("checkboxFgtsMar", false);
		form.setEnabled("folhaPagMar", false);
		form.setEnabled("flagsFGTSMar", false);
		form.setEnabled("compararFolhaAnaliticaMar", false);
		form.setEnabled("gerarSEFIPMar", false);
		form.setEnabled("importarAppSEFIPMar", false);
		form.setEnabled("analisarInconsistenciasMar", false);
		form.setEnabled("salvarSFPMar", false);
		form.setEnabled("gerarRelSEFIPMar", false);
		form.setEnabled("analisarValoresBIMar", false);
		form.setEnabled("conectividadeSocialMar", false);
		form.setEnabled("salvarZIPMar", false);
		form.setEnabled("transmitirZIPMar", false);
		form.setEnabled("salvarXmlPdfMar", false);
		form.setEnabled("appSEFIPMar", false);
		form.setEnabled("imprimirSalvarGEDMar", false);
		form.setEnabled("pagamentoGRFMar", false);
		form.setEnabled("backupSEFIPMar", false);
		form.setEnabled("arquivarDocMar", false);
		disableInputTable(form, "tblFgtsAnexos", "visivelFinFgts")
	}
	
	form.setEnabled("fgtsRespGrhMat", false);
	form.setEnabled("fgtsRespGrhNome", false);
	form.setEnabled("fgtsGrhData", false);
	form.setEnabled("fgtsGrhHora", false);
	
	if(ATIVIDADE != APROV_FGTS_GRH_100){
		form.setEnabled("decisaoGrhFGTS", false);
		form.setEnabled("motivoReprovacaoGrhFGTS", false);
	}
	
	form.setEnabled("fgtsRespDrhMat", false);
	form.setEnabled("fgtsRespDrhNome", false);
	form.setEnabled("fgtsDrhData", false);
	form.setEnabled("fgtsDrhHora", false);
	
	if(ATIVIDADE != APROV_FGTS_DRH_102){
		form.setEnabled("decisaoDrhFGTS", false);
		form.setEnabled("motivoReprovacaoDrhFGTS", false);
	}
	
	form.setEnabled("fgtsRespMat", false);
	form.setEnabled("fgtsRespNome", false);
	form.setEnabled("fgtsData", false);
	form.setEnabled("fgtsHora", false);
	if(ATIVIDADE != REALIZAR_PGTO_FGTS_210){
		form.setEnabled("fgtsRealizado", false);
		form.setEnabled("fgtsMotivo", false);
	}
	
	if(ATIVIDADE != EMITIR_IRRF_83 && ATIVIDADE != FGTS_ADM_MAR_72){
		form.setEnabled("checkboxIrrf", false);
		form.setEnabled("emitirPlanilhasIRRF", false);
		form.setEnabled("conferirEsocial", false);
		form.setEnabled("salvarXMLEsocial", false);
		form.setEnabled("conferirValoresBI", false);
		form.setEnabled("analisarPossiveisDivergencias", false);
		form.setEnabled("tabelaSELIC", false);
		form.setEnabled("gerarDARFRefmes", false);
		form.setEnabled("aprovacaoPafDARF", false);
	}
	
	if(ATIVIDADE != EMITIR_INSS_88 && ATIVIDADE != FGTS_ADM_MAR_72){
		form.setEnabled("checkboxInss", false);
		form.setEnabled("gerarPlanilhasINSS", false);
		form.setEnabled("conferirRetencaoPetrobras", false);
		form.setEnabled("conferirCredito", false);
		form.setEnabled("solicitarValoresPrestServico", false);
		form.setEnabled("conferirLancamentoRetencao", false);
		form.setEnabled("conferirEsocialValores", false);
		form.setEnabled("analisarTotalizadores", false);
		form.setEnabled("lancarSISRATPetrobras", false);
		form.setEnabled("lancarSISRATPrestServico", false);
		form.setEnabled("analisarValoresBIINSS", false);
		form.setEnabled("periodoApuracao", false);
		form.setEnabled("DCTFWebEcad", false);
		form.setEnabled("downloadRecibo", false);
		form.setEnabled("emitirRelatoriosINSS", false);
		form.setEnabled("emitirDARFINSS", false);
		form.setEnabled("solicitarPagDARFINSS", false);
		form.setEnabled("salvarArquivo", false);
		disableInputTable(form, "tblInssAnexos", "visivelFinInss")
	}
	
	
	form.setEnabled("inssRespGrhMat", false);
	form.setEnabled("inssRespGrhNome", false);
	form.setEnabled("inssGrhData", false);
	form.setEnabled("inssGrhHora", false);
	
	if(ATIVIDADE != APROV_IRRF_GRH_112){
		form.setEnabled("decisaoGrhINSS", false);
		form.setEnabled("motivoReprovacaoGrhINSS", false);
	}
	
	form.setEnabled("inssRespDrhMat", false);
	form.setEnabled("inssRespDrhNome", false);
	form.setEnabled("inssDrhData", false);
	form.setEnabled("inssDrhHora", false);
	
	if(ATIVIDADE != APROV_IRRF_DRH_111){
		form.setEnabled("decisaoDrhINSS", false);
		form.setEnabled("motivoReprovacaoDrhINSS", false);
	}
	
	
	form.setEnabled("inssRespMat", false);
	form.setEnabled("inssRespNome", false);
	form.setEnabled("inssData", false);
	form.setEnabled("inssHora", false);
	
	if(ATIVIDADE != REALIZAR_PGTO_IRRF_217){
		form.setEnabled("inssRealizado", false);
		form.setEnabled("inssMotivo", false);
	}

	form.setEnabled("darfInssRespGrhMat", false);
	form.setEnabled("darfInssRespGrhNome", false);
	form.setEnabled("darfInssGrhData", false);
	form.setEnabled("darfInssGrhHora", false);
	
	if(ATIVIDADE != APROV_DARF_INSS_GRH_122){
		form.setEnabled("decisaoGrhDarfINSS", false);
		form.setEnabled("motivoReprovacaoGrhDarfINSS", false);
	} 

	form.setEnabled("darfInssRespDrhMat", false);
	form.setEnabled("darfInssRespDrhNome", false);
	form.setEnabled("darfInssDrhData", false);
	form.setEnabled("darfInssDrhHora", false);
	
	if(ATIVIDADE != APROV_DARF_INSS_DRH_124){
		form.setEnabled("decisaoDrhDarfINSS", false);
		form.setEnabled("motivoReprovacaoDrhDarfINSS", false);
	}

	form.setEnabled("darfInssRespMat", false);
	form.setEnabled("darfInssRespNome", false);
	form.setEnabled("darfInssData", false);
	form.setEnabled("darfInssHora", false);
	
	if(ATIVIDADE != REALIZAR_PGTO_DARF_INSS_225){
		form.setEnabled("darfInssRealizado", false);
		form.setEnabled("darfInssMotivo", false);
	}
	
	form.setEnabled("arqContabRespMat", false);
	form.setEnabled("arqContabRespNome", false);
	form.setEnabled("arqContabData", false);
	form.setEnabled("arqContabHora", false);
	
	if(ATIVIDADE != APROV_ARQUIVOS_CONTABEIS_24){
		form.setEnabled("decisaoArqContab", false);
		form.setEnabled("motivoReprovacaoArqContab", false);
	}


	
	if(ATIVIDADE != CONF_REPASSES_BENEFICIOS_143){
		form.setEnabled("checkboxRepassesSindicatos", false);
		form.setEnabled("mensSindical", false);
		form.setEnabled("ajudaEducativa", false);
		form.setEnabled("contSindicalAnual", false);
		form.setEnabled("empConsignado", false);
		
		form.setEnabled("checkboxRepassesBeneficios", false);
		form.setEnabled("planoSaude", false);
		form.setEnabled("planoOdonto", false);
		form.setEnabled("seguroVida", false);
		form.setEnabled("valeAlimentacRefeic", false);
		form.setEnabled("valeTransporte", false);
		form.setEnabled("previdencPrivada", false);

		form.setEnabled("checkboxServTercConsult", false);
		form.setEnabled("consultoriaDP", false);
		form.setEnabled("tercSaudeOcupacional", false);
		form.setEnabled("terceirizadoJovemAprendiz", false);
		form.setEnabled("terceirizadoRH", false);
		form.setEnabled("terceirizadoEstacionamento", false);
		form.setEnabled("terceirizadoRecrutRH", false);
	}
	
	if(ATIVIDADE != VIRAR_COMPETENCIA_145){		
		form.setEnabled("checkboxCompFolha", false);
		form.setEnabled("importSessoesSisrat", false);
		form.setEnabled("solicBkpCbd", false);
		form.setEnabled("liberarFlagsFGTS", false);
		form.setEnabled("acertoPerAquisitivo", false);
		form.setEnabled("virarCompetencias", false);
	}

}

/**
 * Bloqueia campo de uma tabela pai e filho
 * @param {object} form Parâmetro obrigatório, formController 
 * @param {String} tablename Parâmetro obrigatório, tablename da tabela pai e filho 
 * @param {String} input Parâmetro obrigatório, name do campo que deseja bloquear
 * @return {void}
 * @author Sérgio Machado
 */
function disableInputTable(form, tablename, input) {
	var indexes = form.getChildrenIndexes(tablename);
	for (var i = 0; i < indexes.length; i++) {
		form.setEnabled((input + "___" + indexes[i]), false);
	}
}