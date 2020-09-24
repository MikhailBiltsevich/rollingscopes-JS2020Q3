const numberElements = document.querySelectorAll("[data-number]");
const operationElements = document.querySelectorAll("[data-operation");
const equalsElement = document.querySelector("[data-equals]");
const previousOperandElement = document.querySelector("[data-previous-operand]");
const currentOperandElement = document.querySelector("[data-current-operand]")
const allClearElement = document.querySelector("[data-all-clear]");
const deleteElement = document.querySelector("[data-delete]");

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
    }

    delete() {
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
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
            this.operation = operation;
    }

    computeUnaryOperation() {
        let result;
        const current = parseFloat(this.currentOperand);

        switch(this.operation) {
            case '√':
                if (current < 0) {
                    result = '';
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

        this.currentOperand = result.toString();
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

        this.currentOperand = result.toString();
        this.previousOperand = '';
        this.operation = undefined;
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

equalsElement.addEventListener('click', element => {
    calculator.computeBinaryOperation();
    calculator.updateOutput();
});