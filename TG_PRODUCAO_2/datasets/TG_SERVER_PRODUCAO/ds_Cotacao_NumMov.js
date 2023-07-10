function createDataset(fields, constraints, sortFields) {
    log.info("DEVDEBUG => #01 Start Dataset ds_ApontamentosMatheus_ConsultaAponts");
  
    var usuario = "fluig";
    var senha = "fluig";
    var nomeServico = "wsConsultaSql";
    var caminhoServico = "com.totvs.WsConsultaSQL";
  
    var params = "IDMOV="+constraints[0].initialValue;
    
  
    var colunas = new Array("NUMEROMOV");
    var dataset = DatasetBuilder.newDataset();
  
    for (var i = 0; i < colunas.length; i++) {
      dataset.addColumn(colunas[i]);
    }
  
    var servico = ServiceManager.getService(nomeServico);
    var instancia = servico.instantiate(caminhoServico);
    var ws = instancia.getRMIwsConsultaSQL();
    var serviceHelper = servico.getBean();
    var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsConsultaSQL", usuario, senha);
  
    // params = 'IDMOV=1083999';
    log.info("DEVDEBUG => #02 authService " + authService);
    var result = authService.realizarConsultaSQL("FLUIG022", 0, "T", params);
    var JSONObj = org.json.XML.toJSONObject(result);
    var dados = JSONObj.get("NewDataSet").get("Resultado");
    log.info("DEBUG DS ITENS COTACAO: DADOS=>"+dados)	   
    
    if(dados.length()==0){
      dataset.addRow(new Array("","","","","",""))
    }    
    else{
      try{
        for(var i = 0;i<dados.length();i++){
          var registro = dados.get(i)
          dataset.addRow(new Array(registro.has("NUMEROMOV")? registro.get("NUMEROMOV"):""))
        }

      }
      catch(e){
        var registro = dados
        dataset.addRow(new Array(registro.has("NUMEROMOV")? registro.get("NUMEROMOV"):""))
      }

    } 
    
    
  
    return dataset;
  }