function defineStructure(){
	log.info("#### JAF");
	addColumn("DESCRICAO")
	addColumn("IDPRD")
    addColumn("UNIDADE")
    addColumn("SALDO")
    addColumn("PRATELEIRA")
    setKey(["IDPRD"])
    //setIndex(["IDPRD","DESCRICAO"]) // Analisar
    addIndex([ "IDPRD", "DESCRICAO" ])
    log.info("#### JAF 2");
}
function onSync(lastSyncDate){
	log.info("#### JAF onSync");
	var dataset = DatasetBuilder.newDataset();
    var c1 = DatasetFactory.createConstraint("sqlLimit", "50000", "50000", ConstraintType.MUST);
    var result = DatasetFactory.getDataset("ds_RequisicaoMaterial_ConsultaProduto", null, new Array(c1), null);
    log.info("Dataset Jornalizado=>" + result.rowsCount)
    for(var i = 0;i<result.rowsCount;i++){
	  
       
        dataset.addOrUpdateRow(new Array(result.getValue(i, "DESCRICAO"), result.getValue(i,"IDPRD"),result.getValue(i, "UNIDADE"), result.getValue(i, "SALDO"),result.getValue(i, "PRATELEIRA")))
      }
    log.info("@@@@@@ ds_RequisicaoMaterial_ConsultaProdutoSync");
    log.info("@@@@@@ ds_RequisicaoMaterial_ConsultaProdutoSync lastSyncDate: "+lastSyncDate);
    log.info("@@@@@@ ds_RequisicaoMaterial_ConsultaProdutoSync dataset" +dataset);
	return dataset
}