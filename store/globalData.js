import axios from 'axios'
//const axios = require('axios');

export const state = () => ({
  store_numpmts: '0',
  store_uid: '--',
  store_pwd: '--',
  store_email: '--',
  store_AlphaKey: '--',
  store_AccountStatus: '--',
  store_login_status: 0,
  store_external_login: 0,
  store_srcLoan: '--',
  store_forex: '--',
  store_srcIndex: '--',
  store_curr_Ticker: '',
  store_curr_Index: '',
  // store_axios: 'https://proof.flagumina.now.sh/',
  // store_axios: 'https://testbedFL.azurewebsites.net/',
  // store_axios: 'https://bourbon-node.herokuapp.com/',
  //store_axios: 'https://bourbon.flagumina.now.sh/',
  //store_axios: 'https://proof.flagumina.now.sh/',
  //store_axios: 'https://proof.flagumina.vercel.app/',
  store_axios: 'https://proof.flagumina.vercel.app/',

  //store_axios: 'http://localhost:3010/',
  //store_Ccy: ['btc-BitCoin', 'cad-Canadian Dollar', 'chf-Swiss Franc', 'eur-Euro','gbp-British Pound Sterling','JPY-Japanese Yen', 'usd-United States Dollar'],
  store_Ccy: [],
  store_Tech: [],
  store_Index: [],
  storeLoans: []
})

export const getters = {
  get_uid (state) {
    return state.store_uid
  },
  get_pwd (state) {
    return state.store_pwd
  },
  get_forex (state) {
    return state.store_forex
  },
  get_axios (state) {
    return state.store_axios
  },
  get_email (state) {
    return state.store_email
  },
  get_AlphaKey (state) {
    return state.store_AlphaKey
  },
  get_AccountStatus (state) {
    return state.store_AccountStatus
  },
  get_LoginStatus (state) {
    return state.store_login_status
  },
  get_ExternalLogin (state) {
    return state.store_external_login
  },
  get_StoreLoans (state) {
    return state.storeLoans
  },
  get_SrcLoan (state) {
    return state.store_srcLoan
  },
  get_FullLoan (state) {
    return state.store_srcLoan
  },
  get_FullIndex (state) {
    return state.store_srcIndex
  },
  get_CcyList (state) {
    return state.store_Ccy
  },
  get_TechList (state) {
    return state.store_Tech
  },
  get_IndexList (state) {
    return state.store_Index
  },
  get_Ticker (state) {
    return state.store_curr_Ticker
  },
  get_Index (state) {
    return state.store_curr_Index
  }
}

export const mutations = {
  setUID (state, text) {
    // alert('store result: ' + text)
    state.store_uid = text
  },
  setPWD (state, text) {
    state.store_pwd = text
  },
  setEmail (state, text) {
    state.store_email = text
    // alert('xyz' + text)
  },
  setTicker (state, text) {
    state.store_curr_Ticker = text
    // alert('xyz' + text)
  },
  setIndex (state, text) {
    state.store_curr_Index = text
    // alert('xyz' + text)
  },
  setAlphaKey (state, text) {
    state.store_AlphaKey = text
  },
  setAccountStatus (state, text) {
    state.store_AccountStatus = text
  },
  setLoginStatus (state, text) {
    state.store_login_status = text
  },
  setExternalLogin (state, text) {
    state.store_external_login = text
  },
  setStoreLoans (state, text) {
    state.storeLoans = text
  },
  setSrcLoan (state, text) {
    state.store_srcLoan = text
  },
  add (state, text) {
    state.storeLoans.push({
      text
    })
  },
  copy (state, text) {
    const res = text.split(',')
    // alert('src: ' + state + '|' + res[0] + '|' + res[1])
    const srcLoan = res[0]
    const newLoan = res[1]
    let delLoan
    let www
    let yyy
    let z0, z1, z2, z3, z4, z5, z6, z7, z8, z9
    const sUID = state.store_uid
    const arrayLength = state.storeLoans.length
    // alert('global delete: ' + arrayLength)
    for (let i = 0; i < arrayLength; i++) {
      // alert('loop delete:' + i)
      delLoan = state.storeLoans[i]
      const result = JSON.stringify(delLoan)
      // alert('loop delete 2: ' + result)
      www = mutations.cleanString(result)

      if (www.length < 10) { alert('result: ' + www) }
      yyy = www.substring(8, www.length - 1)
      yyy = yyy.replace('"loanid"', 'loanid')
      const res = yyy.split(',')
      z0 = res[0].substring(9, res[0].length - 1)

      if (srcLoan === z0) {
        z1 = res[1].substring(11, res[1].length - 1)
        z2 = res[2].substring(9, res[2].length - 1)
        z3 = res[3].substring(8, res[3].length - 1)
        z4 = res[4].substring(13, res[4].length - 1)
        z5 = res[5].substring(17, res[5].length - 1)
        z6 = res[6].substring(8, res[6].length - 0)
        z7 = res[7].substring(5, res[7].length - 0)
        z8 = res[8].substring(8, res[8].length - 0)
        z9 = res[9].substring(8, res[9].length - 0)
        const zzz = { loanid: newLoan, StartDate: z1, dtStart: z2, Method: z3, Periodicity: z4, RatePeriodicity: z5, balance: z6, rate: z7, numpmts: z8, payment: z9 }
        // alert('copying 1:' + newLoan)
        state.storeLoans.push(zzz)
        // alert('copying 2:' + state.storeLoans.length)
        mutations.axiosCopyLoan(state.store_axios, sUID, srcLoan, newLoan)
        return
      }
    }
  },
  addNewCcy (state, text) {
    state.store_Ccy.push({
      text
    })
  },
  addNewCcy2 (text) {
    state.store_Ccy.push({
      text
    })
  },
  addNewTech (state, text) {
    state.store_Tech.push({
      text
    })
  },  
  delIndex (state, text) {
    var indexLength = state.store_Index.length
    var sBuff = state.store_Index[0]
    var sTarget = text.toUpperCase()
    //alert("Start Delete: " + indexLength + '|' + sBuff + '|' + text);

    for (let i = 0; i < indexLength; i++) {
      sBuff = state.store_Index[i]
      sBuff = sBuff.toUpperCase()
      //alert("Curr Delete: " + sBuff + '|' + sTarget);
      if(sBuff == sTarget){
        alert("Found Index: " + sTarget);
        state.store_Index.splice(i, 1)
        return;
      }
    }

   state.store_Index[state.store_Index.length] = text
   //alert("Add Index: " + text);
  },    
  addIndex (state, text) {
    /*
    state.store_Index.push({
      text
    })
    */
   
   state.store_Index[state.store_Index.length] = text
   //alert("Add Index: " + text);
  },      
  loadIndex (state) {

    if(state.store_Index.length > 0){return;}
    state.store_Index = [];  

    const formData = new FormData()
    var sUser = '_Master'
    if(this.store_uid != '--' &&  this.store_uid != undefined){sUser = this.store_uid}
    formData.append('user', JSON.stringify(sUser))
    formData.append('newloan', JSON.stringify('newloan'))
    //alert("Load Index: " + state.store_axios + 'xindexlist');

    axios.post(state.store_axios + 'xindexlist', formData).then((res) => {
      //var result = JSON.stringify(res.data)
      var sBBuff = mutations.prepString(JSON.stringify(res.data))
      var ptr = 0  
      //alert("Clear Result-" + sBBuff);

      for (let i = 1; i < sBBuff.length; i++) {
        var xBuff = sBBuff[i].substring(7);
        //console.log('Index: '+xBuff);
        state.store_Index[ptr] = xBuff
        ptr++;  
      }
      //console.log('Index Length: '+ state.store_Index.length);
      //this.$bus.$emit('LOAD_INITIAL', 'abc')
     })
  },
  loadCcy (state) {
    state.store_Ccy = [];  

    const formData = new FormData()
    formData.append('user', JSON.stringify('user'))
    formData.append('newloan', JSON.stringify('newloan'))
    //alert("Clear Currency");

    axios.post(state.store_axios + 'xcurrency', formData).then((res) => {
      //var result = JSON.stringify(res.data)
      var sBBuff = mutations.prepString(JSON.stringify(res.data))
      var ptr = 0  
      //alert("Clear Result-" + sBBuff);

      for (let i = 1; i < sBBuff.length; i++) {
        var xBuff = sBBuff[i].substring(7);
        state.store_Ccy[ptr] = xBuff
        ptr++;  
      }

      
     })
  },
  loadTech (state) {
    state.store_Tech = [];  

    const formData = new FormData()
    formData.append('user', JSON.stringify('user'))
    formData.append('newloan', JSON.stringify('newloan'))
    //alert("Clear Currency");

    axios.post(state.store_axios + 'xtechlist', formData).then((res) => {
      //var result = JSON.stringify(res.data)
      var sBBuff = mutations.prepString(JSON.stringify(res.data))
      var ptr = 0  
      //alert("xtechlist");

      for (let i = 1; i < sBBuff.length; i++) {
        var xBuff = sBBuff[i].substring(8);
        state.store_Tech[ptr] = xBuff
        ptr++;  
      }

     })
  },  
  prepString (parInput) {
    var result = parInput;
    
    result = mutations.cleanString2(92,result)
    
    result = mutations.cleanString2(34,result)
    result = mutations.cleanString2(39,result)
    

    result = result.replace("rows","")
      
    result = mutations.cleanString2(123,result)
    result = mutations.cleanString2(125,result)
    result = mutations.cleanString2(133,result)
    result = mutations.cleanString2(135,result)
    result = mutations.cleanString2(58,result)

    result = result.replace("[","")
    result = result.replace("]","")
    var sBBuff = result.split(",")

    return sBBuff;
  },
  axiosAddLoan (parAxios, parUID, parLoan) {
    // alert("myLogin!");
    const formData = new FormData()
    formData.append('user', JSON.stringify(parUID))
    formData.append('newloan', JSON.stringify(parLoan))

    axios.post(parAxios + 'loanadd', formData).then((res) => {
      // var result = JSON.stringify(res.data.rows)
    })
  },
  deleteLoan (state, text) {
    const id = text
    let delLoan
    let www
    let yyy
    let z0
    const sUID = state.store_uid
    const arrayLength = state.storeLoans.length
    // alert('global delete: ' + arrayLength)
    for (let i = 0; i < arrayLength; i++) {
      // alert('loop delete:' + i)
      delLoan = state.storeLoans[i]
      const result = JSON.stringify(delLoan)
      // alert('loop delete 2: ' + result)
      www = mutations.cleanString(result)

      if (www.length < 10) { alert('result: ' + www) }
      yyy = www.substring(8, www.length - 1)
      yyy = yyy.replace('"loanid"', 'loanid')
      const res = yyy.split(',')
      z0 = res[0].substring(9, res[0].length - 1)

      if (id === z0) {
        // alert('splicing')
        state.storeLoans.splice(i, 1)
        mutations.axiosDeleteLoan(state.store_axios, sUID, z0)
        return
      }
    }
  },
  delete (state, text) {
    const id = text
    let delLoan
    let www
    let yyy
    let z0
    const arrayLength = state.storeLoans.length
    // alert('global delete: ' + arrayLength)
    for (let i = 0; i < arrayLength; i++) {
      // alert('loop delete:' + i)
      delLoan = state.storeLoans[i]
      const result = JSON.stringify(delLoan)
      // alert('loop delete 2: ' + result)
      www = mutations.cleanString(result)

      if (www.length < 10) { alert('result: ' + www) }
      yyy = www.substring(8, www.length - 1)
      yyy = yyy.replace('"loanid"', 'loanid')
      const res = yyy.split(',')
      z0 = res[0].substring(9, res[0].length - 1)

      if (id === z0) {
        // alert('splicing')
        state.storeLoans.splice(i, 1)
        // mutations.axiosDeleteLoan(state.store_axios, sUID, z0)
        return
      }
    }
  },
  axiosDeleteLoan (parAxios, parUID, parLoan) {
    const formData = new FormData()
    formData.append('user', JSON.stringify(parUID))
    formData.append('srcloan', JSON.stringify(parLoan))
    // alert('db delete-' + parAxios + '|' + JSON.stringify(parUID) + '|' + JSON.stringify(parLoan))
    axios.post(parAxios + 'loandelete', formData).then((res) => {
      // var result = JSON.stringify(res.data.rows)
    })
  },
  axiosCopyLoan (parAxios, parUID, parSrcLoan, parNewLoan) {
    // alert('Copy Loan-' + parAxios + '|' + parUID + '|' + parSrcLoan + '|' + parNewLoan)
    const formData = new FormData()
    formData.append('user', JSON.stringify(parUID))
    formData.append('srcloan', JSON.stringify(parSrcLoan))
    formData.append('destloan', JSON.stringify(parNewLoan))

    axios.post(parAxios + 'loancopy', formData).then((res) => {
      // var result = JSON.stringify(res.data.rows)
    })
  },
  axiosGetCcyList (parAxios, parUID, parLoan) {
    // alert("myLogin!");
    /*
    const formData = new FormData()
    formData.append('user', JSON.stringify(parUID))
    formData.append('newloan', JSON.stringify(parLoan))

    axios.post(parAxios + 'loanadd', formData).then((res) => {
      // var result = JSON.stringify(res.data.rows)
    })
    */
  },
  currencySetup (state) {
      state.store_Ccy = [];
      
      const formData = new FormData()
      formData.append('user', JSON.stringify('user'))
      formData.append('newloan', JSON.stringify('newloan'))

      
      state.store_Ccy = ['btc-BitCoin', 'cad-Canadian Dollar', 'chf-Swiss Franc', 'eur-Euro','gbp-British Pound Sterling','HKD-Hong Kong Dollar','JPY-Japanese Yen', 'usd-United States Dollar'];

  },
  getFullIndex (state, text) {
    const srcIndex = text
    var FullIndex = state.store_curr_Ticker + '|' + state.store_curr_Index + '|' + srcIndex
    //alert('store' + FullIndex)
    state.store_srcIndex = FullIndex
    return;
  },

  getFullLoan (state, text) {
    const srcLoan = text
    let targetLoan, FullLoan
    let www
    let yyy
    let z0, z1, z2, z3, z4, z5, z6, z7, z8, z9
    // const sUID = state.store_uid
    const arrayLength = state.storeLoans.length
    // alert('global delete: ' + arrayLength)
    for (let i = 0; i < arrayLength; i++) {
      // alert('loop delete:' + i)
      targetLoan = state.storeLoans[i]
      const result = JSON.stringify(targetLoan)
      // alert('loop delete 2: ' + result)
      www = mutations.cleanString(result)

      if (www.length < 10) { alert('result: ' + www) }
      yyy = www.substring(8, www.length - 1)
      yyy = yyy.replace('"loanid"', 'loanid')
      const res = yyy.split(',')
      z0 = res[0].substring(9, res[0].length - 1)

      if (srcLoan === z0) {
        z1 = res[1].substring(11, res[1].length - 1)
        z2 = res[2].substring(9, res[2].length - 1)
        z3 = res[3].substring(8, res[3].length - 1)
        z4 = res[4].substring(13, res[4].length - 1)
        z5 = res[5].substring(17, res[5].length - 1)
        z6 = res[6].substring(8, res[6].length - 0)
        z7 = res[7].substring(5, res[7].length - 0)
        z8 = res[8].substring(8, res[8].length - 0)
        z9 = res[9].substring(8, res[9].length - 0)
        FullLoan = z0 + '|' + z1 + '|' + z2 + '|' + z3 + '|' + z4 + '|' + z5 + '|' + z6 + '|' + z7 + '|' + z8 + '|' + z9
        FullLoan = mutations.cleanString2(34, FullLoan)
        FullLoan = mutations.cleanString2(58, FullLoan)
        FullLoan = mutations.cleanString2(125, FullLoan)
        // alert('copying 1:' + newLoan)
        state.store_srcLoan = FullLoan
        return
      }
    }
  },
  getForex (state, text) {
    const srcLoan = text
    let targetLoan, FullLoan
    let www
    let yyy
    let z0, z1, z2, z3, z4, z5, z6, z7, z8, z9
    // const sUID = state.store_uid
    const arrayLength = state.storeLoans.length
    // alert('global delete: ' + arrayLength)
    for (let i = 0; i < arrayLength; i++) {
      // alert('loop delete:' + i)
      targetLoan = state.storeLoans[i]
      const result = JSON.stringify(targetLoan)
      // alert('loop delete 2: ' + result)
      www = mutations.cleanString(result)

      if (www.length < 10) { alert('result: ' + www) }
      yyy = www.substring(8, www.length - 1)
      yyy = yyy.replace('"loanid"', 'loanid')
      const res = yyy.split(',')
      z0 = res[0].substring(9, res[0].length - 1)

      if (srcLoan === z0) {
        z1 = res[1].substring(11, res[1].length - 1)
        z2 = res[2].substring(9, res[2].length - 1)
        z3 = res[3].substring(8, res[3].length - 1)
        z4 = res[4].substring(13, res[4].length - 1)
        z5 = res[5].substring(17, res[5].length - 1)
        z6 = res[6].substring(8, res[6].length - 0)
        z7 = res[7].substring(5, res[7].length - 0)
        z8 = res[8].substring(8, res[8].length - 0)
        z9 = res[9].substring(8, res[9].length - 0)
        FullLoan = z0 + '|' + z1 + '|' + z2 + '|' + z3 + '|' + z4 + '|' + z5 + '|' + z6 + '|' + z7 + '|' + z8 + '|' + z9
        FullLoan = mutations.cleanString2(34, FullLoan)
        FullLoan = mutations.cleanString2(58, FullLoan)
        FullLoan = mutations.cleanString2(125, FullLoan)
        // alert('copying 1:' + newLoan)
        state.store_srcLoan = FullLoan
        return
      }
    }
  },
  cleanString2 (parSearch, parInput) {
    const source = parInput
    let result = ''
    for (let i = 0; i < parInput.length; i++) {
      if (source.charCodeAt(i) !== parSearch) {
        result = result + parInput[i]
      }
    }
    return result
  },
  cleanString (parInput) {
    const source = parInput
    let result = ''
    for (let i = 0; i < parInput.length; i++) {
      if (source.charCodeAt(i) !== 92) {
        result = result + parInput[i]
      }
    }
    return result
  }
}
