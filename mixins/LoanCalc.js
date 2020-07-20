export default {
  getPmt (parPrinc, parRate, parNumPmts) {
    // const pmt = parPrinc / ((Math.pow(1 + parRate, parNumPmts) - 1) / (parRate * Math.pow(1 + parRate, parNumPmts)))
    // alert('getpmt: ' + parPrinc + '|' + parRate + '|' + parNumPmts)
    const va = 1 + parRate
    const vb = parNumPmts
    const vc = va ** vb
    // alert('getpmt: ' + va + '|' + vb + '|' + vc)
    const pmt = parPrinc / ((vc - 1) / (parRate * (vc)))

    return pmt
  },
  getPrinc (parPmt, parRate, parNumPmts) {
    const va = 1 + parRate
    const vb = parNumPmts
    const vc = va ** vb

    const princ = parPmt * ((vc - 1) / (parRate * (vc)))

    return princ
  },
  doOutputLoan (parOutputSet, parNumPmts, parCurrBalance, parRate, parRatePer, parStartDate, parMethod, parPmtyear) {
    let i, x
    const numpmts = parNumPmts

    while (parOutputSet.length) {
      parOutputSet.pop()
    }
    let currbalance = parCurrBalance
    let openbalance, calcPmt, pmt, int, amort
    let rate = parRate / 100
    const rateper = parRatePer

    if (rateper === 'Monthly') { rate = rate / 12 }
    if (rateper === 'Quarterly') { rate = rate / 4 }

    let rateadj = 1

    if (parPmtyear === 'Monthly') { rateadj = 12 }
    if (parPmtyear === 'Quarterly') { rateadj = 4 }
    rate = rate / rateadj

    let dtStep = 1
    if (parPmtyear === 'Annual') { dtStep = 12 }
    if (parPmtyear === 'Quarterly') { dtStep = 3 }

    calcPmt = this.getPmt(currbalance, rate, numpmts)

    // alert('display-'+ currbalance + '|'+ rate + '|'+ numpmts + '|'+  calcPmt)

    let mm, dd, yyyy, sDateBuff
    const buff = parStartDate
    const startdate = new Date(buff)
    x = startdate.getMonth()

    for (i = 0; i < numpmts + 1; i++) {
      mm = startdate.getMonth() + 1
      dd = startdate.getDate()
      yyyy = startdate.getFullYear()
      sDateBuff = mm + '/' + dd + '/' + yyyy

      if (i === 0) {
        openbalance = 0
        pmt = 0
        int = 0
        amort = 0
      }

      if (i >= 1) {
        openbalance = currbalance
        calcPmt = this.getPmt(currbalance, rate, numpmts - (i - 1))
        pmt = calcPmt
        int = openbalance * rate
        amort = pmt - int

        if (parMethod === 'Constant Amortization') {
          amort = openbalance / (numpmts - (i - 1))
          pmt = int + amort
        }

        if (parMethod === 'Interest Only') {
          amort = 0
          pmt = int + amort
        }

        if (parMethod === 'Balloon Payment') {
          amort = int * (-1)
          int = 0
          pmt = 0
        }

        if (i === numpmts) {
          amort = openbalance
          pmt = parseFloat(int) + parseFloat(amort)
        }
        currbalance = (openbalance - amort).toFixed(4)
      }
      parOutputSet.push([sDateBuff, openbalance, pmt, int, amort, currbalance])

      startdate.setMonth(x + dtStep)

      x = x + dtStep
      if (x > 11) { x = 0 }

      if (x === 1 && startdate.getMonth() === 2) {
        // alert('mismatch' + '|' + startdate.getMonth() + '|' + x)
      }

      if (x !== startdate.getMonth()) {
        // alert('mismatch' + '|' + startdate.getMonth() + '|' + x)
        // while (startdate.getMonth() === 2) {
        while (startdate.getMonth() > x) {
          // alert('mismatch' + '|' + startdate.getMonth() + '|' + x)
          startdate.setDate(startdate.getDate() - 1)
        }
        while (startdate.getMonth() < x) {
          // alert('mismatch' + '|' + startdate.getMonth() + '|' + x)
          startdate.setDate(startdate.getDate() + 1)
        }
      }
    }
  }

}
