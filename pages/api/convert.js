export default function handler(req, res) {

    const userInput = req.body.num;

    function convertInput() {
        let result = [];

        if(parseInt(userInput)) {
            convertToRomanNumeral(userInput);
        } else {
            convertToInteger(userInput);
        }
    
        function convertToRomanNumeral(num) {

            let startingNum = num;
            let adjustedNum = startingNum; // Will be decremented; begins as the same as starting number

            // Breaking down a number into subcomponents

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
                } else if(ones >= 5) {
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
    
        function convertToInteger(num) {
            console.log('CONVERT TO INTEGER')
        }

        return result;

    }

    res.status(200).json({ num: req.body.num, conversion: convertInput() })
}