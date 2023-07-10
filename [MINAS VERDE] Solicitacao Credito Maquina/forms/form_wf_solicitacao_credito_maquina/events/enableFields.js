function enableFields(form){ 
	var ATIVIDADE = Number(getValue("WKNumState")) ? Number(getValue("WKNumState")) : INICIO_4;
	
	if (ATIVIDADE != INICIO_4) {
		form.setEnabled("zoomEmpresa", false);
		form.setEnabled("zoomFilial", false);
		
		form.setEnabled("zoomCliente", false);
		
		form.setEnabled("zoomEquipamento", false);
		form.setEnabled("anoFabricEquipamento", false);
		form.setEnabled("zoomChassi", false);
		form.setEnabled("zoomVendedor", false);
				
		form.setEnabled("excecaoPolitica", false);
		
		form.setEnabled("valorFinanciado", false);		
		form.setEnabled("zoomBanco", false);
		
		var tabelaPagamentos = form.getChildrenIndexes("tabelaPagamentos");
		for (var i = 0; i < tabelaPagamentos.length; i++) {
			form.setEnabled("zoomCondPagamento___" + tabelaPagamentos[i], false);
			form.setEnabled("zoomformaPagamento___" + tabelaPagamentos[i], false);
			form.setEnabled("valorEntrada___" + tabelaPagamentos[i], false);
		}
		
		form.setEnabled("pagamentoObservacao", false);
		form.setEnabled("pagamentoExcPolitica", false);
		form.setEnabled("zoomGerenteRegional", false);
		
	}
	
	if (ATIVIDADE == REVISAR_FORMA_PAGAMENTO_30) {
		form.setEnabled("excecaoPolitica", true);
		
		form.setEnabled("valorFinanciado", true);		
		form.setEnabled("zoomBanco", true);		
		
		var tabelaPagamentos = form.getChildrenIndexes("tabelaPagamentos");
		for (var i = 0; i < tabelaPagamentos.length; i++) {
			form.setEnabled("zoomCondPagamento___" + tabelaPagamentos[i], true);
			form.setEnabled("zoomformaPagamento___" + tabelaPagamentos[i], true);
			form.setEnabled("valorEntrada___" + tabelaPagamentos[i], true);
		}
		
		form.setEnabled("pagamentoObservacao", true);
		form.setEnabled("pagamentoExcPolitica", true);
		form.setEnabled("zoomGerenteRegional", true);		
	}
	
	if (ATIVIDADE != APROVACAO_DIRETORIA_21) {
		form.setEnabled("decDiretor", false);
		form.setEnabled("justDiretor", false);		
	}
	
	if (ATIVIDADE != APROVACAO_GERENTE_REGIONAL_38) {		
		form.setEnabled("decGerRegional", false);
		form.setEnabled("justGerRegional", false);
	}
	
	if (ATIVIDADE != REALIZAR_ANALISE_CREDITO_23) {
		form.setEnabled("docsCadastro", false);
		form.setEnabled("justDocsCadastro", false);
		form.setEnabled("statusClienteRest", false);
		form.setEnabled("justClienteRest", false);
		form.setEnabled("resultadoAnalise", false);
	}
	
	if (ATIVIDADE != CONFIRMAR_PAGAMENTO_59) {
		form.setEnabled("pagFinanceiro", false);
		form.setEnabled("pagFinanceiroObs", false);
	}
	
	if (ATIVIDADE != LIBERACAO_CREDITO_57) {
		form.setEnabled("formalLiberacao", false);		
	}
	
	if (ATIVIDADE != NOTIFICAR_CLIENTE_41) {
		form.setEnabled("pendSolucionada", false);		
	}
	
	if (ATIVIDADE != ANEXAR_COMPROVANTE_PAGAMENTO_46) {
			
	}
	
}