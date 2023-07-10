function validateForm(form){
    var currentTask =  parseInt(getValue('WKNumState'));
    var requiredFields = form.getValue("requiredFields").split(";")
    var approverDecision = form.getValue("approverDecision")
    var gerenciaDecision = form.getValue("gerenciaDecision")
    var diretoriaDecision = form.getValue("diretoriaDecision")
    
    for(var i = 0;i<requiredFields.length;i++){
        if(form.getValue(requiredFields[i])==""){
            form.setValue("missingField",requiredFields[i])
            throw "O campo "+requiredFields[i]+" precisa ser preenchido"
            
        }
        else if((currentTask == 5 && approverDecision == "")||(currentTask == 99 && gerenciaDecision=="") ||(currentTask==95  && diretoriaDecision == "") ){
            throw "Você precisa tomar uma decisão"
        }
    } 
    var indexes = form.getChildrenIndexes("TBPRODUTOS");
    log.info("indexes => "+indexes)
    if((currentTask==0||currentTask==2)&&indexes.length<=0){
        throw "Você precisa adicionar ao menos 1 produto"
    }
    if((currentTask==0||currentTask==2)&&indexes.length>25){
        throw "O limite máximo de produtos é de 25 itens, por favor remova alguns itens "
    }
    for(var i = 0; i< indexes.length;i++){
        if(form.getValue("quantity___"+indexes[i])<=0){
            throw "As quantidades de produtos devem ser maiore que 0"
        }
        var fields = ["product___"+indexes[i],"centroCustoProduto___"+indexes[i],"quantity___"+indexes[i],"historicoCurtoProduto___"+indexes[i]]
        for(var j = 0; j<fields.length;j++){
            if(form.getValue(fields[j])==""){
                throw "Preencha todos os campos obrigatórios da tabela de produtos"
            }
        }
    }

}