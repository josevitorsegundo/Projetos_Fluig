function servicetask14(attempt, message) {
	var unavailableProducts = hAPI.getCardValue("unavailableProducts")
	//availableProducts&&availableItemsFunction(availableProducts)
	unavailableProducts&&unavailableItemsFunction(unavailableProducts)

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
		XMLData += "<QUANTIDADE>"+quantidade+"</QUANTIDADE>   "
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
		if(quantidade >= saldo&&saldo>0){
			quantidade = quantidade- saldo
		}		
		log.info("PRODUTO => "+product+" Quantidade=>"+quantidade)
		XMLData += "<TITMMOV>  "
		XMLData += "<CODCOLIGADA>2</CODCOLIGADA>  "
		XMLData += "<IDMOV>-1</IDMOV>"
		XMLData += "<CODFILIAL>1</CODFILIAL> "
		XMLData += "<NSEQITMMOV>"+(i+1)+"</NSEQITMMOV> "
		XMLData += "<IDPRD>"+id+"</IDPRD>"
		XMLData += "<QUANTIDADE>"+parseFloat(quantidade).toFixed(2).toString().replace(".",",")+"</QUANTIDADE>"		
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
		var numMov = result.split(";")[1]		
		var nomeDataServerProcess = "MovAprovarMovProc";
		var authServiceProcess = getWebServiceProcess(usuario,senha) 	
		var XMLAprovacao = "<MovAprovarMovProcParams>"
		XMLAprovacao += "<MovAprovacao>"
		XMLAprovacao += "<MovMovAprovacao>"
		XMLAprovacao += "<Ambiente>DotNet</Ambiente>"
		XMLAprovacao += "<CodColigada>2</CodColigada>"
		XMLAprovacao += "<CodCpg />"
		XMLAprovacao += "<CodFilial>0</CodFilial>"
		XMLAprovacao += "<CodLoc />"
		XMLAprovacao += "<CodSistema>T</CodSistema>"
		XMLAprovacao += "<CodTmv>1.1.01</CodTmv>"
		XMLAprovacao += "<CodUsuario>fluig</CodUsuario>"
		XMLAprovacao += "<IdMov>"+numMov+"</IdMov>"
		XMLAprovacao += "<IdPrd>0</IdPrd>"
		XMLAprovacao += "<IdProcesso>16</IdProcesso>"
		XMLAprovacao += "<NatAprovacao>1</NatAprovacao>"
		XMLAprovacao += "<NumSeqItmMov>0</NumSeqItmMov>"
		XMLAprovacao += "<TipoValidacao>2</TipoValidacao>"
		XMLAprovacao += "</MovMovAprovacao>"
		XMLAprovacao += "</MovAprovacao>                                             "
		XMLAprovacao += "</MovAprovarMovProcParams>"
		var resultProcess =  new String(authServiceProcess.executeWithParams(nomeDataServerProcess, XMLAprovacao))
		log.info("Aprovacao Result=> "+resultProcess)
		log.info("XML APROVACAO=> "+XMLAprovacao)
		if(result[0]==2){
			var c1 =  DatasetFactory.createConstraint("IDMOV", numMov , numMov , ConstraintType.MUST)
    		var resultMov  = DatasetFactory.getDataset("ds_Cotacao_NumMov", null , new Array(c1), null)
			var novoNumMov = resultMov.getValue(0,"NUMEROMOV")
			hAPI.setCardValue("identificador", novoNumMov)
			log.info("Novo Numero do Movimento=>"+novoNumMov)
			hAPI.setCardValue("numMovCompraNovo", novoNumMov)
			hAPI.setCardValue("numMovCompra", numMov)
		}
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
function getWebServiceProcess(Usuario, Senha){
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