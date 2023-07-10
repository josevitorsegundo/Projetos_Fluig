
function createDataset(fields, constraints, sortFields) {
	log.info("DEVDEBUG => #01 Start Dataset DS_CONSULTAPRODUTOS");
	
	var usuario = "fluig";
	var senha = "fluig";
	var nomeServico = "wsConsultaSql";
	var caminhoServico = "com.totvs.WsConsultaSQL";
	
	var colunas = new Array("DESCRICAO", "IDPRD", "UNIDADE", "SALDO", "PRATELEIRA");
	var dataset = DatasetBuilder.newDataset();
	
	for (var i = 0; i < colunas.length; i++) {
	  dataset.addColumn(colunas[i]);
	}
	
	var servico = ServiceManager.getService(nomeServico);
	var instancia = servico.instantiate(caminhoServico);
	var ws = instancia.getRMIwsConsultaSQL();
	var serviceHelper = servico.getBean();
	var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsConsultaSQL", usuario, senha);
	
	log.info("DEVDEBUG => #02 authService " + authService);
	var result = authService.realizarConsultaSQL("FLUIG001", 0, "T", '');
	var JSONObj = org.json.XML.toJSONObject(result);
	var dados = JSONObj.get("NewDataSet").get("Resultado");	
	for(var i = 0;i<dados.length();i++){
	  
	  var registro = dados.get(i)
	  dataset.addRow(new Array(registro.get("DESCRICAO"), registro.get("IDPRD"), registro.get("UNIDADE"), registro.has("SALDO")? registro.get("SALDO"):null,  registro.has("PRATELEIRA")? registro.get("PRATELEIRA"):null))
	}
	
	return dataset;
}  
