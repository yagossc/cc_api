module.exports.get = function(date, modalidade) {
    var withdraw_date = new Date(date);
    Date.prototype.add_days = function(days) {
        var withdraw_date = new Date(this.valueOf());
        withdraw_date.setDate(withdraw_date.getDate() + days);
        return withdraw_date;
    }

    return modalidade == 'debito' ? withdraw_date.add_days(3) : withdraw_date.add_days(30);
}
