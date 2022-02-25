export default function handler(req, res) {
    const userInput = req.body.num;

    function convertInput() {
        let result = [];

        if (userInput === '0') {
            return result = 'There is no Roman Numeral equivalent for 0.'
        }

        // Determine whether the user has entered an integer or string based on if parseInt returns true

        if(parseInt(userInput)) {
            convertToRomanNumeral(userInput);
        } else {
            convertToInteger(userInput);
        }
    
        function convertToRomanNumeral(num) {

            if(num > 1000) {
                result = 'Your number is too large. Please try again.'
                return;
            }

            if (num < 0) {
                result = 'There are no Roman Numerals for negative values.'
                return;
            }

            let adjustedNum = num;
            let integers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
            let romanNumerals = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']

            do {
                for (let i=0; i < integers.length; i++) {
                    if(adjustedNum >= integers[i]) {
                        result.push(romanNumerals[i]);
                        adjustedNum -= integers[i];
                        i -= 1;
                    }
                }
            }
            while (adjustedNum > 0)

            result = result.join('')
            return result;

        }
    
        function convertToInteger(str) {
            let adjustedStr = str.toUpperCase();
            let integers = [900, 1000, 400, 500, 90, 100, 40, 50, 9, 10, 4, 5, 1]; // Note different order (to match romanNumerals arr)
            let romanNumerals = ['CM', 'M', 'CD', 'D', 'XC', 'C', 'XL', 'L', 'IX', 'X', 'IV', 'V', 'I'] // Specific substrings come first
            let numbersArr = [];

            do {
                for(let i=0; i < romanNumerals.length; i++) {
                    if(adjustedStr.includes(romanNumerals[i])) {
                        numbersArr.push(integers[i])
                        adjustedStr = adjustedStr.replace(romanNumerals[i], '')
                        i -= 1;
                    }
                }
            }
            while (adjustedStr.length > 0);

            let sum = 0;

            for(let i=0; i < numbersArr.length; i++) {
                sum += numbersArr[i]
            }

            if (sum > 1000) {
                return result = 'Your number is too large. Please try again.'
            }

            result = sum;
        }

        // Ensure that an error message is returned instead of an empty array in cases of invalid user input

        if(result.length === 0) {
            return 'There was an error with your input. Please try again.'
        } 
        return result;
    }

    res.status(200).json({ num: req.body.num, conversion: convertInput() })
}