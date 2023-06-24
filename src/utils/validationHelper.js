function isBooleanString(value) {
    if (!value || value == undefined) return false;
    return value.toLowerCase() === 'true' || value.toLowerCase() === 'false';
}

function isValidInteger(value) {
    if (!value || value === undefined) return false;
    const parsedValue = parseInt(value, 10);
    return String(parsedValue) === String(value);
}

function isListEmpty(list) {
    if (!list || list == undefined) return false;
    return true ? list.length === 0 : false;
}

module.exports = {
    isBooleanString,
    isValidInteger,
    isListEmpty
};
