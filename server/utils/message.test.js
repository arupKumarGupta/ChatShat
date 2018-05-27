const expect = require('expect');
var { generateMessage } = require('./message');
describe('generateMessage', () => {
    it('should return an object containing from and text', () => {
        var message = generateMessage('arup', 'test message');
        expect(message).toMatchObject({
            from: 'arup',
            text: 'test message'
        });
        expect(typeof message.createdAt).toBe('number');
    })
});
