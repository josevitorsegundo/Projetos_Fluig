function beforeStateEntry(sequenceId){	
	if(sequenceId == 166){
		//startNewProcess();
	}
}

function startNewProcess(){
	try { 
		var Idprocess = "procFechamentoFolhaPgto" // Código do processo;
		var ativDest = 5; // Código da atividade de destino;
		var listaColab = new java.util.ArrayList(); // Lista (do tipo String) de usuários;
		var obs = "Iniciado automaticamente pelo processo de Solicitação de Compras: "; // Texto da observação;
		var completarTarefa = true; // Indica se deve completar a tarefa (true) ou apenas salvar (false);
		var formData = new java.util.HashMap(); // Um Mapa com os valores do formulário do processo;
		var modoGestor = false; // Indica que o usuário iniciará a solicitação como gestor (true) ou que o usuário iniciará a solicitação apenas como solicitante (false).
		
		// Dados do solicitante
		var idSolicitante = String(hAPI.getCardValue("solicitanteMatricula"));
		listaColab.add(idSolicitante);
		
		// Dados do formulário
		formData.put("solicitanteMatricula", idSolicitante);
		formData.put("solicitanteNome", String(hAPI.getCardValue("solicitanteNome")));
		formData.put("solicitanteEmail", String(hAPI.getCardValue("solicitanteEmail")));
		formData.put("codColigada", String(hAPI.getCardValue("codColigada")));
		formData.put("zoomColigada", String(hAPI.getCardValue("zoomColigada")));
		//formData.put("mesCompetencia", "10/2022");
		var periodoCompetencia = tratamentoMesCompetencia (String(hAPI.getCardValue("mesCompetencia")));
		formData.put("mesCompetencia", periodoCompetencia);
				
		var result = hAPI.startProcess(Idprocess, ativDest, listaColab, obs, completarTarefa, formData, modoGestor);
		var numProcess = result.get("iProcess");
		
		log.info("### result startProcess");
		log.dir(result);
		log.dir(formData.toString());
		log.info("Número da solicitação criada: " + numProcess);
		
		//Adicionar comentário na solicitação atual
		var usuario = getValue('WKUser'); //usuário logado
		var numSolicitacao = getValue("WKNumProces");
		var mensagem = "Processo criado de número: "+numProcess + " para o Mês Competência "+periodoCompetencia;
		hAPI.setTaskComments(idSolicitante, numSolicitacao, 0, mensagem);
		
		//Adicionar comentário na solicitação nova gerada
		mensagem = "Processo criado a partir da solicitação de número: "+numSolicitacao + " cujo Mês Competência corresponde: "+String(hAPI.getCardValue("mesCompetencia"));
		hAPI.setTaskComments(idSolicitante, numProcess, 0, mensagem);
	} catch (e) {
		log.error("### retorno erro beforeStateEntry");
		log.error(e);
		throw "function " + arguments.callee.name + " => " + e.toString();
	}
}

function tratamentoMesCompetencia (valuePerCompetencia){
	var valuePeriodoCompetencia = valuePerCompetencia.split("/");
	var mesPer = valuePeriodoCompetencia[0];	
	var mesPer = valueMesConvert(mesPer);	
	var anoPer = valuePeriodoCompetencia[1];
	anoPer = parseInt(anoPer);			
		
	var mesCompetencia = mesPer < 12 ? mesPer+1 : "1"  
	var anoCompetencia = mesPer < 12 ? anoPer : anoPer+1
	
	log.info("Competencia Mes: "+mesCompetencia+ " - tipo: " +typeof(mesCompetencia));
	log.info("Competencia Ano: "+anoCompetencia+ " - tipo: " +typeof(anoCompetencia));
			
	mesCompetencia = mesCompetencia < 10 ? "0"+mesCompetencia : mesCompetencia	
	var periodoCompetencia =  String(mesCompetencia)+"/"+String(anoCompetencia);
	
	log.info ("Periodo competencia: "+periodoCompetencia);
	return periodoCompetencia;
}

function valueMesConvert (valueMes) {
	var retorno = 0;
	
	switch (valueMes) {
	case "01": 
		retorno = 1;
		break;
	case "02": 
		retorno = 2;
		break;
	case "03": 
		retorno = 3;
		break;
	case "04": 
		retorno = 4;
		break;
	case "05": 
		retorno = 5;
		break;
	case "06": 
		retorno = 6;
		break;
	case "07": 
		retorno = 7;
		break;
	case "08": 
		retorno = 8;
		break;
	case "09": 
		retorno = 9;
		break;
	case "10": 
		retorno = 10;
		break;
	case "11": 
		retorno = 11;
		break;
	case "12": 
		retorno = 12;
		break;
	default:
		break;
	}	
	log.info("function valueMesConvert retorno : "+retorno)
	return retorno;
}