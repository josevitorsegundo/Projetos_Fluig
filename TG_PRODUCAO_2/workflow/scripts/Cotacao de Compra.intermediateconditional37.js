function intermediateconditional37() {
    log.info("STARTED CONDICIONAL 37")

    var produtos = hAPI.getCardValue("itensNaoCotados")!=""? hAPI.getCardValue("itensNaoCotados").split(";"):getDados()
    return checagem(produtos)

}
function getDados(){
    var numMov = hAPI.getCardValue("numMovCompra")
    hAPI.setCardValue("identificador",hAPI.getCardValue("numMovCompraNovo"))
    var c1 =  DatasetFactory.createConstraint("ID", numMov , numMov , ConstraintType.MUST)
    var result  = DatasetFactory.getDataset("ds_Cotacao_ItensCotacao", null , new Array(c1), null)
    var produtos = []
    log.info("Resultado Valore =>"+result)
    for(var i = 0;i<result.values.length;i++){
        produtos.push(result.getValue(i,"IDPRD"))
    }
    log.info("Produtos =>"+produtos.length)
    return produtos
}
function checagem(produtos){
    var numMov = hAPI.getCardValue("numMovCompra")
    var c1 =  DatasetFactory.createConstraint("ID", numMov , numMov , ConstraintType.MUST)
    var result  = DatasetFactory.getDataset("ds_Cotacao_ItensOrcados", null , new Array(c1), null)
    if(!result.values){
        return false
    }
    else{
        var quantidadePrd = produtos.length
        var itensCotados = []
        var itensNaoCotados = []
        var arrayPrd = []
        var arrayCot = []
        var codCotacao = DatasetFactory.getDataset("ds_Cotacao_CodigoCotacao", null , new Array(c1), null)
        for(var c = 0; c<codCotacao.values.length;c++){
            arrayCot.push(codCotacao.getValue(c, "DESCRICAO"))
        }
        var chapa = codCotacao.getValue(0, "CHAPA")
        var comprador = codCotacao.getValue(0, "NOME")
        hAPI.setCardValue("comprador", comprador)
        hAPI.setCardValue("chapa", chapa)
        hAPI.setCardValue("codCotacao",arrayCot.join(";"))
        // hAPI.setCardValue("identificador",arrayCot.join(";"))
        log.info(arrayCot+codCotacao+arrayCot.join(";"))
        for(var i = 0;i<result.values.length;i++){
            arrayPrd.push(parseInt(result.getValue(i,"IDPRD")))
            log.info("ITEM "+i+" ARRAYPRD=>"+arrayPrd[i]+" do tipo"+typeof arrayPrd[i])
        }
        
        log.info(arrayPrd)
        log.info("Quantidade de Produtos:"+quantidadePrd)
        for(var i = 0; i<quantidadePrd;i++){
            log.info("Muda ai mermaos")
            log.info("PRODUTO => " + produtos[i] + "do tipo"+(typeof produtos[i])+" boolean"+(arrayPrd.indexOf(parseInt(produtos[i]))>=0))
            if(arrayPrd.indexOf(parseInt(produtos[i]))>=0){
                itensCotados.push(produtos[i])
            }
            else{
                itensNaoCotados.push(produtos[i])
            }
        }
        hAPI.setCardValue("itensCotados",itensCotados.join(";"))
        hAPI.setCardValue("itensNaoCotados",itensNaoCotados.join(";"))
        return true
    }

}