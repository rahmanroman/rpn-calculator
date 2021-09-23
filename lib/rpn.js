const BINARY_OPERATION = {
    '+': (a, b) => (a + b),
    '-': (a, b) => (a - b),
    '*': (a, b) => (a * b),
    '/': (a, b) => (a / b),
};

const UNARY_OPERATION = {
    // '!': (a) => factorial(a)
};

class RPN {
    stack = []

    constructor() {

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
        if (RPN.isOperation(atom)) {
            this.calculate(atom);
        } else if (RPN.isOperand(atom)) {
            this.stack.push(parseFloat(atom));
        } else {
            throw new TypeError('Illegal expression syntax');
        }
    }

    calculate(operation) {
        if (BINARY_OPERATION[operation] !== undefined) {
            const b = this.stack.pop();
            const a = this.stack.pop();

            if (a === undefined || b === undefined) {
                throw new TypeError(`Can't execute operation ${operation}`);
            } else {
                this.stack.push(BINARY_OPERATION[operation](a, b));
            }
        }

        if (UNARY_OPERATION[operation] !== undefined) {
            const a = this.stack.pop();

            if (a === undefined) {
                throw new TypeError(`Can't execute operation ${operation}`);
            } else {
                this.stack.push(UNARY_OPERATION[operation](a));
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
    }

    toString() {
        const value = this.state();

        if (Math.round(value) !== value) {
            return value.toFixed(3);
        }

        if (value > 0) {
            return value.toFixed(0)
        }

        return value.toFixed(1);
    }

    static isOperation(atom) {
        return BINARY_OPERATION[atom] !== undefined || UNARY_OPERATION[atom] !== undefined;
    }

    static isOperand(atom) {
        // TODO: Test by regexp for valid values e.g. -1.5cd ?
        return !isNaN(parseFloat(atom));
    }
}

module.exports.RPN = RPN;
