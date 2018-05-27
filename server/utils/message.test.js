const expect = require('expect');
var {
    generateMessage,
    generateLocationMessage
} = require('./message');
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

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var coords = {
            latitude: 1,
            longitude: 1
        }
        var locationMessage = generateLocationMessage('Arup', coords);
        expect(typeof locationMessage.createdAt).toBe('number');
        expect(locationMessage).toMatchObject({
            from: 'Arup',
            url: 'https://www.google.com/maps?q=1,1'
        });
    })
});