function isBooleanString(value) {
    return value.toLowerCase() === 'true' || value.toLowerCase() === 'false';
}

function isValidInteger(value) {
    return Number.isInteger(parseInt(value));
}

module.exports = {
    isBooleanString,
    isValidInteger
};
