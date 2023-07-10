/**
 * @SELECT ZOOOM
 */
setSelectedZoomItem = (selectedItem)=>{

    if(selectedItem.inputId == "zoomExFuncionario"){

        document.getElementById("nomeExFuncionario").value  = selectedItem["NOME"]
        document.getElementById("cpfExFuncionario").value   = selectedItem["CPF"]
        document.getElementById("rgExFuncionario").value    = selectedItem["CARTIDENTIDADE"]
        document.getElementById("ctps").value               = selectedItem["CARTEIRATRAB"]
        document.getElementById("serie").value              = selectedItem["SERIECARTTRAB"]
    }
    
    if(selectedItem.inputId == "zoomTestemunhaColaborador"){

        document.getElementById("chapaTestemunha").value        = selectedItem["CHAPA"]
        document.getElementById("cpfTestemunha").value   		= selectedItem["CPF"]
        document.getElementById("telefoneTestemunha").value     = selectedItem["TELEFONE"]
        document.getElementById("enderecoTestemunha").value     = selectedItem["ENDERECO"]
    }
    
    if(selectedItem.inputId == "zoomTestemunhaColaborador2"){

        document.getElementById("chapaTestemunha2").value        = selectedItem["CHAPA"]
        document.getElementById("cpfTestemunha2").value   		 = selectedItem["CPF"]
        document.getElementById("telefoneTestemunha2").value     = selectedItem["TELEFONE"]
        document.getElementById("enderecoTestemunha2").value     = selectedItem["ENDERECO"]
    }
    
    if(selectedItem.inputId == "zoomTestemunhaColaborador1"){

        document.getElementById("chapaTestemunha1").value        = selectedItem["CHAPA"]
        document.getElementById("cpfTestemunha1").value   		 = selectedItem["CPF"]
        document.getElementById("telefoneTestemunha1").value     = selectedItem["TELEFONE"]
        document.getElementById("enderecoTestemunha1").value     = selectedItem["ENDERECO"]
    }



}

/**
 * @REMOVE SELECT ZOOOM
 */

 removedZoomItem = (removedItem)=>{

    if(removedItem.inputId == "zoomExFuncionario"){

        document.getElementById("nomeExFuncionario").value  ="";
        document.getElementById("cpfExFuncionario").value   ="";
        document.getElementById("rgExFuncionario").value    ="";
        document.getElementById("ctps").value               ="";
        document.getElementById("serie").value              ="";


    }

 } 