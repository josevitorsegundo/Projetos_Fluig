function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("EQUIPAMENTO", DatasetFieldType.STRING);
	dataset.addColumn("MARCA", DatasetFieldType.STRING);	
	dataset.addColumn("TIPO", DatasetFieldType.STRING);	
	dataset.addColumn("ANOFABRICACAO", DatasetFieldType.STRING);
	dataset.addColumn("VALOR", DatasetFieldType.STRING);
	
	dataset.addRow(new Array("E01", "EQUIPAMENTO 01", "MARCA 01", "COMUM", "2021","5.000,00"));
	dataset.addRow(new Array("E02", "EQUIPAMENTO 02", "MARCA 02", "COMUM", "2022","7.500,00"));	
	dataset.addRow(new Array("E03", "EQUIPAMENTO 03", "MARCA 02", "LINHA A5000", "2023","10.000,00"));	
	
	return dataset
}