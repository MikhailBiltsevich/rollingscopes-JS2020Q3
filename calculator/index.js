const numberElements = document.querySelectorAll("[data-number]");
const operationElements = document.querySelectorAll("[data-operation");
const equalsElement = document.querySelector("[data-equals]");
const previousOperandElement = document.querySelector("[data-previous-operand]");
const currentOperandElement = document.querySelector("[data-current-operand]")
const allClearElement = document.querySelector("[data-all-clear]");
const deleteElement = document.querySelector("[data-delete]");
const unaryOperationElements = document.querySelectorAll("[data-unary-operation]");

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.isResetRequired = false;
    }

    delete() {
        if (!/\d+\.?/.test(this.currentOperand) || /^-\d$/.test(this.currentOperand)) {
            this.currentOperand = '';
            return;
        }

        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.') {
            if (this.currentOperand.includes('.')) {
                return;
            } else if (this.currentOperand === '') {
                this.currentOperand = `0${number}`;
                return;
            }
        }

        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    setOperation(operation) {
        if (this.currentOperand === '') {
            if (this.previousOperand !== '' && this.operation !== undefined) {
                this.operation = operation;
            }
            return;
        }

            if (this.previousOperand !== '') {
                this.computeBinaryOperation();
            }

            this.isResetRequired = false;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
            this.operation = operation;
    }

    computeUnaryOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }

        let result;
        const current = parseFloat(this.currentOperand);

        switch(operation) {
            case '√':
                if (current < 0) {
                    result = 'Введены некорректные данные';
                    this.isResetRequired = true;
                    break;
                }
                result = Math.sqrt(current);
                break;
            case '±':
                result = -current;
                break;
            default:
                return;
        }

        this.currentOperand = this.fixFloatNumber(result);
    }

    computeBinaryOperation() {
        let result;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(current) || isNaN(previous)) {
            return;
        }
        switch(this.operation) {
            case 'xn':
                result = Math.pow(previous, current);
                break;
            case '÷':
                result = previous / current;
                break;
            case '×':
                result = previous * current;
                break;
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            default:
                return;
        }

        this.isResetRequired = true;
        this.currentOperand = this.fixFloatNumber(result);
        this.previousOperand = '';
        this.operation = undefined;
    }

    fixFloatNumber(number) {
        return parseFloat(number.toFixed(10)).toString();
    }

    updateOutput() {
        this.currentOperandElement.innerText = this.currentOperand;
        if (this.operation == undefined) {
            this.previousOperandElement.innerText = this.previousOperand.toString();
        } else {
            this.previousOperandElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
        
    }
}

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberElements.forEach(element => {
    element.addEventListener("click", () => {
        if (calculator.isResetRequired && calculator.currentOperand !== '') {
            calculator.currentOperand = '';
            calculator.isResetRequired = false;
        }
        calculator.appendNumber(element.innerText);
        calculator.updateOutput();
    });
});

deleteElement.addEventListener('click', () => {
    calculator.delete();
    calculator.updateOutput();
});

allClearElement.addEventListener('click', () => {
    calculator.clear();
    calculator.updateOutput();
});

operationElements.forEach(element => {
    element.addEventListener('click', () => {
        calculator.setOperation(element.innerText);
        calculator.updateOutput();
    });
});

unaryOperationElements.forEach(element => {
    element.addEventListener('click', () => {
        calculator.computeUnaryOperation(element.innerText);
        calculator.updateOutput();
    });
});

equalsElement.addEventListener('click', element => {
    calculator.computeBinaryOperation();
    calculator.updateOutput();
});