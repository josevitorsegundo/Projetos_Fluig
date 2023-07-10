function beforeCancelProcess(colleagueId,processId){

	var comentario = getValue("WKUserComment");

	hAPI.setCardValue("situacao", "Cancelado");
	hAPI.setCardValue("dataFinalizacao", dataCorrente("dd/MM/yyyy"));
	
	
/*	if (comentario != null && comentario != "") {
		hAPI.setCardValue("motivoCancelamento", comentario);
	}*/
}