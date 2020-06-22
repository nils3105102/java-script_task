function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Счет для ${invoice.customer}\n`;
    for (let perf of invoice.performances) {
        volumeCredits += numberOfCredits(perf);
        result += ` ${currentPlay(perf).name}: ${format(calcAmount(perf) / 100)}`;
        result += ` (${perf.audience} мест)\n`;
        totalAmount += calcAmount(perf);
                }
        result += `Итого с вас ${format(totalAmount/100)}\n`;
        result += `Вы заработали ${volumeCredits} бонусов\n`;
        return result;
    }

const format = (number) => new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", minimumFractionDigits: 2 }).format(number);

const numberOfCredits = (perf) => {
    let volumeCredits = 0;
    volumeCredits += Math.max(perf.audience - 30, 0);
    if ("comedy" === currentPlay(perf).type) volumeCredits += Math.floor(perf.audience / 5);
    return volumeCredits;
}

const currentPlay = (perf) => plays[perf.playId];

const calcAmount = (perf) => {
    let thisAmount = 0;
        switch (currentPlay(perf).type) {
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                break;
            default:
                throw new Error(`неизвестный тип: ${currentPlay(perf).type}`);
                }
    return thisAmount;
}
