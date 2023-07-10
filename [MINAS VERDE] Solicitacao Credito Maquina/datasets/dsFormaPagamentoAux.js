function defineStructure() {
	addColumn("CODIGO");
	addColumn("DESCRICAO");			
	setKey(["CODIGO"]);
	addIndex(["CODIGO"]);
}
function onSync(lastSyncDate) {
	var dataset = DatasetBuilder.newDataset();
			
	dataset.addRow(new Array("FP01", "Dinheiro"));
	dataset.addRow(new Array("FP02", "Cartão"));	
	dataset.addRow(new Array("FP03", "Cheque"));
	dataset.addRow(new Array("FP04", "Entrada + 30/60"));	
	dataset.addRow(new Array("FP05", "Entrada + 3"));
	dataset.addRow(new Array("FP06", "Entrada + 9 com 2% Mês"));	
		
	
	return dataset
}
function createDataset(fields, constraints, sortFields) {
	var dataset = DatasetBuilder.newDataset();
	
	dataset.addColumn("CODIGO", DatasetFieldType.STRING);
	dataset.addColumn("DESCRICAO", DatasetFieldType.STRING);	
	
	dataset.addRow(new Array("FP01", "Dinheiro"));
	dataset.addRow(new Array("FP02", "Cartão"));	
	dataset.addRow(new Array("FP03", "Cheque"));
	dataset.addRow(new Array("FP04", "Entrada + 30/60"));	
	dataset.addRow(new Array("FP05", "Entrada + 3"));
	dataset.addRow(new Array("FP06", "Entrada + 9 com 2% Mês"));	
		
	
	return dataset
}

