export interface AddressCompleteData {
    IdEndereco: number;
    Cep: string;
    Uf: string;
    Cidade: string;
    Bairro: string;
    Logradouro: string;
    Endereco: string;
    Ddd: string;
}

export interface AddressServiceGetAddressByCEPResponse {
    EnderecoCompleto: AddressCompleteData;
    retorno: string;
    mensagem: string;
    detalhes: any;
    protocolo: string;
    valido: boolean;
}

export interface AddressServiceFindAddressResponse {
    EnderecosCompleto: Array<AddressCompleteData>;
    retorno: string;
    mensagem: string;
    detalhes: any;
    protocolo: string;
    valido: boolean;
}

export interface AddressServiceGetStateDDDList {
    UFs: Array<{
        Uf: string;
        DescricaoUf: string;
        Ddds: Array<string>;
        Selecionado: boolean;
    }>;
    Cidades: Array<{
        Id: number;
        Uf: string;
        UfDescricao: string;
        Cidade: string;
        Ddd: string;
        DddPrincipal: boolean;
    }>;
    retorno: string;
    mensagem: string;
    detalhes: any;
    protocolo: string;
    valido: boolean;
}
