function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("NOME", DatasetFieldType.STRING);	
	
	dataset.addRow(new Array("V01", "Vendedor Fulano"));
	dataset.addRow(new Array("V02", "Vendedor Beltrano"));	
		
	
	return dataset
}