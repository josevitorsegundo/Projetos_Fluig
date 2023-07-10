var loadFluig = FLUIGC.loading(window)
var _objDebug = new Object({usercode:"",modoAdmin:"nao"})

$(document).ready(function() {
	var atividade = getWKNumState();
	init();
	initAnexos();
	
	if ((atividade == 161) || (atividade == 54) || (atividade == 65) || (atividade == 86) || (atividade == 87) || (atividade == 75)){
		initRichEditor("emailEscritrioAdvocacia", 161);
	}
	
}); 

// LOAD
window.onload = function(){
	
	scrollElement();
	
	var atividade = getWKNumState();
	console.log("atividade: " + atividade);
	
    //SWITCHER RADIO
    FLUIGC.switcher.init("#switchEnviarRg");
    FLUIGC.switcher.init("#switchEnviarCtps");
    FLUIGC.switcher.init("#switchEnviarContrato");
    FLUIGC.switcher.init("#switchEnviarComprovanteRes");
    FLUIGC.switcher.init("#switchEnviarProcesso");
    FLUIGC.switcher.init("#switchEnviarNotificacao");
    FLUIGC.switcher.init("#switchEnviarCitacao");
    FLUIGC.switcher.init("#switchDocAdicionais");
    FLUIGC.switcher.init("#switchAlterSubsidio");
    
    
    var switchAlterSubsidio = FLUIGC.switcher.init('#switchAlterSubsidio'); 
	FLUIGC.switcher.onChange('#switchAlterSubsidio', function(event, state) {
		console.log("STATE: " + state);
		if (state === true) {
			this.value = 'true';
			$("#btnLimparSubsidios").show();
		} else if (state === false) {
			this.value = 'false';
			$("#btnLimparSubsidios").hide();
	    }
	});
	
	FLUIGC.switcher.onChange('#switchEnviarRg', function (event, state) {
		if (state === true) {
			$("#switchEnviarRgHide").val("s");
		} else if (state === false) {
			$("#switchEnviarRgHide").val("n");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchEnviarCtps', function (event, state) {
		if (state === true) {
			$("#switchEnviarCtpsHide").val("s");
		} else if (state === false) {
			$("#switchEnviarCtpsHide").val("n");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchEnviarContrato', function (event, state) {
		if (state === true) {
			$("#switchEnviarContratoHide").val("s");
		} else if (state === false) {
			$("#switchEnviarContratoHide").val("n");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchEnviarComprovanteRes', function (event, state) {
		if (state === true) {
			$("#switchEnviarComprovanteResHide").val("s");
		} else if (state === false) {
			$("#switchEnviarComprovanteResHide").val("n");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchEnviarFichaFin', function (event, state) {
		if (state === true) {
			$("#switchEnviarFichaFinHide").val("s");
		} else if (state === false) {
			$("#switchEnviarFichaFinHide").val("n");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchEnviarFichaRegistro', function (event, state) {
		if (state === true) {
			$("#switchEnviarFichaRegistroHide").val("s");
		} else if (state === false) {
			$("#switchEnviarFichaRegistroHide").val("n");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchEnviarNotificacao', function (event, state) {
		if (state === true) {
			$("#switchEnviarNotificacaoHide").val("s");
		} else if (state === false) {
			$("#switchEnviarNotificacaoHide").val("n");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchEnviarCitacao', function (event, state) {
		if (state === true) {
			$("#switchEnviarCitacaoHide").val("s");
		} else if (state === false) {
			$("#switchEnviarCitacaoHide").val("n");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchEnviarSubsidio', function (event, state) {
		if (state === true) {
			$("#switchEnviarSubsidioHide").val("s");
		} else if (state === false) {
			$("#switchEnviarSubsidioHide").val("n");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchNomearTestemunhas', function (event, state) {
		if (state === true) {
			$("#nomearTestemunhas").val("sim");
		} else if (state === false) {
			$("#nomearTestemunhas").val("nao");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchTestemunhaElcano', function (event, state) {
		if (state === true) {
			 $("#testemunhaColaborador").attr('style', '');
			 $("#textTestemunhaNome").attr('style', 'display:none');
			 
			 $("#chapaTestemunha").prop("readonly", true);
			 $("#cpfTestemunha").prop("readonly", true);
			 $("#telefoneTestemunha").prop("readonly", true);
			 $("#enderecoTestemunha").prop("readonly", true);
			 $("#hideSwitchTestemunha").val("sim");
		} else if (state === false) {
			$("#textTestemunhaNome").attr('style', '');
			 $("#testemunhaColaborador").attr('style', 'display:none');
			 
			 $("#cpfTestemunha").prop("readonly", false);
			 $("#telefoneTestemunha").prop("readonly", false);
			 $("#enderecoTestemunha").prop("readonly", false);
			 
			 $("#chapaTestemunha").val("");
			 $("#cpfTestemunha").val("");
			 $("#telefoneTestemunha").val("");
			 $("#enderecoTestemunha").val("");
			 $("#hideSwitchTestemunha").val("nao");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchTestemunhaElcano2', function (event, state) {
		if (state === true) {
			 $("#testemunhaColaborador2").attr('style', '');
			 $("#textTestemunhaNome2").attr('style', 'display:none');
			 
			 $("#chapaTestemunha2").prop("readonly", true);
			 $("#cpfTestemunha2").prop("readonly", true);
			 $("#telefoneTestemunha2").prop("readonly", true);
			 $("#enderecoTestemunha2").prop("readonly", true);
			 $("#hideSwitchTestemunha2").val("sim");
		} else if (state === false) {
			$("#textTestemunhaNome2").attr('style', '');
			 $("#testemunhaColaborador2").attr('style', 'display:none');
			 
			 $("#cpfTestemunha2").prop("readonly", false);
			 $("#telefoneTestemunha2").prop("readonly", false);
			 $("#enderecoTestemunha2").prop("readonly", false);
			 
			 $("#chapaTestemunha2").val("");
			 $("#cpfTestemunha2").val("");
			 $("#telefoneTestemunha2").val("");
			 $("#enderecoTestemunha2").val("");
			 $("#hideSwitchTestemunha2").val("nao");
	    }
	});
	
	FLUIGC.switcher.onChange('#switchTestemunhaElcano1', function (event, state) {
		if (state === true) {
			 $("#testemunhaColaborador1").attr('style', '');
			 $("#textTestemunhaNome1").attr('style', 'display:none');
			 
			 $("#chapaTestemunha1").prop("readonly", true);
			 $("#cpfTestemunha1").prop("readonly", true);
			 $("#telefoneTestemunha1").prop("readonly", true);
			 $("#enderecoTestemunha1").prop("readonly", true);
			 $("#hideSwitchTestemunha1").val("sim");
		} else if (state === false) {
			$("#textTestemunhaNome1").attr('style', '');
			 $("#testemunhaColaborador1").attr('style', 'display:none');
			 
			 $("#cpfTestemunha1").prop("readonly", false);
			 $("#telefoneTestemunha1").prop("readonly", false);
			 $("#enderecoTestemunha1").prop("readonly", false);
			 
			 $("#chapaTestemunha1").val("");
			 $("#cpfTestemunha1").val("");
			 $("#telefoneTestemunha1").val("");
			 $("#enderecoTestemunha1").val("");
			 $("#hideSwitchTestemunha1").val("nao");
	    }
	});
	
    if ($("#hideSwitchTestemunha").val() == "sim"){
    	$("#chapaTestemunha").prop("readonly", true);
		 $("#cpfTestemunha").prop("readonly", true);
		 $("#telefoneTestemunha").prop("readonly", true);
		 $("#enderecoTestemunha").prop("readonly", true);
    }
    
    if ($("#hideSwitchTestemunha1").val() == "sim"){
    	$("#chapaTestemunha1").prop("readonly", true);
		 $("#cpfTestemunha1").prop("readonly", true);
		 $("#telefoneTestemunha1").prop("readonly", true);
		 $("#enderecoTestemunha1").prop("readonly", true);
    }
    
    if ($("#hideSwitchTestemunha2").val() == "sim"){
    	$("#chapaTestemunha2").prop("readonly", true);
		 $("#cpfTestemunha2").prop("readonly", true);
		 $("#telefoneTestemunha2").prop("readonly", true);
		 $("#enderecoTestemunha2").prop("readonly", true);
    }
    
    FLUIGC.switcher.init("#switchEnviarSubsidio");
    FLUIGC.switcher.init("#switchEnviarAdicional");
	FLUIGC.switcher.init("#switchNomearTestemunhas");
	FLUIGC.switcher.init("#switchTestemunhaElcano");
	FLUIGC.switcher.init("#switchTestemunhaElcano1");
	FLUIGC.switcher.init("#switchTestemunhaElcano2");
	FLUIGC.switcher.init("#switchEnviarFichaFin");
	FLUIGC.switcher.init("#switchEnviarFichaRegistro");
	
	const tabelaRow = $("[tablename='tabelaApendices'] tbody tr");
	tabelaRow.each(function(index, element) {
		if (index > 0) {
			var anexoApendice = tabelaRow.eq(index).find("[id^='anexoApendice']").attr('id');
			var indice = anexoApendice.split("___")[1];
			
			FLUIGC.switcher.init("#switchAlterarApendice___"  + indice);
			FLUIGC.switcher.init("#switchEnviarApendice___"  + indice);
			
			FLUIGC.switcher.onChange('#switchAlterarApendice___' + indice, function(event, state) {
				if (state === true) {
					this.value = 'true';
					$("#btnLimparApendice___" + indice).show();
				} else if (state === false) {
					this.value = 'false';
					$("#btnLimparApendice___" + indice).hide();
			    }
			});
			
			FLUIGC.switcher.onChange('#switchEnviarApendice___' + indice, function (event, state) {
				if (state === true) {
					$("#switchEnviarApendiceHide___" + indice).val("s");
				} else if (state === false) {
					$("#switchEnviarApendiceHide___" + indice).val("n");
			    }
			});
		}
	});
	
	
	const tabelaRowAdicional = $("[tablename='tabelaAnexos'] tbody tr");
	tabelaRowAdicional.each(function(index, element) {
		if (index > 0) {
			var anexoAdicional = tabelaRowAdicional.eq(index).find("[id^='anexoDocumento']").attr('id');
			var indice = anexoAdicional.split("___")[1];
			
			FLUIGC.switcher.init("#switchEnviarAdicional___"  + indice);
			
			FLUIGC.switcher.onChange('#switchEnviarAdicional___' + indice, function (event, state) {
				if (state === true) {
					$("#switchEnviarAdicionalHide___" + indice).val("s");
				} else if (state === false) {
					$("#switchEnviarAdicionalHide___" + indice).val("n");
			    }
			});
			
		}
	});
	
	
	//OCULTAR TABLE ANEXOS
	if (MODE != 'VIEW'){
		window.parent.$("#tab-attachments").hide(); // - Nova atualização Fluig	
	}
	
	
	
	$("input[name='decisaoEscritorio']").on('click', function () {
		var valor = $("input:radio[name=decisaoEscritorio]:checked").val();
		var campo = $('#passarPeloRH'); 
		var campo2 = $('#anexoContestacao'); 
		var campo3 = $("#btnAnexos");
		
		if (valor == 'aprovado') {   
			campo2.parent().parent().parent().show();
			campo3.show();
			campo.parent().parent().parent().hide();
			$('input:radio[name=passarPeloRH]:checked').prop('checked', false);
		} else if (valor == 'maisInformacoes') {
			campo2.parent().parent().parent().hide();
			campo3.hide();
			campo.parent().parent().parent().show();
			cleanAnexo("btnLimparContestacao", 'Contestacao', false);
		}
	});
	
	$("input[name='novaDemandas']").on('click', function () {
		var valor = $("input:radio[name=novaDemandas]:checked").val();
		var campo = $('#addAnexoNovasDemandas'); 
		$('input:radio[name=processoArquivado]:checked').prop('checked', false);
		
		if (valor == 'nao') {   
			campo.hide();
			
			const tabelaRow = $("[tablename='tabelaDemandasProcesso'] tbody tr");
			tabelaRow.each(function(index, element) {
				if (index > 0) {
					var anexo = tabelaRow.eq(index).find("[id^='anexoDemanda']").attr('id');
					var indice = anexo.split("___")[1];
					console.log("indice: " + indice);
					
					if ($("#anexouAtividade___" + indice).val() != "65"){
						cleanAnexo("anexoDemanda___" + indice, 'Demanda', true);
						fnWdkRemoveChild(this);
					}
				}
			});
			
//			$('table[tablename=tabelaDemandasProcesso] tbody tr').not(':first').remove();
			$("#novasDemandas").prop("readonly", true);
			
			if ($("#tipoPericia").val() == ""){
				$("#panel_dadosPericia").hide();
			}
			
			if ($("#nomearTestemunhas").val() == ""){
				$("#panel_testemunhas").hide();
			}
			
			
			$("#panel_ArquivamentoProcesso").show();
			$("#decNovaDemandas").val('nao');
			$("#tipoPericia").prop("readonly", true);
			
		} else if (valor == 'sim') {
			campo.show();
			$("#novasDemandas").prop("readonly", false);
			$("#panel_dadosPericia").show();
			$("#panel_testemunhas").show();
			$("#panel_ArquivamentoProcesso").hide();
			$("#decNovaDemandas").val('sim');
			$("#tipoPericia").prop("readonly", false);
		}
	});

	init();
	
	new ActivityView ();
	

}

function init() {
	
	var atividade = getWKNumState();
	
	$('.lixeira6').hide();
	/*if (MODE != 'VIEW'){
		scrollToPanel("solicitacao");
	}*/
	
	if (atividade == 0 || atividade == 6){
		$("#div_info_processo").hide();
	} else {
		$('.lixeira3').hide();
	}
	
	if ((atividade == 0) || (atividade == 6) || (atividade == 8) || (atividade == 175) || (atividade == 10) || (atividade == 24)){
		$("#panel_elaboracaoSubsidios").hide();
	}
	
	if (atividade == 25){
		$("#div_switchAlterSubsidio").hide();
	}
	
	if ((atividade != 25) && (atividade != 32)){
		$('.lixeira5').hide();
		$("#buttonAddApendice").hide();
	}
	
	if ((atividade == 8) || (atividade == 175) || (atividade == 24) || (atividade == 25) || (atividade == 26) || (atividade == 37)  || (atividade == 32)){
		$("#div_enviarSubsidio").hide();
		
		const tabelaRow = $("[tablename='tabelaApendices'] tbody tr");
		tabelaRow.each(function(index, element) {
			if (index > 0) {
				var anexoApendice = tabelaRow.eq(index).find("[id^='anexoApendice']").attr('id');
				var indice = anexoApendice.split("___")[1];
				
				$("#hiddenSwitchApendice___" + indice).parent().hide();
			}
		});
		
		const tabelaRowAdicional = $("[tablename='tabelaAnexos'] tbody tr");
		tabelaRowAdicional.each(function(index, element) {
			if (index > 0) {
				var anexoApendice = tabelaRowAdicional.eq(index).find("[id^='anexoDocumento']").attr('id');
				var indice = anexoApendice.split("___")[1];
				
				$("#hiddenSwitchEnviarAdicional___" + indice).parent().hide();
			}
		});
	}
	
	if ((atividade == 25) || (atividade == 26) || (atividade == 37) || (atividade == 161)  || (atividade == 32)){
		const tabelaRow = $("[tablename='tabelaApendices'] tbody tr");
		tabelaRow.each(function(index, element) {
			if (index > 0) {
				var anexoApendice = tabelaRow.eq(index).find("[id^='anexoApendice']").attr('id');
				var indice = anexoApendice.split("___")[1];
				
				$("#btnAnexoApendice___" + indice).hide();
			}
		});
	}
	
	if (atividade == 32){
		$("#btnAnexoSubsidios").hide();
		$("#btnLimparSubsidios").show();
		
		const tabelaRow = $("[tablename='tabelaApendices'] tbody tr");
		tabelaRow.each(function(index, element) {
			if (index > 0) {
				var anexoApendice = tabelaRow.eq(index).find("[id^='anexoApendice']").attr('id');
				var indice = anexoApendice.split("___")[1];
				
				$("#btnLimparApendice___" + indice).show();
			}
		});
	}
	
	if (atividade != 26){
		$("#switchAlterSubsidio").prop('disabled', true);
		
		const tabelaRow = $("[tablename='tabelaApendices'] tbody tr");
		tabelaRow.each(function(index, element) {
			if (index > 0) {
				var anexoApendice = tabelaRow.eq(index).find("[id^='anexoApendice']").attr('id');
				var indice = anexoApendice.split("___")[1];
				
				$("#switchAlterarApendice___" + indice).prop('disabled', true);
			}
		});
	}
	
	if (atividade != 161){
		
		if ($("#switchEnviarRgHide").val() == "s"){
			$('#switchEnviarRg').prop('checked', true).change();
		}
		
		if ($("#switchEnviarCtpsHide").val() == "s"){
			$('#switchEnviarCtps').prop('checked', true).change();
		}
		
		if ($("#switchEnviarContratoHide").val() == "s"){
			$('#switchEnviarContrato').prop('checked', true).change();
		}
		
		if ($("#switchEnviarComprovanteResHide").val() == "s"){
			$('#switchEnviarComprovanteRes').prop('checked', true).change();
		}
		
		if ($("#switchEnviarFichaFinHide").val() == "s"){
			$('#switchEnviarFichaFin').prop('checked', true).change();
		}
		
		if ($("#switchEnviarFichaRegistroHide").val() == "s"){
			$('#switchEnviarFichaRegistro').prop('checked', true).change();
		}
		
		if ($("#switchEnviarNotificacaoHide").val() == "s"){
			$('#switchEnviarNotificacao').prop('checked', true).change();
		}
		
		if ($("#switchEnviarCitacaoHide").val() == "s"){
			$('#switchEnviarCitacao').prop('checked', true).change();
		}
		
		if ($("#switchEnviarSubsidioHide").val() == "s"){
			$('#switchEnviarSubsidio').prop('checked', true).change();
		}
		
		const tabelaRow = $("[tablename='tabelaApendices'] tbody tr");
		tabelaRow.each(function(index, element) {
			if (index > 0) {
				var anexoApendice = tabelaRow.eq(index).find("[id^='anexoApendice']").attr('id');
				var indice = anexoApendice.split("___")[1];
				
				if ($("#switchEnviarApendiceHide___" + indice).val() == "s"){
					$('#switchEnviarApendice___' + indice).prop('checked', true).change();
				}
			}
		});
		
		const tabelaRowAdicional = $("[tablename='tabelaAnexos'] tbody tr");
		tabelaRowAdicional.each(function(index, element) {
			if (index > 0) {
				var anexoDocumento = tabelaRowAdicional.eq(index).find("[id^='anexoDocumento']").attr('id');
				var indice = anexoDocumento.split("___")[1];
				
				if ($("#switchEnviarAdicionalHide___" + indice).val() == "s"){
					$('#switchEnviarAdicional___' + indice).prop('checked', true).change();
				}
			}
		});
		
		$("#switchEnviarRg").prop('disabled', true);
		$("#switchEnviarCtps").prop('disabled', true);
		$("#switchEnviarContrato").prop('disabled', true);
		$("#switchEnviarComprovanteRes").prop('disabled', true);
		$("#switchEnviarFichaFin").prop('disabled', true);
		$("#switchEnviarFichaRegistro").prop('disabled', true);
		$("#switchEnviarNotificacao").prop('disabled', true);
		$("#switchEnviarCitacao").prop('disabled', true);
		$("#switchEnviarSubsidio").prop('disabled', true);
		
		tabelaRow.each(function(index, element) {
			if (index > 0) {
				var anexoApendice = tabelaRow.eq(index).find("[id^='anexoApendice']").attr('id');
				var indice = anexoApendice.split("___")[1];
				
				$("#switchEnviarApendice___" + indice).prop('disabled', true);
			}
		});
		
		tabelaRowAdicional.each(function(index, element) {
			if (index > 0) {
				var anexoAdicional = tabelaRowAdicional.eq(index).find("[id^='anexoDocumento']").attr('id');
				var indice = anexoAdicional.split("___")[1];
				
				$("#switchEnviarAdicional___" + indice).prop('disabled', true);
			}
		});
		
		$("#emailEscritrioAdvocacia").prop("readonly", true);
	} else {
		
		$("#emailEscritrioAdvocacia").prop("readonly", false);
	}
	
	if ((atividade == 54) || (atividade == 65) || (atividade == 86) || (atividade == 87)  || (atividade == 100)  || (atividade == 75)){
		$("#btnAddAdicional").hide();
	}
	
	if (atividade == 54){
		$("#passarPeloRH").parent().parent().parent().hide();
		$("#anexoContestacao").parent().parent().parent().hide();
		$("#btnAnexos").hide();
		
		$('input:radio[name=decisaoEscritorio]:checked').prop('checked', false);
		$('input:radio[name=passarPeloRH]:checked').prop('checked', false);
	} else {
		$("#btnAnexoContestacao").hide();
	}
	
	if (atividade == 65){
		console.log("valor: " + $("#novaDemandas").val())
		/*if ($("#novaDemandas").val() == 'sim'){
			$('#addAnexoNovasDemandas').show();
			$("#novasDemandas").prop("readonly", false);
			
		} else {
			$('#addAnexoNovasDemandas').hide();
			
		}*/
		
		if ($("#decNovaDemandas").val() == "sim"){
			$('#addAnexoNovasDemandas').show();
			$("#novasDemandas").prop("readonly", false);
			$("#panel_testemunhas").show();
			$("#panel_dadosPericia").show();
			$("#panel_ArquivamentoProcesso").hide();
		} else if ($("#decNovaDemandas").val() == "nao"){
			$("#panel_testemunhas").hide();
			$('#addAnexoNovasDemandas').hide();
			$("#panel_dadosPericia").hide();
			$("#panel_ArquivamentoProcesso").show();
		} else {
			$("#panel_testemunhas").hide();
			$('#addAnexoNovasDemandas').hide();
			$("#panel_dadosPericia").hide();
			$("#panel_ArquivamentoProcesso").hide();
		}
		
		if ($("#nomearTestemunhas").val() == 'sim'){
			$("#containner-testemunha").show();
		} else {
			$("#containner-testemunha").hide();
		}
		
		const tabelaRow = $("[tablename='tabelaDemandasProcesso'] tbody tr");
		tabelaRow.each(function(index, element) {
			if (index > 0) {
				var anexoDemanda = tabelaRow.eq(index).find("[id^='anexoDemanda']").attr('id');
				var indice = anexoDemanda.split("___")[1];
				
				if ($("#anexoDemanda___" + indice).val() != ""){
					$("#btnAnexoDemanda___" + indice).hide();
				}
				
			}
		});
		
	} else {
		$("#switchNomearTestemunhas").prop('disabled', true);
		
		const tabelaRow = $("[tablename='tabelaDemandasProcesso'] tbody tr");
		tabelaRow.each(function(index, element) {
			if (index > 0) {
				var anexoDemanda = tabelaRow.eq(index).find("[id^='anexoDemanda']").attr('id');
				var indice = anexoDemanda.split("___")[1];
				
				if ($("#anexoDemanda___" + indice).val() != ""){
					$("#btnAnexoDemanda___" + indice).hide();
				}
				
			}
		});
	}
	
	if ((atividade == 86) || (atividade == 87)){
		
		if ($("#nomearTestemunhas").val() == 'sim'){
			$("#containner-testemunha").show();
		} else{
			$("#containner-testemunha").hide();
		}
		
		$("#panel_ArquivamentoProcesso").hide();
		
	} else {
		$("#switchTestemunhaElcano").prop('disabled', true);
		$("#switchTestemunhaElcano1").prop('disabled', true);
		$("#switchTestemunhaElcano2").prop('disabled', true);
		
		document.getElementById('zoomTestemunhaColaborador').setAttribute('readOnly','');
		$("#chapaTestemunha").prop("readonly", true);
		$("#testemunhaNome").prop("readonly", true);
		$("#cpfTestemunha").prop("readonly", true);
		$("#telefoneTestemunha").prop("readonly", true);
		$("#enderecoTestemunha").prop("readonly", true);
		
		document.getElementById('zoomTestemunhaColaborador1').setAttribute('readOnly','');
		$("#chapaTestemunha1").prop("readonly", true);
		$("#testemunhaNome1").prop("readonly", true);
		$("#cpfTestemunha1").prop("readonly", true);
		$("#telefoneTestemunha1").prop("readonly", true);
		$("#enderecoTestemunha1").prop("readonly", true);
		
		document.getElementById('zoomTestemunhaColaborador2').setAttribute('readOnly','');
		$("#chapaTestemunha2").prop("readonly", true);
		$("#testemunhaNome2").prop("readonly", true);
		$("#cpfTestemunha2").prop("readonly", true);
		$("#telefoneTestemunha2").prop("readonly", true);
		$("#enderecoTestemunha2").prop("readonly", true);
	}
	
	if ((atividade != 65) && (atividade != 86) && (atividade != 87)){
		$("#addAnexoNovasDemandas").hide();
	}
	
	if ($("#hideSwitchTestemunha").val() == "sim"){
		$("#testemunhaColaborador").attr('style', '');
		$("#textTestemunhaNome").attr('style', 'display:none');
	} else {
		$("#textTestemunhaNome").attr('style', '');
		$("#testemunhaColaborador").attr('style', 'display:none');
	}
	
	if ($("#hideSwitchTestemunha1").val() == "sim"){
		$("#testemunhaColaborador1").attr('style', '');
		$("#textTestemunhaNome1").attr('style', 'display:none');
	} else {
		$("#textTestemunhaNome1").attr('style', '');
		$("#testemunhaColaborador1").attr('style', 'display:none');
	}
	
	if ($("#hideSwitchTestemunha2").val() == "sim"){
		$("#testemunhaColaborador2").attr('style', '');
		$("#textTestemunhaNome2").attr('style', 'display:none');
	} else {
		$("#textTestemunhaNome2").attr('style', '');
		$("#testemunhaColaborador2").attr('style', 'display:none');
	}
	
	if ($("#hideSwitchTestemunha").val() == "sim"){
		$('#switchTestemunhaElcano').prop('checked', true).change();
	}
	
	if ($("#hideSwitchTestemunha2").val() == "sim"){
		$('#switchTestemunhaElcano2').prop('checked', true).change();
	}
	
	if ($("#hideSwitchTestemunha1").val() == "sim"){
		$('#switchTestemunhaElcano1').prop('checked', true).change();
	}
	
	if ($("#nomearTestemunhas").val() == "sim"){
		$('#switchNomearTestemunhas').prop('checked', true).change();
	}
	
}



/**
 * @Modo Debug Admin
 */
 fnModoDebug = async(userCode)=>{

	let param = [
		DatasetFactory.createConstraint("colleagueGroupPK.colleagueId", userCode, userCode, ConstraintType.MUST),
		DatasetFactory.createConstraint("colleagueGroupPK.groupId", "DefaultGroup-1", "DefaultGroup-1", ConstraintType.MUST)
	]

	let dsGroup = DatasetFactory.getDataset("colleagueGroup", null, param, null);

	if(dsGroup.values.length && userCode == 'rafael.gomes'){

		_objDebug.usercode = userCode

		if(confirm("Iniciar Modo Administrator 'Debug'")){
			let modoAdmin = prompt("Iniciar fluxo em modo Debug Administrador ?",_objDebug.modoAdmin);
			
			_objDebug.modoAdmin						   = modoAdmin;	
			document.getElementById("modoAdmin").value = modoAdmin;
		} 
	}

 }




/**
 * @CHAT OBSERVAÇÂO 
 */
function preencheAcompanhamento(){

    data = new Date();
	dt = data.toLocaleDateString() + " " + data.toLocaleTimeString();

	if (document.getElementById('origem').value != "") {
		document.getElementById('destino').innerHTML = '<div class="panel panel-default fs-no-margin">' +
			'<div class="panel-body fs-sm-space media clearfix">' +
			'<a class="pull-left" href="#">' +
			'<div>' +
			'<img src="/social/api/rest/social/image/profile/' + parent.WCMAPI.userCode + '/SMALL_PICTURE" alt="" class="fluig-style-guide thumb-profile img-rounded thumb-profile-sm thumb-profile-sm-legacy" social="" api="" rest="" image="" profile="" rodrigo="">' +
			'</div>' +
			'</a >' +
			' <div class="media-body">' +
			' <header>' +
			'<h5 class="media-heading">' +
			'<span class="wrap-element-popover"><a href="#" class="link-default">' + parent.WCMAPI.user + '</a></span>' +
			'<span class="timeline-header-no-link"> compartilhou </span >' +
			'<a href="#" class="link-default">uma observação</a>' +
			'<span class="timeline-header-no-link fs-no-bold"> - </span>' +
			'<a href="#" class="link-reference-time fs-no-bold" title="15/5/2015 - 17:51:29">' + dt + '</a>' +
			'</h5 >' +
			' </header >' +
			'<p>' + $("#origem").val() + '</p>' +
			'</div>' +
			'</div>' +
			'<div class="panel-footer">' +
			'</div>' +
			'</div> <br> ' + document.getElementById('destino').innerHTML;
		document.getElementById('origem').value = "";
	}
	document.getElementById('acompanhamento').innerHTML = $("#destino").val();
}
/*
function setSelectedZoomItem(selectedItem) { 
	if ( selectedItem.inputId == "zoomExFuncionario" ) {
		$("#rgExFuncionario").val(selectedItem["CARTIDENTIDADE"]);
		$("#ctps").val(selectedItem["CARTEIRATRAB"]);
		$("#serie").val(selectedItem["SERIECARTTRAB"]);		
	}
}*/

function alterDecDecisaoDRH(element, id) {	
	$("#decisaoDRH").val(id);
	$("#decDecisaoDRH").val(id);
}

function removerAnexo(event){
	
	try {
		const tabela = $(event).closest('table')[0];
		const tablename = tabela.getAttribute("tablename");
		const indice = getIndice($(event).closest('tr').find("input")[0].id);
		const descricao = $(`#anexoDocumento___${indice}`).val() || "Sem descrição";
		FLUIGC.message.confirm({
			message: `Deseja remover o item <b>${descricao}</b>?`,
			title: 'Confirmação',
			labelYes: 'Sim, quero remover',
			labelNo: 'Não, quero cancelar',
		}, function(result) {
			if (result) {
				cleanAnexo("anexoDocumento___" + indice, 'Documento', true);
				fnWdkRemoveChild(event);
				exibirMensagem("Sucesso: ", `Item ${descricao} removido da lista`, "success")
			}
		});
	} catch (e) {
		console.error(`Houve um erro inesperado na função ${arguments.callee.name}`)
		console.error(e)
	}
}

function removerApendice(event){
	
	try {
		const tabela = $(event).closest('table')[0];
		const tablename = tabela.getAttribute("tablename");
		const indice = getIndice($(event).closest('tr').find("input")[0].id);
		const descricao = $(`#anexoApendice___${indice}`).val() || "Sem descrição";
		FLUIGC.message.confirm({
			message: `Deseja remover o item <b>${descricao}</b>?`,
			title: 'Confirmação',
			labelYes: 'Sim, quero remover',
			labelNo: 'Não, quero cancelar',
		}, function(result) {
			if (result) {
				cleanAnexo("anexoApendice___" + indice, 'Apendice', true);
				fnWdkRemoveChild(event);
				exibirMensagem("Sucesso: ", `Item ${descricao} removido da lista`, "success")
			}
		});
	} catch (e) {
		console.error(`Houve um erro inesperado na função ${arguments.callee.name}`)
		console.error(e)
	}
}

function removerDemanda(event){
	
	try {
		const tabela = $(event).closest('table')[0];
		const tablename = tabela.getAttribute("tablename");
		const indice = getIndice($(event).closest('tr').find("input")[0].id);
		const descricao = $(`#anexoDemanda___${indice}`).val() || "Sem descrição";
		FLUIGC.message.confirm({
			message: `Deseja remover o anexo <b>${descricao}</b>?`,
			title: 'Confirmação',
			labelYes: 'Sim, quero remover',
			labelNo: 'Não, quero cancelar',
		}, function(result) {
			if (result) {
				cleanAnexo("anexoDemanda___" + indice, 'Demanda', true);
				console.log("event: " + event);
				fnWdkRemoveChild(event);
				exibirMensagem("Sucesso: ", `Item ${descricao} removido da lista`, "success")
			}
		});
	} catch (e) {
		console.error(`Houve um erro inesperado na função ${arguments.callee.name}`)
		console.error(e)
	}
}

function adicionarAnexo() {
	var indice = wdkAddChild('tabelaAnexos');
	
	$("#btnViewerDocumento___" + indice).hide();
	$("#btnDownloadDocumento___" + indice).hide();
	
	console.log("achou aqui: " + $("#anexoDocumento___" + newId).parents('tr'))
	console.log("newId: " + newId);
	
	$("#nomeArquivoDocumento___" + newId).parents('tr').find('.lixeira3').show();
	
	FLUIGC.switcher.init("#switchEnviarAdicional___"  + indice);
	$("#div_switchEnviarAdicional___" + indice).hide();
	
}

function adicionarApendice() {
	var atividade = getWKNumState();
	var indice = wdkAddChild('tabelaApendices');
	
	$("#btnViewerApendice___" + indice).hide();
	$("#btnDownloadApendice___" + indice).hide();
	FLUIGC.switcher.init("#switchAlterarApendice___"  + indice);
	FLUIGC.switcher.init("#switchEnviarApendice___"  + indice);
	
	$("#div_switchEnviarApendice___" + indice).hide();
	
	if (atividade == 32){
		$("#div_switchApendice___" + newId).hide();
	}
	
}

function adicionarDemanda() {
	var atividade = getWKNumState();
	var indice = wdkAddChild('tabelaDemandasProcesso');
	
	$("#btnViewerDemanda___" + indice).hide();
	$("#btnDownloadDemanda___" + indice).hide();
	$("#descricaoDemandasProcesso___" + indice).prop("readonly", false);
	
	$("#nomeArquivoDemanda___" + newId).parents('tr').find('.lixeira6').show();
	
}

function initRichEditor(inputId, atividade) {
	
	// Variável com valor true ou false, indicando se o Rich Editor será inicializado bloqueado ou não
	const readOnly = !((getWKNumState() == atividade) && (MODE != "VIEW"));

	// Configurações
	var settings = {
		removePlugins: 'fluigimage,fluigvideo',
		resize_enabled: false,
		height: "300px",
		readOnly
	};

	// Inicializa o componente recebendo o id do campo e as configurações
	var editor = FLUIGC.richeditor(inputId, settings);
	
	// Pega a string html que esta armazenada no campo, caso tenha valor gravado
	var htmlString = (document.getElementById(inputId).value || document.getElementById(inputId).textContent);

	// Seta a string html no componente
	editor.setData(htmlString);

	// Grava a string html no campo a cada alteração de conteúdo do componente
	editor.on('change', function() {
		document.getElementById(inputId).value = editor.getData();
	});
}

/*function scrollToPanel(id) {
	$('body').scrollTo('#' + id, 1000, {
		offset: -100
	});
}*/

/*function scrollElement(){
	 var element = document.getElementById("panel_DadosSolicitante");
	 element.scrollIntoView();
}*/

function scrollElement(){
	window.scrollTo(0, Position(document.getElementById("panel_DadosSolicitante")));
}

function Position(obj){
	 var currenttop = 0;
	 if (obj.offsetParent){
		 do {
			 currenttop += obj.offsetTop;
	 } while ((obj = obj.offsetParent));
		 return [currenttop];
	 }
}
