function servicetask7(attempt, message) {
	log.info("DEBUG INTEGRAÇÃO RM => START")	
	var products = hAPI.getCardValue("products")
	var tam = products.split(";").length
	var arrayProducts = []
	for(var i = 1;i<=tam ;i++ ){
		arrayProducts.push(i)
	}
	log.info("produtos:" + products+" array:"+arrayProducts+" array length:"+arrayProducts.length)
	var availableProducts = ""
	var unavailableProducts = ""
	for(var i = 0;i<arrayProducts.length;i++){		
			var c1 = DatasetFactory.createConstraint("ID", hAPI.getCardValue("idprd___"+arrayProducts[i]) , hAPI.getCardValue("idprd___"+arrayProducts[i]) , ConstraintType.MUST);  
			log.info("VALOR DO CARD: "+hAPI.getCardValue("idprd___"+arrayProducts[i]))    
			var dataset = DatasetFactory.getDataset("ds_RequisicaoMateriak_ConsultaSaldoProduto", null, new Array(c1), null);
			var quantity = parseFloat(hAPI.getCardValue("quantity___"+arrayProducts[i]))
			log.info("RESULTADO DS =>"+dataset)
			var saldo = dataset.getValue(0, "SALDO")
			log.info("SaLDO:"+saldo)
			if(parseFloat(saldo) <= 0 || saldo ==""){
				log.info("NAO EXISTE")
				unavailableProducts += arrayProducts[i]+";"
			}
			else{
				if(parseFloat(saldo)>0 && parseFloat(saldo)-quantity>=0){
					log.info("EXISTE O SUFICIENTE")
					
					availableProducts += arrayProducts[i]+";"
				}
				if(parseFloat(saldo)>0 && parseFloat(saldo)-quantity<0){
					log.info("EXISTE MAS NÃO SUFICIENTE")
					availableProducts += arrayProducts[i]+";"
					unavailableProducts += arrayProducts[i]+";"
				}
			}
	
		
	
	}
	log.info("produtos Disponiveis =>"+availableProducts+" primeiro Produto=>"+availableProducts[0]+" tamanho do array =>"+availableProducts)
	log.info("produtos Indisponiveis =>"+unavailableProducts+" primeiro Produto=>"+unavailableProducts[0]+" tamanho do array =>"+unavailableProducts)
	hAPI.setCardValue("availableProducts", availableProducts)
	hAPI.setCardValue("unavailableProducts", unavailableProducts)
}