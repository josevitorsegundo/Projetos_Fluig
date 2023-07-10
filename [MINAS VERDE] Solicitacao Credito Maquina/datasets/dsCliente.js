function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("CODLOJA", DatasetFieldType.STRING);
	dataset.addColumn("CPF_CNPJ", DatasetFieldType.STRING);	
	dataset.addColumn("NOME", DatasetFieldType.STRING);
	
	dataset.addRow(new Array("C01", "LOJA 01", "01234567890", "FULANO 01"));
	dataset.addRow(new Array("C02", "LOJA 02", "09876543210", "BELTRANO 02"));	
	
	return dataset
}