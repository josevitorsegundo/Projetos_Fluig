$(document).ready(function() {
	carregarFormulario();
}); 

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

window.onload = function(){
	// Component construction by setting the window.
 	myLoading = FLUIGC.loading(window);

 	var atividade = getWKNumState();
 	
 	if (atividade != EM_APROVACAO) {
// 		$("#divPainelAprovacao").hide();
 	}
	
 	myLoading.show();
	setTimeout(function() {
		console.log("carregaTabelaItensJson");
		carregaTabelaItensJson();
		carregaTabelaAprovacaoJson();
		carregaTabelaCotacaoJson();
		carregaTabelaSimulacaoJson();
		
		myLoading.hide();
	}, 500);
	
	bindings();

	showHideMotivo();
}

function bindings() {
	$('#cmbAprovacao').on('change', function() {
		showHideMotivo();
	});
}

function showHideMotivo() {
	var acao = $("#cmbAprovacao").val();
	if (acao == "R") {
		//$("#div_motivo").show();
	} else {
		$("#div_motivo").hide();
		$("#motivoReprovacao").val("");
		window["zoomMotivoReprovacao"].clear();
	}
}

function setSelectedZoomItem(sender) {
	var nomeObjeto = sender.inputId;
	
	if (nomeObjeto == "zoomMotivoReprovacao") {
		$("#motivoReprovacao").val(sender["DESCRICAO"]);
	}
}

function removedZoomItem(sender) {
	var nomeObjeto = sender.inputId;
	var atividade = getWKNumState();
	
	if (nomeObjeto == "zoomMotivoReprovacao") {
		$("#motivoReprovacao").val("");
	}
}

function exibirMensagem(titulo, mensagem, tipo){
	// tipos:
	//  - danger
	//  - warning
	//  - success
	//  - info
	if ((tipo == null) || (tipo == undefined) || tipo == ""){
		tipo = "info";
	} // if
	FLUIGC.toast({
		title: titulo,
		message: mensagem,
		type: tipo
	}); // toast
} // exibirMensagem

function carregarFormulario() {
	var titulo = "Aprovação de Pedido de Compras";
		
//	$("#lblTitulo").text(titulo);
//	$("#lblNumero").text($("#num_pedido_compra").val());
//	$("#lblFornecedor").text($("#num_cgc").val() + " - " + $("#nom_fornecedor").val());
//	$("#lblDataEmissaoProtheus").text($("#dat_emissao").val());
//	$("#lblFilial").text($("#cod_filial").val() + " - " + $("#nom_filial").val());
//	$("#lblNomeContato").text($("#nom_contato").val());
//	$("#lblCondicaoPagamento").text($("#cod_condicao_pagamento").val() + " - " + $("#dsc_condicao_pagamento").val());
//	$("#lblCentroCusto").text($("#cod_centro_custo").val() + " - " + $("#dsc_centro_custo").val());
//	$("#lblDescontos").text($("#val_descontos").val());
//	$("#lblImpostos").text($("#val_impostos").val());
//	$("#lblFrete").text($("#val_frete").val());
//	$("#lblQtdItens").text($("#qtd_itens").val());
//	$("#lblValTotalPedido").text($("#val_total_pedido").val());
//	$("#lblValMercadorias").text($("#val_mercadorias").val());

	$("#lblNumero").text("999");
	$("#lblFornecedor").text("FORNECEDOR TESTE");
	$("#lblDataEmissaoProtheus").text("01/01/2023");
	$("#lblFilial").text("01 - TESTE FILIAL");
	$("#lblNomeContato").text("Contato teste");
	$("#lblCondicaoPagamento").text("01 - TESTE À VISTA");
	$("#lblCentroCusto").text("9999 - TESTE CENTRo CUSTO");
	$("#lblDescontos").text("R$ 1.000,00");
	$("#lblImpostos").text("R$ 1.000,00");
	$("#lblFrete").text("R$ 1.000,00");
	$("#lblQtdItens").text("R$ 1.000,00");
	$("#lblValTotalPedido").text("R$ 1.000,00");
	$("#lblValMercadorias").text("R$ 1.000,00");	
	$("#lblComprador").text("COMPRADOR TESTE");
	$("#lblDataPrimeiroPagamento").text("04/01/2023");
	$("#lblObservacao").text("Descrição Teste");
	statusAprovacao();
}

function statusAprovacao(){
	var atividade = getWKNumState();
//	$("#lblStatus").text($("#situacao").val());
	$("#lblStatus").text("Em Aprovação");
	
	if( atividade == SOLICITACAO_APROVADA){
		$("#divStatus").removeClass("btn btn-info");
		$("#divStatus").addClass("btn btn-success");
	} else if( atividade == SOLICITACAO_REPROVADA){
		$("#divStatus").removeClass("btn btn-info");
		$("#divStatus").addClass("btn btn-danger");
	} 
}

function montaTabelaItens(codigo, descricao, unidadeMedida, quantidade, preco, valorTotal, dataEntrega) {
	$('<tr>').html(
			"<td>" + codigo + "</td>" +
			"<td>" + descricao + "</td>" +
			"<td>" + unidadeMedida + "</td>" +
			"<td style='text-align: center'>" + quantidade + "</td>" +
			"<td style='text-align: right'>" + preco + "</td>" +
			"<td style='text-align: right'>" + valorTotal + "</td>" +
			"<td style='text-align: center'>" + dataEntrega + "</td>" 
			).appendTo('#tabelaItens');
}

function montaTabelaCotacao(codigo, descricao, unidadeMedida, quantidade, preco, valorTotal, dataEntrega) {
	$('<tr>').html(
			"<td>" + codigo + "</td>" +
			"<td>" + descricao + "</td>" +
			"<td>" + unidadeMedida + "</td>" +
			"<td style='text-align: center'>" + quantidade + "</td>" +
			"<td style='text-align: right'>" + preco + "</td>" +
			"<td style='text-align: right'>" + valorTotal + "</td>" +
			"<td style='text-align: center'>" + dataEntrega + "</td>" 
			).appendTo('#tabelaItens');
}

function carregaTabelaItensJson() {
	try {
//		var obj = jQuery.parseJSON($("#strJsonTabelaItens").val());
		
		var obj = [
			   {
				      "codigo":"123456",
				      "descricao":"Produto Teste 1",
				      "unidadeMedida":"UN",
				      "quantidade":"10,00",
				      "preco":"5,00",
				      "valorTotal":"50,00",
				      "dataEntrega":"01/02/2022"
				   },
				   {
				      "codigo":"987654",
				      "descricao":"Produto Teste 2",
				      "unidadeMedida":"UN",
				      "quantidade":"20,00",
				      "preco":"5,00",
				      "valorTotal":"100,00",
				      "dataEntrega":"01/02/2022"
				   }
				];
		
		$.each(obj, function(i, item) {
			montaTabelaItens(
					obj[i].codigo, 
					obj[i].descricao, 
					obj[i].unidadeMedida, 
					obj[i].quantidade,
					obj[i].preco,
					obj[i].valorTotal,
					obj[i].dataEntrega);
		});
		
	} catch (e) {
		console.log("Erro:" + e);
	}
}

function trimStr(str) {
	return str.trim();
}

function carregaTabelaCotacaoJson() {
	try {
		
		if (!isPreenchido($("#strJsonTabelaCotacao").val())) {
			$("#div_cotacao").hide();
			return;
		}
		
		var obj = jQuery.parseJSON($("#strJsonTabelaCotacao").val());
		
		if (obj != null && obj != "" && obj != undefined) {
			$("#div_cotacao").show();
		} else {
			$("#div_cotacao").hide();
			return;
		}
		
		$("#div_mapa_cotacao").empty();
		
		$.each(obj, function(i, item) {
			
			let strHtml =
				' <div class="panel-group" id="accordionCot"> ' +
				'	<div class="panel panel-default"> ' +
    			'	<div class="panel-heading"> ' +
		        '	    <h4 class="panel-title"> ' +
		        '	        <a class="collapse-icon" data-toggle="collapse" data-parent="#accordionCot" href="#collapseCot' + trimStr(item.codigo) + '"> ' +
		        '	        ' + trimStr(item.codigo) + ' - ' + trimStr(item.descricao) + 
		        '	        </a> ' +
		        '	    </h4> ' +
		        '	</div> ' +
		        '	<div id="collapseCot' + trimStr(item.codigo) + '" class="panel-collapse collapse"> ' +
		        '	    <div class="panel-body"> ';

			$.each(item.fornecedores, function(j, fornecedor) {
				strHtml +=
						' <div class="col-md-4 form-group"> ' +
						' 	<div class="card"> ' +
						' 		<div class="card-body"> ' +
						' 			<h5 class="card-title">' + fornecedor.nome + '</h5> ' +
						' 			<h6 class="card-subtitle mb-2 text-muted">Preço Unit.: <span style="color:black">' + fornecedor.preco_unitario + '</span></h6> ' +
						' 			<h6 class="card-subtitle mb-2 text-muted">Cond. Pagto: <span style="color:black">' + fornecedor.cond_pagto + '</span></h6> ' +
						' 			<h6 class="card-subtitle mb-2 text-muted">Data Entr.: <span style="color:black">' + fornecedor.data_entrega + '</span></h6> ' +
						' 		</div> ' +
						' 	</div> ' +
						' </div> ';
			});

			strHtml += 	 '			</div> ' +
			 			 '		</div> ' +
			 			 '	</div> ' +
			 			 '</div> ';
			
			$("#div_mapa_cotacao").append(strHtml);
		});
		
	} catch (e) {
		console.log("Erro:" + e);
	}
}

function carregaTabelaSimulacaoJson() {
	try {
		if (!isPreenchido($("#strJsonTabelaSimulacao").val())) {
			$("#div_simulacao").hide();
			return;
		}
		
		var obj = jQuery.parseJSON($("#strJsonTabelaSimulacao").val());
		
		if (obj != null && obj != "" && obj != undefined) {
			$("#div_simulacao").show();
		} else {
			$("#div_simulacao").hide();
			return;
		}
		
		$("#div_mapa_simulacao").empty();
		
		$.each(obj, function(i, item) {
			let strHtml =
				' <div class="panel-group" id="accordionSimu"> ' +
				'	<div class="panel panel-default"> ' +
    			'	<div class="panel-heading"> ' +
		        '	    <h4 class="panel-title"> ' +
		        '	        <a class="collapse-icon" data-toggle="collapse" data-parent="#accordionSimu" href="#collapseSim' + trimStr(item.codigo) + '"> ' +
		        '	        ' + trimStr(item.codigo) + ' - ' + trimStr(item.descricao) + 
		        '	        </a> ' +
		        '	    </h4> ' +
		        '	</div> ' +
		        '	<div id="collapseSim' + trimStr(item.codigo) + '" class="panel-collapse collapse"> ' +
		        '	    <div class="panel-body"> ';
			
			strHtml +=
					' <div class="col-md-12 form-group"> ' +
					' 	<div class="card"> ' +
					' 		<div class="card-body"> ' +
					'			<div class="col-md-4 col-sm-12"> ' +	
					' 				<h6 class="card-subtitle mb-2 text-muted">Custo Nota: <span style="color:black">' + item.simulacao.custo_nota + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Frete Incluso: <span style="color:black">' + item.simulacao.frete_incluso + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Frete Separado: <span style="color:black">' + item.simulacao.frete_separado + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Preço Custo: <span style="color:black">' + item.simulacao.preco_custo + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Markup: <span style="color:black">' + item.simulacao.markup + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Preço Comercial: <span style="color:black">' + item.simulacao.preco_comercial + '</span></h6> ' +
					' 			</div> ' +
					'			<div class="col-md-4 col-sm-12"> ' +	
					' 				<h6 class="card-subtitle mb-2 text-muted">Preço Especial: <span style="color:black">' + item.simulacao.preco_especial + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Preço Concorrente (Loja): <span style="color:black">' + item.simulacao.preco_concorrente_loja + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Preço Concorrente (Internet): <span style="color:black">' + item.simulacao.preco_concorrente_internet + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Preço Ajustado: <span style="color:black">' + item.simulacao.preco_ajustado + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Desconto Apelo: <span style="color:black">' + item.simulacao.desconto_apelo + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Preço Efetivo: <span style="color:black">' + item.simulacao.preco_efetivo + '</span></h6> ' +
					' 			</div> ' +
					'			<div class="col-md-4 col-sm-12"> ' +	
					' 				<h6 class="card-subtitle mb-2 text-muted">Receita Líquida: <span style="color:black">' + item.simulacao.receita_liquida + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Valor Rebate: <span style="color:black">' + item.simulacao.val_rebate + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Margem Final: <span style="color:black">' + item.simulacao.margem_final + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Preço Médio: <span style="color:black">' + item.simulacao.preco_medio + '</span></h6> ' +
					' 				<h6 class="card-subtitle mb-2 text-muted">Margem Participação: <span style="color:black">' + item.simulacao.margem_participacao + '</span></h6> ' +
					' 			</div> ' +
					' 		</div> ' +
					' 	</div> ' +
					' </div> ';
			
			strHtml += 	 '			</div> ' +
						 '		</div> ' +
						 '	</div> ' +
						 '</div> ';
			
			$("#div_mapa_simulacao").append(strHtml);
		});
		
	} catch (e) {
		console.log("Erro:" + e);
	}
}

function carregaTabelaAprovacaoJson() {
	try {
//		var obj = jQuery.parseJSON($("#strJsonTabelaAprovacao").val());
		
		var obj = [
			  {
			    "nivel": "1",
			    "nome": "Teste Usuário 1",
			    "tipo": "U",
			    "status": "",
			    "data": "",
			    "origem": "Protheus",
			    "aprovador": "admin",
			    "email":"lf.carneiro@tele-rio.com"
			  },
			  {
			    "nivel": "1",
			    "nome": "Teste Usuário 2",
			    "tipo": "U",
			    "status": "",
			    "data": "",
			    "origem": "Protheus",
			    "aprovador": "emerson",
			    "email":"efernandes@tele-rio.com"
			  },
			  {
			    "nivel": "2",
			    "nome": "Teste Usuário 3",
			    "tipo": "N",
			    "status": "",
			    "data": "",
			    "origem": "Protheus",
			    "aprovador": "monica",
			    "email":"monica.torres@tele-rio.com"
			  }
			]
		
		obj.sort(sortNivel("nivel"));
		
		$.each(obj, function(i, item) {
			montaResumoAprovacao(
					obj[i].nivel, 
					obj[i].nome, 
					obj[i].tipo, 
					obj[i].status,
					obj[i].data,
					obj[i].origem,
					obj[i].aprovador,
					obj[i].observacao,
					obj[i].nomeAprovadorConjunto
					);
		});
		
	} catch (e) {
		console.log("Erro:" + e);
	}
}

function sortNivel(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}    

function montaResumoAprovacao(nivel, nome, tipo, status, data, origem, usuarioAprovador, observacao, nomeAprovadorConjunto) {
	
	console.log("status: " + status);
	console.log("nome: " + nome);
	console.log("usuarioAprovador: " + usuarioAprovador);
	
//	if (status == "A" && usuarioAprovador != nome) {
//		return;
//	}
	
	var strHtml = "";
	var strClass = "text-info";
	var strIcon = "fluigicon-user-pending";
	status = status.toUpperCase();
	
	if ( status == "A" ){
		status = "APROVADO";
	} else
	if ( status == "R" ){
		status = "REPROVADO";
	} else
	if ( status == "" ){
		status = "";
	}
	
	if (status.toUpperCase() == "APROVADO") {
		strClass = "text-success";
		strIcon = "fluigicon-check-circle-on";
	}
	
	if (status.toUpperCase() == "REPROVADO") {
		strClass = "text-danger";
		strIcon = "fluigicon-remove-sign";
	}
	
	if (status == "") {
		strHtml = 
			' <header>' +
			'	<strong>Nível ' + nivel + ' &nbsp;&nbsp;</strong><span class="' + strClass + '"><span class="fluigicon ' + strIcon + ' fluigicon-sm"></span>&nbsp;<strong>AGUARDANDO APROVAÇÃO</strong></span> de ' + nome +
			' </header> ';
	} else {
		var nomeAprovador = "";
		if (nomeAprovadorConjunto != undefined) {
			nomeAprovador = nomeAprovadorConjunto + " (Em nome de " + nome + ")";
		} else {
			nomeAprovador = nome;
		}
		
		strHtml = 
			' <header> ' +
			'	<strong>Nível ' + nivel + ' &nbsp;&nbsp;</strong><span class="' + strClass + '"><span class="fluigicon ' + strIcon + ' fluigicon-sm"></span>&nbsp;<strong>' + status + '</strong></span> por ' + nomeAprovador + ' em ' + data +
			' </header> ';
			
		if (observacao != undefined) {
			strHtml = strHtml +	' <p>Obs: ' + observacao + '</p>';
		}
	}
	$("#divResumoAprovacao").append(strHtml);
}

function alerta(mensagem){
	FLUIGC.message.alert({
	    message: mensagem,
	    title: 'Atenção!',
	    label: 'OK, Entendi'
	}, function(el, ev) {
		
	});
}

function tableToJSON(tblObj){  
	var data = [];
	var $headers = $(tblObj).find("th");
	var $rows = $(tblObj).find("tbody tr").each(function(index) {
		$cells = $(this).find("td");
		data[index] = {};
		$cells.each(function(cellIndex) {
			data[index][$($headers[cellIndex]).html()] = $(this).attr('id');
		});    
	});
	
	return data;
}

function isPreenchido(valor) {
	if (valor == null || valor == undefined || valor.trim() == "") {
		return false;
	}
	
	return true;
}