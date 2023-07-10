function beforeCancelProcess(colleagueId,processId){
	var dataCorrente = obterDataCorrente();

	hAPI.setCardValue("situacao", "Cancelado");
	hAPI.setCardValue("dataFinalizacao", dataCorrente);
}