function obterDataCorrente(){
	var dateCorrente = new Date();
	var formatoData = new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	return formatoData.format(dateCorrente);
} 

function getCurrentDate() {
	return (new java.text.SimpleDateFormat('dd/MM/yyyy')).format(new Date());
}

function getCurrentTime() {
	return (new java.text.SimpleDateFormat('HH:mm')).format(new Date());
}

function format2Number(valor){
	if (valor == null || valor == undefined || valor == ""){
		return 0;
	}
	while (valor.indexOf(".") >= 0){
		valor = valor.replace(".", "");
	}
	if (valor.indexOf(",") >= 0){
		valor = valor.replace(",", ".");
	}
	var novoValor = Number(valor);
	if (isNaN(novoValor)){
		novoValor = 0;
	}
	return novoValor;
}

function formataDataDDMMYYYY(data){
	var dataStr = ""+data;
	if (dataStr.indexOf("-") >= 0){
		var dataSplit = dataStr.split("-");
		dataStr = ""+dataSplit[2]+"/"+dataSplit[1]+"/"+dataSplit[0];
	}
	return dataStr;
}

function obtemUsuarioFluigPeloEmail(email) {
	if (email == null || email == undefined || email == "undefined" || email.trim() == ""){
		return false;
	}
	var c1 = DatasetFactory.createConstraint("mail", email.toLowerCase(), email.toLowerCase(), ConstraintType.MUST);
	c1.setLikeSearch( true );
	var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
	var filtros = new Array(c1, c2);
	var fields = new Array("colleaguePK.colleagueId", "mail");
	var dsUsuario = DatasetFactory.getDataset("colleague", fields, filtros, null);
	
	if (dsUsuario != null && dsUsuario.rowsCount > 0) {
		return dsUsuario.getValue(0, "colleaguePK.colleagueId");
	} else {
		throw "Não foi possível encontrar um usuário ativo para o e-mail: " + email;
	}
}

function obtemEmailPeloUsuarioFluig(matricula) {
	if (matricula == null || matricula == undefined || matricula == "undefined" || matricula.trim() == ""){
		return false;
	}
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", matricula, matricula, ConstraintType.MUST);
	c1.setLikeSearch( false );
	var c2 = DatasetFactory.createConstraint("active", "true", "true", ConstraintType.MUST);
	var filtros = new Array(c1, c2);
	var fields = new Array("mail");
	var dsUsuario = DatasetFactory.getDataset("colleague", fields, filtros, null);
	return dsUsuario.getValue(0, "mail");
}