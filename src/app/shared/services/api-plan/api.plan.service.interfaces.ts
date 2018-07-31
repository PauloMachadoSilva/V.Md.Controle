export interface PlanResponse {
    Sku: PlanData;
    detalhes: string;
    mensagem: string;
    protocolo: string;
    retorno: any;
    valido: boolean;
}

export interface PlansResponse {
    Skus: Array<PlanData>;
    detalhes: string;
    mensagem: string;
    protocolo: string;
    retorno: string;
    valido: boolean;
}

export interface PlanData {
    CodigoSku: string;
    Nome: string;
    NomeCompleto: string;
    Descricao: string;
    Complemento: {
        dados_valor: string;
        dados_detalhe: string;
        ddd_descricao: string;
        ddd_valor: string;
        minutos_offnet_descricao: string;
        minutos_offnet_valor: string;
        minutos_onnet_descricao: string;
        minutos_onnet_valor: string;
        sms_descricao: string;
        sms_valor: string;
    };
    Valor: string;
    ValorComDesconto: string;
    Ativo: boolean;
    MaximoDependentes: number;
    MaximoDependentesGratis: number;
    ValorAparelho: string;
    Ordem: number;
}
