const displayINRCurrency = (amount, currencyCode) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2
    });

    return formatter.format(amount);
}
export default displayINRCurrency