import { mat } from '../app';

export function read(input: string): mat {
    try {
        var arrayOfValues = [];
        var inputLines = input.split(/\r?\n/);
        for (var i = 0; i < inputLines.length; i++) {
            var currentRow = [];
            var currentLine = inputLines[i];
            var currentTextValues = currentLine.split(/[ ,	]+/);
            currentTextValues.forEach(function (textValue) {
                if (textValue.length > 0) {
                    currentRow.push(Number(textValue));
                }
            });
            if (currentRow.length == 0) continue;
            arrayOfValues.push(currentRow);
        }


        var ret = new mat(arrayOfValues);
        return ret;
    }
    catch (err) {
        throw new Error("Error while parsing text: " + err);
    }
}