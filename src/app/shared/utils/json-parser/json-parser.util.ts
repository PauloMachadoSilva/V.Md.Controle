class JsonParser {

    public static toString(item: any): string {
        return JSON.stringify(item);
    }

    public static fromString(item: string): any {
        return JSON.parse(item);
    }
}

export default JsonParser;
