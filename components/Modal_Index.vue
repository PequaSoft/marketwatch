
<script>
import numeral from 'numeral'
import Swal from 'sweetalert2'
import axios from 'axios'
import stockModal from '@/components/Modal_Stock.vue'
import techModal from '@/components/Modal_Technical.vue'
import forexModal from '@/components/Modal_Forex.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Register',
  components: {
    stockModal,
    techModal,
    forexModal
  },
  data () {
    return {
      status: 0,
      sUID: '',
      sPWD: '',
      sPWD2: '',
      sEMail: '',
      sTicker: '',
      sIndex: '',
      sCompound: '',
      sFromCcy: '',
      sToCcy: '',
      startupTab: '0',    
      isStockVisible: false,
      isTechVisible: false,
      isForexVisible: false,
      sFunction: 'SMA-Simple Moving Average',
      sInterval: '1min',
      interval: ['1min', '5min', '15min', '30min', '60min','Daily','Weekly','Monthly'],
      modal2: false,
      modal3: false,
      modal4: false,
      //equityType: false,
      equityType: 0,
      techType: 0,
      ccyType: 0,
      quoteType: '',
      sTimeSeries: '',
      sSeriesType: 'open',
      seriestype: ['open', 'close', 'high', 'low'],
      sTS: '',
      currTab: 0,
      sLoginStatus: 0,
      formReadonly: 0,
      formInvalid: true,
      headers: [  { text: 'Category', align: 'left', sortable: false, value: 'category',class: 'primary white--text title' },    //class: 'success--text title'
                  { text: 'Value', align: 'left', value: 'value',class: 'primary white--text title' }, ],
      ts_headers: [  { text: 'Date', align: 'left', sortable: false, value: 'date',class: 'primary white--text title' },    //class: 'success--text title'
                  { text: 'Open', align: 'left', value: 'open',class: 'primary white--text title' },
                  { text: 'Close', align: 'left', value: 'close',class: 'primary white--text title' },
                  { text: 'Adj Close', align: 'left', value: 'adjclose',class: 'primary white--text title' },
                  { text: 'High', align: 'left', value: 'high',class: 'primary white--text title' },
                  { text: 'Low', align: 'left', value: 'low',class: 'primary white--text title' },
                  { text: 'Volume', align: 'left', value: 'volume',class: 'primary white--text title' }, ],        
      results: [],
      results_idx: [],
      series_a: [],
      ts_labels: [],
      ts_holder: [],      
      ts_open: [],
      ts_high: [],
      ts_low: [],
      ts_close: [],
      ts_adjclose: [],
      ts_volume: [],
      beginZero: false,
      bgColor: "#81894e",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid']
    }
  },
  computed: mapGetters({
    xUID: 'globalData/get_uid',
    xPWD: 'globalData/get_pwd',
    xAxios: 'globalData/get_axios',
    xTicker: 'globalData/get_Ticker',
    xIndex: 'globalData/get_Index',
    xTech: 'globalData/get_TechList',
  }),
  mounted () {
     
     
  },
  created () {
    this.$bus.$on('ACTIVATE_INDEX', (data) => {
     // alert('Modal Index -' + JSON.stringify(data))
      var res = data.split('|')
      this.startupTab = 0
      this.status = 1
      this.sTicker = res[0]
      this.sIndex = res[1]
      this.sCompound = this.sIndex + ' [' + this.sTicker + ']'
      // this.equityType = 1     //false //true // res[8]
      //alert('activate index: ' + res[7])
      if(res[7] == 'EQUITY'){this.equityType = 1;this.techType = 1} 
      if(res[7] == 'CURRENCY'){

        var sCcyBuff = this.sIndex.split('/')
        
        this.ccyType = 1
        this.sFromCcy = sCcyBuff[0]
        this.sToCcy = sCcyBuff[1]
        } 
      this.results = [];
      //this.results_idx = [];
      this.series_a = [];
      this.ts_labels = [];
      this.ts_open = [];
      this.ts_high = [];
      this.ts_low = [];
      this.ts_close = [];
      this.ts_adjclose = [];
      this.ts_volume = [];
      this.results.push({category: 'Ticker' , value: this.sTicker})
      this.results.push({category: 'Index' , value: this.sIndex})
      
      this.axiosLoadQuote (this.sTicker)
      this.axiosLoadHistorical (this.sTicker)

      this.startTimer(60)
      
    })
  }, 
  methods: {
    close () {
      this.status = 0
      this.$emit('close')
    },

    close2 () {
      this.status = 0
      this.$emit('close')
    },
    showChart (parTab) {
      this.currTab = parTab
    },
    validateData () {
      document.getElementById('btn1').disabled = false

      this.formInvalid = false
      if (this.$refs.form.validate() && this.sPWD === this.sPWD2) {
        this.formInvalid = true
      }
    },
    startTimer(parSeconds) {
      //alert('Start Timer')
      this.timer = setInterval(() => this.countdown(), parSeconds * 1000);
      
    },
    countdown: function() {
      //alert('Hello world')
      if(this.status == 1){
        //this.copyTimeSeries()
        this.axiosLoadQuote (this.sTicker)

        //this.axiosLoadHistorical (this.sTicker)
        //this.getIntraDay ()
        }
      
    },
    LoadStockDetail () {
      var sSbuff = this.xTicker + '|' + this.sInterval
      this.modal2 = false
      this.isStockVisible = true
      this.$bus.$emit('ACTIVATE_STOCKDETAIL', sSbuff)
      //alert('Stock detail-' + this.xTicker + '-' + this.sInterval)
       
    },
    LoadTechDetail () {
      var sSbuff = this.xTicker + '|' + this.sInterval + '|' + this.sFunction + '|' + this.sSeriesType
      this.modal3 = false
      this.isTechVisible = true
      this.$bus.$emit('ACTIVATE_TECHDETAIL', sSbuff)
      //alert('Stock detail-' + this.xTicker + '-' + this.sInterval)
       
    },
    LoadForexDetail () {
      var sSbuff = this.sFromCcy + '|' + this.sToCcy + '|' + this.sInterval
      this.modal4 = false
      this.isForexVisible = true
      this.$bus.$emit('ACTIVATE_FOREXDETAIL', sSbuff)
      //alert('Stock detail-' + this.xTicker + '-' + this.sInterval)
       
    },
    closeStock () {
      this.isStockVisible = false
    },
    closeTech () {
      this.isTechVisible = false
    },    
    closeForex () {
      this.isForexVisible = false
    },        
    axiosLoadQuote (parIndex) {
      var token;
      token = localStorage.getItem("token")
      const formData = new FormData()

      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("index", parIndex)
      
      //alert('xquote 1:')
      //(async () => {  
      axios.post(this.xAxios + 'xquote', formData).then((res) => {
        //alert('xquote 2:')
        var result = JSON.stringify(res.data)

        result = this.cleanString(result,92)
        result = this.cleanString(result,34)
        result = this.cleanString(result,39)
        
        //console.log(result);
        var cbuff = result.split("{")

        this.chartShow = 0
        this.beginZero = false
        
        var ybuff = cbuff[3].split(",")
        var buff = cbuff[4].split(",")
        
        var sSection = ''
        var sSectionCategory = ''
        var sSectionTime = ''
        var sQuoteType = ''
        var sSectionValue = 0
        var sSectionHigh = 0
        var sSectionLow = 0
        var sSectionOpen = 0
        var sSectionVol = 0
        var s52WeekHigh = 0
        var s52WeekLow = 0
        var s50DayAvg = 0
        var sAvgVolume = 0
        var sCategory
        var sValue
        var sValuePt2
        var sValuePt3
        var arraylength = ybuff.length

        this.results = [];
        //alert('array length: ' + ybuff)
        
        for (let ii = 0; ii < arraylength; ii++) {
          var ycommabuff = ybuff[ii].split(":")

          if(ycommabuff.length > 1){

          sCategory = ycommabuff[0]
          sValue = ycommabuff[1]
          if(sValue != undefined){sValue = sValue.replace("}","")}
          if(sValue == undefined){sValue = ''}
          //sValue = sValue.replace("}","")

          if(sCategory == "shortName"){sSection = sValue}
          if(sCategory == "regularMarketPrice"){sSectionValue = sValue;}
          if(sCategory == "fiftyTwoWeekHigh"){s52WeekHigh = sValue;}
          if(sCategory == "fiftyTwoWeekLow"){s52WeekLow = sValue;}
          if(sCategory == "fiftyDayAverage"){s50DayAvg = sValue;}
          if(sCategory == "averageVolume"){sAvgVolume = sValue;}
          if(sCategory == "quoteType"){sQuoteType = sValue; }
          }
        }
        
        //alert('2nd loop')
        arraylength = buff.length
        for (let i = 0; i < arraylength; i++) {
          var commabuff = buff[i].split(":")
        
          sCategory = commabuff[0]
          sValue = commabuff[1]
          if(sValue != undefined){sValue = sValue.replace("}","")}
          if(sValue == undefined){sValue = ''}

          //console.log('quotes detail: ' + sCategory + '|' + sValue);	    
          var sValBuff = numeral(sValue).format('0,0.0')
          if(sCategory == "shortName"){sSection = sValue;}
          if(sCategory == "regularMarketPrice"){sSectionCategory = sCategory;sSectionValue = sValue;}

          if(sCategory == "regularMarketDayHigh"){sSectionHigh = sValue;}
          if(sCategory == "regularMarketDayLow"){sSectionLow = sValue;}
          if(sCategory == "regularMarketVolume"){sSectionVol = sValue;}
          if(sCategory == "regularMarketOpen"){sSectionOpen = sValue;}

          if(sCategory == "quoteType"){sQuoteType = sValue; }
          if(sCategory == "regularMarketTime"){
            sValuePt2 = commabuff[2]
            sValuePt2 = sValuePt2.replace("}","")
            sValuePt3 = commabuff[3]
            sValuePt3 = sValuePt3.replace("}","")
            sSectionCategory= sCategory;sSectionTime = sValue + ':' + sValuePt2 + ':' + sValuePt3;}
        }
        //alert('quote-3: ' + parIndex)
        // if (parIndex == '^dji') {alert('array length: ' + parIndex + '|' + sSectionValue + '|' + sSectionHigh)}
        var sformat = '0,0.0'
        if(sQuoteType == 'CURRENCY'){sformat = '0,0.0000'}
        var sValBuff = numeral(sSectionValue).format(sformat)
        
        //alert('array length: ' + arraylength)
        this.DoIndex(this.results_idx, parIndex, sSection , sSectionTime , sValBuff, numeral(sSectionHigh).format('0,0.0'), numeral(sSectionLow).format('0,0.0'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0'))


        this.results.push({category: 'Value' , value: sValBuff})
        this.results.push({category: 'High' , value: numeral(sSectionHigh).format(sformat)})
        this.results.push({category: 'Low' , value: numeral(sSectionLow).format(sformat)})
        this.results.push({category: 'Open' , value: numeral(sSectionOpen).format(sformat)})
        this.results.push({category: 'Volume' , value: numeral(sSectionVol).format('0,0')})
        this.results.push({category: 'Avg Volume' , value: numeral(sAvgVolume).format('0,0')})
        this.results.push({category: 'Market Time' , value: sSectionTime})
        this.results.push({category: '52 Week High' , value: s52WeekHigh})
        this.results.push({category: '52 Week Low' , value: s52WeekLow})
        this.results.push({category: '50 Day Avg' , value: s50DayAvg})
        this.results.push({category: 'Quote Type' , value: sQuoteType})
        this.equityType = 0
        this.techType = 0
        this.ccyType = 0
        //this.equityType = false
        if(sQuoteType == 'INDEX'){this.ccyType = 0} 
        if(sQuoteType == 'EQUITY'){this.equityType = 1} 
        //if(sQuoteType == 'CURRENCY'){this.equityType = 1} 
        if(sQuoteType == 'EQUITY'){this.techType = 1} 
        if(sQuoteType == 'CURRENCY' ){
          this.ccyType = 1
          //alert('activate currency: ' + this.sIndex)
          var sCcyBuff = this.sIndex.split('/')
          this.sFromCcy = sCcyBuff[0]
          this.sToCcy = sCcyBuff[1]
          } 
        //alert('Modal Index' + this.results_idx[0].index)
      })

    },
axiosLoadHistorical (parIndex) {
      var token;
      token = localStorage.getItem("token")
      const formData = new FormData()
      var sformat = '0,0.0'
      if(this.ccyType == 1){sformat = '0,0.0000'}

      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("index", parIndex)
      formData.append("count", 50)
      
      //alert('start historical:')
      //(async () => {  
      axios.post(this.xAxios + 'xhistorical', formData).then((res) => {
        var result = JSON.stringify(res.data)
        
        result = this.cleanString(result,92)
        result = this.cleanString(result,34)
        result = this.cleanString(result,39)
        //alert('historical: ' + result)
        //console.log(result);
        var cbuff = result.split("[{")
        var sBuff = cbuff[1].split("{")
        //alert('Historical Details - ' + cbuff[1])
        
        //var ybuff = cbuff[3].split(",")
        //var buff = cbuff[4].split(",")
        var arraylength = sBuff.length
        this.series_a = [];
        //alert('Historical Length - ' + arraylength)
        
        for (let i = 0; i < arraylength; i++) {
          var commabuff = sBuff[i].split(",")
          var colonbuff = commabuff[0].split(":")
          //alert('Historical Details - ' + colonbuff[0])
          var sDate = colonbuff[1]
          //alert('Historical Details - ' + commabuff)
          colonbuff = commabuff[1].split(":")
          var sOpen = colonbuff[1]
          colonbuff = commabuff[2].split(":")
          var sHigh = colonbuff[1]
          colonbuff = commabuff[3].split(":")
          var sLow = colonbuff[1]
          colonbuff = commabuff[4].split(":")
          var sClose = colonbuff[1]
          colonbuff = commabuff[5].split(":")
          var sAdjClose = colonbuff[1]
          colonbuff = commabuff[6].split(":")
          var sVolume = colonbuff[1]

          this.series_a.push({date: sDate, open: numeral(sOpen).format(sformat), high: numeral(sHigh).format(sformat), low: numeral(sLow).format(sformat), close: numeral(sClose).format(sformat), adjclose: numeral(sAdjClose).format(sformat), volume: numeral(sVolume).format('0,0')})

          this.ts_labels[i] = i+1
          this.ts_open[arraylength - (i+1)] = sOpen
          this.ts_high[arraylength - (i+1)] = sHigh
          this.ts_low[arraylength - (i+1)] = sLow
          this.ts_close[arraylength - (i+1)] = sClose
          this.ts_adjclose[arraylength - (i+1)] = sAdjClose
          this.ts_volume[arraylength - (i+1)] = sVolume
        
        }
        
        //this.ts_holder = this.ts_open
        //this.ts_open = this.ts_holder.reverse
        //this.ts_close = this.ts_close.reverse
        this.chartShow = 0
        this.beginZero = false
        // if (parIndex == '^dji') {alert('array length: ' + parIndex + '|' + sSectionValue + '|' + sSectionHigh)}
      })

    },  

    copyTimeSeries() {
      var arraylength =this.series_a.length
      //alert('historical: ' + arraylength)
      //alert('historical: ' + this.series_a[0].open)

      for (let i = 0; i < arraylength; i++) {
        //this.ts_open[i] = this.series_a[i].open
        
        //this.ts_close[i] = this.series_a[i].close
        //this.ts_adjclose[i] = this.series_a[i].adjclose
        //this.ts_high[i] = this.series_a[i].high
        //this.ts_low[i] = this.series_a[i].low
      }
    
    },  
    exportTableToExcel(tableID, filename = ''){
      var downloadLink;
      var dataType = 'application/vnd.ms-excel';
      var tableSelect = document.getElementById(tableID);
      if (this.currTab > 1){tableSelect = document.getElementById('IndexTable_3');}
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
    DoIndex (parArray, parIndex, parSection, parSectionTime,parVal,parHigh,parLow,parVol,parOpen) {
      var arraycount = parArray.length
      var sbuff

      // alert('Count:' + arraycount)
      if(arraycount == 0){
        parArray.push({index: parIndex, section: parSection , category: parSectionTime , value: parVal, high: parHigh, low: parLow, vol: parVol, open: parOpen})
        return
      }

      for (let i = 0; i < arraycount; i++) {
        sbuff = parArray[i]
        //alert('Section:' + sbuff.section)
        if(sbuff.section == parSection){
          parArray[i].category = parSectionTime
          parArray[i].value = parVal
          return;
        }
        
      }

      parArray.push({index: parIndex, section: parSection , category: parSectionTime , value: parVal, high: parHigh, low: parLow, vol: parVol, open: parOpen})
      
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
    }
  }
}
</script>
<template>
  <!-- eslint-disable-next-line eslint-disable-vue/max-attributes-per-line eslint-disable-html-self-closing-->
  <!-- eslint-disable -->
  <!-- eslint-disable-max-attributes-per-line -->
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" style="height: 620px; width: 960px;" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header id="modal-header" class="modal-header blue darken-4">
          <h4 id="myModalLabel" style="color:lightblue; font-family:verdana;">Index: {{ xIndex }} [{{ xTicker }}] </h4>
          <button type="button" style="font-size: 24px;" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
        </header>
        <section id="modalDescription" class="modal-body" style="height: 500px;">
        
          <v-tabs class="text-left" v-model="startupTab" background-color=rgb(230,230,235)>
                      <v-tab @click="showChart(1)">Basic</v-tab>
                      <v-tab @click="showChart(2)">Time Series</v-tab>
                      <v-tab @click="showChart(3)"> Open/Close Chart</v-tab>
                      <v-tab @click="showChart(4)">High/Low Chart</v-tab>
                      <v-tab @click="showChart(5)">Volume Chart</v-tab>
                <v-tab-item>
                  <v-card flat >
                    <v-flex xs9 md9 lg12 class="my-1">
                      <v-data-table id="IndexTable_1" :headers="headers" :items="results" :items-per-page="12"npm hide-default-footer dense class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>   
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat >
                    <v-flex xs9 md9 lg12 class="my-1">
                      <v-data-table id="IndexTable_2" :headers="ts_headers" :items="series_a" :items-per-page="9" dense class="elevation-1 fixed-header"></v-data-table> 
                      <v-data-table id="IndexTable_3" :headers="ts_headers" :items="series_a" :items-per-page="-1" hidden dense class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>   
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-layout row wrap justify-center>
                    <v-flex xs8 md6 lg10 >
                      <canvas id="midx44" count="3"></canvas>
                      <chartjs-line target="midx44" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(180,180,180) :data="ts_open" datalabel="Open" :labels="ts_labels"/>
                      <chartjs-line target="midx44" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(20,180,150) :data="ts_close" datalabel="Close" :labels="ts_labels"/>
                      <chartjs-line target="midx44" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(10,120,150) :data="ts_adjclose" datalabel="Adj Close" :labels="ts_labels"/>
                    </v-flex>
                  </v-layout>
                </v-tab-item>
                <v-tab-item>
                  <v-layout row wrap justify-center>
                    <v-flex xs8 md6 lg10 >
                      <canvas id="midx45" count="2"></canvas>
                      <chartjs-line target="midx45" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(200,0,0) :data="ts_high" datalabel="High" :labels="ts_labels"/>
                      <chartjs-line target="midx45" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(0,200,0) :data="ts_low" datalabel="Low" :labels="ts_labels"/>
                    </v-flex>
                  </v-layout>
                </v-tab-item>
                <v-tab-item>
                  <v-layout row wrap justify-center>
                    <v-flex xs8 md6 lg10 >
                      <canvas id="midx46" count="1"></canvas>
                      <chartjs-line target="midx46" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(50,50,180) :data="ts_volume" datalabel="Volume" :labels="ts_labels"/>
                    </v-flex>
                  </v-layout>
                </v-tab-item>                
                </v-tabs>                      
        </section>
        <footer class="modal-footer" style="height: 80px;">
          <slot name="footer">
            <v-dialog ref="dialog2" v-model="modal2" :return-value.sync="sTimeSeries" persistent max-width="470px">
              <template v-slot:activator="{ on }">
                <v-btn v-show="equityType > 0" color="primary" @click="modal2 = false" v-on="on">Time Series</v-btn>
              </template>
              <v-card>
                <v-layout justify-center>
                  <v-card-title>Stock Time Series</v-card-title>
                </v-layout>
                <v-divider></v-divider>
                <div style="padding: 15px;">
                  <v-layout row wrap style="height: 125px; width: 450px;" pl-3 justify-center>
                    <v-text-field hint="company name" label="Equity" dense outlined style="height: 65px;" readonly v-model="sCompound"></v-text-field>     
                    <v-combobox :items="interval" label="Interval" dense outlined style="height: 65px;" v-model="sInterval"></v-combobox>
                  </v-layout>
                </div>
                <v-divider></v-divider>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="LoadStockDetail" >Submit</v-btn>
                <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>  
              </v-card>
            </v-dialog>
            <v-divider v-show="equityType > 0" class="mx-4" inset vertical></v-divider> 
            <v-dialog ref="dialog3" v-model="modal3" :return-value.sync="sTimeSeries" persistent max-width="470px">
              <template v-slot:activator="{ on }">
                <v-btn v-show="equityType > 0" color="primary" @click="modal3 = false" v-on="on">Technical</v-btn>
              </template>
              <v-card>
                <v-layout justify-center>
                  <v-card-title>Technical Time Series</v-card-title>
                </v-layout>
                <v-divider></v-divider>
                <div style="padding: 15px;">
                  <v-layout row wrap style="height: 235px; width: 450px;" pl-3 justify-center>
                    <v-text-field hint="company name" label="Equity" dense outlined style="height: 65px;" readonly v-model="sCompound"></v-text-field>     
                    <v-combobox :items="xTech" label="Function" dense outlined style="height: 65px;" v-model="sFunction"></v-combobox>
                    <v-combobox :items="interval" label="Interval" dense outlined style="height: 65px;" v-model="sInterval"></v-combobox>
                    <v-combobox :items="seriestype" label="Series Type" dense outlined style="height: 65px;" v-model="sSeriesType"></v-combobox>
                  </v-layout>
                </div>
                <v-divider></v-divider>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="LoadTechDetail" >Submit</v-btn>
                <v-btn text color="primary" @click="modal3 = false">Cancel</v-btn>  
              </v-card>
            </v-dialog>

            <v-dialog ref="dialog4" v-model="modal4" :return-value.sync="sTimeSeries" persistent max-width="470px">
              <template v-slot:activator="{ on }">
                <v-btn v-show="ccyType > 0" color="primary" @click="modal4 = false" v-on="on">Time Series</v-btn>
              </template>
              <v-card>
                <v-layout justify-center>
                  <v-card-title>Currency Time Series</v-card-title>
                </v-layout>
                <v-divider></v-divider>
                <div style="padding: 15px;">
                  <v-layout row wrap style="height: 235px; width: 450px;" pl-3 justify-center>
                    <v-text-field hint="currency" label="From Currency" dense outlined style="height: 65px;" readonly v-model="sFromCcy"></v-text-field>     
                    <v-text-field hint="currency" label="To Currency" dense outlined style="height: 65px;" readonly v-model="sToCcy"></v-text-field>     
                    <v-combobox :items="interval" label="Interval" dense outlined style="height: 65px;" v-model="sInterval"></v-combobox>
                  </v-layout>

                </div>
                <v-divider></v-divider>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="LoadForexDetail" >Submit</v-btn>
                <v-btn text color="primary" @click="modal4 = false">Cancel</v-btn>  
              </v-card>
            </v-dialog>

              <v-divider v-show="equityType > 0" class="mx-4" inset vertical></v-divider> 
              <v-divider v-show="ccyType > 0" class="mx-4" inset vertical></v-divider> 
              <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('IndexTable_1','sectordata')">Export to Excel</v-btn>                           
              <v-divider class="mx-4" inset vertical></v-divider> 
              <v-btn id="btn1" color="primary" style="width: 120px;" @click="close2"><span >Close</span></v-btn>
          </slot>
        </footer>
      </div>
      <stockModal v-show="isStockVisible" @close="closeStock" />
      <techModal v-show="isTechVisible" @close="closeTech" />      
      <forexModal v-show="isForexVisible" @close="closeForex" />      
    </div>
  </transition>
</template>

<style>
<style lang="scss">
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
    height: 320x;
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
    font-family: "Arial", Helvetica, sans-serif;
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
    transform-origin: 50% 50% 0;
    font-family: "Arial", Helvetica, sans-serif;
  }
</style>
