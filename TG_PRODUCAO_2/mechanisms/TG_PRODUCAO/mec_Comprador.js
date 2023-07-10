function resolve(process,colleague){

	var userList = new java.util.ArrayList();
	var aprovador = hAPI.getCardValue("chapa")
	log.info("DEBUG MEC APROVADOR "+aprovador)
	userList.add(aprovador)
	userList.add("ti")
	
	return userList;

}