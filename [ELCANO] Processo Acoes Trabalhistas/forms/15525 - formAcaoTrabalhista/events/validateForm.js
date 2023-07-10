function validateForm(form){
	var activity = getValue("WKNumState");
	var nextActivity = getValue("WKNextState");
	var msgErro = "";
		
	if (campoVazio(form, "zoomExFuncionario")){
		msgErro += "<li>Ex-Funcionário</li>";
	}
	
	if (campoVazio(form, "anexoNotificacao")){
		msgErro += "<li>Anexo da Notificação</li>";
	}
	
	if(activity == ANEXAR_CITACAO_8 && nextActivity != ANEXAR_CITACAO_8){
		if (campoVazio(form, "anexoCitacao")){
			msgErro += "<li>Anexo de Citação</li>";
		}
		if (campoVazio(form, "numeroProcesso")){
			msgErro += "<li>Número de Processo</li>";
		}
		if (campoVazio(form, "representanteReclamente")){
			msgErro += "<li>Representante do Reclamante</li>";
		}
	}
	
	if(activity == INSERIR_ANEXOS_OBRIGATORIOS_175 && nextActivity != INSERIR_ANEXOS_OBRIGATORIOS_175){
		if (campoVazio(form, "anexoIdentidade")){
			msgErro += "<li>Identidade</li>";
		}
		if (campoVazio(form, "anexoCTPS")){
			msgErro += "<li>Carteira de Trabalho</li>";
		}
		if (campoVazio(form, "anexoContrato")){
			msgErro += "<li>Contrato Trabalho</li>";
		}
		if (campoVazio(form, "anexoComprovante")){
			msgErro += "<li>Comprovante de Residência</li>";
		}
		if (campoVazio(form, "anexoFicha")){
			msgErro += "<li>Ficha Financeira</li>";
		}
		if (campoVazio(form, "anexoRegistro")){
			msgErro += "<li>Ficha de Registro</li>";
		}
	}
	
	if(activity == ELABORAR_SUBSIDIOS_25 && nextActivity != ELABORAR_SUBSIDIOS_25){
		if (campoVazio(form, "anexoSubsidios")){
			msgErro += "<li>Anexo dos Subsídios</li>";
		}		
	}
	
	if (activity == ANALISAR_SUBSIDIOS_26 && nextActivity != ANALISAR_SUBSIDIOS_26){
		
		if (campoVazio(form, "decisaoDRH")){
			msgErro += "<li>Decisão</li>";
		}	
		
		
		if (form.getValue('decisaoDRH') == "ajuste"){
			if (campoVazio(form, "justificativaDRH")){
				msgErro += "<li>Justificativa do Diretor</li>";
			}	
		}
	}
	
	if(activity == ANALISAR_DOCUMENTACOES_37 && nextActivity != ANALISAR_DOCUMENTACOES_37){
		if (campoVazio(form, "decisaoJuridico")){
			msgErro += "<li>Decisão</li>";
		}	
		
		if (form.getValue('decisaoJuridico') == "ajuste"){
			if (campoVazio(form, "justificativaJuridico")){
				msgErro += "<li>Justificativa do Jurídico</li>";
			}	
		}
	}
	
	if (activity == ENVIAR_EMAIL_ESC_ADIVOC_161 && nextActivity != ENVIAR_EMAIL_ESC_ADIVOC_161){
		if (campoVazio(form, "emailEscritrioAdvocacia")){
			msgErro += "<li>Corpo do e-mail a ser enviado ao escritório</li>";
		}
	}
	
	if (activity == ANALISAR_DEC_ESCRITORIO_54 && nextActivity != ANALISAR_DEC_ESCRITORIO_54){
		if (campoVazio(form, "decisaoEscritorio")){
			msgErro += "<li>Decisão do Escritório</li>";
		}
		
		if ((form.getValue("decisaoEscritorio") == "aprovado") && (campoVazio(form, "anexoContestacao"))){
			msgErro += "<li>Anexar Contestação</li>";
		}
		
		if ((form.getValue("decisaoEscritorio") == "maisInformacoes") && (campoVazio(form, "passarPeloRH"))){
			msgErro += "<li>Passar pelo RH ?</li>";
		}
	}
	
	if (activity == ACOMPANHAR_PROCESSO_JUR_65 && nextActivity != ACOMPANHAR_PROCESSO_JUR_65){
		
		if (campoVazio(form, "novaDemandas")){
			msgErro += "<li>Há novas demandas ?</li>";
		}
		
		if ((form.getValue("novaDemandas") == "sim") && (campoVazio(form, "novasDemandas"))){
			msgErro += "<li>Descrição de novas demandas</li>";
		}
		
		if ((form.getValue("novaDemandas") == "sim") && (campoVazio(form, "haveraPericia"))){
			msgErro += "<li>Haverá Perícia ?</li>";
		}
		
		if ((form.getValue("novaDemandas") == "nao") && (campoVazio(form, "processoArquivado"))){
			msgErro += "<li>Processo Arquivado ?</li>";
		}
		
		if ((form.getValue("haveraPericia") == "sim") && (campoVazio(form, "tipoPericia"))){
			msgErro += "<li>Tipo de Perícia</li>";
		}
	}
	
	if (activity == VERIFICAR_DEMANDA_DRH_86 && nextActivity == ACOMPANHAR_PROCESSO_JUR_65){
		if ((form.getValue("haveraPericia") == "sim") && (campoVazio(form, "peritoAssisnte"))){
			msgErro += "<li>Nome do Perito Assistente</li>";
		}
		
	}
	
	if (activity == VERIFICAR_DEMANDA_GRH_87 && nextActivity != VERIFICAR_DEMANDA_GRH_87){
		if ((form.getValue("haveraPericia") == "sim") && (campoVazio(form, "peritoAssisnte"))){
			msgErro += "<li>Nome do Perito Assistente</li>";
		}
		
		
	}
	
	if (msgErro != ""){
		msgErro = "<ul>" + msgErro + "</ul>";
		exibirMensagem(form, "Favor informar os campos <b>obrigatórios:</b><br/>"+msgErro);
	}
}

function campoVazio(form, fieldname){
	if ((form.getValue(fieldname) == null) || (form.getValue(fieldname) == undefined) || (form.getValue(fieldname).trim() == "")){
		return true;
	} // if
	return false;
} // campoVazio

function exibirMensagem(form, mensagem){
	var mobile = form.getMobile() != null && form.getMobile();
	
	if (mobile) {
		throw mensagem;
	} else {
		throw "<div class='alert alert-warning' role='alert'>" +
				"<strong>Atenção:</strong> "+mensagem+
			  "</div>"+
			  "<i class='fluigicon fluigicon-tag icon-sm'></i> <font style='font-weight: bold'>Dúvidas?</font> Entre em contato com o departamento de TI.";		
	} // else if
} // exibirMensagem