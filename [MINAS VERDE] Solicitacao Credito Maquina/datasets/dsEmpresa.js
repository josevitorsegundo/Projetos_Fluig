function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("NOME", DatasetFieldType.STRING);
	
	dataset.addRow(new Array("A01", "EMPPRESA 01"));
	dataset.addRow(new Array("B02", "EMPRESA 02"));
	
	return dataset
}