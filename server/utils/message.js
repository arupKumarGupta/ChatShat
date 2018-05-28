const moment = require('moment');
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};
var generateLocationMessage = (from, coords) => {
    let url = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
    return {
        from,
        url,
        createdAt: moment().valueOf()
    }
}
module.exports = {
    generateMessage,
    generateLocationMessage
}