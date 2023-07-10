function afterProcessCreate(processId){
	var dataAtual = getCurrentDate(); 

	// [Inicio] Campos de controle
	hAPI.setCardValue("numeroFluxo", processId);
	hAPI.setCardValue("numeroSolicitacao", processId);
	hAPI.setCardValue("dataInicio", dataAtual);
	hAPI.setCardValue("situacao", "Novo");
	// [Fim] Campos de controle
}