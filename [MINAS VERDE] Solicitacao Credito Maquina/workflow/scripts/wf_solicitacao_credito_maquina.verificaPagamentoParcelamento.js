function verificaPagamentoParcelamento(){
	
	var indexes = hAPI.getChildrenIndexes("tabelaPagamentos");    
	
	var tipoEquipamento = hAPI.getCardValue("tipoEquipamento");	
	
	for(var i = 0; i < indexes.length; i++) {
    	var formaPagamento = hAPI.getCardValue("zoomformaPagamento___" + indexes[i]);
    	
    	if (formaPagamento == "Entrada + 3") {    		
    		if (tipoEquipamento == "LINHA A5000"){
    			//Caso tenha equipamento da Linha 5000 e se for parcelamento 1 + 3. Página 12 da documentação. Mandar para Aprovação Diretoria
    			return true;
    		}
    	}
    	
    }	
	
	//Caso tenha ou não equipamento da Linha 500 e formas de pagamento for as demais formas. Mandar para REalizar Análise de Crédito
	return false;
}