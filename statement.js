const createStatementData = require('./createStatementData.js').createStatementData;

exports.statement = (invoice, plays) => {
  return renderPlainText(createStatementData(invoice, plays));
}

exports.htmlStatement = (invoice, plays) => {
  return renderHtml(createStatementData(invoice, plays));
}

function renderPlainText(data){
  let result = `Statement for ${data.customer}\n`;
  
  for(let perf of data.performances){
    // 注文の内訳を出力
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owned is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

// TODO: HTML版 ちゃんとする
function renderHtml(data){
  let result = `Statement for ${data.customer}\n`;
  
  for(let perf of data.performances){
    // 注文の内訳を出力
    result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owned is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function usd(aNumber){
  return new Intl.NumberFormat("en-US",
  { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber/100);
}
