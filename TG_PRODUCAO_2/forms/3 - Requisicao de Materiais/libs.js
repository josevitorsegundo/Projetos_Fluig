function enableRectifyField(fieldId,triggerId){
    var decision = $("#"+triggerId).val() == 0
    if(decision){
        $("#"+fieldId).attr('readonly',false)
        $("#"+fieldId).removeClass("disable-click")
        $("#"+triggerId).closest('div.panel').removeClass('panel-success').addClass('panel-primary')
        $("#"+fieldId).closest('div.panel').removeClass('panel-primary').addClass('panel-success')
    }
    else{
        $("#"+fieldId).val('')
        $("#"+fieldId).attr('readonly',true)
        $("#"+triggerId).closest('div.panel').removeClass('panel-primary').addClass('panel-success')
        $("#"+fieldId).closest('div.panel').removeClass('panel-success').addClass('panel-primary')        
    }
    
}
//Função Para Habilitar e Deixar Visivel Paineis de Formulário
function enableAndDisplayFields(panelIds,fieldsEnabled,fieldsDisplayed){
    //Desabilitando todos os campos do formulário
    
    $('div.panel-body input').addClass("disable-click")
    $('div.panel-body select').addClass("disable-click")
    $("div.panel-body .select2").addClass("disable-click")
    $('div.panel-body textarea').attr("readonly","readonly")
    $('div.panel-body button').attr("disabled","disabled")
    fieldsEnabled.forEach(function (field){
        //Mudando a cor do panel
        $('#'+field).removeClass('panel-primary').addClass('panel-success')
        //Habilitando os panels da task atual
        $('#'+field+' >div.panel-body input').removeClass("disable-click")
        $('#'+field+'>div.panel-body select').removeClass("disable-click")
       
        $('#'+field+'>div.panel-body textarea').removeAttr("readonly")
        $('#'+field+' button').removeAttr("disabled")

        
        
    })   
    //Para cada campo da variavel fields veremos se está marcado para ser visível através da variavél show, se não está marcada, então escondemos o panel
    panelIds.forEach(function(field){
        if(fieldsDisplayed.indexOf(field) == -1){
            $('#'+field).hide()            
        }
    })
}
function enableFields(fieldsEnabled){
    fieldsEnabled.forEach(field=>{
        //Mudando a cor do panel
        $('#'+field).removeClass('panel-primary').addClass('panel-success')
        //Habilitando os panels da task atual
        $('#'+field+' >div.panel-body input').attr("disabled",false)
        $('#'+field+'>div.panel-body select').attr('disabled',false)
        $('#'+field+'>div.panel-body [type=zoom]').attr('readonly',false)
        $('#'+field+'>div.panel-body textarea').attr('disabled',false)
    })
}
function displayFields(panelIds, fieldsDisplayed){
    panelIds.forEach(function(field){
        if(fieldsDisplayed.indexOf(field) == -1){
            $('#'+field).hide()            
        }
    })
}
//Função para colocar campos obrigatórios no value do input requiredFields recebe como parametros os campos habilitados da task atual e as exceções gerais em forma de Expressão Regular (https://medium.com/xp-inc/regex-um-guia-pratico-para-express%C3%B5es-regulares-1ac5fa4dd39f)
function setRequiredFields(taskEnabledFields, exceptions=/\(\d?\d?\)/){
    console.log(exceptions)
    var requiredFields = ""
   
    taskEnabledFields.forEach(function(field){
        var inputs = []
        $("#"+field+" select").map(i=>{
            $("#"+field+" select")[i].getAttribute("name")
            &&exceptions.test($("#"+field+" select")[i].getAttribute("name")) == false
            &&inputs.push( $("#"+field+" select")[i].getAttribute("name"))
        })
        $("#"+field+" input").map(i=>{
            $("#"+field+" input")[i].getAttribute("name")
            &&exceptions.test($("#"+field+" input")[i].getAttribute("name")) == false
            &&inputs.push( $("#"+field+" input")[i].getAttribute("name"))
        })
        $("#"+field+" textarea").map(i=>{
            $("#"+field+" textarea")[i].getAttribute("name")
            &&exceptions.test($("#"+field+" textarea")[i].getAttribute("name")) == false
            &&inputs.push( $("#"+field+" textarea ")[i].getAttribute("name"))
        })        
        requiredFields = inputs.join(";")
        console.log(requiredFields)
        $("#requiredFields").val(requiredFields)
     
    })   
}
function showMissingField(){
    console.log($("#missingField").val())
}
