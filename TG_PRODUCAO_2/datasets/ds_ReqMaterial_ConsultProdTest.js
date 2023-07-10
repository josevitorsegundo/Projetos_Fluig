function defineStructure() {
	log.info("@@@ #### JVLSS_0 DefineStructure Dataset ds_ReqMaterial_ConsultProdTest");
	addColumn("DESCRICAO")
	addColumn("IDPRD")
    addColumn("UNIDADE")
    addColumn("SALDO")
    addColumn("PRATELEIRA")
    setKey(["IDPRD"])
    addIndex([ "IDPRD", "DESCRICAO" ])
    log.info("@@@ #### JVLSS_0 Dataset DefineStructure ds_ReqMaterial_ConsultProdTest");
}
function onSync(lastSyncDate) {
    log.info("@@@ #### JVLSS_1 Dataset ds_ReqMaterial_ConsultProdTest");
    var dataset = DatasetBuilder.newDataset();
    var c1 = DatasetFactory.createConstraint("sqlLimit", "50000", "50000", ConstraintType.MUST);
    var result = DatasetFactory.getDataset("ds_RequisicaoMaterial_ConsultaProduto", null, new Array(c1), null);
    log.info("Dataset Jornalizado Test=>" + result.values.length)
    for(var i = 0;i<result.rowsCount;i++){       
        dataset.addOrUpdateRow(new Array(result.getValue(i, "DESCRICAO"), result.getValue(i,"IDPRD"),result.getValue(i, "UNIDADE"), result.getValue(i, "SALDO"),result.getValue(i, "PRATELEIRA")))
      }
    console.info("@@@@@@ ds_ReqMaterial_ConsultProdTest ");
    console.info("@@@@@@ ds_ReqMaterial_ConsultProdTest lastSyncDate: "+lastSyncDate);
    console.info("@@@@@@ ds_ReqMaterial_ConsultProdTest dataset" +dataset);
	return dataset
}