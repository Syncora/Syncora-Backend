function isBooleanString(value) {
    return value.toLowerCase() === 'true' || value.toLowerCase() === 'false';
}

function isValidInteger(value) {
    return Number.isInteger(parseInt(value));
}

function isListEmpty(list) {
    return true ? list.length === 0 : false;
}

module.exports = {
    isBooleanString,
    isValidInteger,
    isListEmpty
};
