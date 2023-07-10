function servicetask8(attempt, message) {
	var availableProducts = hAPI.getCardValue("availableProducts")
    availableItemsFunction(availableProducts)
}
function availableItemsFunction(availableProducts){	
	var nomeDataServer = "MovFaturamentoProc";
 	var usuario = "fluig";
 	var senha = "fluig";
 	var context = "CODCOLIGADA=2;CODFILIAL=1;";
	var products = availableProducts.split(";")
    products.pop()	
	var requester = hAPI.getCardValue("requester").split(" - ")[0]
	var centroCusto = hAPI.getCardValue("centroCusto").split(" - ")[0]
	var departamento = hAPI.getCardValue("departamento").split(" - ")[0]
	var historicoCurto = hAPI.getCardValue("historicoCurto")
	var movimento = hAPI.getCardValue("numMov")
    var data = new Date()
    var ano = data.getFullYear()
    var mes = data.getMonth()+1>=10? data.getMonth()+1:"0"+(data.getMonth()+1)
    var dia = data.getDate()>=10?data.getDate():"0"+data.getDate()
    data=ano+"-"+mes+"-"+dia+"T00:00:00"
	log.info("FUNCAO ENTREGA PRODUTO")
	log.info("SOLICITANTE =>" + requester+ " CENTRO DE CUSTO =>"+centroCusto+ " DEPARTAMENTO =>"+departamento+ "HISTORICO CURTO=>"+ historicoCurto)
	var XMLData = "<MovFaturamentoProcParams>"
	XMLData += "<movCopiaFatPar>"
    XMLData += "<CodColigada>2</CodColigada>"
    XMLData += "<CodSistema>T</CodSistema>"
    XMLData += "<CodTmvDestino>1.2.80</CodTmvDestino>"
    XMLData += "<CodTmvOrigem>1.1.80</CodTmvOrigem>"
    XMLData += "<CodUsuario>fluig</CodUsuario>"
    XMLData += "<GrupoFaturamento></GrupoFaturamento>"
    XMLData += "<IdExercicioFiscal>4</IdExercicioFiscal>"
    XMLData += "<IdMov>"
    XMLData += "<int>"+movimento+"</int>"
    XMLData += "</IdMov>"
    XMLData += "<TipoFaturamento>0</TipoFaturamento>"
    XMLData += "<dataBase>"+data+"</dataBase>"
    XMLData += "<dataEmissao/>"
    XMLData += "<dataSaida/>"
    XMLData += "<efeitoPedidoFatAutomatico>2</efeitoPedidoFatAutomatico>"
    XMLData += "<listaMovItemFatAutomatico>"
    
	for(var i = 0; i<products.length;i++){
		var product = hAPI.getCardValue("product___"+products[i]).split(" - ")[0]
		// var id = hAPI.getCardValue("idprd___"+products[i])
		// var frota = hAPI.getCardValue("frota___"+products[i])
		// var centroCustoProduto = hAPI.getCardValue("centroCustoProduto___"+products[i]).split(" - ")[0]
		// var historicoCurtoProduto = hAPI.getCardValue("historicoCurtoProduto___"+products[i]).split(" - ")[0]
		var c1 = DatasetFactory.createConstraint("ID", hAPI.getCardValue("idprd___"+products[i]) , hAPI.getCardValue("idprd___"+products[i]) , ConstraintType.MUST);  
		var dataset = DatasetFactory.getDataset("ds_RequisicaoMateriak_ConsultaSaldoProduto", null, new Array(c1), null);
		var quantidade = hAPI.getCardValue("quantity___"+products[i])
		var almoxTableIndexes =  hAPI.getCardValue("indexesAlmox")
		almoxIndexesArray = almoxTableIndexes.split(";")
		var result = ""
		log.info("ENTREI FUNCALMO"+ almoxIndexesArray + " TAmANHO ARRAY =>" + almoxIndexesArray.length)
		for(var j = 0;j<almoxIndexesArray.length;j++){
			log.info("ENTREI FOR FUNCALMOX")
			var idx = hAPI.getCardValue("idx___"+almoxIndexesArray[j])
			log.info("INDEX ALMOXARIFADO => "+idx)
			if(idx==products[i]){
				result = almoxIndexesArray[j]
			}
		}
		var qtd = hAPI.getCardValue("qtd___"+result)	
		log.info("DEBUG QUANTIDADE REAL =>" + quantidade+"INDEX "+result+" QUANTIDADE NÂO OFICIAL=> "+qtd)
		var saldo = dataset.getValue(0, "SALDO")
		qtd>=saldo? qtd=saldo:false
		log.info("PRODUTO => "+product+" Quantidade=>"+qtd)
		XMLData += "<MovItemFatAutomatico>"
		XMLData += "<CodColigada>2</CodColigada>"
        XMLData += "<Checked>1</Checked>"
        XMLData += "<IdMov>"+movimento+"</IdMov>"
        XMLData += "<NSeqItmMov>"+(i+1)+"</NSeqItmMov>"
        XMLData += "<Quantidade>"+parseFloat(qtd).toFixed(2).toString().replace(".",",")+"</Quantidade>"
		XMLData +="</MovItemFatAutomatico>"
	}
	XMLData += "</listaMovItemFatAutomatico>"
	XMLData+= "<realizaBaixaPedido>true</realizaBaixaPedido>"
	XMLData += "</movCopiaFatPar>"
	XMLData +="</MovFaturamentoProcParams>"
	log.info("XML =>"+XMLData)
	try {
		var authService = getWebService(usuario, senha);
		var result =  new String(authService.executeWithParams(nomeDataServer, XMLData));
		if(result[0] != 1){
			throw result
		}	
		log.info('==> DevDebug Script Diagrama: ' + result);
	  } catch (error) {
		log.info('==> DevDebug Error Script Diagrama: ' + error);
		throw "Erro na Integração com o RM: "+ error
	}

}
function getWebService(Usuario, Senha){
	var Nome_Servico = "wsProcess";
	var Caminho_Servico = "com.totvs.WsProcess";
	
	var dataServerService = ServiceManager.getServiceInstance(Nome_Servico);
	if(dataServerService == null){
	  throw "Servico nao encontrado: " + Nome_Servico;
	}
	
	var serviceLocator = dataServerService.instantiate(Caminho_Servico);
	if(serviceLocator == null){
	  throw "Instancia do servico nao encontrada: " + Nome_Servico + " - " + Caminho_Servico;
	}
  
	var service = serviceLocator.getRMIwsProcess();	
	if(service == null){
	  throw "Instancia do dataserver do invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}
  
	var serviceHelper = dataServerService.getBean();
	if(serviceHelper == null){
	  throw "Instancia do service helper invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}
  
	var authService = serviceHelper.getBasicAuthenticatedClient(service, "com.totvs.IwsProcess", Usuario, Senha);	  
	if(serviceHelper == null){
	  throw "Instancia do auth service invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}
	
	return authService;
  }