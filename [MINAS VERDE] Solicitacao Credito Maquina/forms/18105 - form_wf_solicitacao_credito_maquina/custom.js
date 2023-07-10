var INICIO_4 = 4;
var APROVACAO_DIRETORIA_21 = 21;
var REVISAR_FORMA_PAGAMENTO_30 = 30;
var APROVACAO_GERENTE_REGIONAL_38 = 38;
var REALIZAR_ANALISE_CREDITO_23 = 23;

var NOTIFICAR_CLIENTE_41 = 41;
var ANEXAR_COMPROVANTE_PAGAMENTO_46 = 46;

var LIBERACAO_CREDITO_57 = 57;

var CORRIGIR_JUSTIFICAR_PENDENCIA_61 = 61;
var CONFIRMAR_PAGAMENTO_59 = 59;

var TRATAR_ERRO_78 = 78;

$(document).ready(function() {
	//$("#attachmentsTab").hide();
	//window.parent.$("#processTabs").find("li").last().hide(); //Fluig 1.7
	window.parent.$("#tab-attachments").hide();	//Fluig 1.8
	
	//initAnexos();
	
	if(getMode() == "VIEW"){
		/*
		$(".customBtnSend").remove();
		$('.btnAddNewRow').remove();
		$('.tdDeleteRow').remove();*/
	}
	
	if (getAtividade() == 0 || getAtividade() == INICIO_4 ){
		$("#posicNumSolicit").hide();
		ocultDivPanels(getAtividade());
		binding();
		$("#btnAddPagamento").hide();
	}
	
	if (getAtividade() == APROVACAO_DIRETORIA_21){		
		ocultDivPanels(getAtividade());
		bindingFieldsConditions();
		hideFieldsTable(false);
	}
	
	if (getAtividade() == APROVACAO_GERENTE_REGIONAL_38){		
		ocultDivPanels(getAtividade());
		bindingFieldsConditions();
		hideFieldsTable(false);
	}
	
	if (getAtividade() == REALIZAR_ANALISE_CREDITO_23){			
		ocultDivPanels(getAtividade());
		bindingFieldsConditions();
		hideFieldsTable(false);
	}	
	
	if (getAtividade() == REVISAR_FORMA_PAGAMENTO_30){			
		ocultDivPanels(getAtividade());
		binding();
		bindingFieldsConditions();
		$("#btnAddPagamento").hide();
		$("#btnAddPagamentoComp").show();		
	}
	
	if (getAtividade() == CORRIGIR_JUSTIFICAR_PENDENCIA_61){			
		ocultDivPanels(getAtividade());
		bindingFieldsConditions();
		hideFieldsTable(false);
	}
	
	if (getAtividade() == LIBERACAO_CREDITO_57){			
		ocultDivPanels(getAtividade());
		bindingFieldsConditions();
		hideFieldsTable(false);
	}
	
	if (getAtividade() == CONFIRMAR_PAGAMENTO_59){			
		ocultDivPanels(getAtividade());
		bindingFieldsConditions();			
		$("#btnAddPagamentoPend").hide();
		hideFieldsTable(false);
	}
	
	if (getAtividade() == NOTIFICAR_CLIENTE_41){			
		ocultDivPanels(getAtividade());
		bindingFieldsConditions();
		$("#btnAddPagamentoPend").hide();
		hideFieldsTable(false);
	}
	
	if (getAtividade() == ANEXAR_COMPROVANTE_PAGAMENTO_46){			
		ocultDivPanels(getAtividade());
		bindingFieldsConditions();
		hideFieldsTable(true);
	}
	
	if (getAtividade() == TRATAR_ERRO_78){			
		ocultDivPanels(getAtividade());
		bindingFieldsConditions();
		$("#btnAddPagamentoPend").hide();
		hideFieldsTable(false);
	}
	
}); 

window.onload = function(){
 	
}

function ocultDivPanels(atividade){
	if (atividade == 0 || atividade == INICIO_4) {
		$("#panel_AprovGerRegional").hide();
		$("#panel_AprovDiretor").hide();
		$("#panel_AnalDocCadast").hide();
		$("#panel_AprovFinanceiro").hide();
		$("#panel_LiberacaoCred").hide();
		$("#panel_PendFinanceira").hide();	
	}
	if (atividade == APROVACAO_DIRETORIA_21){
		$("#panel_AprovGerRegional").hide();		
		$("#panel_AnalDocCadast").hide();
		$("#panel_AprovFinanceiro").hide();
		$("#panel_LiberacaoCred").hide();
		$("#panel_PendFinanceira").hide();	
	}
	if (atividade == APROVACAO_GERENTE_REGIONAL_38){		
		$("#panel_AprovDiretor").hide();
		$("#panel_AnalDocCadast").hide();
		$("#panel_AprovFinanceiro").hide();
		$("#panel_LiberacaoCred").hide();
		$("#panel_PendFinanceira").hide();	
	}
	if (atividade == REALIZAR_ANALISE_CREDITO_23){		
		if($('#nomeGerRegional').val() != "" && $('#nomeGerRegional').val() != null){
			$("#panel_AprovGerRegional").show();
		} else {
			$("#panel_AprovGerRegional").hide();
		}		
		if($('#nomeDiretor').val() != "" && $('#nomeDiretor').val() != null){
			$("#panel_AprovDiretor").show();
		} else {
			$("#panel_AprovDiretor").hide();
		}		
		$("#panel_AprovFinanceiro").hide();
		$("#panel_LiberacaoCred").hide();
		$("#panel_PendFinanceira").hide();	
	}
	if (atividade == REVISAR_FORMA_PAGAMENTO_30){		
		if($('#nomeGerRegional').val() != "" && $('#nomeGerRegional').val() != null){
			$("#panel_AprovGerRegional").show();
		} else {
			$("#panel_AprovGerRegional").hide();
		}		
		if($('#nomeDiretor').val() != "" && $('#nomeDiretor').val() != null){
			$("#panel_AprovDiretor").show();
		} else {
			$("#panel_AprovDiretor").hide();
		}		
		$("#panel_AnalDocCadast").hide();
		$("#panel_AprovFinanceiro").hide();
		$("#panel_LiberacaoCred").hide();
		$("#panel_PendFinanceira").hide();
	}
	
	if (atividade == CORRIGIR_JUSTIFICAR_PENDENCIA_61){	
		//Quanto a essa atividade permitir editar os anexos: comprov residencia, documento pessoa, imposto de renda, matricula e nota fiscal
		if($('#nomeGerRegional').val() != "" && $('#nomeGerRegional').val() != null){
			$("#panel_AprovGerRegional").show();
		} else {
			$("#panel_AprovGerRegional").hide();
		}		
		if($('#nomeDiretor').val() != "" && $('#nomeDiretor').val() != null){
			$("#panel_AprovDiretor").show();
		} else {
			$("#panel_AprovDiretor").hide();
		}		
		$("#panel_AprovFinanceiro").hide();
		$("#panel_LiberacaoCred").hide();
		$("#panel_PendFinanceira").hide();	
	}
	
	if (atividade == LIBERACAO_CREDITO_57){		
		if($('#nomeGerRegional').val() != "" && $('#nomeGerRegional').val() != null){
			$("#panel_AprovGerRegional").show();
		} else {
			$("#panel_AprovGerRegional").hide();
		}		
		if($('#nomeDiretor').val() != "" && $('#nomeDiretor').val() != null){
			$("#panel_AprovDiretor").show();
		} else {
			$("#panel_AprovDiretor").hide();
		}			
		$("#panel_AprovFinanceiro").hide();		
		$("#panel_PendFinanceira").hide();	
	}
	
	if (atividade == CONFIRMAR_PAGAMENTO_59){		
		if($('#nomeGerRegional').val() != "" && $('#nomeGerRegional').val() != null){
			$("#panel_AprovGerRegional").show();
		} else {
			$("#panel_AprovGerRegional").hide();
		}		
		if($('#nomeDiretor').val() != "" && $('#nomeDiretor').val() != null){
			$("#panel_AprovDiretor").show();
		} else {
			$("#panel_AprovDiretor").hide();
		}				
		if($('#nomeAdministLoja').val() != "" && $('#nomeAdministLoja').val() != null){
			$("#panel_PendFinanceira").show();
		} else {
			$("#panel_PendFinanceira").hide();
		}	
	}
	
	if (atividade == NOTIFICAR_CLIENTE_41){		
		if($('#nomeGerRegional').val() != "" && $('#nomeGerRegional').val() != null){
			$("#panel_AprovGerRegional").show();
		} else {
			$("#panel_AprovGerRegional").hide();
		}		
		if($('#nomeDiretor').val() != "" && $('#nomeDiretor').val() != null){
			$("#panel_AprovDiretor").show();
		} else {
			$("#panel_AprovDiretor").hide();
		}	
	}
	
	if (atividade == ANEXAR_COMPROVANTE_PAGAMENTO_46){		
		if($('#nomeGerRegional').val() != "" && $('#nomeGerRegional').val() != null){
			$("#panel_AprovGerRegional").show();
		} else {
			$("#panel_AprovGerRegional").hide();
		}		
		if($('#nomeDiretor').val() != "" && $('#nomeDiretor').val() != null){
			$("#panel_AprovDiretor").show();
		} else {
			$("#panel_AprovDiretor").hide();
		}		
	}
}

function hideFieldsTable(cond) {
	$('#tabelaPagamentos tbody tr').not(':first').each(function(index, tr) {
		 var id = $("input.zoomCondPagamento", tr).attr('id');
		 var indice = id.split("___")[1];
		 
		 $("#btnDelPagamento___"+indice).parent().hide()
		 
    });
	$('#tabelaCompPagamentos tbody tr').not(':first').each(function(index, tr) {
		var id = $("input.fnAnexoCompPagamento", tr).attr('id');
		var indice = id.split("___")[1];
		
		$("#btnDelPagamentoComp___"+indice).parent().hide()
		
	});
	if (cond == false) {
		$('#tabelaCompPagsPend tbody tr').not(':first').each(function(index, tr) {
			var id = $("input.fnAnexoCompPagPend", tr).attr('id');
			var indice = id.split("___")[1];
			
			$("#btnDelPagamentoPend___"+indice).parent().hide()
			
		});
	}
}

function binding() {
	
	$('#valorFinanciado').on('change', function() {		
		if (parseFloat($("#valorFinanciado").val()) < 0) {			
			alerta("Valor financiado negativo!");			
		} else if($("#valorFinanciado").val() == "" || $("#valorFinanciado").val() == null){
			alerta("Erro no campo Valor Financiado!");
		} else {			
			if($("#valorTotal").val() == ""){
				alerta("Campo Valor Total vazio!");
			} else {			
				var valorTotal = parseFloat($("#valorTotal").val().split(",")[0].split(".").join(''));
				var valorFinanciado = parseFloat($("#valorFinanciado").val().split(",")[0].split(".").join(''));				
				var valorRecursoProprio = numberToReal(valorTotal - valorFinanciado);				
				$("#valorRecursoProprio").val(valorRecursoProprio);
				
				if ((valorTotal - valorFinanciado) < 0 ){
					alerta("Campo Valor Recurso Próprio está negativo!");
				}
				
				if (valorFinanciado >= 0){					
					$("#btnAddPagamento").show();
				} else {
					$("#btnAddPagamento").hide();
				}
			}
		}
	});
	
	/*
	$('input[type="text"]').change(function(){
	    this.value = $.trim(this.value);
    });	
	*/
	
	$('input[type=radio][name="excecaoPolitica"]').on('click', function() {
		if (this.value == "excecaoPolitica") {
			//$("#dscAprovador").attr('readonly', true);
			//$("#dscAprovador").val("");
			$("#posicExcPolitica").show();
		} else {
			//$("#dscAprovador").attr('readonly', false);
			$("#posicExcPolitica").hide();
		}
	});
}

function bindingFieldsConditions() {
	if($('#pagamentoExcPolitica').val() != "" && $('#pagamentoExcPolitica').val() != null){
		$("#posicExcPolitica").show();
	}
	if($('#zoomGerenteRegional').val() != "" && $('#zoomGerenteRegional').val() != null){
		$("#posicGerRegional").show();
	}	
	$("#btnAddPagamento").hide();
	$("#btnAddPagamentoComp").hide();
	
}


function numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}

function setSelectedZoomItem(selectedItem) {
	
	if ( selectedItem.inputId == "zoomEmpresa" ) {
		$("#codEmpresa").val(selectedItem["CODIGO"]);
	}
	
	if ( selectedItem.inputId == "zoomFilial" ) {
		$("#codFilial").val(selectedItem["CODIGO"]);
	}
	
	if ( selectedItem.inputId == "zoomCliente" ) {
		$("#codCliente").val(selectedItem["CODIGO"]);
		$("#codigoLoja").val(selectedItem["CODLOJA"]);
		$("#numeroCPFCNPJ").val(selectedItem["CPF_CNPJ"]);
		$("#nomeCliente").val(selectedItem["NOME"]);
	}
	
	if ( selectedItem.inputId == "zoomEquipamento" ) {
		$("#codEquipamento").val(selectedItem["CODIGO"]);
		$("#nomeEquipamento").val(selectedItem["EQUIPAMENTO"]);
		$("#marcaEquipamento").val(selectedItem["MARCA"]);
		$("#tipoEquipamento").val(selectedItem["TIPO"]);
		$("#anoFabricEquipamento").val(selectedItem["ANOFABRICACAO"]);
		$("#valorTotal").val(selectedItem["VALOR"]);		
		
		reloadZoomFilterValues("zoomChassi", "CODIGO," + selectedItem["CODIGO"]);				
	}
	
	if ( selectedItem.inputId == "zoomChassi" ) {
		$("#codChassi").val(selectedItem["CODIGO"]);		
	}
	
	if ( selectedItem.inputId == "zoomVendedor" ) {
		$("#codVendedor").val(selectedItem["CODIGO"]);		
	}
	
	if ( selectedItem.inputId == "zoomGerenteRegional" ) {
		$("#codGerRegional").val(selectedItem["CODIGO"]);
		$("#gerenteRegional").val(selectedItem["NOME"]);
		$("#emailGerRegional").val(selectedItem["EMAIL"]);
		$("#matriculaGerRegional").val(selectedItem["MATRICULA"]);
	}
		
	if (selectedItem.inputId.match(/zoomCondPagamento___/) ) {
		var id = selectedItem.inputId.split("___")[1];
		$("#codCondPagamento___" + id).val(selectedItem["CODIGO"]);
		if (selectedItem["CODIGO"]=="CP01") {
			$("#valorEntrada___" + id).val($("#valorRecursoProprio").val());
			$("#valorEntrada___"+id).attr('readonly', true);
			
		} else {
			$("#valorEntrada___" + id).val("");
			$("#valorEntrada___"+id).attr('readonly', false);
			$("#totalParcelamento___" + id).val("");
		}
		actionsSelectFormaPagamento(id);
	}
	
	if (selectedItem.inputId.match(/zoomformaPagamento___/) ) {
		var id = selectedItem.inputId.split("___")[1];
		$("#codFormaPagamento___" + id).val(selectedItem["CODIGO"]);
		
		if (selectedItem["DESCRICAO"] == "Entrada + 3") {
			$("#posicGerRegional").show();
		}
	}
}

function removedZoomItem(removedItem) {
	
	if ( removedItem.inputId == "zoomCliente" ) {
		$("#codCliente").val("");
		$("#codigoLoja").val("");
		$("#numeroCPFCNPJ").val("");
		$("#nomeCliente").val("");
	}
	
	if (removedItem.inputId == "zoomEquipamento") {		
		$("#codEquipamento").val("");
		$("#nomeEquipamento").val("");
		$("#marcaEquipamento").val("");
		$("#tipoEquipamento").val("");
		$("#anoFabricEquipamento").val("");
		$("#valorTotal").val("");
		
		$("#zoomChassi").val("");
		reloadZoomFilterValues("zoomChassi", "");		
	}
	
	if ( removedItem.inputId == "zoomChassi" ) {
		$("#codChassi").val("");		
	}
	
	if ( removedItem.inputId == "zoomVendedor" ) {
		$("#codVendedor").val("");		
	}
	
	if (removedItem.inputId.match(/zoomCondPagamento___/) ) {
		var id = removedItem.inputId.split("___")[1];
		$("#codCondPagamento___" + id).val("");
		
		//Caso esteja em tabela PaixFilho- remover opção selecionada
		//$("#zoomformaPagamento___"+id+">option").remove(); -- remover depois			
		$("#codFormaPagamento___" + id).val("");
		
		$("#valorEntrada___" + id).val("");
		$("#valorEntrada___"+id).attr('readonly', false);
		$("#totalParcelamento___" + id).val("");
	}
	
	if (removedItem.inputId.match(/zoomformaPagamento___/) ) {
		var id = removedItem.inputId.split("___")[1];
		$("#codFormaPagamento___" + id).val("");
		
		$("#posicGerRegional").hide();
		
	}
}

function adicionarPagamento() {
	var indice = wdkAddChild('tabelaPagamentos');
	
	/*
	$("#btnViewerDocumento___" + indice).hide();
	$("#btnDownloadDocumento___" + indice).hide();
	
	$("#lblAnexo___" + indice).hide();
	$("#descAnexo___" + indice).hide();*/
}

function removerPagamento(event){ 
	fnWdkRemoveChild(event);
}

function adicionarCompPagamento() {
	var indice = wdkAddChild('tabelaCompPagamentos');
	
	/*
	$("#btnViewerDocumento___" + indice).hide();
	$("#btnDownloadDocumento___" + indice).hide();
	
	$("#lblAnexo___" + indice).hide();
	$("#descAnexo___" + indice).hide();*/
}

function removerCompPagamento(event){ 
	fnWdkRemoveChild(event);
}

function adicionarCompPagamentoPend() {
	var indice = wdkAddChild('tabelaCompPagsPend');
	
	/*
	$("#btnViewerDocumento___" + indice).hide();
	$("#btnDownloadDocumento___" + indice).hide();
	
	$("#lblAnexo___" + indice).hide();
	$("#descAnexo___" + indice).hide();*/
}

function removerCompPagamentoPend(event){ 
	fnWdkRemoveChild(event);
}

function alerta(mensagem){
	
	FLUIGC.message.alert({
	    message: mensagem,
	    title: 'Atenção!',
	    label: 'OK, Entendi'
	}, function(el, ev) {
		
	});
}

function calculoTotalParcelamento(value) {	
	var id = value.id.split("___")[1];	
	
	var valorRecursoProprio = parseFloat($("#valorRecursoProprio").val().split(",")[0].split(".").join(''));
	var valorEntrada = parseFloat($("#valorEntrada___"+id).val().split(",")[0].split(".").join(''));				
	$("#valorEntrada___"+id).val(numberToReal(valorEntrada));
	var valorParcelamento = numberToReal(valorRecursoProprio - valorEntrada);
	
	$("#totalParcelamento___"+id).val(valorParcelamento);
}

function actionsSelectFormaPagamento(id) {
	//var id = value.id.split("___")[1];
	//console.log("value: "+value.value);	
	
	/*
	$("#selectFormaPag___"+id).append($('<option>', {
	    value: "dinheiro",
	    text: "Dinheiro"
	}));
	$("#selectFormaPag___"+id).append($('<option>', {
		value: "cartao",
		text: "Cartão"
	}));
	$("#selectFormaPag___"+id).append($('<option>', {
		value: "cheque",
		text: "Cheque"
	}));
	$("#selectFormaPag___"+id).append($('<option>', {
		value: "entrada30_60",
		text: "Entrada + 30/60"
	}));
	$("#selectFormaPag___"+id).append($('<option>', {
		value: "entrada_3",
		text: "Entrada + 3"
	}));
	$("#selectFormaPag___"+id).append($('<option>', {
		value: "entrada9_2",
		text: "Entrada + 9 com 2% Mês"
	}));*/
	
	$("#selectFormaPag___"+id+" option[value='dinheiro']").remove();
	$("#selectFormaPag___"+id+" option[value='cartao']").remove();
	$("#selectFormaPag___"+id+" option[value='cheque']").remove();
	$("#selectFormaPag___"+id+" option[value='entrada_3']").remove();
	$("#selectFormaPag___"+id+" option[value='entrada9_2']").remove();
	
	var valorFinanciado = parseFloat($("#valorFinanciado").val().split(",")[0].split(".").join(''));	
	if(valorFinanciado == 0){
		if ($("#codCondPagamento___" + id).val() == "CP01") {
			$("#selectFormaPag___"+id).append($('<option>', {
			    value: "dinheiro",
			    text: "Dinheiro"
			}));
			$("#selectFormaPag___"+id).append($('<option>', {
				value: "cartao",
				text: "Cartão"
			}));
		} else if ($("#codCondPagamento___" + id).val() == "CP02" && $("#tipoEquipamento").val() == "LINHA A5000"){
			$("#selectFormaPag___"+id).append($('<option>', {
				value: "entrada30_60",
				text: "Entrada + 30/60"
			}));
			$("#selectFormaPag___"+id).append($('<option>', {
				value: "entrada_3",
				text: "Entrada + 3"
			}));
			$("#selectFormaPag___"+id).append($('<option>', {
				value: "entrada9_2",
				text: "Entrada + 9 com 2% Mês"
			}));
		} else {
			$("#selectFormaPag___"+id).append($('<option>', {
				value: "entrada30_60",
				text: "Entrada + 30/60"
			}));			
			$("#selectFormaPag___"+id).append($('<option>', {
				value: "entrada9_2",
				text: "Entrada + 9 com 2% Mês"
			}));
		}
	} else if(valorFinanciado > 0){
		if ($("#codCondPagamento___" + id).val() == "CP01") {
			$("#selectFormaPag___"+id).append($('<option>', {
			    value: "dinheiro",
			    text: "Dinheiro"
			}));
			$("#selectFormaPag___"+id).append($('<option>', {
				value: "cartao",
				text: "Cartão"
			}));
		}
		else if ($("#codCondPagamento___" + id).val() == "CP02" && $("#tipoEquipamento").val() == "LINHA A5000"){
			$("#selectFormaPag___"+id).append($('<option>', {
			    value: "dinheiro",
			    text: "Dinheiro"
			}));
			$("#selectFormaPag___"+id).append($('<option>', {
				value: "cartao",
				text: "Cartão"
			}));
			$("#selectFormaPag___"+id).append($('<option>', {
				value: "entrada_3",
				text: "Entrada + 3"
			}));
		}
	}	
}

function changeSelectFormaPagamento() {
	$("#decFormaPagamento").val($("#selectFormaPag___"+id).val());
	console.log("decFormaPagamento: "+$("#decFormaPagamento").val());
}