<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
<script src="sweetalert2.all.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
<script src="sweetalert2.min.js"></script>
<script>

// import { bus } from '../main'
import Swal from 'sweetalert2'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'modal',
  data () {
    return {
      ssrcLoanName: '',
      snewLoanName: '',
      snewLoanStatus: 0,
      nonblankRules: [v => !!v || "The input is required"]
    }
  },
  computed: mapGetters({
    xUID: 'globalData/get_uid',
    xAxios: 'globalData/get_axios',
    xStoreLoans: 'globalData/get_StoreLoans'
  }),
  methods: {
    close () {
      this.$root.$emit('clickedSomething', this.sUID)
      // alert('close This: '+ this.sUID + '-' + this.sPWD);
      this.$emit('close')
    },
    close2 () {
      var loan
      var srcLoan
      var www, yyy
      var z0, z1, z2, z3,z4, z5, z6, z7, z8, z9
      var arrayLength = this.xStoreLoans.length;
      // alert('Step 1:' + this.ssrcLoanName + '|' + this.snewLoanName)
      for (var i = 0; i < arrayLength; i++) {
        loan = this.xStoreLoans[i]
        var result = JSON.stringify(loan)
        // alert('Step a: ' + result)
        www = this.cleanString(result)
        // alert('Step b: ' + www)
        yyy = www.substring(8,www.length-1)
        yyy = yyy.replace('"loanid"', 'loanid')
        var res = yyy.split(",");
        z0 = res[0].substring(9,res[0].length-1)
        // var zzz = { loanid: z0 , StartDate: z1, dtStart: z2, Method: z3, Periodicity: z4, RatePeriodicity: z5, balance: z6, rate: z7, numpmts: z8, payment: z9}
        // this.storeLoans.push(zzz)
        if(this.ssrcLoanName === z0){
          yyy = yyy.replace('"loanid"', 'loanid')
          yyy = yyy.replace('"StartDate"', 'StartDate')
          yyy = yyy.replace('"dtStart"', 'dtStart')
          yyy = yyy.replace('"Method"', 'Method')
          yyy = yyy.replace('"Periodicity"', 'Periodicity')
          yyy = yyy.replace('"RatePeriodicity"', 'RatePeriodicity')
          yyy = yyy.replace('"balance"', 'balance')
          yyy = yyy.replace('"rate"', 'rate')
          yyy = yyy.replace('"numpmts"', 'numpmts')
          yyy = yyy.replace('"payment"', 'payment')
          var res = yyy.split(",");
          z0 = res[0].substring(9,res[0].length-1)
          z1 = res[1].substring(11,res[1].length-1)
          z2 = res[2].substring(9,res[2].length-1)
          z3 = res[3].substring(8,res[3].length-1)
          z4 = res[4].substring(13,res[4].length-1)
          z5 = res[5].substring(17,res[5].length-1)
          z6 = res[6].substring(8,res[6].length-0)
          z7 = res[7].substring(5,res[7].length-0)
          z8 = res[8].substring(8,res[8].length-0)
          z9 = res[9].substring(8,res[9].length-0)
        }

        if(this.snewLoanName === z0){
          Swal.fire({
            title: '<font face="verdana" color="red">Loan already Exists?</font>',
            html: '<font face="verdana" color="black">Loan already Exists. Please enter another name</font>',
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
          return
        }
        console.log(loan.loanid);
      //Do something
      }
      var zzz = { loanid: this.snewLoanName , StartDate: z1, dtStart: z2, Method: z3, Periodicity: z4, RatePeriodicity: z5, balance: z6, rate: z7, numpmts: z8, payment: z9}
      this.$store.commit('globalData/add', zzz)
      this.axiosCopyLoan()
      this.$emit('close')
    },
    axiosCopyLoan () {
      const formData = new FormData()
      formData.append('user', JSON.stringify(this.xUID))
      formData.append('srcloan', JSON.stringify(this.ssrcLoanName))
      formData.append('destloan', JSON.stringify(this.snewLoanName))

      axios.post(this.xAxios + 'loancopy', formData).then(res => {
        var result = JSON.stringify(res.data.rows)
      })
    },
    cleanString (parInput) {
      var source=parInput
      var result = ""
      for (var i = 0; i < parInput.length; i++) {
        if(source.charCodeAt(i) !== 92){
          result=result+parInput[i];
          }
      }
      return result;
    }
  },
  created () {
    this.$bus.$on('COPY_LOAN', (data) => {
      this.ssrcLoanName = data
    })
    this.$bus.$on('ACTIVATE_COPYLOAN', (data) => {
      this.ssrcLoanName = data

    })
  }
}

</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" style="height: 290px; width: 450px;" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header id="modal-header" class="modal-header blue darken-4">
          <h2 id="myModalLabel" style="color:lightblue; font-family:verdana;">Copy Loan</h2>
          <button type="button" style="font-size: 24px;" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <v-text-field id="text_src" readonly label="Source Loan Name" class="compact-form" outlined style="height: 55px;" :rules="nonblankRules" v-model="ssrcLoanName"></v-text-field>
            <v-text-field id="text_dest" label="New Loan Name" class="compact-form" outlined style="height: 55px;" :rules="nonblankRules" v-model="snewLoanName"></v-text-field>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <v-btn color="primary" style="width: 120px;" @click="close2">Submit</v-btn>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 800px;
    height: 400x;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #561763;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
  .compact-form {
    transform: scale(0.875);
    transform-origin: 50% 50% 0;;
  }
  .compact-form-left {
    transform: scale(0.875);
    transform-origin: left;
  }
  .compact-form-right {
    transform: scale(0.875);
    transform-origin: right;
  }
</style>
