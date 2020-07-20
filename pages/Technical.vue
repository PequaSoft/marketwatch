<template>
  <div class="dashboard ">
      <div align="center">
        <v-layout class="my-1" justify-center>
            <h1 class="subheading grey--text text-center ">Technical</h1>
        </v-layout>        
      <v-layout row wrap justify-center>
        <v-flex>
                <v-card flat class="mx-auto" height="400" >
            <v-card-text>
              <p>
                Select stock symbol and function.
              </p>
            </v-card-text>
              <v-flex xs8 md8 lg3 class="my-1">
                <v-combobox :items="xTech" label="Function" dense outlined style="height: 65px;" v-model="sFunction"></v-combobox>
              </v-flex>
              <v-flex xs8 md8 lg3 class="my-1">
                <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="sSearchSelect" persistent max-width="470px">
                  <template v-slot:activator="{ on }">
                    <v-text-field :items="items" label="Stock Symbol" dense outlined style="height: 65px;" v-model="sSearchSelect" readonly v-on="on"></v-text-field>
                  </template>
                  <v-card>
                    <v-layout justify-center>
                      <v-card-title>Select From Stock Symbol</v-card-title>
                    </v-layout>
                    <v-divider></v-divider>
                    <div style="padding: 15px;">
                      <v-layout row wrap style="height: 65px; width: 450px;" pl-3 justify-center>
                        <v-text-field label="..." dense outlined style="height: 65px;" v-model="sSearch"></v-text-field>     
                        <v-btn text color="primary" @click="axiosLoadSearch">Search</v-btn>
                      </v-layout>
                       <div style="padding: 5px; height: 300px; text-align: left; overflow-y: scroll;">               
                        <v-layout row wrap style="width: 330px;" >
                         <v-list dense>
                          <v-subheader>Companies</v-subheader>
                            <v-list-item-group v-model="searchResults" color="primary">
                              <v-list-item v-for="(item, i) in searchResults" :key="i">
                                <v-list-item-content>
                                  <v-list-item-title v-text="item" v-model="sSearchSelect" @click="$refs.dialog2.save(item)"></v-list-item-title>
                                </v-list-item-content>
                              </v-list-item>
                            </v-list-item-group>
                          </v-list>
                        </v-layout>                                            
                       </div >
                    </div>
                    <v-divider></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn hidden text color="primary" @click="$refs.dialog2.save(sSearchSelect)">OK</v-btn>
                    <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
                  </v-card>
                </v-dialog>

              </v-flex>

              <v-flex xs8 md8 lg3 class="my-1">
                <v-combobox :items="interval" label="Interval" dense outlined style="height: 65px;" v-model="sInterval"></v-combobox>
              </v-flex>
              <v-flex xs8 md8 lg3 class="my-1">
                <v-combobox :items="seriestype" label="Series Type" dense outlined style="height: 65px;" v-model="sSeriesType"></v-combobox>
              </v-flex>
              <v-flex xs8 md8 lg6 class="my-1">
              <v-dialog ref="dialog3" v-model="modal3" persistent max-width="960px">
              <template v-slot:activator="{ on }">
                <v-layout row wrap pl-3 pr-3 justify-center>
                  <v-flex xs11 md4 lg6 class="my-1">
                    <v-btn md1 outlined block class="primary white--text" style="width: 80%; padding-top: 5px; " @click="getTechnical" v-on="on">Submit</v-btn>
                  </v-flex>
                </v-layout>  
              </template>
              <v-card>
                <div style="background-color:#000080">
                  <v-layout justify-center>
                    <v-card-title>
                      <h4 style="color:white;">Function: {{ sFunctionSelect }} for Symbol: {{ sSymbol }} (Interval: {{ sInterval }} Series Type: {{ sSeriesType }})</h4>
                    </v-card-title>
                  </v-layout>
                </div>
                <v-divider></v-divider>
                <v-flex class="hidden-md-and-down">
                  <div style="padding: 5px; width: 920px; height: 540px;">
                    <v-tabs v-model="startupTab">
                      <v-tab @click="showChart(1)">Summary</v-tab>
                      <v-tab @click="showChart(2)">Time Series</v-tab>
                      <v-tab @click="showChart(2)">Price Chart</v-tab>
                    <v-tab-item>
                      <v-card flat height="400">
                      <v-flex xs9 md9 lg9 class="my-1">
                      <v-data-table id="myDataTable_1" :headers="headers" :items="results" hide-default-footer dense class="elevation-1 fixed-header"></v-data-table> 
                      </v-flex>              
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card flat height="400">
                        <v-data-table id="myDataTable_2" :headers="tsheaders" :items="ts_results" :items-per-page="12" dense class="elevation-1 fixed-header"></v-data-table>
                        <v-data-table id="myDataTable_3" :headers="tsheaders" :items="ts_results" :items-per-page="-1" hidden dense class="elevation-1 fixed-header"></v-data-table>
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>  
                      <v-layout row wrap pt-2 justify-center>
                        <v-flex xs3 md3 lg3 pl-2 pr-2>
                          <v-text-field id="text1" label="Start Period" dense outlined :rules="nonblankRules" v-on:input="loadCharts" v-model="chartBeg"></v-text-field>
                        </v-flex>
                        <v-flex xs3 md3 lg3 pl-2 pr-2>
                        <v-text-field id="text1" label="End Period" dense outlined :rules="nonblankRules" v-on:input="loadCharts" v-model="chartEnd"></v-text-field>
                        </v-flex>
                      </v-layout>  
                      <v-layout row wrap justify-center>
                        <v-flex xs8 md6 lg10 >
                          <canvas v-if="chartShow = 1" id="mix4" count="1"></canvas>
                          <chartjs-line v-if="chartShow = 1" target="mix4" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(180,180,180) :data="ts_value" :datalabel="labelValue" :labels="ts_labels"/>
                        </v-flex>
                      </v-layout>
                    </v-tab-item>  
                    </v-tabs >                   
                  </div>
                </v-flex>
                <v-divider></v-divider>
                <div style="padding: 10px;">
                  <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_1','technicaldata')">Export to Excel</v-btn>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-btn color="primary" @click="modal3 = false">Cancel</v-btn>
                </div>
              </v-card>
            </v-dialog>
              </v-flex>
          </v-card>
       
        </v-flex>
      </v-layout>
    </div>
    <v-layout row wrap justify-center>
    </v-layout>
    <loginModal v-show="isLoginVisible" @close="closeLogin" />
    <profileModal v-show="isProfileVisible" @close="closeProfile" />
    <registerModal v-show="isRegisterVisible" @close="closeRegister" />
  </div>
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

import ChartBar from "@/components/chart-bar";
import ChartDoughnut from "@/components/chart-doughnut";
import ChartLine from "@/components/chart-line";

export default {
  name: 'Modal',
  components: {
    loginModal,
    profileModal,
    registerModal,
    ChartLine
  },
  props: ["id"],
  data () {
    return {
      activeTab: `/intraday/${this.id}`,
      isLoginVisible: false,
      isProfileVisible: false,
      isRegisterVisible: false,
      isLoanPmtsVisible: false,
      modal2: false,
      itemsx: ['Per Year', 'Per Month', 'Per Quarter'],
      Calc_principal: '0',
      Calc_rate: '0.0000',
      sFunction: 'SMA-Simple Moving Average',
      sSymbol: 'IBM',
      sSearch: '...',
      sSearchSelect: '',
      sFunctionSelect: '',
      sInterval: '1min',
      sSeriesType: 'open',
      Calc_pmtsperyear: 12,
      Calc_numpmts: '0',
      Calc_pmt: '0.00',
      sYears: '0',
      sPmtsPeryear: 'Monthly',
      sPmts: '0',
      startupTab: 0,
      tabs: [
        { id: 1, name: "Task", route: `/intraday/task` },
        { id: 2, name: "Project", route: `/intraday/project` }
      ],
      functions: ['SMA', 'EMA', 'WMA', 'DEMA', 'TEMA', 'TRIMA', 'KAMA', 'MAMA', 'VWAP', 'STOCH', 'T3','CMO', 'CCI', 'MOM', 'WILLR', 'ADX', 'ADXR', 'ROC', 'ROCR', 'APO', 'PPO'],
      items: ['msft', 'ibm', 'goog'],
      seriestype: ['open', 'close', 'high', 'low'],
      interval: ['1min', '5min', '15min', '30min', '60min','daily','weekly','monthly'],
      headers: [  { text: 'Category', align: 'left', sortable: false, value: 'category',class: 'primary white--text title' },    //class: 'success--text title'
                  { text: 'Value', align: 'left', value: 'value',class: 'primary white--text title' }, ],
      tsheaders: [  { text: 'Item', align: 'left', sortable: false, value: 'item',class: 'primary white--text title' },    //class: 'success--text title'
                  { text: 'Timestamp', align: 'left', sortable: true, value: 'timestamp',class: 'primary white--text title' },
                  { text: 'Value', align: 'left', value: 'value',class: 'primary white--text title' }, ],                  
      results: [],
      searchResults: ['msft', 'ibm', 'goog'],
      ts_results: [],
      ts_labels: [],
      ts_value: [],
      modal3: false,
      componentKey: 0,
      dataLabel: "Open",
      labelValue: "Value",
      bgColor: "#81894e",
      beginZero: false,
      borderColor: "#81894e",
      currTab: 1,
      snewLoanName: '',
      chartShow: 1,
      chartBeg: 1,
      chartEnd: 10,
      nonblankRules: [v => !!v || 'The input is required']
    }
  },
  computed: mapGetters({
    xUID: 'globalData/get_uid',
    xPWD: 'globalData/get_pwd',
    xAxios: 'globalData/get_axios',
    xForex: 'globalData/get_forex',
    xTech: 'globalData/get_TechList',
    xAlphaKey: 'globalData/get_AlphaKey'
  }),
  created () {
    this.$bus.$on('HDR_LOGIN', (data) => {
      this.$bus.$emit('ACTIVATE_LOGIN', 'abc')
      //alert('Login')
      this.isLoginVisible = true
      // [1, 3, 5, 3, 1]
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
    axiosLoadTechnical () {
      var token;
      token = localStorage.getItem("token")
      const formData = new FormData()

      var sSearchSelect = this.sSearchSelect.split("-");
      // alert('Load technical - 1')
      this.sSymbol = sSearchSelect[0];
      //alert('Load technical - 2 - ' + JSON.stringify(this.sFunction.text))
      var fBuff = JSON.stringify(this.sFunction.text)
      if(fBuff == undefined){fBuff = JSON.stringify(this.sFunction)}
      // alert('Load technical - 2 - ' + fBuff)

      fBuff = this.cleanString(fBuff,92)
      fBuff = this.cleanString(fBuff,34)
      fBuff = this.cleanString(fBuff,39)
      //alert('Load technical - 3 - ' + fBuff)
      var sTechSelect = fBuff.split("-");
      // alert('Load technical - 4 - ' + sTechSelect[0])
      //alert('Load technical - 3')
      this.sFunctionSelect = sTechSelect[0];

      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("Function", this.sFunctionSelect)
      formData.append("Symbol", this.sSymbol)
      formData.append("Interval", this.sInterval)
      formData.append("SeriesType", this.sSeriesType)
      formData.append("alphakey", this.xAlphaKey)

       this.Results = [];
      /* 
      while (this.results.length) {
          this.results.pop();
        }
      */

      //alert('Load technical - ' + this.sFunctionSelect + ' - '  + this.sSymbol  + ' - ' + this.sInterval  + ' - ' + this.sSeriesType)

      (async () => {  
      axios.post(this.xAxios + 'xTechnical', formData).then((res) => {
        // alert('return forex')
        var result = JSON.stringify(res)
        // alert('intraday: ' + result)
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
        // ChartLine.changeData(5)
        this.results = [];
        this.ts_results = [];
        
        this.chartShow = 0
        this.beginZero = true

        result = result.replace("{data:{status:true,rows:{Meta Data:{","")
        result = result.replace("}}}","")
        result = result.replace(",2","|2")
        result = result.replace(",3","|3")
        result = result.replace(",4","|4")
        result = result.replace(",5","|5")
        result = result.replace(",5.1","|5.1")
        result = result.replace(",5.2","|5.2")
        result = result.replace(",5.3","|5.3")
        result = result.replace(",5.4","|5.4")
        result = result.replace(",5.5","|5.5")
        result = result.replace(",6","|6")
        result = result.replace(",7","|7")
        result = result.replace(",8","|8")
        result = result.replace(",9","|9")

        var buff = result.split("},")
        var b
        var sSubBuff
        var updateBuffpt1
        var updateBuffpt2
        var sValue
        var sCategory

        var metabuff = buff[0].split("|")
        // alert('metabuff count: ' + metabuff.length)
        if(metabuff.length < 4){
          Swal.fire({
            title: '<font face="verdana" color="red">Invalid Request</font>',
            html: '<font face="verdana" color="black">Invalid request</font>',
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
          return;
        }

        // alert('technical: ' + buff[1])
  
        sSubBuff = metabuff[0].split(":")
        sCategory = sSubBuff[1]
        sValue = sSubBuff[2]
        this.results.push({category: sCategory , value: sValue})

        sSubBuff = metabuff[1].split(":")
        sCategory = sSubBuff[1]
        sValue = sSubBuff[2]
        this.results.push({category: sCategory , value: sValue})

        updateBuffpt1=metabuff[2]
        updateBuffpt1=metabuff[2].substring(18,28)
        updateBuffpt2=metabuff[2].substring(29)
        sSubBuff = metabuff[2].split(":")
        sCategory = sSubBuff[1]
        b = this.sInterval.includes("min", 1);
        if(b == true){sValue = updateBuffpt1 + ' ' + updateBuffpt2}
        if(b != true){sValue = sSubBuff[2]}
        this.results.push({category: sCategory , value: sValue})

        sSubBuff = metabuff[3].split(":")
        sCategory = sSubBuff[1]
        sValue = sSubBuff[2]
        this.results.push({category: sCategory , value: sValue})
        
        //alert('decode 1')
        if(metabuff.length > 4){
        b = this.sInterval.includes("min", 1);
        updateBuffpt1=metabuff[4]
        updateBuffpt2=""
        if(b == true){
          //alert('abc: ' + metabuff[4])
          
          sSubBuff = metabuff[4].split(":")
          sCategory = sSubBuff[1]
          sValue = sSubBuff[2]

          }
        if(b != true && this.sInterval == 'Daily'){
          updateBuffpt1=metabuff[4].substring(18,28)
          updateBuffpt2=metabuff[4].substring(29)
          sValue = updateBuffpt1 + ' ' + updateBuffpt2
          }
        if(b != true && this.sInterval == 'Weekly'){
          //alert('abc: ' + metabuff[4])
          sSubBuff = metabuff[4].split(":")
          sCategory = sSubBuff[1]
          sValue = sSubBuff[2]
          }  
        if(b != true && this.sInterval == 'Monthly'){
          //alert('abc: ' + metabuff[4])
          sSubBuff = metabuff[4].split(":")
          sCategory = sSubBuff[1]
          sValue = sSubBuff[2]
          }            

        sSubBuff = metabuff[4].split(":")
        sCategory = sSubBuff[1]
        
        // if(b == true){sValue = updateBuffpt1 + ' ' + updateBuffpt2}
        // if(b != true){sValue = sSubBuff[1]}
        this.results.push({category: sCategory , value: sValue})
        }
        //alert('decode 2')
        //str.includes
        if(metabuff.length > 5){
          sSubBuff = metabuff[5].split(":")
          sCategory = sSubBuff[1]
          sValue = sSubBuff[2]
          this.results.push({category: sCategory , value: sValue})
        }
        if(metabuff.length > 6){
          // alert('metabuff: ' + metabuff[6])
          sSubBuff = metabuff[6].split(":")
          sCategory = sSubBuff[1]
          sValue = sSubBuff[2]
          this.results.push({category: sCategory , value: sValue})
        }

        if(metabuff.length > 7){
          sSubBuff = metabuff[7].split(":")
          sCategory = sSubBuff[1]
          sValue = sSubBuff[2]
          this.results.push({category: sCategory , value: sValue})
        }

        if(metabuff.length > 8){
          sSubBuff = metabuff[8].split(":")
          sCategory = sSubBuff[1]
          sValue = sSubBuff[2]
          this.results.push({category: sCategory , value: sValue})
        }

        if(metabuff.length > 9){
          sSubBuff = metabuff[9].split(":")
          sCategory = sSubBuff[1]
          sValue = sSubBuff[2]
          this.results.push({category: sCategory , value: sValue})
        }
        //alert('decode 3')
        var testlength = buff.length
        var arraylength = buff.length
        //var maxrows = arraylength - 5
        var sFuncStub = "Technical Analysis: " +  this.sFunctionSelect;   //+ ":"
        var sBuff
        var maxrows = 1
        var iStoch = 0
        
        if(this.sFunctionSelect == 'STOCH'){iStoch = 1;}

        for (let i = 1; i < testlength; i++) {
          
          //if( i == 1){alert("first-" + buff[i]);}
          buff[i] = buff[i].replace(sFuncStub,"");
          sBuff = buff[i]
          if( i == 1){sBuff = buff[i].substring(2);}
          var dOpen = this.getTokenValue(sBuff,this.sFunctionSelect,'0');
          if(iStoch == 1){var dOpen = this.getTokenValue(sBuff,'SlowK','0');}
          // if( i == 1){alert("first-" + dOpen);}
          if(dOpen != undefined){
            maxrows++;
          }
        }

        var ptr = maxrows - 1
        this.chartBeg = maxrows-10
        this.chartEnd = maxrows-1

        for (let i = 1; i < arraylength; i++) {
          if(maxrows == i+1){console.log('Last One!');this.loadCharts ();}  

          buff[i] = buff[i].replace(sFuncStub,"")
          buff[i] = buff[i].replace("|",",")
          
          sBuff = buff[i]
          if( i == 1){sBuff = buff[i].substring(2);}

          var xbuff = sBuff.split(":{")
          var ybuff = xbuff[1].split(",")
          var dValue = this.getTokenValue(xbuff[1],this.sFunctionSelect,'0');
          if(iStoch == 1){
            var dSlowK = this.getTokenValue(sBuff,'SlowK','0');
            var dSlowD = this.getTokenValue(sBuff,'SlowD','0');
          }

          if (maxrows > i){
            if(iStoch == 0){this.ts_results.push({item: maxrows - i, timestamp: xbuff[0] , value: dValue});}
            if(iStoch == 1){this.ts_results.push({item: maxrows - i, timestamp: xbuff[0] , value: dSlowK});}

            ptr = (maxrows - i)-1
          }
        }

        // alert('force update')
        //this.$forceUpdate();
        
      })
      })();
      // setTimeout(() => { this.loadCharts (); }, 2000);   
      //this.loadCharts ();
      this.componentKey = 1;  
      this.$bus.$emit('UPDATE_LINECHART_LABELS', this.ts_labels)
      this.$bus.$emit('UPDATE_LINECHART_DATA', this.ts_value)
      
    },
    axiosLoadSearch () {
      const formData = new FormData()

      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("Search", this.sSearch)
      formData.append("alphakey", this.xAlphaKey)

      this.searchResults = [];

      var n = true
      if(this.sSearch == '...'){n = false;}
      if(this.sSearch.length == 0){n = false;}

        if(n != true){
           Swal.fire({
            title: '<font face="verdana" color="red">Invalid Request</font>',
            html: '<font face="verdana" color="black">Invalid request. Enter a string to search on.</font>',
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
          return;
        }

      (async () => {  
        axios.post(this.xAxios + 'xsearch', formData).then((res) => {

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

        result = JSON.stringify(res.data)
        
        result = this.cleanString(result,92)
        result = this.cleanString(result,34)
        result = this.cleanString(result,39)

        var sBbuff = result.split("{")
        var arraylength = sBbuff.length
        var ptr = 0;

        for (let i = 3; i < arraylength; i++) {
          var xBbuff = sBbuff[i].split(",")
          var sSearchItem = xBbuff[0].substring(10) +'-' + xBbuff[1].substring(8)
          this.searchResults.push(sSearchItem)
      
          ptr++;
        }
       
      })
      })();
      
    },
    getTokenValue (parSource, parToken, parNone) {
      if(parSource.includes(parToken) == false ){
        // alert('no Token:' + parToken)
        return;
      }
      var n = parSource.indexOf(parToken)
      var m = parToken.length+1
      var buff = parSource.substring(n+m)
      var ans = ''
      var arraylength = buff.length  // - (n+m)
      var i
      // if(parToken == 'low'){alert('found Token: ' + arraylength + ' : ' + buff)}
      for (let i = 0; i < arraylength; i++) {
        if(buff[i] ==  String.fromCharCode(44) ) {return ans;}
        if(buff[i] ==  String.fromCharCode(124) ) {return ans;}
        ans = ans + buff[i]
      }
      // alert('found Token: ' + ans)
      return ans;      
    },
    getTechnical () {
      // this.$forceUpdate();      
      this.axiosLoadTechnical()
      this.$forceUpdate();      
    },
    loadCharts () {
      var arraylength = this.ts_results.length
      var iBeg
      var iEnd
      var iPtr=0
      var i = 0

      //alert('Boo!')
      iBeg = this.chartBeg
      iEnd = this.chartEnd
      // alert('Beg-' + iBeg + 'End-' + iEnd)
      if(iBeg == undefined){return;}
      if(iEnd == undefined){return;}
      if(iBeg < 1){iBeg = 1;}
      if(iEnd < 1){iEnd = arraylength;}
      if(iEnd > arraylength){iEnd = arraylength+1;}
      if(iBeg > iEnd){iBeg = iEnd;}

      var iCheck = this.ts_results.length   //this.ts_labels.length

      if(iCheck == undefined){return;}
      if(iCheck == 0){return;}

      var iGetPtr = (iCheck-iBeg)+1
      
      while (this.ts_labels.length) {
          this.ts_labels.pop();
          this.ts_value.pop();
          
        }
      //alert('Beg-' + iBeg + 'End-' + iEnd + 'GetPtr-' + iGetPtr)  
      //alert('Beg-' + this.chartBeg + 'End-' + this.chartEnd + 'End-' + iGetPtr)

      for (i = iBeg; i < iEnd+1; i++) {
        this.ts_labels[iPtr] = i
        this.ts_value[iPtr] = this.ts_results[iGetPtr].value
        
        if(i >= iEnd){return;}
        iGetPtr--;
        iPtr++;
      }  
    
    },    
    showChart (parTab) {
      this.currTab = parTab
      this.chartShow = 1
      this.beginZero = false
      this.ts_value[0] = this.ts_results[0].value
      this.ts_value[1] = this.ts_results[1].value
    },
    exportTableToExcel(tableID, filename = ''){
      var downloadLink;
      var dataType = 'application/vnd.ms-excel';
      var tableSelect = document.getElementById(tableID);
      if (this.currTab > 1){tableSelect = document.getElementById('myDataTable_3');}
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
      this.$bus.$emit('UPDATE_PROFILE', 'guest', 'guest', 'guest@guest.com', 'Demo')
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
    }
  }
}

</script>
