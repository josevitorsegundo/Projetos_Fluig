function validateForm(form){
	
	var atividadeAtual = getValue("WKNumState");
	var proximaAtividade = getValue("WKNextState");
	var msgErro = "";
	
	if (campoVazio(form, "zoomEmpresa")){
		msgErro += "<li>Empresa</li>";
	}

	if (campoVazio(form, "zoomFilial")){
		msgErro += "<li>Filial</li>";
	}
	
	if (campoVazio(form, "zoomCliente")){
		msgErro += "<li>Código Cliente</li>";
	}
	
	/*
	if (campoVazio(form, "fnAnexoCompResidenc")){
		msgErro += "<li>Comprovante Residência</li>";
	}
	
	if (campoVazio(form, "fnAnexoDocPessoal")){
		msgErro += "<li>Documento Pessoal</li>";
	}
	
	if (campoVazio(form, "fnAnexoNotaFiscal") == false){		
		if (campoVazio(form, "fnAnexoMatricula")){		
			msgErro += "<li>Matrícula</li>";
		}
	}*/
	
	if (campoVazio(form, "zoomEquipamento")){
		msgErro += "<li>Código Equipamento</li>";
	}
	
	if (campoVazio(form, "zoomChassi")){
		msgErro += "<li>Chassi</li>";
	}
	
	if (campoVazio(form, "zoomVendedor")){
		msgErro += "<li>Vendedor</li>";
	}
	
	if (campoVazio(form, "valorFinanciado") == false){
		var valorFinanciado = form.getValue("valorFinanciado")
		if (Number(valorFinanciado) < 0) 
		{
			msgErro += "<li>O campo Valor Financiado está negativo</li>";
		} else if(Number(valorFinanciado) > 0) {
			if (campoVazio(form, "zoomBanco")){
				msgErro += "<li>O campo Banco Financiador está vazio</li>";
			}
		}
	}
	
	if (campoVazio(form, "valorRecursoProprio")){		
		msgErro += "<li>Campo Valor Recurso Próprio vazio!</li>";
	} else {
		var valorRecursoProprio = form.getValue("valorRecursoProprio")
		if (Number(valorRecursoProprio) < 0) 
		{
			msgErro += "<li>O campo Valor Recurso Próprio está negativo</li>";
		}
	}	
	
	//Tabela Pagamentos Condições
	var tabelaPagamentos = form.getChildrenIndexes("tabelaPagamentos");
	var valorRecursoProprio = form.getValue("valorRecursoProprio");
	var valorFinanciado = form.getValue("valorFinanciado");
	
	if (tabelaPagamentos.length <= 0 && Number(valorRecursoProprio) > 0){
		msgErro += "<li>Tabela de Adicionar Pagamento vazia, considerando campo Valor Recurso Próprio maior que 0.</li>";
	} else {
		for (var i = 0; i < tabelaPagamentos.length; i++) {
			var zoomCondPagamento = form.getValue("zoomCondPagamento___" + tabelaPagamentos[i]);
			if (zoomCondPagamento == null || zoomCondPagamento == ""){
				msgErro += "<li>Condição de Pagamento do Item da linha " + (i+1) +"</li>";
			}
	
			var zoomformaPagamento = form.getValue("zoomformaPagamento___" + tabelaPagamentos[i]);
			if (zoomformaPagamento == null || zoomformaPagamento == ""){
				msgErro += "<li>Forma de Pagamento do Item da linha " + (i+1) +"</li>";
			} else if (zoomformaPagamento == "Entrada + 3") {
				if (form.getValue("tipoEquipamento") == "LINHA A5000"){
					if (campoVazio(form, "zoomGerenteRegional")){
						msgErro += "<li>Gerente Regional</li>";
					}
				}
			}
	
			var valorEntrada = form.getValue("valorEntrada___" + tabelaPagamentos[i]);
			if (valorEntrada == null || valorEntrada == ""){
				msgErro += "<li>Valor da Entrada Item da linha " + (i+1) +"</li>";
			}
			
			var totalParcelamento = form.getValue("totalParcelamento___" + tabelaPagamentos[i]);
			if (totalParcelamento == null || totalParcelamento == ""){
				msgErro += "<li>Valor do Total Parcelamento Item da linha " + (i+1) +"</li>";
			}
		}
	}
	
	
	if(atividadeAtual == INICIO_4) {
		if (campoVazio(form, "excecaoPolitica")){
			msgErro += "<li>Condições de Pagamento</li>";
		} 
		
		if ((form.getValue("excecaoPolitica") == "excecaoPolitica") && campoVazio(form, "pagamentoExcPolitica") ) {
			msgErro += "<li>Exceção a Política</li>";
		}	
		
		/*
		var tabelaPagamentos = form.getChildrenIndexes("tabelaPagamentos");
		if (tabelaPagamentos.length > 0) {
			for (var i = 0; i < tabelaPagamentos.length; i++) {
				var zoomCondPagamento = form.getValue("zoomCondPagamento___" + tabelaPagamentos[i]);
				if (zoomCondPagamento == null || zoomCondPagamento == ""){
					msgErro += "<li> " + (i+1) +"</li>";
				}

				var descItem = form.getValue("descItem___" + tabelaPagamentos[i]);
				if (descItem == null || descItem == ""){
					msgErro += "<li>Descrição do Item da linha " + (i+1) +"</li>";
				}

				var valorItem = form.getValue("valorItem___" + tabelaPagamentos[i]);
				if (valorItem == null || valorItem == ""){
					msgErro += "<li>Valor do Item da linha " + (i+1) +"</li>";
				}
			} 
		}*/
		
	
	}
	
	if(atividadeAtual == APROVACAO_GERENTE_REGIONAL_38) {
		if (campoVazio(form, "decGerRegional")){
			msgErro += "<li>Aprovação</li>";
		} 
		
		if ((form.getValue("decGerRegional") == "reprovado") && campoVazio(form, "justGerRegional") ) {
			msgErro += "<li>Justificativa</li>";
		}
	}
	
	if(atividadeAtual == REALIZAR_ANALISE_CREDITO_23) {
		if (campoVazio(form, "docsCadastro")){
			msgErro += "<li>Documentação/Cadastro OK?</li>";
		} 
		
		if ((form.getValue("docsCadastro") == "nao") && campoVazio(form, "justDocsCadastro") ) {
			msgErro += "<li>Justificativa</li>";
		}
		
		if (campoVazio(form, "statusClienteRest")){
			msgErro += "<li>Status Cliente (restrição ou não)</li>";
		} 
		
		if ((form.getValue("statusClienteRest") == "nao") && campoVazio(form, "justClienteRest") ) {
			msgErro += "<li>Justificativa</li>";
		}
		
		if (campoVazio(form, "resultadoAnalise")){
			msgErro += "<li>Resultado Analise</li>";
		} 
	}
	
	if(atividadeAtual == APROVACAO_DIRETORIA_21) {
		if (campoVazio(form, "decDiretor")){
			msgErro += "<li>Aprovação</li>";
		} 
		
		if ((form.getValue("decDiretor") == "reprovado") && campoVazio(form, "justDiretor") ) {
			msgErro += "<li>Justificativa</li>";
		}
	}
	
	if(atividadeAtual == CONFIRMAR_PAGAMENTO_59) {
		if (campoVazio(form, "pagFinanceiro")){
			msgErro += "<li>Aprovação</li>";
		} 
		
		if ((form.getValue("pagFinanceiro") == "nao") && campoVazio(form, "pagFinanceiroObs") ) {
			msgErro += "<li>Justificativa</li>";
		}
	}
	
	if(atividadeAtual == LIBERACAO_CREDITO_57) {
		if (campoVazio(form, "formalLiberacao")){
			msgErro += "<li>Formalização Liberação</li>";
		}
	}
	
	if(atividadeAtual == ANEXAR_COMPROVANTE_PAGAMENTO_46) {
		if (campoVazio(form, "pendSolucionada")){
			msgErro += "<li>Pendência Solucionada?</li>";
		} 
		
		if (form.getValue("pendSolucionada") == "sim" ) {			
			var tabelaCompPagsPend = form.getChildrenIndexes("tabelaCompPagsPend");
			if (tabelaCompPagsPend.length <= 0){
				msgErro += "<li>Adicionar Pagamento</li>";
			}
			
		}
	}
	
	
	if (msgErro != ""){
		msgErro = "<ul>" + msgErro + "</ul>";
		exibirMensagem(form, "Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
	}
}

function campoVazio(form, fieldname){
	if ((form.getValue(fieldname) == null) || (form.getValue(fieldname) == undefined) || (form.getValue(fieldname).trim() == "")){
		return true;
	} // if
	return false;
} // campoVazio


function exibirMensagem(form, mensagem){
	var mobile = form.getMobile() != null && form.getMobile();
	
	if (mobile) {
		throw mensagem;
	} else {
		throw "<div class='alert alert-warning' role='alert'>" +
				"<strong>Atenção:</strong> "+mensagem+
			  "</div>"+
			  "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI.";		
	} // else if
} // exibirMensagem