exports.createStatementData = (invoice, plays) => {
  const result = {}
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(enrichPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);
  return result;

  function enrichPerformance(aPerformance){
    const calcurator = createPerformanceCalcurator(aPerformance, playFor(aPerformance));
    const result = Object.assign({}, aPerformance);
    result.play = calcurator.play;
    result.amount = calcurator.amount;
    result.volumeCredits = calcurator.volumeCredits;
    return result;
  }

  function totalVolumeCredits(data){
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }

  function totalAmount(data){
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function playFor(aPerformance){
    return plays[aPerformance.playID];
  }
}

function createPerformanceCalcurator(aPerformance, aPlay){
  switch(aPlay.type){
  case "tragedy": return new TragedyCalcurator(aPerformance, aPlay);
  case "comedy": return new ComedyCalcurator(aPerformance, aPlay);
  default:
    throw new Error(`unknown type: ${aPlay.type}`);
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay){
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount(){
    throw new Error("subclass responsibility");
  }

  get volumeCredits(){
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalcurator extends PerformanceCalculator{
  get amount(){
    let result = 40000;
    if(this.performance.audience > 30){
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalcurator extends PerformanceCalculator{
  get amount(){
    let result = 30000;
    if(this.performance.audience > 20){
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits(){
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

