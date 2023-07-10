function defineStructure(){
	addColumn("DESCRICAO")
	addColumn("IDPRD")
    addColumn("UNIDADE")
    addColumn("SALDO")
    addColumn("PRATELEIRA")
    setKey(["IDPRD"])
    //setIndex(["IDPRD","DESCRICAO"]) // Analisar
    addIndex([ "IDPRD", "DESCRICAO" ])
    
}
function onSync(lastSyncDate){
	var dataset = DatasetBuilder.newDataset();
    var c1 = DatasetFactory.createConstraint("sqlLimit", "50000", "50000", ConstraintType.MUST);
    var result = DatasetFactory.getDataset("ds_RequisicaoMaterial_ConsultaProduto", null, new Array(c1), null);
    log.info("Dataset Jornalizado=>" + result.rowsCount)
    for(var i = 0;i<result.rowsCount;i++){ 
       
        dataset.addOrUpdateRow(new Array(result.getValue(i, "DESCRICAO"), result.getValue(i,"IDPRD"),result.getValue(i, "UNIDADE"), result.getValue(i, "SALDO"),result.getValue(i, "PRATELEIRA")))
      }
    console.info("@@@@@@ ds_RequisicaoMaterial_ConsultaProdutoSync");
    console.info("@@@@@@ ds_RequisicaoMaterial_ConsultaProdutoSync lastSyncDate: "+lastSyncDate);
    console.info("@@@@@@ ds_RequisicaoMaterial_ConsultaProdutoSync dataset" +dataset);
	return dataset
}