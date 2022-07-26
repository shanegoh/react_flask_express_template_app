const isEmpty = (inputValue) => {
    return (!inputValue || inputValue.toString().trim().length === 0);
}

module.exports = {
    isEmpty
}