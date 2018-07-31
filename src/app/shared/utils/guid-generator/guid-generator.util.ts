
class GuidGenerator {

    private static generateRandomNumber(): string {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    public static generate() {

        const date: Date = new Date();
        const year: string = date.getFullYear().toString();
        const month: string = ((date.getMonth() + 1) < 10) ?
                              '0' + (date.getMonth() + 1).toString() :
                              (date.getMonth() + 1).toString();

        const day: string = (date.getDate() < 10) ? '0' + date.getDate().toString() : date.getDate().toString();

        const guid: string = year + month + day + '-' +
                             this.generateRandomNumber() + '-' +
                             this.generateRandomNumber() + '-' +
                             this.generateRandomNumber() + '-' +
                             this.generateRandomNumber() +
                             this.generateRandomNumber() +
                             this.generateRandomNumber();

        return guid;
    }
}

export default GuidGenerator;
