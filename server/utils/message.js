var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};
var generateLocationMessage = (from, coords) => {
    let url = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
    return {
        from,
        url,
        createdAt: new Date().getTime()
    }
}
module.exports = {
    generateMessage,
    generateLocationMessage
}