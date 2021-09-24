# RPN Calculator

Implementation calculation of reverse polish
notation ([RPN](https://en.wikipedia.org/wiki/Reverse_Polish_notation))

## Core

Library calculates expressions in RPN format using stack to evaluate. The
expression is parsed into atoms divided by spaces. Every atom can be an operand
or an operation. If the atom is operand, push it to stack. If the atom is
operation, extract from stack required count of operands and push to stack the
result of operation. The top element of stack is the result of expression
calculation.

Supports arithmetic operations: `+`, `-`, `*`, `/` and operands in float format.
There is simple possibility to extend expression syntax with another binary or
unary operations.

**How to use:**

```
const RPN = require('rpn-calculator');
const rpn = new RPN();

rpn.parse('5 8 +');
console.log(rpn.toString()); // '13'
```

**Methods:**

`parse(expr: String): Number`

Accept expression as a string. Returns the current state of calculation. If the
last atom in expression was the operand, returns its value. If the last atom was
the operation, returns the result of this operation. Empty or invalid
expressions throws `TypeError` exception.

`state(): Number`

Returns the current state of calculation. State of calculator before parsing of
any expression is `undefined`.

`reset()`

Clear the state of expression.

`toString(): String`

Returns string representation of current state with additional formatting rules:

- if result is float -- output in float format with three decimal places;
- if result is positive integer -- output in integer format;
- if result is zero or negative integer -- output in float format with one
  decimal place. Each other result after that has the same format.

`registerBinaryOperation(operation: String, calculator: Function)`
`registerUnaryOperation(operation: String, calculator: Function)`

Registering a new or overwriting existing operation that can be used in
evaluating an expression.

```
const rpn = new RPN();
rpn.registerBinaryOperation('^', (a, b) => Math.pow(a, b));
rpn.parse('7 3 ^');
console.log(rpn.toString()); // '343'
```

## Interfaces

The library architecture is designed isolated from the interfaces. So it's easy
to use it in own code or as cli utility, service etc. It's enough to use only
one instance of calculator for cli utility. Service implementation should
realize the pool of instances per one for each client.

### CLI

**How to run:**

```
npm run cli
```

**Output example:**

```
> 5
5
> 8
8
> +
13
```

**Special commands:**

- `q` or empty string -- exit

### HTTP Service

TBD

## Tests

Using `mocha`/`chai`

**How to run:**

```
npm run test
```

## TO-DO

- Add other interface implementations (e.g. HTTP Service, Websockets etc.)
- Add types (JSDoc or TypeScript declaration)
- Add `BigInt` supports
