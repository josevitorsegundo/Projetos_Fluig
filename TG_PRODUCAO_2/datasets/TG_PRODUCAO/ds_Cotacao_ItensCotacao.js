function createDataset(fields, constraints, sortFields) {
    log.info("DEVDEBUG => #01 Start Dataset ds_ApontamentosMatheus_ConsultaAponts");
  
    var usuario = "fluig";
    var senha = "fluig";
    var nomeServico = "wsConsultaSql";
    var caminhoServico = "com.totvs.WsConsultaSQL";
  
    var params = "ID="+constraints[0].initialValue;
    // var CODANALISTA = null;
    // var DATADE = null;
    // var DATAATE = null;
  
    // for (var i = 0; i < constraints.length; i++) {
    //   if (constraints[i].fieldName == "CODANALISTA") {
    //     CODANALISTA = constraints[i].initialValue;
    //   }
    //   if (constraints[i].fieldName == "DATADE") {
    //     DATADE = constraints[i].initialValue;
    //   }
    //   if (constraints[i].fieldName == "DATAATE") {
    //     DATAATE = constraints[i].initialValue;
    //   }
    //   params = "CODANALISTA=" + CODANALISTA + ";DATADE=" + DATADE + ";DATAATE=" + DATAATE + ";";
    // }
  
    var colunas = new Array("MOVORIGEM","IDPRD","CODCCUSTO","NOMECCUSTO","NOMEPRD","CODPRD");
    var dataset = DatasetBuilder.newDataset();
  
    for (var i = 0; i < colunas.length; i++) {
      dataset.addColumn(colunas[i]);
    }
  
    var servico = ServiceManager.getService(nomeServico);
    var instancia = servico.instantiate(caminhoServico);
    var ws = instancia.getRMIwsConsultaSQL();
    var serviceHelper = servico.getBean();
    var authService = serviceHelper.getBasicAuthenticatedClient(ws, "com.totvs.IwsConsultaSQL", usuario, senha);
  
    //params = 'ID=1083852';
    log.info("DEVDEBUG => #02 authService " + authService);
    var result = authService.realizarConsultaSQL("FLUIG013", 0, "T", params);
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
          dataset.addRow(new Array(registro.has("MOVORIGEM")?registro.get("MOVORIGEM"):"",registro.has("IDPRD")? registro.get("IDPRD"):"",registro.has("CODCCUSTO")?registro.get("CODCCUSTO"):"",registro.has("NOMECCUSTO")?  registro.get("NOMECCUSTO"):"",registro.has("NOMEPRD")?registro.get("NOMEPRD"):"",registro.has("CODPRD")?  registro.get("CODPRD"):""))
        }

      }
      catch(e){
        var registro = dados
        dataset.addRow(new Array(registro.has("MOVORIGEM")?registro.get("MOVORIGEM"):"",registro.has("IDPRD")? registro.get("IDPRD"):"",registro.has("CODCCUSTO")?registro.get("CODCCUSTO"):"",registro.has("NOMECCUSTO")?  registro.get("NOMECCUSTO"):"",registro.has("NOMEPRD")?registro.get("NOMEPRD"):"",registro.has("CODPRD")?  registro.get("CODPRD"):""))
      }

    } 
    
    
  
    return dataset;
  }