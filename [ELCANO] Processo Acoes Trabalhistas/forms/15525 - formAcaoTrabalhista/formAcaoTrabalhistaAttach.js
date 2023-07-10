function initAnexos(){
	var atividade = getWKNumState();
	
	if (atividade == 0 || atividade == 6){
 		$("#btnViewerNotificacao").hide();
 		$("#btnDownloadNotificacao").hide();
 	}
	
	if (atividade == 8){
 		$("#btnViewerCitacao").hide();
 		$("#btnDownloadCitacao").hide();
 	}
	
	if (atividade == 25){
 		$("#btnDownloadSubsidios").hide();
 		$("#btnViewerSubsidios").hide();
 	}
	
	if (atividade == 175){
 		$("#btnViewerIdentidade").hide();
 		$("#btnDownloadIdentidade").hide();
 		$("#btnViewerCTPS").hide();
 		$("#btnDownloadCTPS").hide();
 		$("#btnViewerContrato").hide();
 		$("#btnDownloadContrato").hide();
 		$("#btnViewerComprovante").hide();
 		$("#btnDownloadComprovante").hide();
 		$("#btnViewerFicha").hide();
 		$("#btnDownloadFicha").hide();
 		$("#btnViewerRegistro").hide();
 		$("#btnDownloadRegistro").hide();
 	}
	
	if (atividade == 54){
		$("#btnViewerContestacao").hide();
 		$("#btnDownloadContestacao").hide();
	}
	
	window.parent.$("#ecm-navigation-inputFile-clone").change(function(e){
        var fileName = e.target.files[0].name;
        console.log("Filename: " + fileName);
        console.log("currentIdAnexo: " + currentIdAnexo);
        
        if (!existeArquivo(fileName)) {
        	
        	console.log("!existeArquivo(fileName)");
        	$("#anexo" + currentIdAnexo).val(fileName);
        	
        	$("#btnAnexo" + currentIdAnexo).hide();
        	$("#btnDownload"  + currentIdAnexo).show();
        	$("#btnDownload" + currentIdAnexo).fadeIn("#btnDownload" + currentIdAnexo, function() {
        		// Animation complete
        	});
        	
        	$("#btnLimpar" + currentIdAnexo).fadeIn("#btnLimpar" + currentIdAnexo, function() {
        		// Animation complete
        	});
        	
        	$("#nomeArquivo" + currentIdAnexo).val($("#anexo" + currentIdAnexo).val())
        	
        	
        } if (existeArquivo(fileName) && atividade != 0 && atividade != 6){
        	
        	console.log("!existeArquivo(fileName)");
        	$("#anexo" + currentIdAnexo).val(fileName);
        	
        	$("#btnAnexo" + currentIdAnexo).hide();
        	$("#btnDownload"  + currentIdAnexo).show();
        	$("#btnDownload" + currentIdAnexo).fadeIn("#btnDownload" + currentIdAnexo, function() {
        		// Animation complete
        	});
        	
        	$("#btnLimpar" + currentIdAnexo).fadeIn("#btnLimpar" + currentIdAnexo, function() {
        		// Animation complete
        	});
        	
        	$("#nomeArquivo" + currentIdAnexo).val($("#anexo" + currentIdAnexo).val())
        	$("#anexo" + currentIdAnexo).val("");
        	$("#btnAnexo" + currentIdAnexo).show();
        	$("#btnDownload" + currentIdAnexo).hide();
        	$("#btnLimpar" + currentIdAnexo).hide();
        	
        	exibirMensagem("Atenção: ", "Este arquivo já foi anexado");
        	$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) { 
        		
        		if(attachment.description == fileName) { 
        			parent.WKFViewAttachment.removeAttach([i]); 
        		} 
        	});
        	
        	
        }
    });
}

function showCameraCustom(id, idInputAnexo, isPaiFilho) {
	
	let parameter = null;
	if (isPaiFilho) {
		var valores = id.split('___');
		indice = valores[1];
		parameter = idInputAnexo + "___" + indice;
	} else {
		parameter = idInputAnexo;
		console.log("parameter: " + parameter)
		console.log("idInputAnexo: " + idInputAnexo)
	}

	currentIdAnexo = parameter;
    
	if (getMobile() == "false") {
		var tabAttachments = parent.document.getElementById("tab-attachments");
		if (tabAttachments) {
			var $tabList = $(tabAttachments).parent();
			if ($tabList.hasClass("active") && !$tabList.hasClass("out")) {
				console.log("scroll");
			} 
			
			if (parent.WCMAPI.isIe9()) {
				$(".ecm-navigation-silverlight", parent.document).show("fade").css("top", 0);
				$("#ecm-navigation-silverlight", parent.document).attr({
					"data-on-camera": "true",
					"data-file-name-camera": parameter
				});
				$(parent.document).on("keyup", this.actionKeyup)
			} else {
				openInputFileCustom("ecm-navigation-inputFile-clone", parameter)
			}
		}
	} else {
		JSInterface.showCamera(parameter);
		$("#" + parameter).val(parameter);
	}
}

function openInputFileCustom(elementId, parameter) {
    var element = parent.document.getElementById(elementId);
    
    if (element && document.createEvent) {
        element.setAttribute("data-on-camera", "true");
//        if (parameter) {
//        	element.setAttribute("data-file-name-camera", $("#" + parameter).val());
            //element.setAttribute("data-file-name-camera", prefixo + $("#" + parameter).val());
//        }
        
        element.click();
    }
}

function downloadAnexo(id, idInputAnexo, isPaiFilho) {	
	let nomeArquivo = null;
	
	if (isPaiFilho) {
		var indice = id.split("___")[1];
		nomeArquivo = $("#anexo" + idInputAnexo + "___" + indice).val();
	} else {
		nomeArquivo = $("#anexo" + idInputAnexo).val();
	}
	
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var physicalFileName = attachment.physicalFileName;
		var attachmentName = attachment.name;

		if (getFormMode() == "ADD") {
			if(nomeArquivo == attachmentName) {
				parent.WKFViewAttachment.downloadAttach([i]);
			}
		} else {
			if((nomeArquivo == physicalFileName) || (nomeArquivo == attachmentName)) {
				parent.WKFViewAttachment.downloadAttach([i]);
			}
		}
    });
}

/*function viewerAnexo(id, idInputAnexo, isPaiFilho) {	
	
	let nomeArquivo = null;
	let documento = null;

	if (isPaiFilho) {
		let indice = id.split("___")[1];
		nomeArquivo = $("#anexo" + idInputAnexo + "___" + indice).val();
	} else {
		nomeArquivo = $("#anexo" + idInputAnexo).val();
	}
	
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var attachmentName = attachment.name;
		var physicalFileName = attachment.physicalFileName;

		if(nomeArquivo == physicalFileName) {
        	parent.WKFViewAttachment.openAttachmentView('admin', attachment.documentId, 1000);
        }
    });
}*/

function viewerAnexo(id, idInputAnexo, isPaiFilho) {
	
	console.log("entrou viewerAnexo");
	
	let nomeArquivo = null;
	let documento = null;

	if (isPaiFilho) {
		let indice = id.split("___")[1];
		nomeArquivo = $("#anexo" + idInputAnexo + "___" + indice).val();
	} else {
		console.log("isPaiFilho false");
		nomeArquivo = $("#anexo" + idInputAnexo).val();
		console.log("nomeArquivo: " + nomeArquivo);
	}
	
	$.each(parent.ECM.attachmentTable.getData(), function(i,attachment) {
		var descricao = attachment.description;
		var attachmentName = attachment.name;
		var physicalFileName = attachment.physicalFileName;
		
		console.log("physicalFileName: " + physicalFileName);

		if(nomeArquivo == physicalFileName) {
        	parent.WKFViewAttachment.openAttachmentView('admin', attachment.documentId, 1000);
        }
    });
}

async function viewerAnexoTabelaBlank(obj, idAnexo) {	
	var inputIdSplit = obj.id.split("___");
	var idDoc = $("#"+idAnexo+"___"+inputIdSplit[1]).val();
	
	console.log("idDoc: " + idDoc)
	
	var getIdDoc = await getIdDocument(idDoc);
	var linkPublico = await getDownloadURL(getIdDoc);
	console.log("Link::::::::::::::" + linkPublico)
	
	window.open(linkPublico, '_blank');
}

function getIdDocument(documentDescription) {
	return new Promise(function(resolve, reject) {
		try {
			const anexos = parent.ECM.attachmentTable.getData();
			for(let i = 0; i < anexos.length; i++){
				var descricao = anexos[i].description;
				if (documentDescription == descricao) {
					resolve(anexos[i].documentId) 
				}
			}
			resolve(null)
		} catch (erro) {
			reject({ erro: true, message: `Houve um erro inesperado na função getIdDocument`, details: erro })
		}
	})
}

function getDownloadURL(documentId) {
	return new Promise(function(resolve, reject) {
		try {
			fetch(`/api/public/2.0/documents/getDownloadURL/${documentId}`, {method: 'GET'})
			.then((response) => {
				if (response.ok) {
				    return response.json();
				}
				throw ('Erro ao obter o link público do arquivo');
			})
			.then((body) => {
				resolve(body.content);
			})
			.catch((err) =>{
				reject({ erro: true, message: err})
			});

		} catch (erro) {
			reject({ erro: true, message: `Houve um erro inesperado na função getDownloadURL`, details: erro })
		}
	})
}


function cleanAnexo(id, idInputAnexo, isPaiFilho) {
	console.log("idInputAnexo: " + idInputAnexo);
	let valorAnexo = null;
	let indice = null;
	
	if (isPaiFilho) {
		indice = id.split("___")[1];
		valorAnexo = $("#anexo" + idInputAnexo + "___" + indice).val();
		$("#nomeArquivo" + idInputAnexo).val("")
	} else {
		valorAnexo = $("#anexo" + idInputAnexo).val();
		$("#btnViewer" + idInputAnexo).hide();
	 	$("#btnDownload" + idInputAnexo).hide();
	 	$("#btnLimpar" + idInputAnexo).hide();
	}
	
	$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) { 
		
		if(attachment.description == valorAnexo) { 
			parent.WKFViewAttachment.removeAttach([i]); 
			
			if (isPaiFilho) {
				$("#anexo" + idInputAnexo + "___" + indice).val("");
				$("#btnAnexo" + idInputAnexo + "___" + indice).show();
				$("#btnViewer" + idInputAnexo + "___" + indice).hide();
				$("#btnDownload" + idInputAnexo + "___" + indice).hide();
				$("#btnLimpar" + idInputAnexo + "___" + indice).hide();
			} else {
				$("#anexo" + idInputAnexo).val("");
				$("#btnAnexo" + idInputAnexo).show();
				$("#btnViewer" + idInputAnexo).hide();
				$("#btnDownload" + idInputAnexo).hide();
				$("#btnLimpar" + idInputAnexo).hide();
			}
		} 
	}); 
}

function existeArquivo(nomeArquivo) {
	
	var existe = false;
	$.each(parent.ECM.attachmentTable.getData(), function(i, attachment) { 
		if(attachment.description == nomeArquivo) {
			existe = true;
		} 
	});
	
	return existe;
}

function controlaAnexo(termoBotaoAnexo) {
	console.log("entrou controlaAnexo");
	var atividade = getWKNumState();
	var mode = getFormMode();
	
	var canShowAnexo = (atividade == ABERTURA || atividade == INICIO) && (mode != 'VIEW');
	var canShowLimpar = (atividade == ABERTURA || atividade == INICIO) && (mode != 'VIEW');
	
	var specialChar = ((atividade != ABERTURA && atividade != INICIO) && mode != 'VIEW') ? "_" : "";
	
	var anexo_str = $("#anexo" + termoBotaoAnexo).val();
	if ((anexo_str != null && anexo_str != "") && existeArquivo(anexo_str)) {
		$("#" + specialChar + "btnAnexo" + termoBotaoAnexo).hide();
		
		$("#" + specialChar + "btnViewer" + termoBotaoAnexo).show();
		$("#" + specialChar + "btnViewer" + termoBotaoAnexo).prop("disabled", false);
		
		$("#" + specialChar + "btnDownload" + termoBotaoAnexo).show();
		$("#" + specialChar + "btnDownload" + termoBotaoAnexo).prop("disabled", false);
		
		if(canShowLimpar) {
			$("#" + specialChar + "btnLimparAnexo" + termoBotaoAnexo).show();
		}
	} else {
		$("#" + specialChar + "anexo" + termoBotaoAnexo).val("");
		
		if (canShowAnexo) {
			$("#" + specialChar + "btnAnexo" + termoBotaoAnexo).show();
		} else {
			$("#" + specialChar + "btnAnexo" + termoBotaoAnexo).hide();
		}
		
		$("#" + specialChar + "btnViewer" + termoBotaoAnexo).hide();
		
		$("#" + specialChar + "btnLimparAnexo" + termoBotaoAnexo).hide();
	}
}