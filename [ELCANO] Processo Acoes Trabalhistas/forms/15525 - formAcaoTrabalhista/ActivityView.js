/**
 * ATIVIDADE DO FLUXOS
 */

class AtividadeView{
    Atividade = Object.freeze({
        INICIO                  :0,
        ANEXAR_CITACAO          :8,
        INSERIR_PROCESSO_GED    :10,
        ANALISAR_SOLICITACAO    :24,
        ELABORADOR_SUBSIDIOS    :25,
        ANALISAR_SUBSIDIOS      :26,
        AJUSTAR_SUBSIDIOS      	:32,
        INSERIR_SUBSIDIOS_GED   :35,
        ANALISAR_DOCUMENTACAO   :37,
        ENVIAR_DOC_ESCRITORIO   :161,
        ENVIAR_DE_EMAIL         :106,
        ERROR_EMAIL             :108,
        BUSCAR_BUSCAR_DOC_EXTERNO :146,
        ERROR_BUSCAR_DOC_EXTERNO  :133,
        ANALISAR_DECISAO_ESCRITORIO:54,
        ACOMPANHAR_PROCESSO_JURIDICO:65,
        VERIFICAR_DEMANDA_RH    :86,
        VERIFICAR_DEMANDA_GRH   :87,
        INSERIR_ARQUIVO_GED     :100,
        INSERIR_ANEXOS_OBRIGATORIOS: 175,
    })
}

class ActivityView{

    
    /*constructor(){
        this.obj = new AtividadeView();
        this.activityView = this._activityView() 
    }*/

    /**
     * @ACTIVE VIEW FORMULARIO
     */
    _activityView =()=>{

         console.log("### CURRENT_STATE: "+CURRENT_STATE);
         
//         fieldsReadonlyEver(); 
         
        /*if(this.obj.Atividade.INICIO ==  CURRENT_STATE ){

            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
		    document.getElementById("panel_ExFuncionario").classList.remove("hide");
		    document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
		    
		    document.getElementById("div_anexos_rg").classList.add("hide");
		    document.getElementById("div_anexos_ctps").classList.add("hide");
		    document.getElementById("div_anexos_contrato").classList.add("hide");
		    document.getElementById("div_anexos_comprovante_residencia").classList.add("hide");
		    document.getElementById("div_anexos_ficha_financeira").classList.add("hide");
		    document.getElementById("div_anexos_ficha_registro").classList.add("hide");
		    document.getElementById("div_notificacao").classList.add("hide");
	//	    document.getElementById("_btnDownloadNotificacaoAnexo").classList.add("hide");
	//	    document.getElementById("btnDownloadNotificacaoAnexo").classList.add("hide");	    	
	//	    document.getElementById("btnViewerNotificacaoAnexo").classList.add("hide");	  
		    
		    document.getElementById("div_info_processo").classList.add("hide");		    		    
		    
		    document.getElementById("panel_observacao").classList.remove("hide");		    
       }
        else if(this.obj.Atividade.ANEXAR_CITACAO == CURRENT_STATE){
        	console.log("### ANEXO CITAÇÃO")
            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
		    document.getElementById("panel_ExFuncionario").classList.remove("hide");
		    document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
		    
		    
		    document.getElementById("div_anexos_rg").classList.add("hide");	    		    
		    document.getElementById("div_anexos_ctps").classList.add("hide");	    		    
		    document.getElementById("div_anexos_contrato").classList.add("hide");	    		    
		    document.getElementById("div_anexos_comprovante_residencia").classList.add("hide");	    		    
		    document.getElementById("div_anexos_ficha_financeira").classList.add("hide");	    		    
		    document.getElementById("div_anexos_ficha_registro").classList.add("hide");	    	

		    document.getElementById("btnAnexoNotificacaoAnexo").classList.add("hide");
		    document.getElementById("btnDownloadNotificacaoAnexo").classList.add("hide");	    	
		    document.getElementById("btnViewerNotificacaoAnexo").classList.add("hide");	 
		    
		    document.getElementById("btnDownloadAnexoProcesso").classList.add("hide");	    	
		    document.getElementById("btnViewerAnexoProcesso").classList.add("hide");	  
		    
		    document.getElementById("btnDownloadAnexoCitacao").classList.add("hide");	    	
		    document.getElementById("btnViewerAnexoCitacao").classList.add("hide");	  
		    
		    document.getElementById("panel_observacao").classList.remove("hide");
		    
            $("#panel_DadosSolicitante:input").prop("disabled",true);
            $("#panel_ExFuncionario:input").prop("disabled",true);
            
            hideDocEscritorio(false, 0);
                        
        }
        else if(this.obj.Atividade.INSERIR_ANEXOS_OBRIGATORIOS == CURRENT_STATE){
        	
        	document.getElementById("panel_DadosSolicitante").classList.remove("hide");
        	document.getElementById("panel_ExFuncionario").classList.remove("hide");
        	document.getElementById("panel_documentacoesAnexos").classList.remove("hide");        	
        	
        	document.getElementById("btnDownloadRg").classList.add("hide");
        	document.getElementById("btnViewerRg").classList.add("hide");
        	document.getElementById("btnDownloadCtps").classList.add("hide");
        	document.getElementById("btnViewerCtps").classList.add("hide");
        	document.getElementById("btnDownloadContratoTrabalho").classList.add("hide");
        	document.getElementById("btnViewerContratoTrabalho").classList.add("hide");
        	document.getElementById("btnDownloadComprovanteRes").classList.add("hide");
        	document.getElementById("btnViewerComprovanteRes").classList.add("hide");
        	document.getElementById("btnDownloadFichaFinanceira").classList.add("hide");
        	document.getElementById("btnViewerFichaFinanceira").classList.add("hide");
        	document.getElementById("btnDownloadFichaRegistro").classList.add("hide");
        	document.getElementById("btnViewerFichaRegistro").classList.add("hide");
        	
        	document.getElementById("btnViewerNotificacaoAnexo").classList.add("hide");
        	document.getElementById("_btnViewerNotificacaoAnexo").classList.add("hide");
        	document.getElementById("btnDownloadNotificacaoAnexo").classList.add("hide");
        	document.getElementById("_btnDownloadNotificacaoAnexo").classList.add("hide");
        	document.getElementById("btnAnexoNotificacaoAnexo").classList.add("hide");
        	document.getElementById("_btnAnexoNotificacaoAnexo").classList.add("hide");
        	
        	document.getElementById("btnAnexoProcesso").classList.add("hide");	    	
        	document.getElementById("_btnAnexoProcesso").classList.add("hide");	    	
        	document.getElementById("btnDownloadAnexoProcesso").classList.add("hide");	    	
        	document.getElementById("_btnDwnloadAnexoProcesso").classList.add("hide");	    	
		    document.getElementById("btnViewerAnexoProcesso").classList.add("hide");	  
		    document.getElementById("_btnViewerAnexoProcesso").classList.add("hide");	  
		    
		    document.getElementById("btnAnexoCitacao").classList.add("hide");	    	
		    document.getElementById("_btnAnexoCitacao").classList.add("hide");	    	
		    document.getElementById("btnDownloadAnexoCitacao").classList.add("hide");	    	
		    document.getElementById("_btnDownloadAnexoCitacao").classList.add("hide");	    	
		    document.getElementById("btnViewerAnexoCitacao").classList.add("hide"); 
		    document.getElementById("_btnViewerAnexoCitacao").classList.add("hide"); 
		    
		    document.getElementById("panel_observacao").classList.remove("hide");
		    
		    hideDocEscritorio(false, 0);
        }
        else if(this.obj.Atividade.ANALISAR_SOLICITACAO == CURRENT_STATE){

            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
            document.getElementById("panel_ExFuncionario").classList.remove("hide");
            document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
            document.getElementById("panel_analiseDiretor").classList.remove("hide");
            
            document.getElementById("btnAnexoRg").classList.add("hide");
            document.getElementById("btnAnexoCtps").classList.add("hide");
            document.getElementById("btnAnexoContratoTrabalho").classList.add("hide");
            document.getElementById("btnAnexoComprovanteRes").classList.add("hide");
            document.getElementById("btnAnexoFichaFinanceira").classList.add("hide");
            document.getElementById("btnAnexoFichaRegistro").classList.add("hide");
            document.getElementById("btnAnexoNotificacaoAnexo").classList.add("hide");
            
            document.getElementById("btnAnexoProcesso").classList.add("hide");
            document.getElementById("btnAnexoCitacao").classList.add("hide");
            
            document.getElementById("panel_observacao").classList.remove("hide");
            
            hideDocEscritorio(false, 1);
            
        }
        else if(this.obj.Atividade.ELABORADOR_SUBSIDIOS == CURRENT_STATE){
        	
        	console.log("ELABORADOR_SUBSIDIOS: "+this.obj.Atividade.ELABORADOR_SUBSIDIOS);
            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
            document.getElementById("panel_ExFuncionario").classList.remove("hide");
            document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
            document.getElementById("panel_analiseDiretor").classList.remove("hide");
                        
            document.getElementById("btnAnexoRg").classList.add("hide");
            document.getElementById("btnDownloadRg").classList.add("hide");
        	document.getElementById("btnViewerRg").classList.add("hide");
        	document.getElementById("btnAnexoCtps").classList.add("hide");
        	document.getElementById("btnDownloadCtps").classList.add("hide");
        	document.getElementById("btnViewerCtps").classList.add("hide");
        	document.getElementById("btnAnexoContratoTrabalho").classList.add("hide");
        	document.getElementById("btnDownloadContratoTrabalho").classList.add("hide");
        	document.getElementById("btnViewerContratoTrabalho").classList.add("hide");
        	document.getElementById("btnAnexoComprovanteRes").classList.add("hide");
        	document.getElementById("btnDownloadComprovanteRes").classList.add("hide");
        	document.getElementById("btnViewerComprovanteRes").classList.add("hide");
        	document.getElementById("btnAnexoFichaFinanceira").classList.add("hide");
        	document.getElementById("btnDownloadFichaFinanceira").classList.add("hide");
        	document.getElementById("btnViewerFichaFinanceira").classList.add("hide");
        	document.getElementById("btnAnexoFichaRegistro").classList.add("hide");
        	document.getElementById("btnDownloadFichaRegistro").classList.add("hide");
        	document.getElementById("btnViewerFichaRegistro").classList.add("hide");
        	
        	document.getElementById("btnViewerNotificacaoAnexo").classList.add("hide");
        	document.getElementById("_btnDownloadNotificacaoAnexo").classList.add("hide");
        	document.getElementById("btnDownloadNotificacaoAnexo").classList.add("hide");
        	document.getElementById("btnAnexoNotificacaoAnexo").classList.add("hide");
        	
        	document.getElementById("btnAnexoProcesso").classList.add("hide");	    	
        	document.getElementById("btnDownloadAnexoProcesso").classList.add("hide");	    	
		    document.getElementById("btnViewerAnexoProcesso").classList.add("hide");	  
		    
		    document.getElementById("btnAnexoCitacao").classList.add("hide");	    	
		    document.getElementById("btnDownloadAnexoCitacao").classList.add("hide");	    	
		    document.getElementById("btnViewerAnexoCitacao").classList.add("hide");
            
            
            document.getElementById("panel_elaboracaoSubsidios").classList.remove("hide");            
            
        	$("#alterarApendiceSim").attr('readonly', true);
        	$("#alterarApendiceNao").attr('readonly', true);
        	
        	document.getElementById("div_switchAlterSubsidio").classList.add("hide");
        	
        	document.getElementById("panel_observacao").classList.remove("hide");
        	
        	hideDocEscritorio(false, 0);

        }
        else if(this.obj.Atividade.ANALISAR_SUBSIDIOS == CURRENT_STATE){

            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
            document.getElementById("panel_ExFuncionario").classList.remove("hide");
            document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
            document.getElementById("panel_analiseDiretor").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioDRH").classList.remove("hide");
            
            document.getElementById("btnAnexoRg").classList.add("hide");
            document.getElementById("btnDownloadRg").classList.add("hide");
        	document.getElementById("btnViewerRg").classList.add("hide");
        	document.getElementById("btnAnexoCtps").classList.add("hide");
        	document.getElementById("btnDownloadCtps").classList.add("hide");
        	document.getElementById("btnViewerCtps").classList.add("hide");
        	document.getElementById("btnAnexoContratoTrabalho").classList.add("hide");
        	document.getElementById("btnDownloadContratoTrabalho").classList.add("hide");
        	document.getElementById("btnViewerContratoTrabalho").classList.add("hide");
        	document.getElementById("btnAnexoComprovanteRes").classList.add("hide");
        	document.getElementById("btnDownloadComprovanteRes").classList.add("hide");
        	document.getElementById("btnViewerComprovanteRes").classList.add("hide");
        	document.getElementById("btnAnexoFichaFinanceira").classList.add("hide");
        	document.getElementById("btnDownloadFichaFinanceira").classList.add("hide");
        	document.getElementById("btnViewerFichaFinanceira").classList.add("hide");
        	document.getElementById("btnAnexoFichaRegistro").classList.add("hide");
        	document.getElementById("btnDownloadFichaRegistro").classList.add("hide");
        	document.getElementById("btnViewerFichaRegistro").classList.add("hide");
        	
        	document.getElementById("btnViewerNotificacaoAnexo").classList.add("hide");
        	document.getElementById("_btnDownloadNotificacaoAnexo").classList.add("hide");
        	document.getElementById("btnDownloadNotificacaoAnexo").classList.add("hide");
        	document.getElementById("btnAnexoNotificacaoAnexo").classList.add("hide");
        	
        	document.getElementById("btnAnexoProcesso").classList.add("hide");	    	
        	document.getElementById("btnDownloadAnexoProcesso").classList.add("hide");	    	
		    document.getElementById("btnViewerAnexoProcesso").classList.add("hide");	  
		    
		    document.getElementById("btnAnexoCitacao").classList.add("hide");	    	
		    document.getElementById("btnDownloadAnexoCitacao").classList.add("hide");	    	
		    document.getElementById("btnViewerAnexoCitacao").classList.add("hide");
            
           
            document.getElementById("panel_elaboracaoSubsidios").classList.remove("hide");
            
            
            $("#elaboradorSubsidios").attr('readonly', true);
            $("#dataSubsidios").attr('readonly', true);
        	$("#horaSubsidios").attr('readonly', true);
        	$("#alterarApendiceSim").attr('readonly', true);
        	$("#alterarApendiceNao").attr('readonly', true);
        	
        	document.getElementById("panel_observacao").classList.remove("hide");
        	
        	hideDocEscritorio(false, 0);
        	hideDocApendice(false,0);

        } 
        else if (this.obj.Atividade.AJUSTAR_SUBSIDIOS == CURRENT_STATE){
        	
        	document.getElementById("panel_DadosSolicitante").classList.remove("hide");
            document.getElementById("panel_ExFuncionario").classList.remove("hide");
            document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
            
            document.getElementById("btnAnexoRg").classList.add("hide");
            document.getElementById("btnDownloadRg").classList.add("hide");
        	document.getElementById("btnViewerRg").classList.add("hide");
        	document.getElementById("btnAnexoCtps").classList.add("hide");
        	document.getElementById("btnDownloadCtps").classList.add("hide");
        	document.getElementById("btnViewerCtps").classList.add("hide");
        	document.getElementById("btnAnexoContratoTrabalho").classList.add("hide");
        	document.getElementById("btnDownloadContratoTrabalho").classList.add("hide");
        	document.getElementById("btnViewerContratoTrabalho").classList.add("hide");
        	document.getElementById("btnAnexoComprovanteRes").classList.add("hide");
        	document.getElementById("btnDownloadComprovanteRes").classList.add("hide");
        	document.getElementById("btnViewerComprovanteRes").classList.add("hide");
        	document.getElementById("btnAnexoFichaFinanceira").classList.add("hide");
        	document.getElementById("btnDownloadFichaFinanceira").classList.add("hide");
        	document.getElementById("btnViewerFichaFinanceira").classList.add("hide");
        	document.getElementById("btnAnexoFichaRegistro").classList.add("hide");
        	document.getElementById("btnDownloadFichaRegistro").classList.add("hide");
        	document.getElementById("btnViewerFichaRegistro").classList.add("hide");
        	
        	document.getElementById("btnViewerNotificacaoAnexo").classList.add("hide");
        	document.getElementById("_btnDownloadNotificacaoAnexo").classList.add("hide");
        	document.getElementById("btnDownloadNotificacaoAnexo").classList.add("hide");
        	document.getElementById("btnAnexoNotificacaoAnexo").classList.add("hide");
        	
        	document.getElementById("btnAnexoProcesso").classList.add("hide");	    	
        	document.getElementById("btnDownloadAnexoProcesso").classList.add("hide");	    	
		    document.getElementById("btnViewerAnexoProcesso").classList.add("hide");	  
		    
		    document.getElementById("btnAnexoCitacao").classList.add("hide");	    	
		    document.getElementById("btnDownloadAnexoCitacao").classList.add("hide");	    	
		    document.getElementById("btnViewerAnexoCitacao").classList.add("hide");
            
            document.getElementById("panel_analiseDiretor").classList.remove("hide");
            document.getElementById("panel_elaboracaoSubsidios").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioDRH").classList.remove("hide");
            
            $("#elaboradorSubsidios").attr('readonly', true);
            $("#dataSubsidios").attr('readonly', true);
        	$("#horaSubsidios").attr('readonly', true);
        	$("#alterarApendiceSim").attr('readonly', true);
        	$("#alterarApendiceNao").attr('readonly', true);
        	
        	document.getElementById("panel_observacao").classList.remove("hide");
        	
        	hideDocEscritorio(false, 0);
        	
        }
        else if(this.obj.Atividade.ANALISAR_DOCUMENTACAO == CURRENT_STATE){

            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
            document.getElementById("panel_ExFuncionario").classList.remove("hide");
            document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
            document.getElementById("panel_analiseDiretor").classList.remove("hide");
            document.getElementById("panel_elaboracaoSubsidios").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioDRH").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioJuridico").classList.remove("hide");
//            document.getElementById("panel_EscritorioAdvocacia").classList.remove("hide");
            
            $("#diretor").attr('readonly', true);
            $("#dataAnaliseSubsidioDRH").attr('readonly', true);
        	$("#horaSubsidios").attr('readonly', true);
        	$("#horaAnaliseSubsidioDRH").attr('readonly', true);
        	//$("#alterarApendiceNao").attr('readonly', true);
        	
        	document.getElementById("panel_observacao").classList.remove("hide");
        	
        	hideDocEscritorio(false, 0);

        }
        else if(this.obj.Atividade.ENVIAR_DOC_ESCRITORIO == CURRENT_STATE){

            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
            document.getElementById("panel_ExFuncionario").classList.remove("hide");
            document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
            document.getElementById("panel_analiseDiretor").classList.remove("hide");
            document.getElementById("panel_elaboracaoSubsidios").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioDRH").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioJuridico").classList.remove("hide");
            document.getElementById("panel_EscritorioAdvocacia").classList.remove("hide");
            
            //hideDocEscritorio(false)
            
            //Button Enviar Documento 
            let elButton  = document.querySelectorAll(".send-escritorio")
            elButton.forEach(el => {
              el.style.display = "block";
            });
            

            document.getElementById("panel_observacao").classList.remove("hide");

        }
        else if(this.obj.Atividade.ANALISAR_DECISAO_ESCRITORIO == CURRENT_STATE){

            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
            document.getElementById("panel_ExFuncionario").classList.remove("hide");
            document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
            document.getElementById("panel_analiseDiretor").classList.remove("hide");
            document.getElementById("panel_elaboracaoSubsidios").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioDRH").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioJuridico").classList.remove("hide");
            document.getElementById("panel_EscritorioAdvocacia").classList.remove("hide");
            document.getElementById("analisar_decisao_escritorio").classList.remove("hide");
            
            document.getElementById("panel_observacao").classList.remove("hide");

        }
        else if(this.obj.Atividade.ACOMPANHAR_PROCESSO_JURIDICO){

            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
            document.getElementById("panel_ExFuncionario").classList.remove("hide");
            document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
            document.getElementById("panel_analiseDiretor").classList.remove("hide");
            document.getElementById("panel_elaboracaoSubsidios").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioDRH").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioJuridico").classList.remove("hide");
            document.getElementById("panel_EscritorioAdvocacia").classList.remove("hide");
            document.getElementById("analisar_decisao_escritorio").classList.remove("hide");
            document.getElementById("panel_demandasProcesso").classList.remove("hide");
            
            document.getElementById("panel_observacao").classList.remove("hide");

        }
        else if(this.obj.Atividade.VERIFICAR_DEMANDA_RH == CURRENT_STATE){

            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
            document.getElementById("panel_ExFuncionario").classList.remove("hide");
            document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
            document.getElementById("panel_analiseDiretor").classList.remove("hide");
            document.getElementById("panel_elaboracaoSubsidios").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioDRH").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioJuridico").classList.remove("hide");
            document.getElementById("panel_EscritorioAdvocacia").classList.remove("hide");
            document.getElementById("analisar_decisao_escritorio").classList.remove("hide");
            document.getElementById("panel_demandasProcesso").classList.remove("hide");
            document.getElementById("panel_testemunhas").classList.remove("hide");
            
            document.getElementById("panel_observacao").classList.remove("hide");
            
        }
        else if(this.obj.Atividade.VERIFICAR_DEMANDA_GRH){

            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
            document.getElementById("panel_ExFuncionario").classList.remove("hide");
            document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
            document.getElementById("panel_analiseDiretor").classList.remove("hide");
            document.getElementById("panel_elaboracaoSubsidios").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioDRH").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioJuridico").classList.remove("hide");
            document.getElementById("panel_EscritorioAdvocacia").classList.remove("hide");
            document.getElementById("analisar_decisao_escritorio").classList.remove("hide");
            document.getElementById("panel_demandasProcesso").classList.remove("hide");
            document.getElementById("panel_testemunhas").classList.remove("hide");
            
            document.getElementById("panel_observacao").classList.remove("hide");
            
        }*/
        
        //Fields
        /*
        if(this.obj.Atividade.ANEXAR_CITACAO !=  CURRENT_STATE ){        	
        	$("#btnAnexoProcesso").remove();
    		$("#btnAnexoCitacao").remove();
    		$("#numeroProcesso").attr('readonly', true);
    		$("#representanteReclamente").attr('readonly', true);
        } else {
        	$("#numeroProcesso").attr('readonly', false);
    		$("#representanteReclamente").attr('readonly', false);
        }*/      
        
        /*
        if(this.obj.Atividade.ANALISAR_SOLICITACAO == CURRENT_STATE){
        	$("#descricaoAnaliseDiretor").attr('readonly', false);
        } else {
        	$("#descricaoAnaliseDiretor").attr('readonly', true);
        }*/
        
        /*
        if(this.obj.Atividade.ELABORADOR_SUBSIDIOS == CURRENT_STATE){
        	$("#elaboradorSubsidios").attr('readonly', false);
        	$("#dataSubsidios").attr('readonly', false);
        	$("#horaSubsidios").attr('readonly', false);
        	$("#alterarApendiceSim").attr('readonly', false);
        	$("#alterarApendiceNao").attr('readonly', false);
        } else {
        	$("#elaboradorSubsidios").attr('readonly', true);
        	$("#dataSubsidios").attr('readonly', true);
        	$("#horaSubsidios").attr('readonly', true);
        	$("#alterarApendiceSim").attr('readonly', true);
        	$("#alterarApendiceNao").attr('readonly', true);
        	$("#btnAnexoSubsidios").remove();
        	$("#btnAddApendice").remove();
        }*/
        
        /*
        if(this.obj.Atividade.ANALISAR_SUBSIDIOS == CURRENT_STATE){
        	$("#diretor").attr('readonly', false);
        	$("#dataAnaliseSubsidioDRH").attr('readonly', false);
        	$("#horaAnaliseSubsidioDRH").attr('readonly', false);
        	$("#decisaoDRHAprovado").attr('readonly', false);
        	$("#decisaoDRHAjuste").attr('readonly', false);
        	$("#justificativaDRH").attr('readonly', false);
        } else {
        	$("#diretor").attr('readonly', true);
        	$("#dataAnaliseSubsidioDRH").attr('readonly', true);
        	$("#horaAnaliseSubsidioDRH").attr('readonly', true);
        	$("#decisaoDRHAprovado").attr('readonly', true);
        	$("#decisaoDRHAjuste").attr('readonly', true);
        	$("#justificativaDRH").attr('readonly', true);
        }*/        
        


        /**
         * @MODO ADMIN
         */
        /*if(_objDebug.modoAdmin == "sim" && CURRENT_STATE == 0){

            document.getElementById("panel_DadosSolicitante").classList.remove("hide");
            document.getElementById("panel_ExFuncionario").classList.remove("hide");
            document.getElementById("panel_documentacoesAnexos").classList.remove("hide");
            document.getElementById("panel_analiseDiretor").classList.remove("hide");
            document.getElementById("panel_elaboracaoSubsidios").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioDRH").classList.remove("hide");
            document.getElementById("panel_analiseSubsidioJuridico").classList.remove("hide");
            document.getElementById("panel_EscritorioAdvocacia").classList.remove("hide");
            document.getElementById("panel_EscritorioAdvocacia").classList.remove("hide");
            document.getElementById("analisar_decisao_escritorio").classList.remove("hide");
            document.getElementById("panel_demandasProcesso").classList.remove("hide");
            document.getElementById("panel_testemunhas").classList.remove("hide");
            document.getElementById("panel_dadosPericia").classList.remove("hide");
            document.getElementById("panel_ArquivamentoProcesso").classList.remove("hide");
            document.getElementById("panel_observacao").classList.remove("hide");
            document.getElementById("panel_Erro").classList.remove("hide");
    
        }*/


       
        
    }

}

/*function fieldsReadonlyEver(){
	$("#elaboradorSubsidios").attr('readonly', true);
    $("#dataSubsidios").attr('readonly', true);
	$("#horaSubsidios").attr('readonly', true);
	
	$("#diretor").attr('readonly', true);
	$("#dataAnaliseSubsidioDRH").attr('readonly', true);
	$("#horaAnaliseSubsidioDRH").attr('readonly', true);	
}*/

/*function addChildAnexoAdicionais(){
	var posChild = wdkAddChild('documentos');	
	hideDocEscritorio(true, posChild);
}

function addChildAnexoApendices(){
	var posChild = wdkAddChild('tabelaAnexosApendices');
	hideDocApendice(true, posChild);
}*/

/*function hideDocApendice(dec, posChild){	
	if (dec){
		$("#btnDownloadAnexoApendice___"+posChild).hide();
		$("#btnViewerAnexoApendice___"+posChild).hide();
		$("#div_alterarApendice___"+posChild).hide();
		$("#div_enviarApendiceEscritorio___"+posChild).hide();
	} else {
		var tam = $('#tabelaAnexosApendices tbody tr').not(':first').length
		for (var i =0 ; i< tam; i++){				 
			if (posChild == 0){
				console.log("pos 0")
				var nomeCampo4 = ('[name^="btnDownloadAnexoApendice___"')[i].id;
				$("#"+nomeCampo4).hide();
				
				var nomeCampo3 = ('[name^="btnViewerAnexoApendice___"')[i].id;
				$("#"+nomeCampo3).hide();				
				
				var nomeCampo2 = $('[name^="enviarApendiceEscritorio___"')[i].id;			
				$("#"+nomeCampo2).parent().hide();	 
			} else {
				var nomeCampo1 = $('[name^="alterarApendice___"')[i].id;			
				$("#"+nomeCampo1).parent().hide();	
			}
			
		}
		
	} 		
}*/

/*function hideDocEscritorio(dec, posChild){	
	if (dec){
		$("#btnDownloadTable___"+posChild).hide();
		$("#btnViewerTable___"+posChild).hide();
		$("#class_docAdicionais___"+posChild).hide();
	} else {
		var tam = $('#documentos tbody tr').not(':first').length
		for (var i =0 ; i< tam; i++){
			if (posChild == 0){
				var nomeCampo1 = $('[name^="btnDownloadTable___"')[i].id;
				$("#"+nomeCampo1).hide();
				
				var nomeCampo2 = $('[name^="btnViewerTable___"')[i].id;
				$("#"+nomeCampo2).hide();		
			}
			var nomeCampo4 = $('[name^="docAdicionais___"')[i].id;			
			$("#"+nomeCampo4).parent().hide();	 
		}		
	}
}*/
