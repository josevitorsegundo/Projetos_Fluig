
$(document).ready(function(){
    var containers = $("#TBPRODUTOSCOT tbody tr td")
    console.log(containers)
    for(var i = 1; i<containers.length; i++){
        console.log("entrei ")
        var label = $(containers[i]).find("input[name^=status]").siblings("label")
        label.empty()
        label.append("Valor do Item")
    }
    var formCurrentTask = $("#currentTask").val() | 0
    // $("#identificador").val($("#numMovCompra").val())
    console.log("Custom Started ⚡")
    console.log("Atividade: "+formCurrentTask)
    tasks=[{task:5,displayFields:["cotacao"], enableFields:["cotacao"]}, {task:0,displayFields:["cotacao"], enableFields:["cotacao"]},{task:8,displayFields:["cotacao","decisaoGerencia"], enableFields:["cotacao","decisaoGerencia"]}, {task:12,displayFields:["cotacao"], enableFields:["cotacao"]},{task:22,displayFields:["cotacao","decisaoGerencia","decisaoDiretoria"], enableFields:["cotacao"]},{task:25,displayFields:["cotacao","decisaoDiretoria","decisaoGerencia"], enableFields:["cotacao","decisaoDiretoria"]},{task:51,displayFields:["cotacao","decisaoDiretoria","decisaoGerencia"], enableFields:[]}]
    var currentTask = tasks.filter(function (task){return task.task==formCurrentTask})[0] 
    console.log(currentTask)
    //Variável pega os campos que devem ser visíveis na task atual
    var fieldsEnabled = currentTask.enableFields
    var fieldsDisplayed = currentTask.displayFields    
    var fields = ["cotacao","decisaoGerencia","decisaoDiretoria"]
    enableAndDisplayFields(fields,fieldsEnabled,fieldsDisplayed)    
    //Variável exceptions recebe uma expressão regular com os atributos name de todos os campos que não devem ser obrigatórios separados por "|"
    //Em outros casos basta colocar o nome do campo que não é obrigatório
    var exceptions = /nada/
    //Essa função torna todos os campos que estão marcados como habilitados(primeiroparâmetro) obrigatórios, com exceção dos campos marcados na expressão regular que vai como segundo parâmetro
    setRequiredFields(fieldsEnabled, exceptions)
    var tempo = 0
    var mySimpleCalendar = FLUIGC.calendar('#dataResposta');
    var moedaLoaded = setInterval(function(){
        if($("select#moeda").length>0){
            tempo +=500
            console.log(tempo)
            setZoomData("moeda","R$")
            clearInterval(moedaLoaded)
        }

    },500)
    if(formCurrentTask==12){

        
    }
    if(formCurrentTask==8){  
        getItens()      
        setItemValues()
        hideItems()
        calculaTotal()
    }
    //reloadZoomFilterValues('fornecedores', 'ID, '+$("#numMovCompra").val());
    
})
function getItens(){
    var numMov = $("#numMovCompra").val()
    var c1 =  DatasetFactory.createConstraint("ID", numMov , numMov , ConstraintType.MUST)
    var result  = DatasetFactory.getDataset("ds_Cotacao_ItensCotacao", null , new Array(c1), null)    
    
    // debug
    // var result = {
    //     columns: [
    //         "MOVORIGEM",
    //         "IDPRD",
    //         "CODCCUSTO",
    //         "NOMECCUSTO",
    //         "NOMEPRD",
    //         "CODPRD"
    //     ],
    //     values: [
    //         {
    //             NOMECCUSTO: "TESOURARIA",
    //             MOVORIGEM: 1083846,
    //             IDPRD: 32953,
    //             CODPRD: "87.30.0482",
    //             CODCCUSTO: "20.002.02.01",
    //             NOMEPRD: "ABRIGO PARA EXTINTOR A85 X L40 X P30 CM"
    //         },
    //         {
    //             NOMECCUSTO: "OFICINA",
    //             MOVORIGEM: 1083846,
    //             IDPRD: 12345,
    //             CODPRD: "87.30.0482",
    //             CODCCUSTO: "20.002.02.01",
    //             NOMEPRD: "PEÇA PARA CAMINHAO"
    //         },
    //         {
    //             NOMECCUSTO: "ADMINISTRAÇÃO",
    //             MOVORIGEM: 1083846,
    //             IDPRD: 147258,
    //             CODPRD: "87.30.0482",
    //             CODCCUSTO: "20.002.02.01",
    //             NOMEPRD: "ITEM ALEATORIO"
    //         }
    //     ]
    // }
    // if($("#itensNaoCotados").val()){
    //     var naoCotados = $("#itensNaoCotados").val()
    //     var arrayNaoCotados = naoCotados.split(";")
    //     var filtro = result.values.filter(function (prd){
    //         return arrayNaoCotados.indexOf(prd.IDPRD.toString()) >=0
    //     })
    //     console.log(naoCotados,arrayNaoCotados,filtro) 
    //     for(var i=0;i<filtro.length;i++){
    //         insertItem(filtro[i])
    //     } 
    // }
    // else{
    console.log(result)
    var rows = $("#TBPRODUTOSCOT tbody tr")
    for(var i = 1;i<rows.length;i++){
        fnWdkRemoveChild(rows[i])   
    }
    for(var i=0;i<result.values.length;i++){
        insertItem(result.values[i])
    }
    // }

}
function calculaTotal(){
    var rows = $("#TBPRODUTOSCOT tbody tr td")
    var total = 0
    for(var i = 1;i<rows.length;i++){
        var valor = $(rows[i]).find("input[name^=status]").val()
        if(valor&&valor!="Não Cotado"){
            total += parseFloat(valor)
            $(rows[i]).find("input[name^=status]").val(parseFloat(valor).toLocaleString("pt-BR",{maximumFractionDigits:2, minimumFractionDigits:2}))
        }
    }
    var idmov = $("#numMovCompra").val()
    var c1 =  DatasetFactory.createConstraint("IDMOV", idmov , idmov , ConstraintType.MUST)
    var result = DatasetFactory.getDataset("ds_Cotacao_OrdemCompra",null,new Array(c1),null)
    $("#identificador").val(result.values[0].IDORDEM)
    $("#frete").val(parseFloat(result.values[0].FRETE).toLocaleString("pt-BR",{maximumFractionDigits:2, minimumFractionDigits:2}))
    $("#total").val(parseFloat(result.values[0].FRETE+total).toLocaleString("pt-BR",{maximumFractionDigits:2, minimumFractionDigits:2}))

}
function setItemValues(){
    var codCotacao = $("#codCotacao").val()
    var idmov = $("#numMovCompra").val()
    var c1 =  DatasetFactory.createConstraint("ID", codCotacao , codCotacao , ConstraintType.MUST)
    var c2 =  DatasetFactory.createConstraint("IDMOV", idmov , idmov , ConstraintType.MUST)
    var result = DatasetFactory.getDataset("ds_Cotacao_ValorItens",null,new Array(c1,c2),null)
    console.log(result)
    if(result.values){
        var rows = $("#TBPRODUTOSCOT tbody tr")
        for(var i = 1; i<rows.length;i++){
            var status  = $(rows[i]).find("input[name^=status]")
            var numMovs = $(rows[i]).find("input[name^=numMov]")
            $(status[0]).val("")
            $(status[0]).siblings("label").empty()
            $(status[0]).siblings("label").append("Valor")
            $(numMovs[0]).siblings("label").empty()
            $(numMovs[0]).siblings("label").append("QTD")
            var hasValue = result.values.filter(value=>{
                return (value.IDPRD == $(rows[i]).find("input[name^=idprd]").val())
            })
            if(hasValue.length>0){
                $(status[0]).val(parseFloat(hasValue[0].VALOR))
                $(numMovs[0]).val(parseFloat(hasValue[0].QUANTIDADENEG))
            }
            else{
                $(numMovs[0]).val(parseFloat(hasValue[0].QUANTIDADENEG))
                $(status[0]).val("Não Cotado")
            }
        }
    }
}
function hideItems(){
    var hide = $("#itensNaoCotados").val().split(";")
    var rows = $("#TBPRODUTOSCOT tbody tr")
    for(var i = 1;i<rows.length;i++){
        var idprd =$(rows[i]).find("input[name^=idprd]").val()
        console.log(idprd,hide.indexOf(idprd.toString()),hide )
        if(hide.indexOf(idprd.toString())>=0){
            $(rows[i]).hide() 
        }
    }
}
function setZoomData(instance, value){
	window[instance].setValue(value);
}
function insertItem(values){
    var c1Orcados =  DatasetFactory.createConstraint("ID", numMov , numMov , ConstraintType.MUST)
    var resultOrcados  = DatasetFactory.getDataset("ds_Cotacao_ItensOrcados", null , new Array(c1Orcados), null)
    console.log(resultOrcados)
    if(resultOrcados.values){
        var arrayPrd = []
        resultOrcados.values.map(o=>{arrayPrd.push(parseInt(o.IDPRD))})    
        if(arrayPrd.indexOf(values.IDPRD)<0){
            var index = wdkAddChild("TBPRODUTOSCOT");
            $("#produto___"+index).val(values.NOMEPRD)    
            $("#idprd___"+index).val(values.IDPRD)    
            $("#numMov___"+index).val(values.MOVORIGEM)
            $("#status___"+index).val("Não Cotado")
        }
    }
    else{
            var index = wdkAddChild("TBPRODUTOSCOT");
            $("#produto___"+index).val(values.NOMEPRD)    
            $("#idprd___"+index).val(values.IDPRD)    
            $("#numMov___"+index).val(values.MOVORIGEM)
            $("#status___"+index).val("Não Cotado")

    }

    console.log(values)
}
var beforeSendValidate = function(numState,nextState){
    var task = $("#currentTask").val()
    if(task == 12){
        var quantidadePrd = $("#TBPRODUTOSCOT > tbody > tr").length - 1
        var itensCotados = []
        var itensNaoCotados = []
        var numMov = $("#numMovCompra").val()
        var c1 =  DatasetFactory.createConstraint("ID", numMov , numMov , ConstraintType.MUST)
        var result  = DatasetFactory.getDataset("ds_Cotacao_ItensOrcados", null , new Array(c1), null)
        if(!result.values){
            throw ("Nenhum dos itens foi incluído em cotação")
        }
        else{
            var arrayPrd = []
            var arrayCot = []
            var codCotacao = DatasetFactory.getDataset("ds_Cotacao_CodigoCotacao", null , new Array(c1), null)
            for(var c = 0; c<codCotacao.values.length;c++){
                arrayCot.push(codCotacao.values[c].DESCRICAO)
            }
            $("#codCotacao").val(arrayCot.join(";"))
            console.log(arrayCot,codCotacao,$("#codCotacao"))
            result.values.map(o=>{arrayPrd.push(parseInt(o.IDPRD))}) 
            console.log(arrayPrd)
            for(var i = 1; i<=quantidadePrd;i++){
                console.log(arrayPrd.indexOf(parseInt(quantidadePrd[i]))>=0)
                if(arrayPrd.indexOf(parseInt($("#idprd___"+i).val()))>=0){
                    itensCotados.push($("#idprd___"+i).val())
                }
                else{
                    itensNaoCotados.push($("#idprd___"+i).val())
                }
            }
        }
        console.log(itensNaoCotados)
        $("#itensCotados").val(itensCotados.join(";"))
        $("#itensNaoCotados").val(itensNaoCotados.join(";"))
        // throw (task)

    }
}