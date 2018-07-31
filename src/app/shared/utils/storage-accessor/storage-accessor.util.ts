import JsonParser from '../json-parser/json-parser.util';

class StorageAccessor {

    /**
     * Return a storage value
     *
     * @param key
     * @param useLocalStorage
     */
    public static get(key: string, useLocalStorage?: boolean): string {
        let item: any = this._getStorage(useLocalStorage).getItem(key);

        try {
            item = JsonParser.fromString(item);
        } catch (error) { /* Ignore it. A simple string came from the storage. */ }

        return item;
    }

    /**
     * Set a value into storage
     *
     * @param key
     * @param value
     * @param useLocalStorage
     */
    public static set(key: string, value: any | string, useLocalStorage?: boolean): any {
        value = typeof value === 'string' ? value : JsonParser.toString(value);
        this._getStorage(useLocalStorage).setItem(key, value);
        return this.get(key, useLocalStorage);
    }

    /**
     * Add an object subitem into storage item
     *
     * @param key
     * @param subkey
     * @param value
     * @param useLocalStorage
     */
    public static add(key: string, subkey: string, value: any | string, useLocalStorage?: boolean): any {
        value = typeof value === 'string' ? value : JsonParser.toString(value);

        let keyValue: any = this.get(key, useLocalStorage);

        if (keyValue === undefined) {
            keyValue = StorageAccessor.set(key, {}, useLocalStorage);
        }

        keyValue[subkey] = value;

        return this.set(key, keyValue, useLocalStorage);
    }

    /**
     * Remove item of storage
     *
     * @param key
     * @param useLocalStorage
     */
    public static delete(key: string, useLocalStorage?: boolean): void {
        this._getStorage(useLocalStorage).removeItem(key);
    }

    /**
     * Remove all storage itens
     *
     * @param useLocalStorage
     */
    public static clear(useLocalStorage?: boolean) {
        this._getStorage(useLocalStorage).clear();
    }

    /**
     * Get Storage type (local or session)
     *
     * @param useLocalStorage
     * @returns localStorage when userLocalStorage is true
     *          sessionStorage when userLocalStorage is false
     */
    private static _getStorage(useLocalStorage: boolean = false): Storage {
        return useLocalStorage ? localStorage : sessionStorage;
    }
}

export default StorageAccessor;
