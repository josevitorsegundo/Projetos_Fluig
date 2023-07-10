function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("NOME", DatasetFieldType.STRING);	
	dataset.addColumn("EMAIL", DatasetFieldType.STRING);	
	dataset.addColumn("MATRICULA", DatasetFieldType.STRING);	
	
	dataset.addRow(new Array("GR01", "Jose Vitor","josevitor.lopes@xplanning.com.br","josevitor.lopes"));		
	
	return dataset
}