function intermediateconditional42() {
    log.info("Started Condicional 42")
    var codCotacao = hAPI.getCardValue("codCotacao")
    var numMovCompraNovo =hAPI.getCardValue("numMovCompraNovo")
    var c1 =  DatasetFactory.createConstraint("CODCOTACAO", codCotacao , codCotacao , ConstraintType.MUST)
    var result  = DatasetFactory.getDataset("ds_Cotacao_StatusCotacao", null , new Array(c1), null)
    var status = parseInt(result.getValue(0,"STATUS"))
    log.info("STATUS COTACAO =>"+status+" CODIGO COTACAO =>"+ codCotacao)
    switch(status){
        case 1:
            hAPI.setCardValue("identificador",numMovCompraNovo+" - Composição")
            hAPI.setCardValue("stacusCot","Composição")
            return false
        case 2:
            hAPI.setCardValue("identificador",numMovCompraNovo+" - Aguardando Resposta do Fornecedor")
            hAPI.setCardValue("stacusCot","Aguardando Resposta do Fornecedor")
            return false
        case 3:
            hAPI.setCardValue("identificador",numMovCompraNovo+" - Pronto para Cálculo")
            hAPI.setCardValue("stacusCot","Pronto para Cálculo")
            return false
        case 4:
            hAPI.setCardValue("identificador",numMovCompraNovo+" - Pronto para Calcular o Quadro Comparativo")
            hAPI.setCardValue("stacusCot","Pronto para Calcular o Quadro Comparativo")
            return false
        case 5:
            hAPI.setCardValue("identificador",numMovCompraNovo+" - Negociação da Melhor Oferta")
            hAPI.setCardValue("stacusCot","Negociação da Melhor Oferta")
            return false
        case 6:
            var idmov = hAPI.getCardValue("numMovCompra")
            var c2 =  DatasetFactory.createConstraint("IDMOV", idmov , idmov , ConstraintType.MUST)
            var resultPedido = DatasetFactory.getDataset("ds_Cotacao_OrdemCompra",null,new Array(c2),null)
            var idPedido = resultPedido.getValue(0,"IDORDEM")
            var numPedido = resultPedido.getValue(0,"NUMEROMOV")
            log.info("Numero do pedido =>"+ numPedido)
            hAPI.setCardValue("idPedido",idPedido)
            hAPI.setCardValue("numPedido",numPedido)
            hAPI.setCardValue("identificador",numMovCompraNovo+" - Cotação Finalizada")
            hAPI.setCardValue("stacusCot","Cotação Finalizada")
            return true
        case 7:
            hAPI.setCardValue("identificador",numMovCompraNovo+" - Cotação Cancelada")
            hAPI.setCardValue("stacusCot","Cotação Cancelada")
            return false
        default:
            return false
    }
}