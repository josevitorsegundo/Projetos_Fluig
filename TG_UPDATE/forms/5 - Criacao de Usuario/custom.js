var users = []
$(document).ready(function(){
    console.log("Custom Started")
    $.ajax({
        type: "GET",                           // Padrão da API entregue pela SPDM
        enctype: "multipart/form-data",
        data:{limit:10000},
        url: 'http://192.168.5.197:8080/api/public/2.0/users/listAll',        
        success: function(res){           
            users = res.content 
            fillApproverSelect(users)         
        },
        error:function(err){
          FLUIGC.toast({
            title: 'Erro na busca dos aprovadores ',          
            type: 'danger'
          });          
        }
      })
})
String.prototype.capitalize = function() {
    return this.toLowerCase().charAt(0).toUpperCase() + this.slice(1);
}
console.log(users)
function setSelectedZoomItem(selectedItem) {
    // ESSE SPLIT PEGA O ID E O  INDEX (CASO ZOOM ESTEJA EM TABELA PAI FILHO)
    var FIELD = selectedItem.inputId    
    if(FIELD == "funcionario"){  
        var nome = selectedItem["DESCRICAO"].split(" - ")[0]
        var arrayNome = nome.split(" ")
        var primeiroNome = arrayNome[0]
        var ultimoNome = arrayNome[arrayNome.length-1]
        var matricula = selectedItem["DESCRICAO"].split(" - ")[1]
        console.log(nome,arrayNome,primeiroNome,ultimoNome,matricula)
        $("#login").val(primeiroNome.toLowerCase()+"."+ultimoNome.toLowerCase())
        $("#senha").val("functg")      
        $("#matricula").val(matricula)
        $("#nome").val(primeiroNome)                  
        $("#sobrenome").val(ultimoNome)                  
    }
}
function fillApproverSelect(data) {
    for(var i = 0; i<data.length;i++){
        $("#aprovador").append(`<option value="${data[i].code}">${data[i].fullName} - ${data[i].code}</option>`)
    }
}
var beforeSendValidate = function(numState,nextState){
    aprovador = $("#aprovador").val()
    if(aprovador){

        var novoUser = criaUser()
        if(novoUser.values[0].response == "ok"){
            console.log("Usuário cadastrado com sucesso")  
      
          }
          else{
              throw(novoUser.values[0].response);
          }
    }
    else{
        throw ("O aprovador deve ser identificado")
    }
    
    
}
function criaUser(){
    var matricula = $("#matricula").val()
    var nome = $("#nome").val()+ " " +$("#sobrenome").val()
    var login = $("#login").val()
    var email = $("#email").val()
    var senha = $("#senha").val()
    console.log(matricula,nome,login,email,senha)
    var c1 = DatasetFactory.createConstraint("colleagueId", matricula , matricula, ConstraintType.MUST)
    var c2 = DatasetFactory.createConstraint("colleagueName",nome,nome, ConstraintType.MUST)
    var c3 = DatasetFactory.createConstraint("login",login,login,ConstraintType.MUST)
    var c4 = DatasetFactory.createConstraint("mail",email,email, ConstraintType.MUST)
    var c5 = DatasetFactory.createConstraint("passwd",senha,senha, ConstraintType.MUST)    
    var constraints = new Array(c1,c2,c3,c4,c5)
    var dataset = DatasetFactory.getDataset("CriaUsuario",null,constraints,null)
    return dataset
}  
