export interface BreadcrumbInterface {
    hideUrls: Array<string>;
    itens: Array<{
        text: string;
        urlList: Array<string>;
        style?: string;
        isContains?: boolean;
        completed?: boolean;
    }>;
}
