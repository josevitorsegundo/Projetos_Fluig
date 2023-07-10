function displayFields(form,customHTML){ 
    var currentTask =  parseInt(getValue('WKNumState'));
    form.setValue("currentTask",currentTask) 
    if(currentTask != 0 && currentTask != 2 ){
        form.setEnabled("requester",false)
        form.setEnabled("filial",false)
        form.setEnabled("centroCusto",false)
        form.setEnabled("departamento",false)
        var indexes = form.getChildrenIndexes("TBPRODUTOS");    
        for (var i = 0; i < indexes.length; i++) {
            form.setEnabled("product___" + indexes[i], false);
            form.setEnabled("centroCustoProduto___" + indexes[i], false);
            
        }    
    }   
    var indexes = form.getChildrenIndexes("TBPRODUTOS").join(";")
    form.setValue("products",indexes)

}
