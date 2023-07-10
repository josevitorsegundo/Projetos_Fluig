$("document").ready(function(){
    console.log("Custom Started ⚡")
    var mySimpleCalendar = FLUIGC.calendar('#dataEntrega');
    var formCurrentTask = $("#currentTask").val() | 0
    // O objeto task é responsável por identificar quais campos devem ser mostrados(displayFields) e quais devem ser habilitados(enablefields). Lembando que sempre que um novo panel for criado, seu id deve ser adicionado na variavel fields
    var tasks =[{task:0,displayFields:["requestData"], enableFields:["requestData"]}
    ,{task:11,displayFields:["requestData","approverComments"], enableFields:["requestData"]}, {task:13,displayFields:["requestApprover","requestData","approverComments"], enableFields:["requestApprover"]},
    {task:99,displayFields:["requestData","aprovacaoGerencia","gerenciaComments"], enableFields:["aprovacaoGerencia"]},
    {task:95,displayFields:["diretoriaDecision","requestData","aprovacaoGerencia","aprovacaoDiretoria","diretoriaComments"], enableFields:["aprovacaoDiretoria"]},
    {task:5,displayFields:["entregaProdutos"], enableFields:["entregaProdutos"]},
    {task:97,displayFields:["compraProdutos"], enableFields:["compraProdutos"]}]
    var currentTask = tasks.filter(function (task){return task.task==formCurrentTask})[0] 
    console.log(currentTask)
    //Variável pega os campos que devem ser visíveis na task atual
    var fieldsEnabled = currentTask.enableFields
    var fieldsDisplayed = currentTask.displayFields
    //Sempre que adicionar novos campos(panel) adicionar também na variável fields o id do campo
    var fields  = ["requestData","entregaProdutos","compraProdutos","requestApprover","approverComments","diretoriaComments","aprovacaoDiretoria","aprovacaoGerencia","gerenciaComments"]
    enableAndDisplayFields(fields,fieldsEnabled,fieldsDisplayed)    
    //Variável exceptions recebe uma expressão regular com os atributos name de todos os campos que não devem ser obrigatórios separados por "|"
    //Em outros casos basta colocar o nome do campo que não é obrigatório
    var exceptions = /numMov|numMovCompra|numMovCompraNovo|codCotacao|idPedidolocal|Produto|idx|qtd|nome|sld|prat|prateleira|frota|saldo|product|quantity|unidade|idprd|centroCustoProduto|historicoCurtoProduto/
    //Essa função torna todos os campos que estão marcados como habilitados(primeiroparâmetro) obrigatórios, com exceção dos campos marcados na expressão regular que vai como segundo parâmetro
    setRequiredFields(fieldsEnabled, exceptions)
    if(formCurrentTask==5){
      var hasProducts = $("#TBALMOX tbody tr").length
      if(hasProducts<=1){
        fillDeliverPanel()
      }
    }
    if(formCurrentTask==97){
      //Função preenche o panel com inputs contendo dados de produtos a ser comprados
      fillPurchasePanel()
    }        
    if(formCurrentTask == 2 || formCurrentTask ==23){
      var prodIndexes = $("#products").val().split(";")
      var deliverProducts = $("#availableProducts").val().split(";")
      deliverProducts.pop()
      for(var i = 0; i<prodIndexes.length;i++){
        $("#quantity___"+prodIndexes[i]).removeAttr("readonly")
        $("#quantity___"+prodIndexes[i]).removeClass("disable-click")
        if(formCurrentTask ==23){
          console.log(i , prodIndexes[i])
          console.log($("#saldo___"+prodIndexes[i]).closest("tr"))
          console.log(deliverProducts.indexOf(prodIndexes[i])>0)
          console.log("Deliver products:"+deliverProducts)
          deliverProducts.indexOf(prodIndexes[i])<0?$("#saldo___"+prodIndexes[i]).closest("tr").hide():false         
        }
      }
    }
})

var scripts_tabelas = {
  insere: function (tabela) {
    var index = wdkAddChild(tabela);
    var products = $("#products").val()
    products ==""? $("#products").val(index):$("#products").val(products + ";"+ index)
    return index
  },

  remove: function (elemento) {
    var index = $(elemento).closest("td").find("input.form-control:first").attr("id").split("___")[1]
    var products = $("#products").val().split(";")
    var productsIndex = products.indexOf(index.toString())
    var splicado = products.splice(productsIndex,1)
    productsIndex>=0?$("#products").val(products.join(";")):false
    var productName = $("#product___"+index).val()
    if(productName.length>0){

      productName = productName[0].split(" - ")[1]
      console.log(productName)
      var arrayproducts = $("#productsName").val().split(",")
      var regex = new RegExp(productName) 
      var filterProducts = arrayproducts.filter(function(prod){
        return regex.test(prod)   
      })
      arrayproducts.splice(arrayproducts.indexOf(filterProducts[0]),1)
      $("#productsName").val(arrayproducts.join(","))


    }
    console.log(index,products, typeof(index), productsIndex,productsIndex>=0,products.slice(productsIndex,1).join(";"))
    fnWdkRemoveChild(elemento);

  }
};

function setSelectedZoomItem(selectedItem) {
  // ESSE SPLIT PEGA O ID E O  INDEX (CASO ZOOM ESTEJA EM TABELA PAI FILHO)
	var FIELD = selectedItem.inputId.split("___");   
  if(FIELD[0] == "requester"){
    var chapa = selectedItem["DESCRICAO"].split(" - ")[2]
    var c1 =  DatasetFactory.createConstraint("matricula", chapa , chapa , ConstraintType.MUST)
    var aprovadores = DatasetFactory.getDataset("DSCriacaodeUsuario", null , new Array(c1), null)
    var aprovador  = aprovadores.values[0].aprovador
    console.log(chapa,c1,aprovadores,aprovador)
    $("#aprovador").val(aprovador)
  }  
	if(FIELD[0] == "product"){  
    //Habilita o campo Quantidade e atribui valor aos campor id e unidade
    $("#quantity___"+FIELD[1]).removeAttr("readonly")
    $("#saldo___"+FIELD[1]).val(selectedItem["SALDO"])      
		$("#idprd___"+FIELD[1]).val(selectedItem["IDPRD"])
    $("#unidade___"+FIELD[1]).val(selectedItem["UNIDADE"])                  
    $("#prateleira___"+FIELD[1]).val(selectedItem["PRATELEIRA"])                  
	}
}

function removedZoomItem(removedItem) {
  // ESSE SPLIT PEGA O ID E O  INDEX (CASO ZOOM ESTEJA EM TABELA PAI FILHO)
  var FIELD = removedItem.inputId.split("___");     
	if(FIELD[0] == "product"){  
    //Desabilita o campo quantidade e apaga o valor(caso exista) dos campos unidade e id
    $("#quantity___"+FIELD[1]).val("")
    $("#unidade___"+FIELD[1]).val("")
    $("#idprd___"+FIELD[1]).val("")
    $("#prateleira___"+FIELD[1]).val("")
    $("#quantity___"+FIELD[1]).attr("readonly","readonly")
    //exclui o nome do produto do input hidden "productsName"    
    var productName = removedItem["DESCRICAO"].split(" - ")[1]
    var arrayproducts = $("#productsName").val().split(",")
    var regex = new RegExp(productName) 
    var filterProducts = arrayproducts.filter(function(prod){
      return regex.test(prod)   
    })
    arrayproducts.splice(arrayproducts.indexOf(filterProducts[0]),1)
    $("#productsName").val(arrayproducts.join(","))

	}
}

function fillDeliverPanel(){
  var indexes = $("#availableProducts").val().split(";")
  //Retirar o último valor em branco
  indexes.pop()
  var prod = []
  for(var i = 0;i<indexes.length;i++){
    var produto = $("#product___"+indexes[i]).val()
    var quantidade = $("#quantity___"+indexes[i]).val()
    var id= $("#idprd___"+indexes[i]).val()
    var prateleira= $("#prateleira___"+indexes[i]).val()
    var c1 = DatasetFactory.createConstraint("ID", id , id , ConstraintType.MUST);
  	var dataset = DatasetFactory.getDataset("ds_RequisicaoMateriak_ConsultaSaldoProduto", null, new Array(c1), null);
    var saldo = dataset.values[0].SALDO?dataset.values[0].SALDO:0
    quantidade>=saldo? quantidade=saldo:false
    prod.push({index:indexes[i],produto,quantidade,id,prateleira,saldo})    
  }
  console.log(prod)
  prod = prod.sort((a,b)=>{
    if ( a.prateleira < b.prateleira ) {
      return -1;
    }
    if ( a.prateleira > b.prateleira ) {
      return 1;
    }
    return 0;
  })
  prod.map((p,i)=>{
    var rowIndex = scripts_tabelas.insere("TBALMOX")
    insertValuesToTable(rowIndex, p.index, p.produto,p.quantidade,p.prateleira,p.saldo)
    //insertProductsToPanel("entregaProdutos",i+1,p.produto,p.quantidade, p.prateleira, p.saldo)
  })
    
}
function insertValuesToTable(rowIndex,index,produto,quantidade,prateleira,saldo){
  var indexesAlmox =  $("#indexesAlmox").val()
  rowIndex == 1? $("#indexesAlmox").val(index): $("#indexesAlmox").val(indexesAlmox+";"+index)
  $("#nome___"+rowIndex).val(produto)
  $("#idx___"+rowIndex).val(index)
  $("#qtd___"+rowIndex).val(quantidade)
  $("#prat___"+rowIndex).val(prateleira)
  $("#sld___"+rowIndex).val(saldo)
}
function fillPurchasePanel(){
  var indexes = $("#unavailableProducts").val().split(";")
  //Retirar o último valor em branco
  
  indexes.pop()
  for(var i = 0;i<indexes.length;i++){
    var produto = $("#product___"+indexes[i]).val()
    var quantidade = $("#quantity___"+indexes[i]).val()
    var id= $("#idprd___"+indexes[i]).val()
    var c1 = DatasetFactory.createConstraint("ID", id , id , ConstraintType.MUST);
  	var dataset = DatasetFactory.getDataset("ds_RequisicaoMateriak_ConsultaSaldoProduto", null, new Array(c1), null);
    var saldo = dataset.values[0].SALDO?dataset.values[0].SALDO:0

    insertProductsToPanel("compraProdutos",indexes[i],produto,quantidade-saldo)
  }  
}

function insertProductsToPanel(panel,index,product, quantity, shelf,balance){
  console.log(balance)
  $("#"+panel).find(".panel-body").append(`<div class="row"><input class="form-control index" readonly type="hidden" value="${index}" name="index" id="index"><div class="col-xs-5 col-md-5 col-sm-5 col-lg-5"><div class="form-group"><label class="control-label" for="produto">${index==1?"Produto":""}</label><input class="form-control produto" readonly value="${product}" type="text" name="produto" id="produto"></div></div><div class="col-xs-2 col-md-2 col-sm-2 col-lg-2"><div class="form-group"><label class="control-label" for="quantidade">${index==1?"Qtd":""}</label><input class="form-control quantidade" value="${quantity}" type="number" readonly name="qtd___${index}" id="qtd___${index}" onchange="changeQuantity(this,${index})"></div></div><div class="col-xs-3 col-md-3 col-sm-3 col-lg-3"><div class="form-group"><label class="control-label" for="prat">${index==1?"Prateleira":""}</label><input class="form-control quantidade" readonly value="${shelf}" type="text"  name="prat___${index}" id="prat___${index}" readonly onchange="changeQuantity(this,${index})"></div></div><div class="col-xs-2 col-md-2 col-sm-2 col-lg-2"><div class="form-group"><label class="control-label" for="prat">${index==1?"Saldo":""}</label><input class="form-control quantidade" readonly value="${balance}" type="text"  name="sal___${index}" id="sal___${index}" readonly onchange="changeQuantity(this,${index})"></div></div>`)
}
function handleChangeQuantity(element){
  //atribui o nome do produto no input hidden "productsName"
  var actualNames =  $("#productsName").val()
  var index = $(element).attr("id").split("___")[1]
  console.log($(element), index)
  var productName = $(element).val() + "X " + $("#product___"+index).val()[0].split(" - ")[1]   
  var arrayproducts = $("#productsName").val().split(",")  
  var regex = new RegExp($("#product___"+index).val()[0].split(" - ")[1]) 
  var filterProducts = arrayproducts.filter(function(prod){
    return regex.test(prod)   
  })
  console.log(regex,filterProducts)
  if(filterProducts.length>0){
    arrayproducts.splice(arrayproducts.indexOf(filterProducts[0]),1)
    arrayproducts.push(productName)
    $("#productsName").val(arrayproducts.join(","))

  } 
  else{
    actualNames?$("#productsName").val(actualNames+","+productName):$("#productsName").val(productName)

  }
  
}
var beforeSendValidate = function(numState,nextState){
  var productName = $("#productsName").val()
  var maxProducts = 3
  var arrayProducts = productName.split(",")
  console.log("ARRAY DE PRODUTOS : "+arrayProducts)
  if(arrayProducts.length>maxProducts){
      productName =""
      for(var i = 0; i<maxProducts;i++){
          productName += arrayProducts[i]+","
      }        
      var restante =arrayProducts.length-maxProducts
      productName += "mais "+restante
      console.log(productName)
      $("#productsName").val(productName)
  }
}
function formatarMoeda(elemento) {  
  var valor = elemento.value;
  $(elemento).mask('#0.00', {reverse: true});
 
}