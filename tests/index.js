const {describe, it, afterEach} = require('mocha');
const {assert} = require('chai');

const {RPN} = require('../lib/rpn');

describe('PRN calculator should work', async () => {
    const rpn = new RPN();

    it('Empty expression', async () => {
        assert.throw(() => rpn.parse(''), TypeError);
    });

    it('Correct expression', async () => {
        const value = rpn.parse("3 2 +");

        assert.equal(value, 5);
        assert.equal(rpn.toString(), '5');
    });

    it('Incorrect expression', async () => {
        assert.throw(() => rpn.parse('5 +'), TypeError);
    });

    it('Example #1', async () => {
        rpn.parse('5');
        assert.equal(rpn.toString(), '5');

        rpn.parse('8');
        assert.equal(rpn.toString(), '8');

        rpn.parse('+');
        assert.equal(rpn.toString(), '13');

    });

    it('Example #2', async () => {
        rpn.parse('5 5 5 8 + + -');
        assert.equal(rpn.toString(), '-13.0');

        rpn.parse('13 +');
        assert.equal(rpn.toString(), '0.0');
    });

    it('Example #3', async () => {
        // rpn.parse('-3');
        // assert.equal(rpn.toString(), '-3.0');
        //
        // rpn.parse('-2');
        // assert.equal(rpn.toString(), '-2.0');
        //
        // rpn.parse('*');
        // assert.equal(rpn.toString(), '6.0');
        //
        // rpn.parse('5');
        // assert.equal(rpn.toString(), '5.0');
        //
        // rpn.parse('+');
        // assert.equal(rpn.toString(), '11.0');
    });

    it('Example #4', async () => {
        rpn.parse('5');
        assert.equal(rpn.toString(), '5');

        rpn.parse('9');
        assert.equal(rpn.toString(), '9');

        rpn.parse('1');
        assert.equal(rpn.toString(), '1');

        rpn.parse('-');
        assert.equal(rpn.toString(), '8');

        rpn.parse('/');
        assert.equal(rpn.toString(), '0.625');
    });

    afterEach(() => {
        rpn.reset();
    });
});
