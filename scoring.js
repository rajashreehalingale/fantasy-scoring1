const rules = {
  QB: {
    passing: {
      yards: 25, yPoint: 1, touchdowns: 1, tdPoint: 6, interceptions: 1, iPoint: -3
    },
    rushing: {
      yards: 10, yPoint: 1, touchdowns: 1, tdPoint: 6, fumbles: 1, fPoint: -3
    }
  },
  RB: {
    rushing: {
      yards: 10, yPoint: 1, touchdowns: 1, tdPoint: 6, fumbles: 1, fPoint: -3
    },
    receiving: {
      receptions: 1, rPoint: 1, yards: 10, yPoint: 1, touchdowns: 1, tdPoint: 6, fumbles: 1, fPoint: -3
    }
  },
  WR: {
    rushing: {
      yards: 10, yPoint: 1, touchdowns: 1, tdPoint: 6, fumbles: 1, fPoint: -3
    },
    receiving: {
      receptions: 1, rPoint: 1, yards: 10, yPoint: 1, touchdowns: 1, tdPoint: 6, fumbles: 1, fPoint: -3
    },
    kickreturn: {
      yards: 15, yPoint: 1, touchdowns: 1, tdPoint: 6, fumbles: 1, fPoint: -3
    },
    puntreturn: {
      yards: 15, yPoint: 1, touchdowns: 1, tdPoint: 6, fumbles: 1, fPoint: -3
    }
  },
  TE: {
    receiving: {
      receptions: 1, rPoint: 1, yards: 10, yPoint: 1, touchdowns: 1, tdPoint: 6, fumbles: 1, fPoint: -3
    }
  }
}


function calculateScore(player) {
  var score1 = 0
  var score2 = 0
  var score3 = 0
  var score4 = 0

  if (player.position === 'QB') {
    score1 = calcPassingScore(player.stats.passing, rules.QB.passing)
    score2 = calcRushingReturnsScore(player.stats.rushing, rules.QB.rushing)

    return score1 + score2
  }
  else if (player.position === 'RB') {
    score1 = calcRushingReturnsScore(player.stats.rushing, rules.RB.rushing)
    score2 = calcReceivingScore(player.stats.receiving, rules.RB.receiving)

    return score1 + score2
  }
  else if (player.position === 'WR') {
    score1 = calcRushingReturnsScore(player.stats.rushing, rules.WR.rushing)
    score2 = calcReceivingScore(player.stats.receiving, rules.WR.receiving)
    score3 = calcRushingReturnsScore(player.stats.return.kickreturn, rules.WR.kickreturn)
    score4 = calcRushingReturnsScore(player.stats.return.puntreturn, rules.WR.puntreturn)

    return score1 + score2 + score3 + score4
  }
  else if (player.position === 'TE') {
    score1 = calcReceivingScore(player.stats.receiving, rules.TE.receiving)

    return score1
  }
  else if (player.position === 'K') {
    score1 = calcUnknownScore()

    return score1
  }
}

function calcScore(stat, per, point) {
  return ((stat / per) * point)
}

function calcPassingScore(passing, rulesCal) {
  var scoreYard = 0
  var scoreTD = 0
  var scoreI = 0

  scoreYard = calcScore(passing.yards, rulesCal.yards, rulesCal.yPoint)
  scoreTD = calcScore(passing.touchdowns, rulesCal.touchdowns, rulesCal.tdPoint)
  scoreI = calcScore(passing.interceptions, rulesCal.interceptions, rulesCal.iPoint)

  return scoreYard + scoreTD + scoreI
}

function calcRushingReturnsScore(rushingreturns, rulesCal) {
  var scoreYard = 0
  var scoreTD = 0
  var scoreF = 0

  scoreYard = calcScore(rushingreturns.yards, rulesCal.yards, rulesCal.yPoint)
  scoreTD = calcScore(rushingreturns.touchdowns, rulesCal.touchdowns, rulesCal.tdPoint)
  scoreF = calcScore(rushingreturns.fumbles, rulesCal.fumbles, rulesCal.fPoint)

  return scoreYard + scoreTD + scoreF
}

function calcReceivingScore(receiving, rulesCal) {
  var scoreReceiving = 0
  var scoreYard = 0
  var scoreTD = 0
  var scoreF = 0

  scoreReceiving = calcScore(receiving.receptions, rulesCal.receptions, rulesCal.rPoint)
  scoreYard = calcScore(receiving.yards, rulesCal.yards, rulesCal.yPoint)
  scoreTD = calcScore(receiving.touchdowns, rulesCal.touchdowns, rulesCal.tdPoint)
  scoreF = calcScore(receiving.fumbles, rulesCal.fumbles, rulesCal.fPoint)

  return scoreReceiving + scoreYard + scoreTD + scoreF
}

// Data function for Tightend
function calcUnknownScore() {
  let result = 0

  return result
}
module.exports = calculateScore
