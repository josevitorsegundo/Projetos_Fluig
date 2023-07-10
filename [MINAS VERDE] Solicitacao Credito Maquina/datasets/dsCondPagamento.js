function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("DESCRICAO", DatasetFieldType.STRING);	
	
	dataset.addRow(new Array("CP01", "Vista"));
	dataset.addRow(new Array("CP02", "Prazo"));
	
	return dataset
}