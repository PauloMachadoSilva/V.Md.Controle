import { MESSAGE_PT } from './../../../app.config';

class WzaMessage {
    /**
     *
     * @param key
     */
    public static get(key: string): string {
        return MESSAGE_PT[key];
    }
}

export default WzaMessage;
