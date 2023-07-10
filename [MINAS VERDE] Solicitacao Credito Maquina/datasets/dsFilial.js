function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("NOME", DatasetFieldType.STRING);
	
	dataset.addRow(new Array("F01", "FILIAL 01"));
	dataset.addRow(new Array("F02", "FILIAL 02"));
	
	return dataset
}