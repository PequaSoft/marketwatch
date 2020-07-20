<template>
      <v-card flat class="mx-auto"> 
  <div class="dashboard ">
    <v-layout justify-center>
      <h1 class="subheading grey--text text-center ">Foreign Exchange</h1>
    </v-layout>
    <div align="center">
        <v-card-text>
          <p class="grey--text">Select stock symbol and interval.</p>
        </v-card-text>
      <v-layout row wrap justify-center>
        <v-flex xs11 md4 lg3>
          <v-select :items="items" label="From Currency" outlined style="height: 65px;" v-on:input="getForex" v-model="curr_From"></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-center>
        <v-flex xs11 md4 lg3>
          <v-select :items="items" label="To Currency" outlined style="height: 65px;" v-on:input="getForex" v-model="curr_To"></v-select>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-center>
        <v-flex xs11 md4 lg3>
          <v-data-table id="myDataTable_1" :headers="headers" :items="results" hide-default-footer dense class="elevation-1 fixed-header"></v-data-table>
        </v-flex>
      </v-layout>
  
    </div>
    <v-layout row wrap justify-center>
      <v-flex xs11 md4 lg3 class="my-1">
        <v-btn md1 outlined block class="primary white--text" style="width: 80%; padding-top: 5px; " @click="getForex">Get Data</v-btn>
      </v-flex>
    </v-layout>
    <loginModal v-show="isLoginVisible" @close="closeLogin" />
    <profileModal v-show="isProfileVisible" @close="closeProfile" />
    <registerModal v-show="isRegisterVisible" @close="closeRegister" />
  </div>
    </v-card>   
</template>

<script>
// import { mapGetters } from 'vuex'
import { mapGetters } from 'vuex'
import numeral from 'numeral'
import lcalc from '@/mixins/LoanCalc'
import loginModal from '@/components/Modal_Login.vue'
import profileModal from '@/components/Modal_Profile.vue'
import registerModal from '@/components/Modal_Register.vue'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Modal',
  components: {
    loginModal,
    profileModal,
    registerModal
  },
  data () {
    return {
      isLoginVisible: false,
      isProfileVisible: false,
      isRegisterVisible: false,
      isLoanPmtsVisible: false,
      modal2: false,
      itemsx: ['Per Year', 'Per Month', 'Per Quarter'],
      Calc_principal: '0',
      Calc_rate: '0.0000',
      curr_From: 'usd',
      curr_To: 'usd',
      Calc_pmtsperyear: 12,
      Calc_numpmts: '0',
      Calc_pmt: '0.00',
      sYears: '0',
      sPmtsPeryear: 'Monthly',
      sPmts: '0',
      items: ['btc', 'cad', 'chf', 'eur', 'usd'],
      headers: [  { text: 'Category', align: 'left', sortable: false, value: 'category',class: 'primary white--text title' },    //class: 'success--text title'
                  { text: 'Value', align: 'left', value: 'value',class: 'primary white--text title' }, ],
      results: [],
      ssrcLoanName: '',
      snewLoanName: '',
      snewLoanStatus: 0,
      nonblankRules: [v => !!v || 'The input is required']
    }
  },
  computed: mapGetters({
    xUID: 'globalData/get_uid',
    xPWD: 'globalData/get_pwd',
    xAxios: 'globalData/get_axios',
    xForex: 'globalData/get_forex'
  }),
  created () {
    this.$bus.$on('HDR_LOGIN', (data) => {
      this.$bus.$emit('ACTIVATE_LOGIN', 'abc')
      this.isLoginVisible = true
    })
    this.$bus.$on('HDR_REGISTER', (data) => {
      this.$bus.$emit('ACTIVATE_REGISTER', 'abc')
      this.isRegisterVisible = true
    })
    this.$bus.$on('HDR_PROFILE', (data) => {
      this.$bus.$emit('ACTIVATE_PROFILE', 'abc')
      this.isProfileVisible = true
    })
    this.$bus.$on('HDR_CONFIRMCLEAR', (data) => {
      this.$store.commit('globalData/loansClear')
    })
  },
  methods: {
    axiosLoadForex () {
      var token;
      token = localStorage.getItem("token")
      const formData = new FormData()

      // alert('Load forex - ' + this.xUID + ' - '  + this.xPWD  + ' - ' + this.Calc_principal)
      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("fromCurrency", this.curr_From)
      formData.append("toCurrency", this.curr_To)
      
      while (this.results.length) {
          this.results.pop();
        }

      axios.post(this.xAxios + 'forex', formData).then((res) => {
        // alert('return forex')
        var result = JSON.stringify(res)
        result = this.cleanString(result,92)
        result = this.cleanString(result,34)
        result = this.cleanString(result,39)

        var n = result.includes("status:true", 1);
        if(n != true){
           Swal.fire({
            title: '<font face="verdana" color="red">Invalid Request</font>',
            html: '<font face="verdana" color="black">Invalid request or limit of 5 requests per minute has been exceeded.</font>',
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
          return;
        }
        
        // alert('forex1: ' + result)
        result = result.replace("{data:{status:true,rows:{Realtime Currency Exchange Rate:","")
        result = result.replace("}}}","")

        var buff = result.split(",")
        var sSubBuff
        var sValue
        var sCategory
        // var blogsArray = []
        // alert('forex 1: ' + buff[1])
        
        sSubBuff = buff[0].split(": ")
        sValue = sSubBuff[1]
        sCategory = "From Currency Code"
        this.results.push({category: sCategory , value: sValue})

        sSubBuff = buff[1].split(":")
        sValue = sSubBuff[1]
        sCategory = "From Currency Name"
        this.results.push({category: sCategory, value: sValue})

        sSubBuff = buff[2].split(":")
        sValue = sSubBuff[1]
        sCategory = "To Currency Code"
        this.results.push({category: sCategory, value: sValue})

        sSubBuff = buff[3].split(":")
        sValue = sSubBuff[1]
        sCategory = "To Currency Name"
        this.results.push({category: sCategory, value: sValue})

        sSubBuff = buff[4].split(":")
        sValue = sSubBuff[1]
        sCategory = "Exchange Rate"
        this.results.push({category: sCategory, value: sValue})

        sSubBuff = buff[5].split(":")
        sValue = sSubBuff[1] + ':' + sSubBuff[2] + ':' + sSubBuff[3]
        sCategory = "Last Refreshed"
        this.results.push({category: sCategory, value: sValue})

        sSubBuff = buff[6].split(":")
        sValue = sSubBuff[1]
        sCategory = "Time Zone"
        this.results.push({category: sCategory, value: sValue})

        sSubBuff = buff[7].split(":")
        sValue = sSubBuff[1]
        sCategory = "Bid Price"
        this.results.push({category: sCategory, value: sValue})

        sSubBuff = buff[8].split(":")
        sValue = sSubBuff[1]
        sCategory = "Ask Price"
        this.results.push({category: sCategory, value: sValue})

        /*
        alert('forex array: ' + this.results[0].category)
        alert('forex array: ' + this.results[0].value)
        */
        // alert('forex 3: ' + buff[2])
      })
    },
    close () {
      alert('close This:')
    },
    cleanString (parInput, parRemove) {
      var source=parInput
      var result = ""
      for (var i = 0; i < parInput.length; i++) {
        if(source.charCodeAt(i) !== parRemove){
          result=result+parInput[i];
          }
      }
      return result;
    },
    showLogin () {
      this.$bus.$emit('ACTIVATE_LOGIN', 'abc')
      this.isLoginVisible = true
    },
    showProfile () {
      this.$bus.$emit('ACTIVATE_PROFILE', 'abc')
      this.isProfileVisible = true
    },
    showRegister () {
      this.$bus.$emit('ACTIVATE_REGISTER', 'abc')
      this.isRegisterVisible = true
    },
    closeLogin () {
      this.isLoginVisible = false
    },
    closeProfile () {
      this.isProfileVisible = false
    },
    closeRegister () {
      this.isRegisterVisible = false
    },
    showLoanPmts () {
      this.$bus.$emit('ACTIVATE_LOANPMTS', 'abc')
      this.isLoanPmtsVisible = true
    },
    guestLogin () {
      // this.isLoginVisible = true
      this.$store.commit('globalData/setUID', 'guest')
      this.$store.commit('globalData/setPWD', 'guest')
      this.$store.commit('globalData/setEmail', 'guest@guest.com')
      this.$store.commit('globalData/setLoginStatus', 1)
      this.$bus.$emit('UPDATE_PROFILE', 'guest', 'guest', 'guest@guest.com')
      this.$bus.$emit('EXIT_LOGIN', 'guest', 'guest')
      // this.$store.state.store_external_login = 1
      // this.axiosLoadProfile()
    },
    editData () {
      let mult = 12
      // alert('edit data-' + this.sPmtsPeryear);
      if (this.sPmtsPeryear === 'Monthly') { mult = 12 }
      if (this.sPmtsPeryear === 'Quarterly') { mult = 4 }
      if (this.sPmtsPeryear === 'Annual') { mult = 1 }
      // alert('edit data-' + mult + '|' + this.sYears)
      this.sPmts = this.sYears * mult
      // document.getElementById("text3").value = this.sPmts;
    },
    getForex () {
      this.axiosLoadForex()
      
    },
    calcprinc () {
      let divisor = 12
      const pp = this.Calc_pmtsperyear
      let multiplier

      let buff = this.Calc_numpmts
      this.$store.state.store_numpmts = buff

      if (this.Calc_rateperiod === 'Per Year') { divisor = 12 }
      if (this.Calc_rateperiod === 'Per Quarter') { divisor = 3 }
      if (this.Calc_rateperiod === 'Per Month') { divisor = 1 }

      if (pp === 1) { multiplier = 12 }
      if (pp === 4) { multiplier = 3 }
      if (pp === 12) { multiplier = 1 }

      divisor = divisor / multiplier

      buff = numeral(this.Calc_rate)
      const rate = (buff.value() / divisor) / 100
      const numPmts = numeral(this.Calc_numpmts)
      const pmt = numeral(this.Calc_pmt)

      this.Calc_pmt = numeral(pmt).format('0,0.00')
      this.Calc_rate = numeral(this.Calc_rate).format('0,0.0000')

      this.Calc_principal = numeral(lcalc.getPrinc(pmt.value(), rate, numPmts.value())).format('0,0.00')
    },
    calcrate () {
      let i = 0
      let tPmt = 0
      let tRate = 10
      let step = 2
      let direction = 'down'
      let divisor = 12
      const pp = this.Calc_pmtsperyear
      let multiplier

      const buff = this.Calc_numpmts
      this.$store.state.store_numpmts = buff

      if (this.Calc_rateperiod === 'Per Year') { divisor = 12 }
      if (this.Calc_rateperiod === 'Per Quarter') { divisor = 3 }
      if (this.Calc_rateperiod === 'Per Month') { divisor = 1 }

      if (pp === 1) { multiplier = 12 }
      if (pp === 4) { multiplier = 3 }
      if (pp === 12) { multiplier = 1 }

      divisor = divisor / multiplier
      const princ = numeral(this.Calc_principal)
      const numPmts = numeral(this.Calc_numpmts)
      let pmt = numeral(this.Calc_pmt)

      this.Calc_principal = numeral(princ).format('0,0.00')
      this.Calc_pmt = numeral(pmt).format('0,0.00')

      pmt = pmt.value()

      while (i < 200) {
        tPmt = lcalc.getPmt(princ.value(), (tRate / divisor) / 100, numPmts.value())
        // alert(princ.value() + '-' + t_pmt + '-' + t_rate  + '-' + num_pmts.value());
        if (tPmt === pmt) { break }

        if (tPmt > pmt && direction === 'down') { tRate = tRate - step }
        if (tPmt > pmt && direction === 'up') { step = step / 2; direction = 'down'; tRate = tRate - step }

        if (tPmt < pmt && direction === 'down') { step = step / 2; direction = 'up'; tRate = tRate + step }
        if (tPmt < pmt && direction === 'up') { tRate = tRate + step }
        i++
      }
      this.Calc_rate = tRate
      this.Calc_rate = numeral(this.Calc_rate).format('0,0.0000')
    },
    calcNumPmts () {
      let i = 0
      let tPmt = 0
      let tNumPmts = 100
      let step = 20
      let direction = 'down'

      let divisor = 12
      const pp = this.Calc_pmtsperyear
      let multiplier

      if (this.Calc_rateperiod === 'Per Year') { divisor = 12 }
      if (this.Calc_rateperiod === 'Per Quarter') { divisor = 3 }
      if (this.Calc_rateperiod === 'Per Month') { divisor = 1 }

      if (pp === 1) { multiplier = 12 }
      if (pp === 4) { multiplier = 3 }
      if (pp === 12) { multiplier = 1 }

      divisor = divisor / multiplier
      let buff = numeral(this.Calc_rate)
      const rate = (buff.value() / divisor) / 100
      const princ = numeral(this.Calc_principal)
      // var num_pmts = numeral(this.Calc_numpmts)
      let pmt = numeral(this.Calc_pmt)
      this.Calc_principal = numeral(princ).format('0,0.00')
      this.Calc_pmt = numeral(pmt).format('0,0.00')

      pmt = pmt.value()

      while (i < 200) {
        tPmt = lcalc.getPmt(princ.value(), rate, tNumPmts)
        if (tPmt === pmt) { break }
        if (tPmt < pmt && direction === 'up') { step = step / 2; direction = 'down'; tNumPmts = tNumPmts - step }
        if (tPmt < pmt && direction === 'down') { tNumPmts = tNumPmts - step }
        if (tPmt > pmt && direction === 'up') { tNumPmts = tNumPmts + step }
        if (tPmt > pmt && direction === 'down') { step = step / 2; direction = 'up'; tNumPmts = tNumPmts + step }
        i++
      }
      buff = numeral(tNumPmts).format('0,0')
      this.Calc_numpmts = buff
    }
  }
}

</script>
