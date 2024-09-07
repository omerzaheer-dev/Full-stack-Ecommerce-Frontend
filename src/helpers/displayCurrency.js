const displayINRCurrency = (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 2
    });

    return formatter.format(amount);
}
export default displayINRCurrency