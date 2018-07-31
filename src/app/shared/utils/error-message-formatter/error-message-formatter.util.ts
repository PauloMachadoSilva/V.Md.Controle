
class ErrorMessageFormatter {

        private static readonly _accentRegHexes: any = {
            a: /[\xE0-\xE6]/g,
            e: /[\xE8-\xEB]/g,
            i: /[\xEC-\xEF]/g,
            o: /[\xF2-\xF6]/g,
            u: /[\xF9-\xFC]/g,
            c: /\xE7/g,
            n: /\xF1/g
        };

        public static completeFormat(errorMessage: string, charsToRemove: Array<string> = []): string {

            errorMessage = this.removeChars(errorMessage, charsToRemove);
            errorMessage = this.removeAccents(errorMessage);
            errorMessage = this.replaceSpaces(errorMessage);

            return errorMessage.toLocaleLowerCase();
        }

        public static removeChars(errorMessage: string, charsToRemove: Array<string>): string {

            charsToRemove.forEach(char => {
                errorMessage = errorMessage.replace(new RegExp('\\' + char, 'g'), '');
            });

            return errorMessage;
        }

        public static removeAccents(errorMessage: string): string {

            Object.keys(this._accentRegHexes).forEach(char => {
                errorMessage = errorMessage.replace(this._accentRegHexes[char], char);
            });

            return errorMessage;
        }

        public static replaceSpaces(errorMessage: string, spaceReplacerChar: string = '_'): string {
            return errorMessage.replace(/\s+/g, spaceReplacerChar);
        }

    }

export default ErrorMessageFormatter;
