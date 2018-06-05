var expect = require('expect');
const {
    isValidString
} = require('./validation');
describe('isValidStringg', () => {
    it('should reject input other than strings', () => {
        expect(isValidString(123)).toBe(false);
    });
    it('should reject strings with only whitespaces', () => {
        expect(isValidString('        ')).toBe(false);
    });
    it('should allow strings with non-space chars', () => {
        expect(isValidString('asf fsa')).toBe(true);
    });
});