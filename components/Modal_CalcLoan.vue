<script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
<script src="sweetalert2.all.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
<script src="sweetalert2.min.js"></script>

<script>
// import { bus } from '../main'
import lcalc from '@/mixins/LoanCalc'
// import { bus } from '../main';
import Swal from 'sweetalert2'
import numeral from 'numeral'
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
      dlgPeriodicity: '',
      Periodicity: '',
      dlgNumpmts: '',
      numpmts: '',
      payment: '',
      Method: '',
      snewLoanStatus: 0,
      nonblankRules: [v => !!v || "The input is required"],
      modaldate: false,
      modal2: false,
      modal3: false,
      calcmethods: ['Constant Payment', 'Constant Amortization', 'Interest Only', 'Bullet Payment'],
      sYears: '0',
      sPmtsPeryear: 'Monthly',
      sPmts: '0',
      items: ['Annual', 'Monthly', 'Quarterly'],
      isModalVisible: false,
      headers: [  { text: 'Date', align: 'left', sortable: false, width: "150px", value: 'date' },
                  { text: 'Beginning Balance', align: 'right', width: "150px", value: 'balance' },
                  { text: 'Payment', align: 'right', width: "130px", value: 'pmt' },
                  { text: 'Interest', align: 'right', width: "130px", value: 'interest' },
                  { text: 'Amortization', align: 'right', width: "130px", value: 'amort' },
                  { text: 'Ending Balance', align: 'right', width: "130px", value: 'endbal' }, ],
      results: [],
      outputSet: [],
      displaySet: []
    }
  },
  components: {
      //modal,
      numeral
  },
  methods: {
    close () {
      this.$root.$emit('clickedSomething', this.sUID)
      this.$emit('close')
    },
    editData () {
        var mult=12;
        //alert('edit data-' + this.sPmtsPeryear);
        if (this.sPmtsPeryear == "Monthly"){mult=12;}
        if (this.sPmtsPeryear == "Quarterly"){mult=4;}
        if (this.sPmtsPeryear == "Annual"){mult=1;}

        this.sPmts = this.sYears * mult;
      },
    editData2 () {
        var mult=12

        if (this.Periodicity === "Monthly"){ mult=12 }
        if (this.Periodicity === "Quarterly"){ mult=4 }
        if (this.Periodicity === "Annual"){ mult=1 }
        this.numpmts = this.sYears * mult
        this.dlgNumpmts = this.sYears * mult
        this.sPmts = this.sYears * mult
        this.sPmtsPeryear = this.Periodicity
        // alert('edit data-' + this.Periodicity + '|' + this.Periodicity + '|' + this.sYears  + '|' + this.dlgNumpmts)
      },
    doCalc() {
      var buff = this.balance.replace(/,/g,"")

      var numpmts = numeral(this.numpmts)
      var currbalance = numeral(buff)
      var rate = numeral(this.rate)
      var rateper = this.RatePeriodicity
      var pmtyear = this.Periodicity
      var method = this.Method
      buff = this.StartDate
      var startdate = new Date(buff)
      var testdate = new Date(buff)
      var Addon = 0
      // alert('calc-' + numpmts.value() + '|' + currbalance.value() + '|' + rate.value() + '|' + rateper+ '|' + pmtyear + '|' + method + '|' + startdate);
      // calcstartdate
      var d_numpmts = numeral(this.dlgNumpmts)
      buff = this.dlgStartDate
      var d_startdate = new Date(buff)
      d_startdate.setTime( d_startdate.getTime() + d_startdate.getTimezoneOffset()*60*1000 )
      testdate.setTime( testdate.getTime() + testdate.getTimezoneOffset()*60*1000 )

      var d_pmtyear = this.dlgPeriodicity   // document.getElementById("calc_pmtperyear").value

      if( JSON.stringify(testdate) === JSON.stringify(d_startdate) && numpmts.value() == d_numpmts.value() && pmtyear == d_pmtyear ){
        // alert('addon-' + testdate + '|' + d_startdate + '|' + numpmts.value() + '|' + d_numpmts.value())
        Addon = 1
      }
      lcalc.doOutputLoan(this.outputSet,numpmts.value(),currbalance.value(),rate.value(),rateper,startdate,method,pmtyear)
      this.setupOutputDisplay(this.displaySet, this.outputSet, numpmts.value(), pmtyear, startdate, d_numpmts.value()+Addon, d_pmtyear, d_startdate)
      },

      setupOutputDisplay(parOutputSet,parSourceSet,parNumPmts,parRatePer,parStartDate,dis_numpmts,dis_rateper,dis_startdate){
        var buff, mm, dd, yyyy, sDateBuff, sDisDateBuff;
        var ptr_src,end_pt;
        var openbalance,calc_pmt,pmt,int,amort,currbalance;
        buff = parStartDate   //this.StartDate
        var dtBuff

        dtBuff = new Date(buff);
        buff= dtBuff.toLocaleDateString();
        var startdate = new Date(buff);

        mm=startdate.getMonth()+1;
        dd=startdate.getDate();
        yyyy=startdate.getFullYear();

        sDateBuff=mm+'/'+dd+'/'+yyyy;

        dtBuff = new Date(dis_startdate);
        buff= dtBuff.toLocaleDateString();
        startdate = new Date(buff);
        var prevdate = new Date(buff);

        mm=startdate.getMonth()+1;
        dd=startdate.getDate();
        yyyy=startdate.getFullYear();
        sDisDateBuff=mm+'/'+dd+'/'+yyyy;

        var dtStep = 1;
        if(dis_rateper == 'Annual'){dtStep = 12;}
        if(dis_rateper == 'Quarterly'){dtStep = 3;}

        var dtCalcStep = 1;
        if(parRatePer == 'Annual'){dtCalcStep = 12;}
        if(parRatePer == 'Quarterly'){dtCalcStep = 3;}

        var dpertype='summary';
        if(dtCalcStep > dtStep){dpertype='stretch';}
        //alert('length' + parSourceSet.length);
        var currdate;
        var nextdate;
        prevdate.setMonth(prevdate.getMonth() - dtStep);

        dtBuff = new Date(dis_startdate);
        buff= dtBuff.toLocaleDateString();
        startdate = new Date(buff);

        var table = document.getElementById("myTable_1");
        var i,m
        var endsrc_pt = parSourceSet.length

        var dtype='summary'
        end_pt = dis_numpmts

        // alert('natural'+ parNumPmts + '|' + dis_numpmts + '|' + parRatePer + '|' + dis_rateper + '|' + sDateBuff + '|' + sDisDateBuff)
        if (parNumPmts === dis_numpmts && parRatePer === dis_rateper && sDateBuff === sDisDateBuff) {
          end_pt = parSourceSet.length
          dtype ='natural'
        }
        //alert(dtype);

        while (parOutputSet.length) {
          parOutputSet.pop();
        }
        while (this.results.length) {
          this.results.pop();
        }

    if(dtype == 'natural') {
      alert(dtype)
      for (i = 0; i < end_pt; i++) {
        mm = startdate.getMonth() + 1
        dd = startdate.getDate()
        yyyy = startdate.getFullYear()
        sDateBuff = mm + '/' + dd+'/' + yyyy

        buff=parSourceSet[i][0]
        currdate= new Date(buff)

        openbalance = parSourceSet[i][1]
        pmt = parSourceSet[i][2]
        int = parSourceSet[i][3]
        amort = parSourceSet[i][4]
        currbalance = parSourceSet[i][5]

        parOutputSet.push([sDateBuff,openbalance,pmt,int,amort,currbalance])

        //  { date: 'Honeycomb', balance: 408, pmt: 3.2, interest: 87, amort: 6.5, endbal: '45%'}
        this.results.push({date: sDateBuff, balance: numeral(openbalance).format('0,0.00'), pmt: numeral(pmt).format('0,0.00'), interest: numeral(int).format('0,0.00') , amort: numeral(amort).format('0,0.00'), endbal: numeral(currbalance).format('0,0.00')})
        prevdate = startdate
        startdate.setMonth(startdate.getMonth() +dtStep)
      }
    }

    openbalance=0
    pmt=0
    int=0
    amort=0
    currbalance=0
    ptr_src=0

  if(dtype == 'summary' && dpertype == 'summary') {
  // alert(dtype)
  for (i = 0; i < end_pt; i++) {
    mm = startdate.getMonth() + 1
    dd = startdate.getDate()
    yyyy = startdate.getFullYear()
    sDateBuff = mm + '/' + dd + '/' + yyyy

    // alert(ptr_src);
    if(ptr_src < endsrc_pt) {
        buff=parSourceSet[ptr_src][0]
        // alert('pre-' + buff)
        currdate= new Date(buff)
      }
      // alert('date' + '|' + currdate + '|' + startdate)
      while(currdate <= startdate && ptr_src < endsrc_pt){
        if(currdate <= startdate && currdate > prevdate){
          openbalance = parSourceSet[ptr_src][1]
          pmt = pmt + parSourceSet[ptr_src][2]
          int = int + parSourceSet[ptr_src][3]
          amort = amort + parSourceSet[ptr_src][4]
          currbalance = parSourceSet[ptr_src][5]
        }
        ptr_src=ptr_src + 1
        if(ptr_src < endsrc_pt) {buff = parSourceSet[ptr_src][0] }
        // alert('post-' + buff)
        currdate= new Date(buff)
        // alert('ptr'  + '|' + ptr_src)
      }
      // alert('step' + '|' + dtStep + '|' +startdate + '|' +startdate.getMonth());
      // alert(dtype  + '|' + currdate + '|' + ptr_src + '|' + sDateBuff + '|' + openbalance + '|' + pmt);
      parOutputSet.push([sDateBuff,openbalance,pmt,int,amort,currbalance]);
      this.results.push({date: sDateBuff, balance: numeral(openbalance).format('0,0.00'), pmt: numeral(pmt).format('0,0.00'), interest: numeral(int).format('0,0.00') , amort: numeral(amort).format('0,0.00'), endbal: numeral(currbalance).format('0,0.00')});

      openbalance = 0
      pmt = 0
      int = 0
      amort = 0
      currbalance = 0

      startdate.setMonth(startdate.getMonth() +dtStep)
      prevdate.setMonth(prevdate.getMonth() +dtStep)
    }
  }

  if(dtype === 'summary' && dpertype === 'stretch') {
  // alert('stretch')
  // alert(end_pt)
  // alert(dpertype)
  // startdate.setMonth(startdate.getMonth() +dtStep)
  for (i = 0; i < end_pt; i++) {
    mm = startdate.getMonth()+1
    dd = startdate.getDate()
    yyyy = startdate.getFullYear()
    sDateBuff = mm + '/' + dd + '/' + yyyy

    // buff=parSourceSet[ptr_src][0]
    if(ptr_src < endsrc_pt){buff = parSourceSet[ptr_src][0]}
    currdate = new Date(buff)

    while(currdate <= startdate && ptr_src < endsrc_pt) {

      if(currdate <= startdate ) {
        openbalance = parSourceSet[ptr_src][1]
        pmt = pmt + parSourceSet[ptr_src][2]
        int = int + parSourceSet[ptr_src][3]
        amort=amort + parSourceSet[ptr_src][4]
        currbalance = parSourceSet[ptr_src][5]
      }
      ptr_src=ptr_src+1
      if(ptr_src < endsrc_pt) { buff = parSourceSet[ptr_src][0] }
        currdate= new Date(buff)
    }

    parOutputSet.push([sDateBuff,openbalance,pmt,int,amort,currbalance]);
    this.results.push({date: sDateBuff, balance: numeral(openbalance).format('0,0.00'), pmt: pmt, interest:int , amort: amort, endbal: currbalance});
    // numeral(parOutputSet[i][1]).format('0,0.00')
    // openbalance=parSourceSet[ptr_src][5]
    if(ptr_src > 0 ) {openbalance = currbalance }

    pmt=0
    int=0
    amort=0

    startdate.setMonth(startdate.getMonth() +dtStep);
    prevdate.setMonth(prevdate.getMonth() +dtStep);
  }
}
// alert('display-1')
},
doOutputDisplay(parOutputSet) {
  var buff, mm, dd, yyyy, sDateBuff;
  buff = this.StartDate;

  //alert('display-'+ parOutputSet.length)
  // var startdate = new Date(buff);

  var table = document.getElementById("myTable_1")
  var i,m

  if (table == null){
    alert('null table length -' + table )
    var row = table.insertRow(1)
    }

  if (table != null){
    if(table.rows.length > 1) {
      //alert('deleting -' + table.rows.length)
      for(var i = table.rows.length-1; i > 1; i--) {
        table.deleteRow(1)
      }
    }
  //alert('table length -' + this.results.length )
  }

  for (i = 0; i < this.displaySet.length; i++) {
    //alert('display-'+ i)
    var row = table.insertRow(i+1)
    row.style.borderColor = "black"
    row.style.borderWidth = "1px"
    row.borderStyle = "solid"

    for (m = 0; m < parOutputSet[0].length; m++) {
      var cell1 = row.insertCell(m)
      if(m === 0) {cell1.classList.add("center") }
      if(m >= 1) {cell1.classList.add("right") }

      if(m === 0) {cell1.innerHTML = parOutputSet[i][0]}
      if(m === 1) {cell1.innerHTML = numeral(parOutputSet[i][1]).format('0,0.00') }
      if(m === 2) {cell1.innerHTML = numeral(parOutputSet[i][2]).format('0,0.00') }
      if(m === 3) {cell1.innerHTML = numeral(parOutputSet[i][3]).format('0,0.00') }
      if(m === 4) {cell1.innerHTML = numeral(parOutputSet[i][4]).format('0,0.00') }
      if(m === 5) {cell1.innerHTML = numeral(parOutputSet[i][5]).format('0,0.00') }
      cell1.style.width = "175px"
      }
    }
  },
  doOutputDisplay2(parOutputSet) {
  var buff, mm, dd, yyyy, sDateBuff;
  buff = this.StartDate;

  //alert('display2-'+ this.results.length)
  // var startdate = new Date(buff);

  var table = document.getElementById("myTable_1")
  var i,m

  if (table == null){alert('null table length -' + table )}
  if (table != null){alert('table length -' + this.results.length )}
  if(table.rows.length > 1) {
     //alert('deleting -' + table.rows.length)
    for(var i = table.rows.length-1; i > 1; i--) {
      table.deleteRow(1)
    }
  }

// this.results.push({date: sDateBuff, balance: numeral(openbalance).format('0,0.00'), pmt: pmt, interest:int , amort: amort, endbal: currbalance});

  for (i = 0; i < this.results.length; i++) {
    //alert('display-'+ i)
    var row = table.insertRow(i+1)
    row.style.borderColor = "black"
    row.style.borderWidth = "1px"
    row.borderStyle = "solid"

    for (m = 0; m < this.results[i].length; m++) {
      var cell1 = row.insertCell(m)
      if(m === 0) {cell1.classList.add("center") }
      if(m >= 1) {cell1.classList.add("right") }

      if(m === 0) {cell1.innerHTML = this.results[i].date }
      // if(m === 1) {cell1.innerHTML = numeral(parOutputSet[i][1]).format('0,0.00') }
      if(m === 1) {cell1.innerHTML = this.results[i].balance }
      if(m === 2) {cell1.innerHTML = this.results[i].pmt }
      if(m === 3) {cell1.innerHTML = this.results[i].interest }
      if(m === 4) {cell1.innerHTML = this.results[i].amort }
      if(m === 5) {cell1.innerHTML = this.results[i].endbal }
      cell1.style.width = "175px"
      }
    }
  },

  exportTableToExcel(tableID, filename = ''){
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename?filename+'.xls':'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob( blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
  }
},
  mounted () {
    //alert('Copy loan-'+ this.$store.state.store_srcLoan);
    // alert('mounted');
    this.ssrcLoanName = this.$store.state.store_srcLoan
    /*
    this.socket.on('xLOGIN_STATUS', (data) => {
      // alert('checking');
      // var test = data.message
      var result = JSON.stringify(data.message)
      if (result === 'true') { this.$emit('close') }
      if (result !== 'true') { alert('Invalid Login-' + result) }
    })
    */
  },
  created () {
    this.$bus.$on('ACTIVATE_CALCLOAN', (data) => {
        var res = data.split('|')
        this.sLoanName = res[0]
        this.StartDate = res[1]
        this.dlgStartDate = res[1]
        this.Method = res[3]
        this.Periodicity = res[4]
        this.sPmtsPeryear = res[4]
        this.dlgPeriodicity = res[4]
        this.RatePeriodicity = res[5]
        var buff = numeral(res[6]).format('0,0.00');
        this.balance = buff
        buff = numeral(res[7]).format('0,0.0000');
        this.rate = buff
        this.numpmts = res[8]
        this.dlgNumpmts = res[8]
        this.payment = res[9]

        this.sPmts = res[8]
        this.sPmtsPeryear = res[4]

        if(this.sPmtsPeryear === 'Monthly'){ this.sYears = this.sPmts / 12 }
        if(this.sPmtsPeryear === 'Quarterly'){ this.sYears = this.sPmts / 4 }
        if(this.sPmtsPeryear === 'Annual'){ this.sYears = this.sPmts }
      }),
      this.$bus.$on('OUTPUT_LOAN', (data) => {
        //alert('output')
        this.doOutputDisplay(this.displaySet)
      })
    }
  }

</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" style="height: 360px; width: 475px;" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header id="modal-header" class="modal-header blue darken-4">
          <h2 id="myModalLabel" style="color:lightblue; font-family:verdana;">Calculate Loan</h2>
          <button type="button" style="font-size: 24px;" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
        </header>
        <section class="modal-body" style="height: 210px; width: 450px;" id="modalDescription">
          <slot name="body">
            <v-layout row wrap justify-center>
              <v-flex xs12 md12 pl-3 justify-center>
                <v-text-field id="text_src" readonly label="Loan Name" class="compact-form" outlined style="height: 60px;" :rules="nonblankRules" v-model="sLoanName"></v-text-field>

                <v-dialog ref="dialogdate" v-model="modaldate" :return-value.sync="StartDate" persistent width="290px">
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="StartDate" style="height: 60px;" class="compact-form" outlined label="Start Date" readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="dlgStartDate" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="$refs.dialogdate.save(dlgStartDate)">OK</v-btn>
                    <v-btn text color="primary" @click="modaldate = false">Cancel</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
            </v-layout>
            <v-layout row wrap justify-center>
              <v-flex xs11 md12 pl-3 justify-center>
                <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="dlgNumpmts" persistent max-width="270px">
                  <template v-slot:activator="{ on }">
                    <v-layout row wrap pl-3 pr-3 justify-center>
                      <v-flex xs6 md6 justify-center>
                        <v-text-field v-model="dlgNumpmts" style="height: 60px;" class="compact-form-right" outlined label="Number of Periods" readonly v-on="on"></v-text-field>
                      </v-flex>
                      <v-flex xs6 md6 justify-center>
                        <v-select :items="items" label="Output" class="compact-form-left" outlined style="height: 60px;" @change="editData2" v-model="dlgPeriodicity"></v-select>
                      </v-flex>
                    </v-layout>
                  </template>
                  <v-card>
                    <v-layout justify-center>
                      <v-card-title>Output Periods</v-card-title>
                    </v-layout>
                    <v-divider></v-divider>
                    <div style="padding: 15px;">
                      <v-layout row wrap style="height: 65px; width: 250px;" pl-3 justify-center>
                        <v-text-field id="text1" label="Number of Years" outlined style="height: 65px;" v-on:input="editData" v-model="sYears"></v-text-field>
                      </v-layout>
                      <v-layout row wrap style="height: 65px; width: 250px;" pl-3 justify-center>
                        <v-select :items="items" label="Output" outlined style="height: 65px; width: 250px;" @change="editData" v-model="sPmtsPeryear"></v-select>
                      </v-layout>
                      <v-layout row wrap style="height: 65px; width: 250px;" pl-3 justify-center>
                        <v-text-field id="text3" label="Number of Periods" outlined style="height: 65px; width: 250px;" v-model="sPmts"></v-text-field>
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
          </slot>
        </section>
        <footer class="modal-footer" style="height: 80px;">
          <slot name="footer">
            <v-dialog ref="dialog3" v-model="modal3" persistent max-width="960px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" style="width: 120px;" @click="doCalc" v-on="on">OK</v-btn>
              </template>
              <v-card>
                <div style="background-color:#000080">
                  <v-layout justify-center>
                    <v-card-title><h3 style="color:white;">Calculation Output</h3></v-card-title>
                  </v-layout>
                </div>
                <v-divider></v-divider>
                <v-flex class="hidden-md-and-down">
                  <div style="padding: 5px; width: 920px; height: 540px; overflow-y: scroll;">
                    <table class="myTable_1" id="myTable_1" hidden>
                      <tr class="header">
                        <th style="width: 200px;">Date</th>
                        <th style="width: 160px;">Beginning Balance</th>
                        <th style="width: 160px;">Payment</th>
                        <th style="width: 160px;">Interest</th>
                        <th style="width: 160px;">Amortization</th>
                        <th style="width: 160px;">Ending Balance</th>
                      </tr>
                    </table>
                    <v-data-table id="myDataTable_1" :headers="headers" :items="results" dense :items-per-page="18" class="elevation-1 fixed-header"></v-data-table>
                  </div>
                </v-flex>
                <v-flex class="hidden-lg-and-up">
                  <div style="padding: 5px; width: 920px; height: 450px; overflow-y: scroll;">
                    <table class="myTable_1" id="myTable_1" hidden>
                      <tr class="header">
                        <th style="width: 150px;">Date</th>
                        <th style="width: 130px;">Beginning Balance</th>
                        <th style="width: 130px;">Payment</th>
                        <th style="width: 130px;">Interest</th>
                        <th style="width: 130px;">Amortization</th>
                        <th style="width: 130px;">Ending Balance</th>
                      </tr>
                    </table>
                    <v-data-table id="myDataTable_1" :headers="headers" :items="results" dense :items-per-page="12" class="elevation-1 fixed-header"></v-data-table>
                  </div>
                </v-flex>
                <v-divider></v-divider>
                <div style="padding: 10px;">
                  <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_1','loandata')">Export to Excel</v-btn>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-btn color="primary" @click="modal3 = false">Cancel</v-btn>
                </div>
              </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
            <v-btn color="primary" style="width: 120px;" @click="close">Cancel</v-btn>
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

#myTable_1 tr td {
height: 12px;
line-height: 0.7;
font-size: 16px;
font-family: arial;
padding: 3px 10px;
text-align: right;
}

#myTable_1 th {
background-color: #000080;
color: white;

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

.v-dialog {
    position: absolute;
    top: 0;

}
</style>
