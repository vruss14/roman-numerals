export default function handler(req, res) {

    const userInput = req.body.num;

    function convertInput() {
        let result = [];

        // Determine whether the user has entered an integer or string based on if parseInt returns true

        if(parseInt(userInput)) {
            convertToRomanNumeral(userInput);
        } else {
            convertToInteger(userInput);
        }
    
        function convertToRomanNumeral(num) {

            let startingNum = num;

            // Ensure that the given number is within the correct range

            if(num > 1000) {
                result = 'Your number is too large. Please try again.'
                return;
            }

            if (num <= 0) {
                result = 'There are no Roman Numerals for numbers less than or equal to 0.'
            }

            let adjustedNum = startingNum; // Will be decremented; begins as the same as starting number

            // Breaking down a number into its subcomponents

            let thousands;
            let fiveHundreds;
            let hundreds;
            let fifties;
            let tens;
            let fives;
            let ones;

            do {
                thousands = Math.floor(adjustedNum / 1000);
                fiveHundreds = Math.floor(adjustedNum / 500);
                hundreds = Math.floor(adjustedNum / 100);
                fifties = Math.floor(adjustedNum / 50);
                tens = Math.floor(adjustedNum / 10);
                fives = Math.floor(adjustedNum / 5);
                ones = adjustedNum % 10;

                if(thousands === 1) {
                    result.push('M');
                    adjustedNum -= 1000;
                } else if (hundreds === 9) {
                    result.push('CM');
                    adjustedNum -= 900;
                } else if (fiveHundreds >= 1) {
                    result.push('D');
                    adjustedNum -= 500;
                } else if(hundreds === 4) {
                    result.push('CD')
                    adjustedNum -= 400;
                } else if (hundreds >= 1) {
                    result.push('C');
                    adjustedNum -= 100;
                } else if(tens === 9) {
                    result.push('XC');
                    adjustedNum -= 90;
                } else if(fifties >= 1) {
                    result.push('L');
                    adjustedNum -= 50;
                } else if (tens === 4) {
                    result.push('XL');
                    adjustedNum -= 40;
                } else if (tens >= 1) {
                    result.push('X');
                    adjustedNum -= 10;
                } else if (ones === 9) {
                    result.push('IX');
                    adjustedNum -= 9;
                } else if(fives >= 1) {
                    result.push('V');
                    adjustedNum -= 5;
                } else if(ones === 4) {
                    result.push('IV');
                    adjustedNum -= 4;
                } else if(ones >= 1) {
                    result.push('I')
                    adjustedNum -=1;
                } else {
                    return;
                }

            }
            while (adjustedNum > 0);

            result = result.join('')
            return result;
        }
    
        function convertToInteger(str) {

            let originalStr = str;
            let adjustedStr = originalStr; // Substrings are removed as their corresponding numbers are added to numbersArr
            let numbersArr = [];

            do {

                // Order is not from greatest to lowest value in this case
                // When two substrings use the same letter, the more specific substring needs to come first in the logic

                if(adjustedStr.includes('CM')) {
                    numbersArr.push(900);
                    adjustedStr = adjustedStr.replace('CM', '');
                } else if (adjustedStr.includes('M')) {
                    numbersArr.push(1000);
                    adjustedStr = adjustedStr.replace('M', '')
                } else if (adjustedStr.includes('CD')) {
                    numbersArr.push(400);
                    adjustedStr = adjustedStr.replace('CD', '');
                } else if (adjustedStr.includes('D')) {
                    numbersArr.push(500);
                    adjustedStr = adjustedStr.replace('D', '');
                } else if (adjustedStr.includes('XC')) {
                    numbersArr.push(90);
                    adjustedStr = adjustedStr.replace('XC', '');
                } else if (adjustedStr.includes('C')) {
                    numbersArr.push(100);
                    adjustedStr = adjustedStr.replace('C', '');
                } else if (adjustedStr.includes('XL')) {
                    numbersArr.push(40);
                    adjustedStr = adjustedStr.replace('XL', '');
                } else if (adjustedStr.includes('L')) {
                    numbersArr.push(50);
                    adjustedStr = adjustedStr.replace('L', '');
                } else if (adjustedStr.includes('IX')) {
                    numbersArr.push(9);
                    adjustedStr = adjustedStr.replace('IX', '');
                } else if (adjustedStr.includes('X')) {
                    numbersArr.push(10);
                    adjustedStr = adjustedStr.replace('X', '');
                } else if (adjustedStr.includes('IV')) {
                    numbersArr.push(4);
                    adjustedStr = adjustedStr.replace('IV', '');
                } else if (adjustedStr.includes('V')) {
                    numbersArr.push(5);
                    adjustedStr = adjustedStr.replace('V', '');
                } else if (adjustedStr.includes('I')) {
                    numbersArr.push(1);
                    adjustedStr = adjustedStr.replace('I', '');
                } else {
                    return;
                }
            }
            while (adjustedStr.length > 0);

            let sum = 0;

            for(let i=0; i < numbersArr.length; i++) {
                sum += numbersArr[i]
            }

            result = sum;
        }

        // Ensure that an empty array is not returned if an incorrect input is given

        if(result.length === 0) {
            return 'There was an error with your input. Please try again.'
        } else {
            return result;
        }
    }

    res.status(200).json({ num: req.body.num, conversion: convertInput() })
}