function validateForm(form) {

	var ATIVIDADE = Number(getValue("WKNumState")) ? Number(getValue("WKNumState")) : INICIO;
	var PROX_ATIVIDADE = Number(getValue("WKNextState"))
	var TAREFA_COMPLETA = (getValue("WKCompletTask") == "true");

	if (!TAREFA_COMPLETA || ATIVIDADE == PROX_ATIVIDADE) {
		return;
	}

	try {

		var erros = [];

		if (ATIVIDADE == INICIO) {
			var mesCompetencia = String(form.getValue("mesCompetencia"));

			if ((campoVazio(form, "codColigada")) && (campoVazio(form, "zoomColigada"))) {
				erros.push("Informe a Coligada")
			}

			if (!mesCompetencia) {
				erros.push("Informe o mês de competência")
			} else if (!validarData("01/" + mesCompetencia)) {
				erros.push("O mês de competência não é válido")
			}
		}

		if (ATIVIDADE == REGISTRAR_LANCAMENTOS_5) {
			if (validRegistrarLancamentos(form)) {
				erros.push("Marque todos os campos na Aba 'Registrar e Conferir Lançamentos'");
			}
		}
		
		if (ATIVIDADE == IMPORTAR_SECOES_SISRAT_146) {
			if (validImportarSecoesSISRAT(form)) {
				erros.push("Marque o campo 'Importar no SISRAT' na Aba 'Registrar e Conferir Lançamentos'");
			}
		}

		if (ATIVIDADE == GERAR_ARQUIVOS_CONTABEIS_43) {
			if (validArquivosContabeis(form)) {
				erros.push("Marque todos os campos Aba 'Arq Contábeis'");
			}
		}

		if (ATIVIDADE == GERAR_RESUMOS_FOLHA_48) {
			if (validResumosFolha(form)) {
				erros.push("Marque todos os campos checkbox da seção 'Resumos de Folha'");
			}
		}

		if (ATIVIDADE == GERAR_RUBRICAS_ESOCIAL_53) {
			if (validRubricasEsocial(form)) {
				erros.push("Marque todos os campos checkbox da seção 'E-Social'");
			}
		}

		if (ATIVIDADE == DISPONIBILIZAR_CONTRACHEQUES_58) {
			//Segundo documentação todos os campos são editavéis e não obrigatórios
			if (validDispContracheques(form)) {
				//erros.push("Marque todos os campos checkbox da seção 'Contracheques'");
			}
		}
		
		if (ATIVIDADE == CONF_REPASSES_BENEFICIOS_143) {
			if (validConfRepassesBeneficios(form)) {
				erros.push("Marque todos os campos checkbox da seção 'Repasses e Benefícios'");
			}
		}
		
		if (ATIVIDADE == VIRAR_COMPETENCIA_145) {
			if (validVirarCompetencia(form)) {
				erros.push("Marque todos os campos checkbox da seção 'Virar Competência'");
			}
		}

		if (ATIVIDADE == GERAR_RELATORIO_PAGAMENTOS_63) {
			if (validFolhaPagamento(form)) {
				erros.push("Marque todos os campos checkbox da seção 'Folha de Pgto'");
			}
			validarAnexosTable(form, "tblReltPgtoAnexos", "fnAnexoRelPgto", erros);
		}

		if (ATIVIDADE == APROV_ARQUIVOS_CONTABEIS_24) {
			var decisao = String(form.getValue("decisaoArqContab"));

			if (!decisao) {
				erros.push("Informe o campo Decisão");
			} else if ((decisao == "reprovado") && (campoVazio(form, "motivoReprovacaoArqContab"))) {
				erros.push("Informe o campo Motivo da reprovação")
			}
		}
		
		if (ATIVIDADE == APROV_RELATORIOS_PGTO_GRH_17) {
			var decisao = String(form.getValue("decisaoGRH"));

			if (!decisao) {
				erros.push("Informe o campo Decisão GRH");
			} else if ((decisao == "reprovado") && (campoVazio(form, "motivoReprovacaoGRH"))) {
				erros.push("Informe o campo Motivo da reprovação")
			}
		}

		if (ATIVIDADE == APROV_PGTO_FOLHA_DRH_18) {
			var decisao = String(form.getValue("decisaoDRH"));

			if (!decisao) {
				erros.push("Informe o campo Decisão DRH");
			} else if ((decisao == "reprovado") && (campoVazio(form, "motivoReprovacaoDRH"))) {
				erros.push("Informe o campo Motivo da reprovação")
			}
		}
		
		if (ATIVIDADE == REALIZAR_PGTO_FOLHA_195) {
			var pagamento = String(form.getValue("relatPgtoRealizado"));
			var motivo = String(form.getValue("relatPgtoMotivo"));

			if (!pagamento) {
				erros.push("Informe o campo Pagamento realizado?");
			}
			
			if(((pagamento == "parcial") || (pagamento == "naoRealizado")) && !motivo){
				erros.push("Informe o campo Motivo");
			}
		}
		
		if (ATIVIDADE == GERAR_ARQ_BANCARIOS_184) {
			if (validArqBancarios(form)) {
				erros.push("Marque todos os campos checkbox da seção 'Arq Bancários'");
			}
		}
		
		if (ATIVIDADE == FGTS_ADM_MAR_72) {
			if (validFgts(form)) {
				erros.push("Marque todos os campos checkbox da seção 'FGTS'");
			}
			validarAnexosTable(form, "tblFgtsAnexos", "fnAnexoFgts", erros);
		}
		
		if (ATIVIDADE == APROV_FGTS_GRH_100) {
			var decisao = String(form.getValue("decisaoGrhFGTS"));

			if (!decisao) {
				erros.push("Informe o campo Decisão GRH");
			} else if ((decisao == "reprovado") && (campoVazio(form, "motivoReprovacaoGrhFGTS"))) {
				erros.push("Informe o campo Motivo da reprovação")
			}
		}
		
		if (ATIVIDADE == APROV_FGTS_DRH_102) {
			var decisao = String(form.getValue("decisaoDrhFGTS"));

			if (!decisao) {
				erros.push("Informe o campo Decisão DRH");
			} else if ((decisao == "reprovado") && (campoVazio(form, "motivoReprovacaoDrhFGTS"))) {
				erros.push("Informe o campo Motivo da reprovação")
			}
		}
		
		if (ATIVIDADE == REALIZAR_PGTO_FGTS_210) {
			var pagamento = String(form.getValue("fgtsRealizado"));
			var motivo = String(form.getValue("fgtsMotivo"));

			if (!pagamento) {
				erros.push("Informe o campo Pagamento realizado?");
			}
			
			if(((pagamento == "parcial") || (pagamento == "naoRealizado")) && !motivo){
				erros.push("Informe o campo Motivo");
			}
		}
		
		if (ATIVIDADE == EMITIR_IRRF_83) {
			if (validIrrf(form)) {
				erros.push("Marque todos os campos checkbox da seção 'IRRF'");
			}
		}
		
		if (ATIVIDADE == APROV_IRRF_GRH_112) {
			var decisao = String(form.getValue("decisaoGrhINSS"));

			if (!decisao) {
				erros.push("Informe o campo Decisão GRH");
			} else if ((decisao == "reprovado") && (campoVazio(form, "motivoReprovacaoGrhINSS"))) {
				erros.push("Informe o campo Motivo da reprovação")
			}
		}
		
		if (ATIVIDADE == APROV_IRRF_DRH_111) {
			var decisao = String(form.getValue("decisaoDrhINSS"));

			if (!decisao) {
				erros.push("Informe o campo Decisão DRH");
			} else if ((decisao == "reprovado") && (campoVazio(form, "motivoReprovacaoDrhINSS"))) {
				erros.push("Informe o campo Motivo da reprovação")
			}
		}
		
		if (ATIVIDADE == REALIZAR_PGTO_IRRF_217) {
			var pagamento = String(form.getValue("inssRealizado"));
			var motivo = String(form.getValue("inssMotivo"));

			if (!pagamento) {
				erros.push("Informe o campo Pagamento realizado?");
			}
			
			if(((pagamento == "parcial") || (pagamento == "naoRealizado")) && !motivo){
				erros.push("Informe o campo Motivo");
			}
		}
		
		if (ATIVIDADE == EMITIR_INSS_88) {
			if (validInss(form)) {
				erros.push("Marque todos os campos checkbox da seção 'INSS'");
			}
		}
		
		if (ATIVIDADE == APROV_DARF_INSS_GRH_122) {
			var decisao = String(form.getValue("decisaoGrhDarfINSS"));

			if (!decisao) {
				erros.push("Informe o campo Decisão GRH");
			} else if ((decisao == "reprovado") && (campoVazio(form, "motivoReprovacaoGrhDarfINSS"))) {
				erros.push("Informe o campo Motivo da reprovação")
			}
		}
		
		if (ATIVIDADE == APROV_DARF_INSS_DRH_124) {
			var decisao = String(form.getValue("decisaoDrhDarfINSS"));

			if (!decisao) {
				erros.push("Informe o campo Decisão DRH");
			} else if ((decisao == "reprovado") && (campoVazio(form, "motivoReprovacaoDrhDarfINSS"))) {
				erros.push("Informe o campo Motivo da reprovação")
			}
		}

		if (ATIVIDADE == REALIZAR_PGTO_DARF_INSS_225) {
			var pagamento = String(form.getValue("darfInssRealizado"));
			var motivo = String(form.getValue("darfInssMotivo"));

			if (!pagamento) {
				erros.push("Informe o campo Pagamento realizado?");
			}
			
			if(((pagamento == "parcial") || (pagamento == "naoRealizado")) && !motivo){
				erros.push("Informe o campo Motivo");
			}
		}

		if (erros.length) {
			throw formatarErros(erros);
		}

	} catch (e) {
		throw e
	}
}


/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Registrar e Conferir Lançamentos"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado
 */
function validRegistrarLancamentos(form) {
	var campos = [];
	campos.push("grupoEventos");
	campos.push("lancarFerias");
	campos.push("admissoes");
	campos.push("afastamentos");
	campos.push("pagAutonomo");
	campos.push("LancamentoPensoes");
	campos.push("promocoes");
	campos.push("movFolha");
	campos.push("demissoes");
	campos.push("lancamentoLiqRescisao");
	campos.push("lancarFinalizarFerias");
	campos.push("lancamentoRessarc");
	campos.push("difSalarial");
	campos.push("pagSubstituicao");
	campos.push("pagDiferencasFunc");
	campos.push("descMedicamentos");
	campos.push("reembolsoVacina");
	//campos.push("importarSISRAT");

	// Acordo Coletivo
	campos.push("acordoColetivoAdm");
	campos.push("acordoColetivoMar");
	campos.push("alteracaoSalarialDir");

	// Abono / Prêmio
	campos.push("abonoAdm");
	campos.push("premioMar");
	campos.push("abonoDir");

	// Conferências
	campos.push("conferirEventos");
	campos.push("conferirPlanilhasCadastros");
	campos.push("conferirPlanilhasLancamentos");
	campos.push("conferirPensoes");
	campos.push("conferirEnvelopes");
	campos.push("conferenciaAjustesPS");
	campos.push("conferenciaAjustesPD");
	campos.push("conferenciaAjustesVA");
	campos.push("conferenciaAjustesVR");
	campos.push("conferenciaAjustesVT");
	campos.push("conferenciaAjustesEmprestimo");
	campos.push("conferenciaAjustesSeguro");
	campos.push("conferenciaAjustesPrevidencia");
	campos.push("confAjustEducativa");
	campos.push("confAjustSindical");
	campos.push("confAjustEstacionamento");
	campos.push("confAjustTerceirizadoRH");
	campos.push("confAjustJovemAprendiz");
	campos.push("confAjustTerceirizadoSaudeOcup");
	campos.push("confAjustConsultoriaDP");
	campos.push("confAjustIntegracoesSisrat");	
	campos.push("bloquearFolha");
	campos.push("lancarFeriasProxMes");
	campos.push("salvarHistorico");

	// Alteração FAP
	campos.push("alteracoesValores");

	// Gerar Provisões / Encargos
	campos.push("provisoesFerias");
	campos.push("gerarEncargos");
	campos.push("gerarEncargosProv");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Registrar e Conferir Lançamentos"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado && Jose Vitor Lopes
 */
 function validImportarSecoesSISRAT(form) {
	var campos = [];
	campos.push("importarSISRAT");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Arq Contábeis"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado
 */
function validArquivosContabeis(form) {
	var campos = [];
	campos.push("arquivosContabFolha");
	campos.push("arquivosContabEncargos");
	campos.push("arquivosContabProv");
	
	campos.push("arquivosContabFolhaTXT");
	campos.push("arquivosContabFolhaTXT2");
	campos.push("arquivosContabFolhaTXT3");	
	campos.push("arquivosContabEncargosTXT");
	campos.push("arquivosContabProvTXT");
	
	campos.push("gerarPlanilhasNET");
	campos.push("enviarArqContabeis");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Resumos de Folha"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado
 */
function validResumosFolha(form) {
	var campos = [];
	campos.push("resumoGeral");
	campos.push("resumoAdm");
	campos.push("resumoAdmSemAprendiz");
	campos.push("resumoAdmAprendiz");
	campos.push("resumoMar");
	campos.push("resumoAutonomos");
	campos.push("resumoDemitidos");
	campos.push("resumoDiretor");
	campos.push("resumoFolhaPag");
	campos.push("analisarResumos");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Gerar / Analisar / Enviar Rúbricas e-Social"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado
 */
function validRubricasEsocial(form) {
	var campos = [];
	campos.push("conferirEventosTabela");
	campos.push("conferirEventosNaoPer");
	campos.push("criarPerApuracao");
	campos.push("gerarXML1200");
	campos.push("gerarXML1210");
	campos.push("integrarTAF1200");
	campos.push("integrarTAF1210");
	campos.push("enviarRET1200");
	campos.push("enviarRET1210");
	campos.push("atualizarRmTaf");
	campos.push("fechEventosPeriodicos");
	campos.push("fechEventosPeriodicos1298");
	campos.push("gerarTAF");
	campos.push("conferenciaEncargos");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Disponibilizar Contracheques"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado
 */
function validDispContracheques(form) {
	var campos = [];
	campos.push("msgContracheque");
	campos.push("enviarContrachMar");
	campos.push("disponibContracheque");
	campos.push("emailCentralBrasil");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Conferência de Repasses e Benefícios"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado 
 * @edited Jose Vitor Lopes
 */
 function validConfRepassesBeneficios(form) {
	var campos = [];
	campos.push("mensSindical");
	campos.push("ajudaEducativa");
	campos.push("contSindicalAnual");
	campos.push("empConsignado");
	
	campos.push("planoSaude");
	campos.push("planoOdonto");
	campos.push("seguroVida");
	campos.push("valeAlimentacRefeic");
	campos.push("valeTransporte");
	campos.push("previdencPrivada");
	
	campos.push("consultoriaDP");
	campos.push("tercSaudeOcupacional");
	campos.push("terceirizadoJovemAprendiz");
	campos.push("terceirizadoRH");
	campos.push("terceirizadoEstacionamento");
	campos.push("terceirizadoRecrutRH");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Conferência de Repasses e Benefícios"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado
 * @edited Jose Vitor Lopes
 */
 function validVirarCompetencia(form) {
	var campos = [];
	campos.push("importSessoesSisrat");
	campos.push("solicBkpCbd");
	campos.push("liberarFlagsFGTS");
	campos.push("acertoPerAquisitivo");
	campos.push("virarCompetencias");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Gerar Relatórios de Pagamentos"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado
 */
function validFolhaPagamento(form) {
	var campos = [];
	campos.push("emitirPlanilha");
	campos.push("emitirRelFunc");
	campos.push("emitirRelPens");
	campos.push("emitirRelPens2");
	campos.push("emitirRelPratic");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Gerar, importar Conferir e Validar Arquivos Bancarios"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado
 */
function validArqBancarios(form) {
	var campos = [];
	campos.push("importacaoFolha");
	campos.push("importarCISA");
	campos.push("conferirArquivos");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Verifica se tem campos que ainda não foram marcados na atividade "FGTS Administrativo / Marítimo"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado
 */
function validFgts(form) {
	var campos = [];
	campos.push("folhaPagAdm");
	campos.push("folhaPagAdmAprendiz");
	campos.push("flagsFGTS");
	campos.push("compararFolhaAnalitica");
	campos.push("gerarSEFIP");	
	campos.push("importarAppSEFIP");
	campos.push("analisarInconsistencias");
	campos.push("salvarSFP");
	campos.push("gerarRelSEFIP");
	campos.push("analisarValoresBI");
	campos.push("conectividadeSocial");
	campos.push("salvarZIP");
	campos.push("transmitirZIP");
	campos.push("salvarXmlPdf");
	campos.push("appSEFIP");
	campos.push("imprimirSalvarGED");
	campos.push("pagamentoGRF");
	campos.push("backupSEFIP");
	campos.push("arquivarDoc");
	
	campos.push("folhaPagMar");
	campos.push("flagsFGTSMar");
	campos.push("compararFolhaAnaliticaMar");
	campos.push("gerarSEFIPMar");
	campos.push("importarAppSEFIPMar");
	campos.push("analisarInconsistenciasMar");
	campos.push("salvarSFPMar");
	campos.push("gerarRelSEFIPMar");
	campos.push("analisarValoresBIMar");
	campos.push("conectividadeSocialMar");
	campos.push("salvarZIPMar");
	campos.push("transmitirZIPMar");
	campos.push("salvarXmlPdfMar");
	campos.push("appSEFIPMar");
	campos.push("imprimirSalvarGEDMar");
	campos.push("pagamentoGRFMar");
	campos.push("backupSEFIPMar");
	campos.push("arquivarDocMar");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}


/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Emitir / Analisar DARF IRRF"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado
 */
function validIrrf(form) {
	var campos = [];
	campos.push("emitirPlanilhasIRRF");
	campos.push("conferirEsocial");
	campos.push("salvarXMLEsocial");
	campos.push("conferirValoresBI");
	campos.push("analisarPossiveisDivergencias");
	campos.push("tabelaSELIC");
	campos.push("gerarDARFRefmes");
	campos.push("aprovacaoPafDARF");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Verifica se tem campos que ainda não foram marcados na atividade "Emitir / Analisar DARF INSS"
 * @param {object} form Parâmetro obrigatório, formController 
 * @return {boolean}
 * @author Sérgio Machado
 */
function validInss(form) {
	var campos = [];
	campos.push("gerarPlanilhasINSS");
	campos.push("conferirRetencaoPetrobras");
	campos.push("conferirCredito");
	campos.push("solicitarValoresPrestServico");
	campos.push("conferirLancamentoRetencao");
	campos.push("conferirEsocialValores");
	campos.push("analisarTotalizadores");
	campos.push("lancarSISRATPetrobras");
	campos.push("lancarSISRATPrestServico");
	campos.push("analisarValoresBIINSS");
	campos.push("periodoApuracao");
	campos.push("DCTFWebEcad");
	campos.push("downloadRecibo");
	campos.push("emitirRelatoriosINSS");
	campos.push("emitirDARFINSS");
	campos.push("solicitarPagDARFINSS");
	campos.push("salvarArquivo");

	for (var i = 0; i < campos.length; i++) {
		if (campoVazio(form, campos[i])) {
			return true;
		}
	}

	return false;
}

/**
 * Valida se existe linhas da tabela onde não foi selecionado anexo
 * @param {object} form Parâmetro obrigatório, formController 
 * @param {String} tablename Parâmetro obrigatório, tablename da tabela pai e filho 
 * @param {String} inputAnexo Parâmetro obrigatório, name do campo que armazena o fileName do anexo
 * @param {String[]} erros Parâmetro obrigatório, array de string com os erros
 * @return {void}
 * @author Sérgio Machado
 */
function validarAnexosTable(form, tablename, inputAnexo, erros) {
	var indexes = form.getChildrenIndexes(tablename);
	for (var i = 0; i < indexes.length; i++) {
		if (campoVazio(form, (inputAnexo + "___" + indexes[i]))) {
			erros.push("Informe o anexo na linha " + (i+1))
		}
	}
}

/**
 * Função para validar data
 * @param {String} dateStr Parâmetro obrigatório, data no formato dd/MM/yyyy
 * @example
 * validarData("30/02/2020") - Retorna false
 * @example
 * validarData("31/10/2020") - Retorna true
 * @returns {boolean} Retorna true se a data for válida
 * @author Sérgio Machado
 */
function validarData(dateStr) {
	var s = dateStr.split('/');
	var d = new Date(+s[2], s[1] - 1, +s[0]);
	if (Object.prototype.toString.call(d) === "[object Date]") {
		if (!isNaN(d.getTime()) && d.getDate() == s[0] && d.getMonth() == (s[1] - 1)) {
			return true;
		}
	}
	return false;
}


/**
 * Formata os erros 
 * @param {String[]} erros Parâmetro obrigatório, array com os erros
 * @returns {String} - Retorna uma string contendo todos os erros dentro de uma tag li
 * @author Sérgio Machado <sergio.machado@xplanning.com.br>
 */
function formatarErros(erros) {
	var strErros = "";
	for (var i = 0; i < erros.length; i++) {
		strErros += "<li style='margin-bottom: 10px;'>" + erros[i] + "</li>";
	}
	var listErros = "<ul style='padding-left: 17px;color: red;list-style: disc;'>" + strErros + "</ul><br/>";
	return "Favor informar os campos obrigatórios:<br/><br/>" + listErros;
}


function campoVazio(form, fieldname) {
	if ((form.getValue(fieldname) == null) || (form.getValue(fieldname) == undefined) || (form.getValue(fieldname).trim() == "")) {
		return true;
	}
	return false;
} 