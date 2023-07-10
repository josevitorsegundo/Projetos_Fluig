function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("CHASSI", DatasetFieldType.STRING);	
	
	dataset.addRow(new Array("E01", "CH01A2021"));
	dataset.addRow(new Array("E02", "CH02A2022"));	
	dataset.addRow(new Array("E01", "CH03A2021"));
	dataset.addRow(new Array("E02", "CH04A2022"));	
	
	return dataset
}

function defineStructure() {
	
	addColumn("CODIGO", DatasetFieldType.STRING);
	addColumn("CHASSI", DatasetFieldType.STRING);	
	setKey(["CODIGO"]);
	addIndex(["CODIGO"]);

}

function onSync(lastSyncDate) {

	var dataset = DatasetBuilder.newDataset();		
	
	dataset.addOrUpdateRow(new Array("E01", "CH01A2021"));
	dataset.addOrUpdateRow(new Array("E02", "CH02A2022"));	
	dataset.addOrUpdateRow(new Array("E01", "CH03A2021"));
	dataset.addOrUpdateRow(new Array("E02", "CH04A2022"));		
	dataset.addOrUpdateRow(new Array("E03", "CH05A2023"));		
	
	return dataset;
}