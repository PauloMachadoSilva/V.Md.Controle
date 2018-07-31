
export interface CartDataResponse {
    mensagem: string;
    protocolo: string;
    validacoes: boolean;
    retorno: {
        uid: string;
        diasVencimento: Array<{
            diaVencimento: number;
            diaPadrao: boolean;
        }>;
    };
}

export interface CartUpdateResponse {
    mensagem: string;
    protocolo: string;
    validacoes: Array<any>;
    retorno: {
        uid: string;
        modalidade?: number;
        codigoPedido?: string;
        dataPedido?: string;
    };
}

export interface CartResumeResponse {
    mensagem: string;
    protocolo: string;
    validacoes: Array<any>;
    retorno: any;
}
