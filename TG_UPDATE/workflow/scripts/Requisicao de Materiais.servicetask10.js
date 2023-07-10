function servicetask10(attempt, message) {
	log.info("DEBUG INTEGRAÇÃO RM => START")	
	var products = hAPI.getCardValue("products")
	var tam = products.split(";").length
	var arrayProducts = []
	for(var i = 1;i<=tam ;i++ ){
		arrayProducts.push(i)
	}
	log.info("produtos:" + products+" array:"+arrayProducts+" array length:"+arrayProducts.length)
	var availableProducts = ""
	var unavailableProducts = ""
	for(var i = 0;i<arrayProducts.length;i++){
		
			var c1 = DatasetFactory.createConstraint("ID", hAPI.getCardValue("idprd___"+arrayProducts[i]) , hAPI.getCardValue("idprd___"+arrayProducts[i]) , ConstraintType.MUST);  
			log.info("VALOR DO CARD: "+hAPI.getCardValue("idprd___"+arrayProducts[i]))    
			var dataset = DatasetFactory.getDataset("ds_RequisicaoMateriak_ConsultaSaldoProduto", null, new Array(c1), null);
			var quantity = parseInt(hAPI.getCardValue("quantity___"+arrayProducts[i]))
			log.info("RESULTADO DS =>"+dataset)
			var saldo = dataset.getValue(0, "SALDO")
			log.info("SaLDO:"+saldo)
			if(parseInt(saldo) <= 0 || saldo ==""){
				log.info("NAO EXISTE")
				unavailableProducts += arrayProducts[i]+";"
			}
			else{
				if(parseInt(saldo)>0 && parseInt(saldo)-quantity>=0){
					log.info("EXISTE O SUFICIENTE")
					
					availableProducts += arrayProducts[i]+";"
				}
				if(parseInt(saldo)>0 && parseInt(saldo)-quantity<0){
					log.info("EXISTE MAS NÃO SUFICIENTE")
					availableProducts += arrayProducts[i]+";"
					unavailableProducts += arrayProducts[i]+";"
				}
			}
	
		
	
	}
	log.info("produtos Disponiveis =>"+availableProducts+" primeiro Produto=>"+availableProducts[0]+" tamanho do array =>"+availableProducts)
	log.info("produtos Indisponiveis =>"+unavailableProducts+" primeiro Produto=>"+unavailableProducts[0]+" tamanho do array =>"+unavailableProducts)
	availableProducts&&availableItemsFunction(availableProducts)
	unavailableProducts&&unavailableItemsFunction(unavailableProducts)
	hAPI.setCardValue("availableProducts", availableProducts)
	hAPI.setCardValue("unavailableProducts", unavailableProducts)
}
function availableItemsFunction(availableProducts){
	var nomeDataServer = "MOVMOVIMENTOTBCDATA";
 	var usuario = "fluig";
 	var senha = "fluig";
 	var context = "CODCOLIGADA=2;CODFILIAL=1;";
	var products = availableProducts.split(";")
	var requester = hAPI.getCardValue("requester").split(" - ")[0]
	var centroCusto = hAPI.getCardValue("centroCusto").split(" - ")[0]
	var departamento = hAPI.getCardValue("departamento").split(" - ")[0]
	var historicoCurto = hAPI.getCardValue("historicoCurto")
	log.info("FUNCAO AVAILABLE ITEMS")
	log.info("SOLICITANTE =>" + requester+ " CENTRO DE CUSTO =>"+centroCusto+ " DEPARTAMENTO =>"+departamento+ "HISTORICO CURTO=>"+ historicoCurto)
	products.pop()
	var XMLData = "<MovMovimento>"
	XMLData += "<TMOV>"
    XMLData += "<CODCOLIGADA>2</CODCOLIGADA>"
    XMLData += "<IDMOV>-1</IDMOV>"
    XMLData += "<CODTMV>1.1.80</CODTMV>"
    XMLData += "<CODCCUSTO>"+centroCusto+"</CODCCUSTO>"
    XMLData += "<HISTORICOCURTO>"+historicoCurto+"</HISTORICOCURTO>"
    XMLData += "<CODDEPARTAMENTO>"+departamento+"</CODDEPARTAMENTO>"
    XMLData += "<CODFILIAL>1</CODFILIAL>"
    XMLData += "<SERIE>PM</SERIE>"
    XMLData += "<NUMEROMOV>-1</NUMEROMOV>"
    XMLData += "<CODVEN2>"+requester+"</CODVEN2>"
	XMLData += "</TMOV>"
	for(var i = 0; i<products.length;i++){
		var product = hAPI.getCardValue("product___"+products[i]).split(" - ")[0]
		var id = hAPI.getCardValue("idprd___"+products[i])
		var frota = hAPI.getCardValue("frota___"+products[i])
		var centroCustoProduto = hAPI.getCardValue("centroCustoProduto___"+products[i]).split(" - ")[0]
		var historicoCurtoProduto = hAPI.getCardValue("historicoCurtoProduto___"+products[i]).split(" - ")[0]
		var c1 = DatasetFactory.createConstraint("ID", hAPI.getCardValue("idprd___"+products[i]) , hAPI.getCardValue("idprd___"+products[i]) , ConstraintType.MUST);  
		var dataset = DatasetFactory.getDataset("ds_RequisicaoMateriak_ConsultaSaldoProduto", null, new Array(c1), null);
		var quantidade = hAPI.getCardValue("quantity___"+products[i])
		var saldo = dataset.getValue(0, "SALDO")
		quantidade>=saldo? quantidade=saldo:false
		log.info("PRODUTO => "+product+" Quantidade=>"+quantidade)
		XMLData += "<TITMMOV>  "
		XMLData += "<CODCOLIGADA>2</CODCOLIGADA>  "
		XMLData += "<IDMOV>-1</IDMOV>"
		XMLData += "<CODFILIAL>1</CODFILIAL> "
		XMLData += "<NSEQITMMOV>"+(i+1)+"</NSEQITMMOV> "
		XMLData += "<IDPRD>"+id+"</IDPRD>     "
		XMLData += "<QUANTIDADE>"+quantidade.replace(".",",")+"</QUANTIDADE>   "
		XMLData += "<CODLOC>01</CODLOC>     "
		XMLData += "<CODCCUSTO>"+centroCustoProduto+"</CODCCUSTO>"
		frota?XMLData+="<CAMPOLIVRE>"+frota+"</CAMPOLIVRE>":false
		XMLData += "<HISTORICOCURTO>"+historicoCurtoProduto+"</HISTORICOCURTO> "
		XMLData += "</TITMMOV>"
	}
	XMLData +="</MovMovimento>"
	log.info("XML =>"+XMLData)
	try {
		var authService = getWebService(usuario, senha);
		var result = new String(authService.saveRecord(nomeDataServer, XMLData, context));
		log.info('==> DevDebug Script Diagrama: ' + result);
		if(result[0]==2){
			hAPI.setCardValue("numMov", result.split(";")[1])
		}
		else{
			throw "Ocorreu um erro na inteegração com RM" + result
		}
	  } catch (error) {
		log.info('==> DevDebug Error Script Diagrama: ' + error);
		throw "Erro na Integração com o RM: "+ error
	}

}
function unavailableItemsFunction(unavailableProducts){
	var nomeDataServer = "MOVMOVIMENTOTBCDATA";
 	var usuario = "fluig";
 	var senha = "fluig";
 	var context = "CODCOLIGADA=2;CODFILIAL=1;";
	var products = unavailableProducts.split(";")
	var dataEntrega=hAPI.getCardValue("dataEntrega").split("/").reverse().join("-")+"T00:00:00"
	var requester = hAPI.getCardValue("requester").split(" - ")[0]
	var centroCusto = hAPI.getCardValue("centroCusto").split(" - ")[0]
	var departamento = hAPI.getCardValue("departamento").split(" - ")[0]
	var historicoCurto = hAPI.getCardValue("historicoCurto")
	log.info("FUNCAO UNAVAILABLE ITEMS")
	log.info("SOLICITANTE =>" + requester+ " CENTRO DE CUSTO =>"+centroCusto+ " DEPARTAMENTO =>"+departamento+ "HISTORICO CURTO=>"+ historicoCurto)
	products.pop()
	var XMLData = "<MovMovimento>"
	XMLData += "<TMOV>"
    XMLData += "<CODCOLIGADA>2</CODCOLIGADA>"
    XMLData += "<IDMOV>-1</IDMOV>"
    XMLData += "<CODTMV>1.1.01</CODTMV>"
    XMLData += "<HISTORICOCURTO>"+historicoCurto+"</HISTORICOCURTO>"
    XMLData += "<CODDEPARTAMENTO>"+departamento+"</CODDEPARTAMENTO>"
	XMLData += "<CODCCUSTO>"+centroCusto+"</CODCCUSTO>"
	XMLData += "<DATAENTREGA>"+dataEntrega+"</DATAENTREGA>"
    XMLData += "<CODFILIAL>1</CODFILIAL>"
    XMLData += "<SERIE>SC</SERIE>"
    XMLData += "<NUMEROMOV>-1</NUMEROMOV>"
    XMLData += "<CODVEN2>"+requester+"</CODVEN2>"
	XMLData += "</TMOV>"
	for(var i = 0; i<products.length;i++){
		var product = hAPI.getCardValue("product___"+products[i]).split(" - ")[0]
		var frota = hAPI.getCardValue("frota___"+products[i])
		var id = hAPI.getCardValue("idprd___"+products[i])
		var centroCustoProduto = hAPI.getCardValue("centroCustoProduto___"+products[i]).split(" - ")[0]
		var historicoCurtoProduto = hAPI.getCardValue("historicoCurtoProduto___"+products[i]).split(" - ")[0]
		var c1 = DatasetFactory.createConstraint("ID", hAPI.getCardValue("idprd___"+products[i]) , hAPI.getCardValue("idprd___"+products[i]) , ConstraintType.MUST);  
		var dataset = DatasetFactory.getDataset("ds_RequisicaoMateriak_ConsultaSaldoProduto", null, new Array(c1), null);
		var quantidade = hAPI.getCardValue("quantity___"+products[i])
		var saldo = dataset.getValue(0,"SALDO")?dataset.getValue(0,"SALDO"):0
		quantidade=quantidade-saldo
		log.info("PRODUTO => "+product+" Quantidade=>"+quantidade)
		XMLData += "<TITMMOV>  "
		XMLData += "<CODCOLIGADA>2</CODCOLIGADA>  "
		XMLData += "<IDMOV>-1</IDMOV>"
		XMLData += "<CODFILIAL>1</CODFILIAL> "
		XMLData += "<NSEQITMMOV>"+(i+1)+"</NSEQITMMOV> "
		XMLData += "<IDPRD>"+id+"</IDPRD>"
		XMLData += "<QUANTIDADE>"+quantidade+"</QUANTIDADE>"		
		XMLData += "<CODCCUSTO>"+centroCustoProduto+"</CODCCUSTO>"
		XMLData += "<HISTORICOCURTO>"+historicoCurtoProduto+"</HISTORICOCURTO> "
		frota?XMLData+="<CAMPOLIVRE>"+frota+"</CAMPOLIVRE>":false
		XMLData += "</TITMMOV>"
	}
	XMLData +="</MovMovimento>"
	log.info("XML =>"+XMLData)
	try {
		var authService = getWebService(usuario, senha);
		var result = new String(authService.saveRecord(nomeDataServer, XMLData, context));
		if(result[0] != 2){
			throw result
		}		
		log.info('==> DevDebug Script Diagrama: ' + result);
	  } catch (error) {
		log.info('==> DevDebug Error Script Diagrama: ' + error);
		throw "Erro na Integração com o RM: "+ error
	}

}
function getWebService(Usuario, Senha){
	var Nome_Servico = "wsDataServer";
	var Caminho_Servico = "com.totvs.WsDataServer";
	
	var dataServerService = ServiceManager.getServiceInstance(Nome_Servico);
	if(dataServerService == null){
	  throw "Servico nao encontrado: " + Nome_Servico;
	}
	
	var serviceLocator = dataServerService.instantiate(Caminho_Servico);
	if(serviceLocator == null){
	  throw "Instancia do servico nao encontrada: " + Nome_Servico + " - " + Caminho_Servico;
	}
  
	var service = serviceLocator.getRMIwsDataServer();	
	if(service == null){
	  throw "Instancia do dataserver do invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}
  
	var serviceHelper = dataServerService.getBean();
	if(serviceHelper == null){
	  throw "Instancia do service helper invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}
  
	var authService = serviceHelper.getBasicAuthenticatedClient(service, "com.totvs.IwsDataServer", Usuario, Senha);	  
	if(serviceHelper == null){
	  throw "Instancia do auth service invalida: " + Nome_Servico + " - " + Caminho_Servico;
	}
	
	return authService;
  }