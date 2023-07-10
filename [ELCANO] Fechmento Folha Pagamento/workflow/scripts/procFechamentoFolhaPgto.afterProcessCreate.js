function afterProcessCreate(processId){
	
	hAPI.setCardValue("numeroFluxo", processId);
	hAPI.setCardValue("dataCriacao", dataCorrente("dd/MM/yyyy"));
	hAPI.setCardValue("situacao", "Aberta");

	
/*	var campoDescritor = 
		 "Campo1: " + hAPI.getCardValue("CAMPO") + " \n"+
		 "Campo2: "  + hAPI.getCardValue("CAMPO") + " \n"+
	     "Campo3: " + hAPI.getCardValue("CAMPO") ;
	  	 hAPI.setCardValue("campoDescritor", campoDescritor);*/
}

