var GERAR_RELATORIO_PAGAMENTOS_63 = 63;
var REALIZAR_PGTO_FOLHA_195 = 195;
var FGTS_ADM_MAR_72 = 72;
var REALIZAR_PGTO_FGTS_210 = 210;
var EMITIR_IRRF_83 = 83;
var EMITIR_INSS_88 = 88;
var REALIZAR_PGTO_IRRF_217 = 217;
var REALIZAR_PGTO_DARF_INSS_225 = 225;
var GERAR_ARQUIVOS_CONTABEIS_43 = 43;

var APROV_RELATORIOS_PGTO_GRH_17 = 17;

$(document).ready(function() {
	//$("#attachmentsTab").hide();
	window.parent.$("#processTabs").find("li").last().hide();
	window.parent.$("#attachmentsTab").hide();	

	if(getMode() == "VIEW"){
		$(".customBtnSend").remove();
		$('.btnAddNewRow').remove();
		$('.tdDeleteRow').remove();
	}
	
	// Seta as tabs de acordo com as atividades
	checkedTabs("tabsDadosSolicitacao");
	checkedTabs("relatPgtoTabs");
	checkedTabs("fgtsTabs");
	checkedTabs("inssTabs");
	checkedTabs("darfInssTabs");
	checkedTabs("arqContabTabs");
	
	displayBtnFiles();
	tableLineCount();
	
	if (getAtividade() == 0 || getAtividade() == 4 || getAtividade() == 5){
		ocultDivPanels();
	}
	
	if(getAtividade() != GERAR_ARQUIVOS_CONTABEIS_43){
		invisibleBtnUploadTable("tblArqContabAnexos")
		$("#btnAddNewRowArqContab").remove();
		$("#tblArqContabAnexos .tdDeleteRow").remove();
	}
	
	if(getAtividade() != GERAR_RELATORIO_PAGAMENTOS_63){
		invisibleBtnUploadTable("tblReltPgtoAnexos")
		$("#btnAddNewRowRelPgto").remove();
		$("#tblReltPgtoAnexos .tdDeleteRow").remove();
	}
	
	if(getAtividade() != FGTS_ADM_MAR_72){
		invisibleBtnUploadTable("tblFgtsAnexos")
		$("#btnAddNewRowFgts").remove();
		$("#tblFgtsAnexos .tdDeleteRow").remove();
	}
	
	if(getAtividade() != EMITIR_IRRF_83){
		invisibleBtnUploadTable("tblInssAnexos")
		$("#btnAddNewRowInss").remove();
		$("#tblInssAnexos .tdDeleteRow").remove();
	}
	
	if(getAtividade() != EMITIR_INSS_88){
		invisibleBtnUploadTable("tblDarfInssAnexos")
		$("#btnAddNewRowDarfInss").remove();
		$("#tblDarfInssAnexos .tdDeleteRow").remove();
	}
	
	if(getAtividade() != APROV_RELATORIOS_PGTO_GRH_17){
		$("#panel_ArquivosContabeis").show();
		$("#panel_AprovarRelatorios").show();
		//$("#panel_AprovarFGTS").hide();
		//$("#panel_AprovarINSS").hide();
		//$("#panel_AprovarDarfINSS").hide();
	}
	
	// Esconde anexos para o Financeiro
	if((getAtividade() == REALIZAR_PGTO_FOLHA_195) || (getAtividade() == REALIZAR_PGTO_FGTS_210) ||
	(getAtividade() == REALIZAR_PGTO_IRRF_217) || (getAtividade() == REALIZAR_PGTO_DARF_INSS_225)){
		invisibleRowTableFin("tblReltPgtoAnexos");
		invisibleRowTableFin("tblFgtsAnexos");
		invisibleRowTableFin("tblInssAnexos");
		invisibleRowTableFin("tblArqContabAnexos");
	}	
		
	$("input[name='decisaoArqContab']").on('change', function() {
		const motivoReprovacao = $('#motivoReprovacaoArqContab');
		if ($(this).val() === 'reprovado') {
			motivoReprovacao.prop("readonly", false)
		} else {
			motivoReprovacao.prop('readonly', true).val('');
		}
	});
	
	$("input[name='decisaoGRH']").on('change', function() {
		const motivoReprovacao = $('#motivoReprovacaoGRH');
		if ($(this).val() === 'reprovado') {
			motivoReprovacao.prop("readonly", false)
		} else {
			motivoReprovacao.prop('readonly', true).val('');
		}
	});
	
	$("input[name='decisaoDRH']").on('change', function() {
		const motivoReprovacao = $('#motivoReprovacaoDRH');
		if ($(this).val() === 'reprovado') {
			motivoReprovacao.prop("readonly", false)
		} else {
			motivoReprovacao.prop('readonly', true).val('');
		}
	});
	
	$("input[name='relatPgtoRealizado']").on('change', function() {
		const motivo = $('#relatPgtoMotivo');
		if (($(this).val() === 'parcial') || ($(this).val() === 'naoRealizado')) {
			motivo.prop("readonly", false)
		} else {
			motivo.prop('readonly', true).val('');
		}
	});
	
	$("input[name='decisaoGrhFGTS']").on('change', function() {
		const motivoReprovacao = $('#motivoReprovacaoGrhFGTS');
		if ($(this).val() === 'reprovado') {
			motivoReprovacao.prop("readonly", false)
		} else {
			motivoReprovacao.prop('readonly', true).val('');
		}
	});
	
	$("input[name='decisaoDrhFGTS']").on('change', function() {
		const motivoReprovacao = $('#motivoReprovacaoDrhFGTS');
		if ($(this).val() === 'reprovado') {
			motivoReprovacao.prop("readonly", false)
		} else {
			motivoReprovacao.prop('readonly', true).val('');
		}
	});
	
	$("input[name='fgtsRealizado']").on('change', function() {
		const motivo = $('#fgtsMotivo');
		if (($(this).val() === 'parcial') || ($(this).val() === 'naoRealizado')) {
			motivo.prop("readonly", false)
		} else {
			motivo.prop('readonly', true).val('');
		}
	});
	
	$("input[name='decisaoGrhINSS']").on('change', function() {
		const motivoReprovacao = $('#motivoReprovacaoGrhINSS');
		if ($(this).val() === 'reprovado') {
			motivoReprovacao.prop("readonly", false)
		} else {
			motivoReprovacao.prop('readonly', true).val('');
		}
	});
	
	$("input[name='decisaoDrhINSS']").on('change', function() {
		const motivoReprovacao = $('#motivoReprovacaoDrhINSS');
		if ($(this).val() === 'reprovado') {
			motivoReprovacao.prop("readonly", false)
		} else {
			motivoReprovacao.prop('readonly', true).val('');
		}
	});
	
	$("input[name='inssRealizado']").on('change', function() {
		const motivo = $('#inssMotivo');
		if (($(this).val() === 'parcial') || ($(this).val() === 'naoRealizado')) {
			motivo.prop("readonly", false)
		} else {
			motivo.prop('readonly', true).val('');
		}
	});

	$("input[name='decisaoGrhDarfINSS']").on('change', function() {
		const motivoReprovacao = $('#motivoReprovacaoGrhDarfINSS');
		if ($(this).val() === 'reprovado') {
			motivoReprovacao.prop("readonly", false)
		} else {
			motivoReprovacao.prop('readonly', true).val('');
		}
	});
	
	$("input[name='decisaoDrhDarfINSS']").on('change', function() {
		const motivoReprovacao = $('#motivoReprovacaoDrhDarfINSS');
		if ($(this).val() === 'reprovado') {
			motivoReprovacao.prop("readonly", false)
		} else {
			motivoReprovacao.prop('readonly', true).val('');
		}
	});

	$("input[name='darfInssRealizado']").on('change', function() {
		const motivo = $('#darfInssMotivo');
		if (($(this).val() === 'parcial') || ($(this).val() === 'naoRealizado')) {
			motivo.prop("readonly", false)
		} else {
			motivo.prop('readonly', true).val('');
		}
	});
	
	//Fields Checkboxs
	//Fields Guide Registrar Lanç
	$("input[name='checkboxLancamentos']").on('change', function() {
		var fields = [];
		
		fields.push("grupoEventos");
		fields.push("lancarFerias");
		fields.push("admissoes");
		fields.push("afastamentos");
		fields.push("pagAutonomo");
		fields.push("LancamentoPensoes");
		fields.push("promocoes");
		fields.push("movFolha");
		fields.push("demissoes");
		fields.push("lancamentoLiqRescisao");
		fields.push("lancarFinalizarFerias");
		fields.push("lancamentoRessarc");
		fields.push("difSalarial");
		fields.push("pagSubstituicao");
		fields.push("pagDiferencasFunc");
		fields.push("descMedicamentos");
		fields.push("reembolsoVacina");
		//fields.push("importarSISRAT");			
		
		for (var i =0; i < fields.length; i++){			
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxLancamentos").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	$("input[name='checkboxAcordoColetivo']").on('change', function() {
		var fields = [];	
		
		fields.push("acordoColetivoAdm");
		fields.push("acordoColetivoMar");
		fields.push("alteracaoSalarialDir");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);			
			if ($("#checkboxAcordoColetivo").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	$("input[name='checkboxAbonoPremio']").on('change', function() {
		var fields = [];	
		
		fields.push("abonoAdm");
		fields.push("premioMar");
		fields.push("abonoDir");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxAbonoPremio").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	$("input[name='checkboxConferencias']").on('change', function() {
		var fields = [];		

		fields.push("conferirEventos");
		fields.push("conferirPlanilhasCadastros");
		fields.push("conferirPlanilhasLancamentos");
		fields.push("conferirPensoes");
		fields.push("conferirEnvelopes");
		fields.push("conferenciaAjustesPS");
		fields.push("conferenciaAjustesPD");
		fields.push("conferenciaAjustesVA");
		fields.push("conferenciaAjustesVR");
		fields.push("conferenciaAjustesVT");
		fields.push("conferenciaAjustesEmprestimo");
		fields.push("conferenciaAjustesSeguro");
		fields.push("conferenciaAjustesPrevidencia");
		fields.push("confAjustEducativa");
		fields.push("confAjustSindical");
		fields.push("confAjustEstacionamento");
		fields.push("confAjustTerceirizadoRH");
		fields.push("confAjustJovemAprendiz");
		fields.push("confAjustTerceirizadoSaudeOcup");
		fields.push("confAjustConsultoriaDP");
		fields.push("confAjustIntegracoesSisrat");
		fields.push("bloquearFolha");
		fields.push("lancarFeriasProxMes");
		fields.push("salvarHistorico");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxConferencias").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	$("input[name='checkboxAlteracaoFAP']").on('change', function() {
		var fields = [];	
		
		fields.push("alteracoesValores");			
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxAlteracaoFAP").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	$("input[name='checkboxGerarProvisoes']").on('change', function() {
		var fields = [];	
		
		fields.push("provisoesFerias");			
		fields.push("gerarEncargos");			
		fields.push("gerarEncargosProv");			
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxGerarProvisoes").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields Guide Arq Contábeis
	$("input[name='checkboxArqContabeis']").on('change', function() {
		var fields = [];	
		
		fields.push("arquivosContabFolha");
		fields.push("arquivosContabEncargos");
		fields.push("arquivosContabProv");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxArqContabeis").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	$("input[name='checkboxArqContabeisTXT']").on('change', function() {
		var fields = [];	
		
		fields.push("arquivosContabFolhaTXT");
		fields.push("arquivosContabFolhaTXT2");
		fields.push("arquivosContabFolhaTXT3");		
		fields.push("arquivosContabEncargosTXT");		
		fields.push("arquivosContabProvTXT");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxArqContabeisTXT").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	$("input[name='checkboxProvisoesContab']").on('change', function() {
		var fields = [];	
		
		fields.push("gerarPlanilhasNET");
		fields.push("enviarArqContabeis");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxProvisoesContab").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields Resumo de Folha
	$("input[name='checkboxGerarResumosFolha']").on('change', function() {
		var fields = [];	
		
		fields.push("resumoGeral");
		fields.push("resumoAdm");
		fields.push("resumoAdmSemAprendiz");
		fields.push("resumoAdmAprendiz");
		fields.push("resumoMar");
		fields.push("resumoAutonomos");
		fields.push("resumoDemitidos");
		fields.push("resumoDiretor");
		fields.push("resumoFolhaPag");
		fields.push("analisarResumos");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxGerarResumosFolha").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields ESocial
	$("input[name='checkboxEsocial']").on('change', function() {
		var fields = [];	
		
		fields.push("conferirEventosTabela");
		fields.push("conferirEventosNaoPer");
		fields.push("criarPerApuracao");
		fields.push("gerarXML1200");
		fields.push("gerarXML1210");
		fields.push("integrarTAF1200");
		fields.push("integrarTAF1210");
		fields.push("enviarRET1200");
		fields.push("enviarRET1210");
		fields.push("atualizarRmTaf");
		fields.push("fechEventosPeriodicos");
		fields.push("fechEventosPeriodicos1298");
		fields.push("gerarTAF");
		fields.push("conferenciaEncargos");	
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxEsocial").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields Contracheques
	$("input[name='checkboxContracheque']").on('change', function() {
		var fields = [];	
		
		fields.push("msgContracheque");
		fields.push("enviarContrachMar");
		fields.push("disponibContracheque");
		fields.push("emailCentralBrasil");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxContracheque").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields Folha de Pagamento
	$("input[name='checkboxFolhaPgto']").on('change', function() {
		var fields = [];	
		
		fields.push("emitirPlanilha");
		fields.push("emitirRelFunc");
		fields.push("emitirRelPens");
		fields.push("emitirRelPens2");		
		fields.push("emitirRelPratic");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxFolhaPgto").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields Arquivos Bancários
	$("input[name='checkboxArqBancarios']").on('change', function() {
		var fields = [];	
		
		fields.push("importacaoFolha");
		fields.push("importarCISA");
		fields.push("conferirArquivos");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxArqBancarios").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields FGTS Administrativo
	$("input[name='checkboxFgtsAdm']").on('change', function() {
		var fields = [];	
		
		fields.push("folhaPagAdm");
		fields.push("folhaPagAdmAprendiz");
		fields.push("flagsFGTS");
		fields.push("compararFolhaAnalitica");
		fields.push("gerarSEFIP");
		fields.push("importarAppSEFIP");
		fields.push("analisarInconsistencias");
		fields.push("salvarSFP");
		fields.push("gerarRelSEFIP");
		fields.push("analisarValoresBI");
		fields.push("conectividadeSocial");
		fields.push("salvarZIP");
		fields.push("transmitirZIP");
		fields.push("salvarXmlPdf");
		fields.push("appSEFIP");
		fields.push("imprimirSalvarGED");
		fields.push("pagamentoGRF");
		fields.push("backupSEFIP");
		fields.push("arquivarDoc");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxFgtsAdm").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields FGTS Maritimo
	$("input[name='checkboxFgtsMar']").on('change', function() {
		var fields = [];	
		
		fields.push("folhaPagMar");
		fields.push("flagsFGTSMar");
		fields.push("compararFolhaAnaliticaMar");
		fields.push("gerarSEFIPMar");
		fields.push("importarAppSEFIPMar");
		fields.push("analisarInconsistenciasMar");
		fields.push("salvarSFPMar");
		fields.push("gerarRelSEFIPMar");
		fields.push("analisarValoresBIMar");
		fields.push("conectividadeSocialMar");
		fields.push("salvarZIPMar");
		fields.push("transmitirZIPMar");
		fields.push("salvarXmlPdfMar");
		fields.push("appSEFIPMar");
		fields.push("imprimirSalvarGEDMar");
		fields.push("pagamentoGRFMar");
		fields.push("backupSEFIPMar");
		fields.push("arquivarDocMar");
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxFgtsMar").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields IRFF
	$("input[name='checkboxIrrf']").on('change', function() {
		var fields = [];	
		
		fields.push("emitirPlanilhasIRRF");
		fields.push("conferirEsocial");
		fields.push("salvarXMLEsocial");
		fields.push("conferirValoresBI");
		fields.push("analisarPossiveisDivergencias");
		fields.push("tabelaSELIC");
		fields.push("gerarDARFRefmes");
		fields.push("aprovacaoPafDARF");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxIrrf").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});

	//Fields INSS
	$("input[name='checkboxInss']").on('change', function() {
		var fields = [];	
		
		fields.push("gerarPlanilhasINSS");
		fields.push("conferirRetencaoPetrobras");
		fields.push("conferirCredito");
		fields.push("solicitarValoresPrestServico");
		fields.push("conferirLancamentoRetencao");
		fields.push("conferirEsocialValores");
		fields.push("analisarTotalizadores");
		fields.push("lancarSISRATPetrobras");
		fields.push("lancarSISRATPrestServico");
		fields.push("analisarValoresBIINSS");		
		fields.push("periodoApuracao");
		fields.push("DCTFWebEcad");
		fields.push("downloadRecibo");
		fields.push("emitirRelatoriosINSS");
		fields.push("emitirDARFINSS");
		fields.push("solicitarPagDARFINSS");
		fields.push("salvarArquivo");
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxInss").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields Repasse da Folha - Sindicatos
	$("input[name='checkboxRepassesSindicatos']").on('change', function() {
		var fields = [];	
		
		fields.push("mensSindical");
		fields.push("ajudaEducativa");
		fields.push("contSindicalAnual");
		fields.push("empConsignado");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxRepassesSindicatos").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields Repasse da Folha - Beneficios
	$("input[name='checkboxRepassesBeneficios']").on('change', function() {
		var fields = [];	
		
		fields.push("planoSaude");
		fields.push("planoOdonto");
		fields.push("seguroVida");
		fields.push("valeAlimentacRefeic");		
		fields.push("valeTransporte");		
		fields.push("previdencPrivada");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxRepassesBeneficios").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields Serviços Terceirizados/Consultores
	$("input[name='checkboxServTercConsult']").on('change', function() {
		var fields = [];	
		
		fields.push("consultoriaDP");
		fields.push("tercSaudeOcupacional");
		fields.push("terceirizadoJovemAprendiz");
		fields.push("terceirizadoRH");		
		fields.push("terceirizadoEstacionamento");		
		fields.push("terceirizadoRecrutRH");		
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxServTercConsult").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
	//Fields Comp de Folha
	$("input[name='checkboxCompFolha']").on('change', function() {
		var fields = [];	
		
		fields.push("importSessoesSisrat");
		fields.push("solicBkpCbd");
		fields.push("liberarFlagsFGTS");
		fields.push("acertoPerAquisitivo");		
		fields.push("virarCompetencias");			
		
		for (var i =0; i < fields.length; i++){
			var checkbox = document.getElementById(fields[i]);
			if ($("#checkboxCompFolha").prop("checked")==true){				
				checkbox.checked = true;	
			} else {
				checkbox.checked = false;
			}
		}
	});
	
}); 

window.onload = function(){
 	
}



function setSelectedZoomItem(selectedItem) {	
	if ( selectedItem.inputId == "zoomColigada" ) {
		$("#codColigada").val(selectedItem["CODIGO"]);
	}
}


function removedZoomItem(removedItem) {		
	if (removedItem.inputId == "zoomColigada") {
		$("#codColigada").val("");
	}
}

function ocultDivPanels(){
	$("#panel_ArquivosContabeis").hide();
	$("#panel_AprovarRelatorios").hide();
	$("#panel_AprovarFGTS").hide();
	$("#panel_AprovarINSS").hide();
	$("#panel_AprovarDarfINSS").hide();	
}

/**
 * Seta as tabs de acordo com a atividade
 * @param {String} idListNav Parâmetro obrigatório, id da tag ul
 * @return {void}
 * @author Sérgio Machado
 */
function checkedTabs(idListNav) {
    if (getMode() != "ADD") {
		$(`#${idListNav} li`).each(function() {
			let atividadesId = String($(this).data('atividade'));
			let linkId = $(this).find('a').attr('href');
			if(atividadesId != "undefined" ){
				if (valueInArray(atividadesId.split(','), getAtividade())) {
					$(`a[href="${linkId}"]`).tab('show');
				}
			}
		});
	}
}


/**
 * Procura um determinado valor dentro de um array
 * @param {string[]} arr Parâmetro obrigatório, array de strings
 * @param {string} value Parâmetro obrigatório, value que seja procurrar no array
 * @return {boolean} Se o valor existir no array, retorna verdadeiro, caso contrário, retorna falso
 * @author Sérgio Machado
 */
function valueInArray(arr, value) {
    for (let i = 0; i < arr.length; i++) {
         if (arr[i].trim() === value) {
            return true
        }
    }
    return false;
}


/**
 * Adiciona uma nova linha na tabela pai e filho de dependentes
 * @param {String} tablename Parâmetro obrigatório, tablename da tabela pai e filho.
 * @param {String} idDescAnexo Parâmetro obrigatório, Id do campo que armazena a descrição do anexo
 * @return {void} 
 * @author Sérgio Machado
 */
function addNewRowTable(tablename, idDescAnexo) {
	try {
		const idByTimestamp = (new Date().getTime()).toString(32);
		const indice = wdkAddChild(tablename);
		$(`#${idDescAnexo}___${indice}`).val(`anexo_${idByTimestamp}`);
		tableLineCount(tablename)
	} catch (err) {
		console.error("function " + arguments.callee.name + " => " + err)
	}
}


/**
 * Delete uma linha da tabela pai e filho e remove o anexo caso exista
 * @return {void} 
 * @author Sérgio Machado
 */
function destroyRowTable(event) {
	try {
		const tabela = $(event).closest('table')[0];
		const tablename = tabela.getAttribute("tablename");
		const inputFileName = $(event).closest('tr').find(".inputAnexo").val() || "Não selecionado";
		const inputFileDesc = $(event).closest('tr').find(".descAnexo").val();
		FLUIGC.message.confirm({
			message: `Deseja remover o anexo <b>${inputFileName}</b>?`,
			title: 'Confirmação',
			labelYes: 'Sim, quero remover',
			labelNo: 'Não, quero cancelar',
		}, function(result) {
			if (result) {
				fnWdkRemoveChild(event)
				if(inputFileName && inputFileDesc){
					removeFile(inputFileDesc)
				}
				tableLineCount(tablename)
			}
		});
	} catch (err) {
		console.error("function " + arguments.callee.name + " => " + err)
	}
}


/**
 * Desabilita o botão de upload dos anexos de uma tabela pai e filho
 * @param {String} tablename Parâmetro obrigatório, tablename da tabela pai e filho.
 * @return {String} - Retorna string de erros caso apresente erros
 * @author Sérgio Machado
 */
function invisibleBtnUploadTable(tablename){
	try {
		const countRows = $(`[tablename='${tablename}']`).find('tbody tr').not(':first');
		for(let i = 0; i < countRows.length; i++){
			let idInput = countRows.eq(i).find(".descAnexo")[0].id;
			invisibleBtnUpload(idInput);
		}
		
	} catch (err) {
		console.error("function " + arguments.callee.name + " => " + err)
	}
}

/**
 * Oculta a linha da tabela onde o campo "Visível para o financeiro?" não estiver marcado
 * @param {String} tablename Parâmetro obrigatório, tablename da tabela pai e filho.
 * @return {String} - Retorna string de erros caso apresente erros
 * @author Sérgio Machado
 */
function invisibleRowTableFin(tablename){
	try {
		const countRows = $(`[tablename='${tablename}']`).find('tbody tr').not(':first');
		let count = 0;
		for(let i = 0; i < countRows.length; i++){
			let checked = countRows.eq(i).find(".visivelFin").is(':checked');
			if(checked){
				count += 1
				countRows.eq(i).find('td.count').html(`<span>${count}</span>`);
			} else{
				countRows.eq(i).hide();
			}
		}
		
	} catch (err) {
		console.error("function " + arguments.callee.name + " => " + err)
	}
}


/**
 * Insere a numeração correspondente a cada linha da tabela pai e filho de forma automática.
 * @param {String} tablename Parâmetro obrigatório, tablename da tabela pai e filho.
 * Quando informado um valor válido para tablename, o script irá percorre apenas as linhas da própia tabela.
 * Se informar o valor false para o parâmetro tablename, o script irá percorrer todas as tabelas. Recomendado apenas para o carregamento do formulário.
 * @return {void} 
 * @author Sérgio Machado
 */
function tableLineCount(tablename) {
	try {
		let atributo = "[tablename]";
		if(tablename){
			atributo = `[tablename='${tablename}']`
		} 
		$.each($(atributo), function(index) {
			const tabelaRow = $(this).find('tbody tr').not(':first');
			tabelaRow.each(function(i) {
				tabelaRow.eq(i).find('td.count').html(`<span>${i + 1}</span>`);
			});
		});
	} catch (err) {
		console.error("function " + arguments.callee.name + " => " + err)
	}
}

/**
 * Retorna o índice da linha da tabela pai e filho com base em uma string que pode ser o name ou id de um campo qualquer 
 * @param {String} id Parâmetro obrigatório, id ou name de um campo qualquer da tabela pai e filho
 * @return {String}
 * @author Sérgio Machado
 */
function getIndice(id) {
	return id.split('___').pop();
}


function exibirMensagem(titulo, mensagem, tipo){
	// tipos:
	//  - danger
	//  - warning
	//  - success
	//  - info
	if ((tipo == null) || (tipo == undefined) || tipo == ""){
		tipo = "info";
	} 
	FLUIGC.toast({
		title: titulo,
		message: mensagem,
		type: tipo
	}); 
} 


function alerta(mensagem){
	FLUIGC.message.alert({
	    message: mensagem,
	    title: 'Atenção!',
	    label: 'OK, Entendi'
	}, function(el, ev) {		
	});
}
