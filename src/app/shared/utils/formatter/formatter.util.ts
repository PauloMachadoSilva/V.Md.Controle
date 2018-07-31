import { DatePipe } from '@angular/common';

class Formatter {

    public static date(date: Date, format: string): string {
        if (date === null || date.toString() === 'Invalid Date') {
            return null;
        }

        return (new DatePipe('en-US')).transform(date, format);
    }

    public static strToDate(dateStr: String): Date {
        if (dateStr === undefined || dateStr === null) {
            return null;
        }

        const dtSplit = dateStr.trim().split(' ')[0].split('/');
        return new Date(dtSplit[2] + '-' + dtSplit[1] + '-' + dtSplit[0] + 'T10:00:00Z');
    }

    public static removeSpecialChars(str: string, removeSpace = false) {
        if (!str) {
            return str;
        }

        let newStr = str.replace(/[^\w\s]/gi, '');
        if (removeSpace) {
            newStr = newStr.replace(/ /g, '');
        }

        return newStr;
    }
}

export default Formatter;
