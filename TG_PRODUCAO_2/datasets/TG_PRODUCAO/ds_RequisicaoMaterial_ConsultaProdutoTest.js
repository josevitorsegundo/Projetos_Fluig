function defineStructure() {
	log.info("@@@ #### JVLSS_0 DefineStructure Dataset ds_RequisicaoMaterial_ConsultaProdutoTest");
	addColumn("DESCRICAO")
	addColumn("IDPRD")
    addColumn("UNIDADE")
    addColumn("SALDO")
    addColumn("PRATELEIRA")
    setKey(["IDPRD"])
    addIndex([ "IDPRD", "DESCRICAO" ])
    log.info("@@@ #### JVLSS_0 Dataset DefineStructure ds_RequisicaoMaterial_ConsultaProdutoTest");
}
function onSync(lastSyncDate) {
    log.info("@@@ #### JVLSS_1 Dataset ds_RequisicaoMaterial_ConsultaProdutoTest");
    
//    var dataset = DatasetBuilder.newDataset();
//    var c1 = DatasetFactory.createConstraint("sqlLimit", "50000", "50000", ConstraintType.MUST);
//    var result = DatasetFactory.getDataset("ds_RequisicaoMaterial_ConsultaProduto", null, new Array(c1), null);
//    log.info("Dataset Jornalizado Test=>" + result.values.length)  
//    for(var i = 0;i<result.values.length;i++){       
//        dataset.addOrUpdateRow(new Array(result.getValue(i, "DESCRICAO"), result.getValue(i,"IDPRD"),result.getValue(i, "UNIDADE"), result.getValue(i, "SALDO"),result.getValue(i, "PRATELEIRA")))
//      }
    
    var usuario = "fluig";
	var senha = "fluig";
	var nomeServico = "wsConsultaSql";
	var caminhoServico = "com.totvs.WsConsultaSQL";
	
	//var colunas = new Array("DESCRICAO", "IDPRD", "UNIDADE", "SALDO", "PRATELEIRA");
	var dataset = DatasetBuilder.newDataset();
	
//	for (var i = 0; i < colunas.length; i++) {
//	  dataset.addColumn(colunas[i]);
//	}
	
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
	  dataset.addOrUpdateRow(new Array(registro.get("DESCRICAO"), registro.get("IDPRD"), registro.get("UNIDADE"), registro.has("SALDO")? registro.get("SALDO"):null,  registro.has("PRATELEIRA")? registro.get("PRATELEIRA"):null))
	}
    
    console.info("@@@@@@ ds_RequisicaoMaterial_ConsultaProdutoTest ");
    console.info("@@@@@@ ds_RequisicaoMaterial_ConsultaProdutoTest lastSyncDate: "+lastSyncDate);
    console.info("@@@@@@ ds_RequisicaoMaterial_ConsultaProdutoTest dataset" +dataset);
	return dataset
}
//function createDataset(fields, constraints, sortFields) {}