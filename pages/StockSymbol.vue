<template>
  <div class="dashboard ">
      <div align="center">
        <v-layout class="my-1" justify-center>
          <h1 class="subheading grey--text text-center ">Stocks</h1>
        </v-layout>        
      <v-layout row wrap justify-center>
        <v-flex>
                <v-card flat class="mx-auto" height="400" >
            <v-card-text>
              <p>
                Select stock symbol and interval.
              </p>
            </v-card-text>
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
                        <v-text-field label="enter company name..." dense outlined style="height: 65px;" v-model="sSearch"></v-text-field>     
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

              <v-flex xs8 md8 lg6 class="my-1">
              <v-dialog ref="dialog3" v-model="modal3" persistent max-width="1160px">
              <template v-slot:activator="{ on }">
                <v-layout row wrap pl-3 pr-3 justify-center>
                  <v-flex xs11 md4 lg6 class="my-1">
                    <v-btn md1 outlined block class="primary white--text" style="width: 80%; padding-top: 5px; " @click="getIntraDay" v-on="on">Submit</v-btn>
                  </v-flex>
                </v-layout>  
              </template>
              <v-card>
                <div style="background-color:#000080">
                  <v-layout justify-center>
                    <v-card-title>
                      <h4 style="color:white;">Symbol: {{ sSearchSelect }} - Interval: {{ sInterval }}</h4>
                    </v-card-title>
                  </v-layout>
                </div>
                <v-divider></v-divider>
                <v-flex class="hidden-md-and-down" justify-center>
                  <div style="padding: 20px; width: 1160px; height: 580px;">
                    <v-tabs v-model="startupTab">
                      <v-tab @click="showChart(1)">Summary</v-tab>
                      <v-tab @click="showChart(2)">Time Series</v-tab>
                      <v-tab @click="showChart(3)"> Open/Close Chart</v-tab>
                      <v-tab @click="showChart(4)">High/Low Chart</v-tab>
                      <v-tab @click="showChart(5)">Volume</v-tab>
                    <v-tab-item>
                      <v-card flat height="400">
                      <v-flex xs9 md9 lg9 pt-2 class="my-1">
                      <v-data-table id="myDataTable_1" :headers="headers" :items="results" hide-default-footer dense class="elevation-1 fixed-header"></v-data-table> 
                      </v-flex>              
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card flat height="400">
                        <v-flex pt-2 class="my-1">
                          <v-data-table id="myDataTable_2" :headers="tsheaders" :items="ts_results" dense class="elevation-1 fixed-header"></v-data-table>
                          <v-data-table id="myDataTable_3" :headers="tsheaders" :items="ts_results" hidden dense :items-per-page="-1" class="elevation-1 fixed-header"></v-data-table>
                        </v-flex>              
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
                        <v-flex xs8 md6 lg9 >
                          <canvas v-if="chartShow = 1" id="mix4" count="3"></canvas>
                          <chartjs-line v-if="chartShow = 1" target="mix4" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(180,180,180) :data="ts_open" :datalabel="labelOpen" :labels="ts_labels"/>
                          <chartjs-line target="mix4" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(20,180,150) :data="ts_close" :datalabel="labelClose" :labels="ts_labels"/>
                          <chartjs-line target="mix4" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(10,120,150) :data="ts_adjclose" :datalabel="labelAdjClose" :labels="ts_labels"/>
                        </v-flex>
                      </v-layout>
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
                        <v-flex xs8 md6 lg9 >
                          <canvas v-if="chartShow = 1" id="mixhiLo" count="2"></canvas>
                          <chartjs-line target="mixhiLo" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(200,0,0) :data="ts_high" :datalabel="labelHigh" :labels="ts_labels"/>
                          <chartjs-line target="mixhiLo" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(0,0,200) :data="ts_low" :datalabel="labelLow" :labels="ts_labels"/>
                        </v-flex>
                      </v-layout>
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
                        <v-flex xs8 md6 lg9 >
                          <chartjs-line ref="volChart" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(120,80,150) :data="ts_volume" :datalabel="labelVolume" :labels="ts_labels"/>  
                        </v-flex>
                      </v-layout>
                    </v-tab-item>  
                    </v-tabs >                   
                  </div>
                </v-flex>
                <v-divider pb-2></v-divider>
                  <div style="padding: 10px;">
                    <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_1','loandata')">Export to Excel</v-btn>
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
     <stockModal v-show="isStockVisible" @close="closeStock" />
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
import stockModal from '@/components/Modal_Stock.vue'
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
    stockModal,
    ChartLine
  },
  props: ["id"],
  data () {
    return {
      activeTab: `/intraday/${this.id}`,
      isStockVisible: false,
      isLoginVisible: false,
      isProfileVisible: false,
      isRegisterVisible: false,
      isLoanPmtsVisible: false,
     //modal2: false,
      itemsx: ['Per Year', 'Per Month', 'Per Quarter'],
      Calc_principal: '0',
      Calc_rate: '0.0000',
      sSymbol: 'msft',
      sSearch: '',
      sSearchSelect: '',
      sInterval: '1min',
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
      items: ['msft', 'ibm', 'goog'],
      interval: ['1min', '5min', '15min', '30min', '60min','Daily','Weekly','Monthly'],
      headers: [  { text: 'Category', align: 'left', sortable: false, value: 'category',class: 'primary white--text title' },    //class: 'success--text title'
                  { text: 'Value', align: 'left', value: 'value',class: 'primary white--text title' }, ],
      tsheaders: [  { text: 'Item', align: 'left', sortable: false, value: 'item',class: 'primary white--text title' },    //class: 'success--text title'
                  { text: 'Timestamp', align: 'left', sortable: true, value: 'timestamp',class: 'primary white--text title' },
                  { text: 'Open', align: 'left', value: 'open',class: 'primary white--text title' },
                  { text: 'High', align: 'left', value: 'high',class: 'primary white--text title' },
                  { text: 'Low', align: 'left', value: 'low',class: 'primary white--text title' },
                  { text: 'Close', align: 'left', value: 'close',class: 'primary white--text title' },
                  { text: 'Adj Close', align: 'left', value: 'adj',class: 'primary white--text title' },
                  { text: 'Volume', align: 'left', value: 'volume',class: 'primary white--text title' },
                  { text: 'Dividend', align: 'left', value: 'divd',class: 'primary white--text title' }, ],                  
      results: [],
      searchResults: [],
      ts_results: [],
      ts_labels: [],
      ts_open: [],
      ts_high: [],
      ts_low: [],
      ts_close: [],
      ts_adjclose: [],
      ts_volume: [],
      modal2: false,
      modal3: false,
      componentKey: 0,
      dataLabel: "Open",
      labelOpen: "Open",
      labelHigh: "High",
      labelLow: "Low",
      labelClose: "Close",
      labelAdjClose: "Adj Close",
      labelVolume: "Volume",
      bgColor: "#81894e",
      beginZero: false,
      borderColor: "#81894e",
      currTab: 1,
      ssrcLoanName: '',
      snewLoanName: '',
      loadData: 0,
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
    xAlphaKey: 'globalData/get_AlphaKey',
  }),
  metaInfo: {
    title: "Stock Symbol",
    meta: [
      { vmid: 'og:title', property: 'og:title', content: 'Stock Symbol Page' },
      { vmid: 'og:site_name', property: 'og:site_name', content: 'Stock Symbol' },
      { vmid: 'og:type', property: 'og:type', content: 'Website'},
      { vmid: 'og:url', property: 'og:url', content: 'https://markettrackerpro.com/stocksymbol'},
      { vmid: 'og:description', property: 'og:description', content: 'This is where users can analyze stock symbol data.'},
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@pequasoft' },
      { name: 'twitter:title', content: 'Stock Symbol' },
      { name: 'twitter:description', content: 'This is where users can analyze stock symbol data.' },
      { name: 'twitter:url', content: 'https://twitter.com/PequaSoft' },
      { name: 'twitter:domain', content: 'PequaSoft' },
      { itemprop: 'name', content: 'Stock Symbol' },
      { itemprop: 'description', content: 'This is where users can analyze stock symbol data.' },
      { itemprop: 'image', content: 'https://markettrackerpro.com/stocksymbol' }
    ]
  },
  created () {
    this.$bus.$on('HDR_LOGIN', (data) => {
      // alert('Login')
      this.$bus.$emit('ACTIVATE_LOGIN', 'abc')
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
    axiosLoadIntraDay () {
      var token;
      token = localStorage.getItem("token")
      const formData = new FormData()
      var sSearchSelect = this.sSearchSelect.split("-");
      this.sSymbol = sSearchSelect[0];

      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("StockSymbol", this.sSymbol)
      formData.append("alphakey", this.xAlphaKey)
      //formData.append("StockSymbol", sSearchSelect[0])
      formData.append("Interval", this.sInterval)
      
      while (this.results.length) {
          this.results.pop();
        }

      // alert('Load intraday - ' + this.xUID + ' - '  + this.xPWD  + ' - ' + this.sSymbol)
      (async () => {  
      axios.post(this.xAxios + 'xintraday', formData).then((res) => {
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
        this.loadData = 1;
        // ChartLine.changeData(5)
        while (this.results.length) {
          this.results.pop();
        }

        while (this.ts_results.length) {
          this.ts_results.pop();
        }
        this.chartShow = 0
        // this.beginZero = true
        // alert('forex1: ' + result)
        //var abc = [11, 23,15, 28, 24]
        //this.$bus.$emit('UPDATE_LINECHART', abc)
        result = result.replace("{data:{status:true,rows:{Meta Data:{","")
        result = result.replace("}}}","")
        result = result.replace(",2","|2")
        result = result.replace(",3","|3")
        result = result.replace(",4","|4")
        result = result.replace(",5","|5")
        result = result.replace(",6","|6")
        result = result.replace(",7","|7")

        var buff = result.split("},")
        var sSubBuff
        var sValue
        var sCategory

        var metabuff = buff[0].split("|")
        // alert('intraday: ' + buff[1])
  
        sSubBuff = metabuff[0].split(":")
        sCategory = sSubBuff[0]
        sValue = sSubBuff[1]
        this.results.push({category: sCategory , value: sValue})

        sSubBuff = metabuff[1].split(":")
        sCategory = sSubBuff[0]
        sValue = sSubBuff[1]
        this.results.push({category: sCategory , value: sValue})

        sSubBuff = metabuff[2].split(":")
        sCategory = sSubBuff[0]
        if(this.sInterval.includes == 'min'){sValue = sSubBuff[1] + ':' + sSubBuff[2] + ':' + sSubBuff[3]}
        if(this.sInterval.includes != 'min')sValue = sSubBuff[1]
        this.results.push({category: sCategory , value: sValue})
        
        sSubBuff = metabuff[3].split(":")
        sCategory = sSubBuff[0]
        sValue = sSubBuff[1]
        this.results.push({category: sCategory , value: sValue})
        //alert('decode 1')
        if(metabuff.length > 4){
        sSubBuff = metabuff[4].split(":")
        sCategory = sSubBuff[0]
        sValue = sSubBuff[1]
        this.results.push({category: sCategory , value: sValue})
        }
        //alert('decode 2')
        //str.includes
        if(metabuff.length > 5){
          sSubBuff = metabuff[5].split(":")
          sCategory = sSubBuff[0]
          sValue = sSubBuff[1]
          this.results.push({category: sCategory , value: sValue})
        }
        //alert('decode 3')
        var arraylength = buff.length
        var testlength = buff.length
        // var maxrows = arraylength - 5
        var maxrows = 1
        
        for (let i = 1; i < testlength; i++) {
          var dOpen = this.getTokenValue(buff[i],'open','0');

          if(dOpen != undefined){
            maxrows++;
          }
        }
        this.chartBeg = maxrows-10
        this.chartEnd = maxrows-1
        var ptr = maxrows - 1
        // arraylength = 6
        //alert('Array Length = ' + arraylength)
        for (let i = 1; i < arraylength; i++) {
          // if(maxrows == i+1){this.loadData = 0;alert('Last One!')}  
          if(maxrows == i+1){console.log('Last One!');this.loadCharts ();}  
          if(maxrows == i+1){this.loadData = 0}  
          var tsbuff = buff[i].split("|")
          var sStub = "Time Series (" + this.sInterval + "):{"
          if(this.sInterval == 'Weekly' && i == 1){sStub ="Weekly Adjusted Time Series:{";}
          if(this.sInterval == 'Monthly' && i == 1){sStub ="Monthly Adjusted Time Series:{";}
          buff[i] = buff[i].replace(sStub,"")
          buff[i] = buff[i].replace("|",",")
          
          var xbuff = buff[i].split(":{")
          xbuff[1] = xbuff[1].replace("|",",")
          // var ybuff = xbuff[1].split(",")
          // if(this.sInterval == 'Weekly' && i == 1){alert('Weekly 1: ' + ybuff);}
          // if(this.sInterval == 'Weekly' && i == 2){alert('Weekly 2: ' + ybuff);}
          // alert('intraday: ' + xbuff[0] + ' - ' + ybuff[0] + ' - ' + ybuff[1] + ' - ' + ybuff[2] + ' - ' + ybuff[3])
          var dLow = this.getTokenValue(xbuff[1],'low','0');
          var dOpen = this.getTokenValue(xbuff[1],'open','0');
          var dHigh = this.getTokenValue(xbuff[1],'high','0');
          var dClose = this.getTokenValue(xbuff[1],'close','0');
          var dAdjClose = this.getTokenValue(xbuff[1],'adjusted close','0');
          var dVolume = numeral(this.getTokenValue(xbuff[1],'volume','0')).format('0,0');
          var dDivd = this.getTokenValue(xbuff[1],'dividend amount','0');
          
          if (maxrows > i){
            this.ts_results.push({item: maxrows - i, timestamp: xbuff[0] , open: dOpen , high: dHigh, low: dLow, close: dClose, adj: dAdjClose, volume: dVolume, divd: dDivd})         
            ptr = (maxrows - i)-1
          }
        }
       
      })
      })();
      // alert('force update')
      // setTimeout(() => { this.loadCharts (); }, 2000);   
      //this.loadCharts ();
      this.componentKey = 1;  
      this.$bus.$emit('UPDATE_LINECHART_LABELS', this.ts_labels)
      this.$bus.$emit('UPDATE_LINECHART_DATA', this.ts_open)
      // this.beginZero = false
      // alert('force update-' + this.componentKey)
      //this.$forceUpdate();
      //alert('force update-2')
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

      // alert('search 2')
      (async () => {  
      // alert('search 3')  
      axios.post(this.xAxios + 'xsearch', formData).then((res) => {
        // alert('return forex')
        // alert('search 3')
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
        /*
        while (this.searchResults.length) {
          this.searchResults.pop();
        }
        */

        for (let i = 3; i < arraylength; i++) {
          var xBbuff = sBbuff[i].split(",")
          var sSearchItem = xBbuff[0].substring(10) +'-' + xBbuff[1].substring(8)
          this.searchResults.push(sSearchItem)
         
          ptr++;
        }
        this.loadData = 1;
        // ChartLine.changeData(5)
              
       
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
    pollDOM () {
      setTimeout(this.pollDOM, 5000); 
      if (this.loadData == 0) {
        setTimeout(this.pollDOM, 5000); 
        // alert('load complete')
        // Do something with el
      } else {
      setTimeout(this.pollDOM, 5000); // try again in 300 milliseconds
  }
    },
    getIntraDay () {
      // this.$forceUpdate();    
      this.loadData = 1  
      this.axiosLoadIntraDay();
      // this.pollDOM();
      // this.$forceUpdate();  
      // setTimeout(() => {console.log('Load Modal!'); this.isStockVisible = true ; }, 2000);   
      
    },
    loadCharts () {
      var arraylength = this.ts_results.length
      var iBeg
      var iEnd
      var iPtr=0
      var i = 0

      //alert('Boo!')
      console.log('Load Charts!');
      iBeg = this.chartBeg
      iEnd = this.chartEnd
      //alert('Beg-' + iBeg + 'End-' + iEnd)
      if(iBeg == undefined){return;}
      if(iEnd == undefined){return;}
      if(iBeg < 1){iBeg = 1;}
      if(iEnd < 1){iEnd = arraylength;}
      if(iEnd > arraylength){iEnd = arraylength+1;}
      if(iBeg > iEnd){iBeg = iEnd;}

      // alert('Beg-' + iBeg + 'End-' + iEnd)
      //iBeg = this.chartBeg
      //iEnd = this.chartEnd
      var iCheck = this.ts_results.length   //this.ts_labels.length
      //alert('Beg-' + iBeg + 'End-' + iEnd + 'Check-' + iCheck)

      if(iCheck == undefined){return;}
      if(iCheck == 0){return;}

      // alert('Beg-' + iBeg + 'End-' + iEnd + 'Check-' + iCheck)
      var iGetPtr = (iCheck-iBeg)+1
      // alert('Open-' + this.ts_results[0].open)
      // alert('Open-' + this.ts_results.open.length)
      //alert('Beg-' + iBeg + 'End-' + iEnd + 'End-' + iGetPtr)
      
      while (this.ts_labels.length) {
          this.ts_labels.pop();
          this.ts_open.pop();
          this.ts_high.pop();
          this.ts_low.pop();
          this.ts_close.pop();
          this.ts_adjclose.pop();
          this.ts_volume.pop();
        }
      //alert('Beg-' + iBeg + 'End-' + iEnd + 'Array Length-' + arraylength + 'GetPtr-' + iGetPtr)  
      //alert('Beg-' + this.chartBeg + 'End-' + this.chartEnd + 'End-' + iGetPtr)

      for (i = iBeg; i < iEnd+1; i++) {
        this.ts_labels[iPtr] = i
        this.ts_open[iPtr] = this.ts_results[iGetPtr].open
        this.ts_high[iPtr] = this.ts_results[iGetPtr].high
        this.ts_low[iPtr] = this.ts_results[iGetPtr].low
        this.ts_adjclose[iPtr] = this.ts_results[iGetPtr].adj
        this.ts_close[iPtr] = this.ts_results[iGetPtr].close
        var buff = this.ts_results[iGetPtr].volume.replace(/,/g, '')
        // alert('Buff-' + buff)  
        //if(iEnd == 94){alert('loop-' + i + 'Buff-' + buff)}
        this.ts_volume[iPtr] =  buff   //this.ts_results[i-1].volume
        if(i > iEnd){return;}
        iGetPtr--;
        iPtr++;
      }  
    
    },    
    showChart (parTab) {
      this.currTab = parTab
    },
    editData () {
        alert('hoo!')
      },
    showStock () {
      this.$bus.$emit('ACTIVATE_STOCK', 'abc')
      this.isStockVisible = true
    },
    closeStock () {
      this.isStockVisible = false
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
    },
    editDatax () {
      var xBuff = 'abc'
    },
  }
}

</script>
