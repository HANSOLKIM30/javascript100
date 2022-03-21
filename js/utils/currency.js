export const getMoneyString = (price) => {
    if(!Number.isInteger(price)) {
        console.log('숫자아님');
        return;
    }
    return price.toLocaleString();
}