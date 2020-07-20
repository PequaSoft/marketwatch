<script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
<script src="sweetalert2.all.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
<script src="sweetalert2.min.js"></script>
<script>

// import { bus } from '../main'
// import { bus } from '../main';
import Swal from 'sweetalert2'
import numeral from 'numeral'
import axios from 'axios'
import { mapGetters } from 'vuex'
//import modal from '../Modals/LoanPmts.vue'

export default {
  name: 'modal',
  data () {
    return {
      sLoanName: '',
      StartDate: '',
      dlgStartDate: '',
      balance: '',
      rate: '',
      RatePeriodicity: '',
      Periodicity: '',
      numpmts: '',
      payment: '',
      Method: '',
      snewLoanStatus: 0,
      nonblankRules: [v => !!v || "The input is required"],
      modaldate: false,
      modal2: false,
      calcmethods: ['Constant Payment', 'Constant Amortization', 'Interest Only', 'Bullet Payment'],
      sYears: '0',
      sPmtsPeryear: 'Monthly',
      sPmts: '0',
      items: ['Annual', 'Monthly', 'Quarterly'],
      isModalVisible: false
    }
  },
   computed: mapGetters({
    xUID: 'globalData/get_uid',
    xAxios: 'globalData/get_axios'
  }),
  components: {
      //modal,
      numeral
  },
  methods: {
    close () {
      this.$root.$emit('clickedSomething', this.sUID)
      // this.sendMessage();
      // alert('close This: '+ this.sUID + '-' + this.sPWD);
      this.$emit('close')
    },
    close3 () {
      var buff = this.balance.replace(/,/g,"")
      // alert(buff)
      var FullLoan = this.sLoanName + '|' + this.StartDate + '|' +  this.dlgStartDate + '|' + this.Method + '|' + this.Periodicity
      FullLoan = FullLoan + '|' + this.RatePeriodicity + '|' + buff + '|' + this.rate + '|' + this.numpmts + '|' + this.payment

      var zzz = { loanid: this.sLoanName , StartDate: this.StartDate, dtStart: this.dlgStartDate, Method: this.Method, Periodicity: this.Periodicity, RatePeriodicity: this.RatePeriodicity, balance: buff, rate: this.rate, numpmts: this.numpmts, payment: this.payment}
      this.$store.commit('globalData/delete', this.sLoanName)
      this.$store.commit('globalData/add', zzz)

      this.axiosUpdateLoan()
      this.$emit('close')
      //alert(this.xUID + '-'+ FullLoan)
    },
    close2 () {
      var loan
      var srcLoan
      var buff
      var arrayLength = this.$store.state.store_loans.length;

      for (var i = 0; i < arrayLength; i++) {
        //alert(this.snewLoanName);
        loan = this.$store.state.store_loans[i]

        if(this.sLoanName === loan.loanid){
            buff = this.balance.replace(/,/g,"")
            // alert(this.sLoanName + '-' + numeral(buff));
            loan.loanid = this.sLoanName
            loan.balance = numeral(buff)
            loan.StartDate = this.StartDate
            loan.rate = this.rate
            loan.RatePeriodicity = this.RatePeriodicity
            //this.Periodicity = this.sPmtsPeryear
            loan.Periodicity = this.Periodicity
            loan.numpmts = this.numpmts
            loan.payment = this.payment
            loan.Method = this.Method
            // alert(this.sLoanName + '-' + loan.balance);
            //this.sendMessage()
            this.axiosUpdateLoan()
            this.$emit('close')
        }

        console.log(loan.loanid);
      // Do something
      }
    },
    axiosUpdateLoan () {
      // alert("UpdateLoan!");
      var buff = this.balance.replace(/,/g,"")
      var value = numeral(buff)
      var buff2 = JSON.stringify(value)

      const formData = new FormData()
      formData.append('user', JSON.stringify(this.xUID))
      formData.append('loanid', JSON.stringify(this.sLoanName))
      formData.append('StartDate', JSON.stringify(this.StartDate))
      formData.append('balance', JSON.stringify(buff))
      formData.append('rate', JSON.stringify(this.rate))
      formData.append('RatePeriodicity', JSON.stringify(this.RatePeriodicity))
      formData.append('Periodicity', JSON.stringify(this.Periodicity))
      formData.append('numpmts', JSON.stringify(this.numpmts))
      formData.append('payment', JSON.stringify(this.payment))
      formData.append('Method', JSON.stringify(this.Method))

      axios.post(this.xAxios + 'loanupdate', formData).then(res => {
        var result = JSON.stringify(res.data.rows)
        console.log(result)
      })

    },
    editData () {
      var mult=12;
      // alert('edit data-' + this.sPmtsPeryear);
      if (this.sPmtsPeryear === "Monthly") {mult = 12 }
      if (this.sPmtsPeryear === "Quarterly") {mult = 4 }
      if (this.sPmtsPeryear === "Annual") {mult = 1 }

      this.sPmts = this.sYears * mult
    },
    editData2 () {
        var mult=12
        //alert('edit data-' + this.sPmtsPeryear);
        if (this.Periodicity === "Monthly"){ mult=12 }
        if (this.Periodicity === "Quarterly"){ mult=4 }
        if (this.Periodicity === "Annual"){ mult=1 }

        this.numpmts = this.sYears * mult
        this.sPmts = this.sYears * mult
        this.sPmtsPeryear = this.Periodicity
      }
  },
  mounted () {
    //alert('Copy loan-'+ this.$store.state.store_srcLoan);
    // alert('mounted');
    this.ssrcLoanName = this.$store.state.store_srcLoan
  },
  created () {
      this.$bus.$on('ACTIVATE_EDITLOAN', (data) => {
        var res = data.split('|')
        this.sLoanName = res[0]
        this.StartDate = res[1]
        this.dlgStartDate = res[1]
        this.Method = res[3]
        this.Periodicity = res[4]
        this.sPmtsPeryear = res[4]
        this.RatePeriodicity = res[5]
        var buff = numeral(res[6]).format('0,0.00');
        this.balance = buff
        buff = numeral(res[7]).format('0,0.0000');
        this.rate = buff
        this.numpmts = res[8]
        this.payment = res[9]

        this.sPmts = res[8]
        this.sPmtsPeryear = res[4]

        if(this.sPmtsPeryear === 'Monthly'){ this.sYears = this.sPmts / 12 }
        if(this.sPmtsPeryear === 'Quarterly'){ this.sYears = this.sPmts / 4 }
        if(this.sPmtsPeryear === 'Annual'){ this.sYears = this.sPmts }
      })
    }
}

</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" style="height: 580px; width: 450px;" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header id="modal-header" class="modal-header blue darken-4">
          <h2 id="myModalLabel" style="color:lightblue; font-family:verdana;">Edit Loan</h2>
          <button type="button" style="font-size: 24px;" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
        </header>        <section class="modal-body" style="height: 450px; width: 425px;" id="modalDescription">
          <slot name="body">
            <v-layout row wrap>
              <v-flex xs11 md12 pl-3 class="mx-auto">
                <v-text-field id="text_src" readonly label="Loan Name" class="compact-form" outlined style="height: 60px;" :rules='nonblankRules' v-model="sLoanName"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap justify-center>
              <v-flex xs11 md12 pl-3 justify-center>
                <v-dialog ref="dialogdate" v-model="modaldate" :return-value.sync="StartDate" persistent width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="StartDate" class="compact-form" style="height: 60px;" outlined label="Start Date" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="dlgStartDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="$refs.dialogdate.save(dlgStartDate)">OK</v-btn>
                    <v-btn text color="primary" @click="modaldate = false">Cancel</v-btn>
                  </v-date-picker>
                </v-dialog>
                <v-text-field label="Balance" outlined class="compact-form" style="height: 60px;" :rules="nonblankRules" v-model="balance"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap style="height: 60px;" pl-3 justify-center>
              <v-flex xs6 md6 justify-center>
                <v-text-field label="Rate" outlined class="compact-form-right" style="height: 60px;" v-model="rate"></v-text-field>
              </v-flex>
              <v-flex xs5 md6 justify-center>
                <v-select :items="items" label="Rate Periodicity" outlined class="compact-form-left" style="height: 60px;" v-model="RatePeriodicity"></v-select>
              </v-flex>
            </v-layout>
            <v-layout row wrap justify-center>
              <v-flex xs11 md12 pl-3 justify-center>
                <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="numpmts" persistent max-width="270px">
                  <template v-slot:activator="{ on }">
                    <v-layout row wrap style="height: 60px;" pl-3 pr-3 justify-center>
                      <v-flex xs7 md6 justify-center>
                        <v-text-field v-model="numpmts" class="compact-form-right" style="height: 60px;" outlined label="Number of Payments" readonly v-on="on"></v-text-field>
                      </v-flex>
                      <v-flex xs5 md6 justify-center>
                        <v-select :items="items" label="Payments per Year" outlined class="compact-form-left" style="height: 60px;" @:input="editData2" v-model="Periodicity"></v-select>
                      </v-flex>
                    </v-layout>
                  </template>
                  <v-card>
                    <v-layout justify-center>
                      <v-card-title>Number of Payments</v-card-title>
                    </v-layout>
                    <v-divider></v-divider>
                    <div>
                      <v-layout row wrap style="height: 55px; width: 250px;" pl-3 justify-center>
                        <v-text-field id="text1" label="Number of Years" class="compact-form" outlined style="height: 55px;" v-on:input="editData" v-model="sYears"></v-text-field>
                      </v-layout>
                      <v-layout row wrap style="height: 55px; width: 250px;" pl-3 justify-center>
                        <v-select :items="items" label="Payments per Year" class="compact-form" outlined style="height: 55px; width: 250px;" @change="editData" v-model="sPmtsPeryear"></v-select>
                      </v-layout>
                      <v-layout row wrap style="height: 55px; width: 250px;" pl-3 justify-center>
                        <v-text-field id="text3" label="Number of Payments" class="compact-form" outlined style="height: 55px; width: 250px;" v-model="sPmts"></v-text-field>
                      </v-layout>
                    </div>
                    <v-divider></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="$refs.dialog2.save(sPmts)">OK</v-btn>
                    <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
            <v-layout row wrap justify-center>
              <v-flex xs11 md12 pl-3 justify-center>
                <v-text-field label="Payment" outlined class="compact-form" style="height: 60px;" v-model="payment"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap justify-center>
              <v-flex xs11 md12 pl-3 justify-center>
                <v-select :items="calcmethods" label="Method" outlined class="compact-form" style="height: 60px;" v-model="Method"></v-select>
              </v-flex>
            </v-layout>
          </slot>
        </section>
        <footer class="modal-footer" style="height: 60px;">
          <slot name="footer">
            <v-btn color="primary" style="width: 120px;" @click="close3">Submit</v-btn>
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
    width: 400px;
    height: 500x;
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
    padding: 10px;
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
