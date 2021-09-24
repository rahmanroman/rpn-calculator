class RPN {
    stack = []
    shouldOutputAsFloat = false

    UNARY_OPERATION = {}
    BINARY_OPERATION = {}

    constructor() {
        this.registerBinaryOperation('+', (a, b) => (a + b));
        this.registerBinaryOperation('-', (a, b) => (a - b));
        this.registerBinaryOperation('*', (a, b) => (a * b));
        this.registerBinaryOperation('/', (a, b) => (a / b));
    }

    parse(expr = '') {
        if (expr.length > 0) {
            expr
                .trim()
                .split(/[ ]+/)
                .forEach(atom => this.push(atom));

            return this.state();

        } else {
            throw new TypeError('Expression can not be empty.');
        }
    }

    push(atom) {
        if (this.isOperation(atom)) {
            this.calculate(atom);
        } else if (this.isOperand(atom)) {
            this.stack.push(parseFloat(atom));
        } else {
            throw new TypeError('Invalid expression syntax');
        }
    }

    calculate(operation) {
        if (this.BINARY_OPERATION[operation] !== undefined) {
            const b = this.stack.pop();
            const a = this.stack.pop();

            if (a === undefined || b === undefined) {
                throw new TypeError(`Can't execute operation ${operation}`);
            } else {
                this.stack.push(this.BINARY_OPERATION[operation](a, b));
            }
        }

        if (this.UNARY_OPERATION[operation] !== undefined) {
            const a = this.stack.pop();

            if (a === undefined) {
                throw new TypeError(`Can't execute operation ${operation}`);
            } else {
                this.stack.push(this.UNARY_OPERATION[operation](a));
            }
        }
    }

    state() {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        } else {
            return undefined;
        }
    }

    reset() {
        this.stack = [];
        this.shouldOutputAsFloat = false;
    }

    toString() {
        const value = this.state();

        if (Math.round(value) !== value) {
            return value.toFixed(3);
        }

        if (value > 0 && this.shouldOutputAsFloat === false) {
            return value.toFixed(0)
        }

        this.shouldOutputAsFloat = true;
        return value.toFixed(1);
    }

    isOperation(atom) {
        return this.BINARY_OPERATION[atom] !== undefined || this.UNARY_OPERATION[atom] !== undefined;
    }

    isOperand(atom) {
        // TODO: Test by regexp for valid values e.g. -1.5cd ?
        return !isNaN(parseFloat(atom));
    }

    registerBinaryOperation(operation, calculator) {
        this.BINARY_OPERATION[operation] = calculator;
    }

    registerUnaryOperation(operation, calculator) {
        this.UNARY_OPERATION[operation] = calculator;
    }
}

module.exports.RPN = RPN;
