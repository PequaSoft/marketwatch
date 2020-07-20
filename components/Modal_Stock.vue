
<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import numeral from 'numeral'
import { mapGetters } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      status: 0,
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
      searchResults: ['msft', 'ibm', 'goog'],
      ts_results: [],
      ts_labels: [],
      ts_open: [],
      ts_high: [],
      ts_low: [],
      ts_close: [],
      ts_adjclose: [],
      ts_volume: [],
      currTab: 1,
      loadData: 0,
      chartShow: 1,
      chartBeg: 1,
      chartEnd: 10,
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
      sUID: '',
      sPWD: '',
      sPWD2: '',
      sEMail: '',
      sTicker: '',
      sInterval: '',
      sLoginStatus: 0,
      formReadonly: 0,
      formInvalid: true,
      startupTab: 0,
      nonblankRules: [v => !!v || 'The input is required'],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid']
    }
  },
  computed: mapGetters({
    xUID: 'globalData/get_uid',
    xPWD: 'globalData/get_pwd',
    xAxios: 'globalData/get_axios',
    xAlphaKey: 'globalData/get_AlphaKey'
  }),
  created () {
    this.$bus.$on('ACTIVATE_STOCKDETAIL', (data) => {
      var res = data.split('|')
      this.sTicker = res[0]
      this.sInterval = res[1]
      this.axiosLoadIntraDay()
      //alert('Stock detail-' + sTicker + '-' + sInterval)

   })
  }, 

  methods: {
    close () {
      this.$emit('close')
    },

    close2 () {
      if (this.sUID === undefined) { alert('Missing User ID'); return }
      if (this.sEMail === undefined) { alert('Missing Email'); return }
      if (this.sPWD === undefined) { alert('Missing Password'); return }
      if (this.sPWD !== this.sPWD2) { alert('Passwords do not match'); return }

      this.$bus.$emit('BUS_LOANPMTS', this.sUID)

      this.$emit('clickedLoanPmts', this.sUID)
      // this.$store.state.store_uid = this.sUID
      // this.$store.state.store_pwd = this.sPWD

      this.$store.commit('globalData/setUID', this.sUID)
      this.$store.commit('globalData/setPWD', this.sPWD)
      // this.$store.state.store_login_status = 1
      // sLoginStatus
      this.sendMessage()
    },
    validateData () {
      document.getElementById('btn1').disabled = false

      this.formInvalid = false
      if (this.$refs.form.validate() && this.sPWD === this.sPWD2) {
        this.formInvalid = true
      }
    },
    showChart (parTab) {
      this.currTab = parTab
    },
    sendMessage () {
      //this.axiosCreateProfile()

      this.message = ''
    },
    axiosLoadIntraDay () {
      
      const formData = new FormData()
            
      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("StockSymbol", this.sTicker)
      formData.append("alphakey", this.xAlphaKey)
      //formData.append("StockSymbol", sSearchSelect[0])
      formData.append("Interval", this.sInterval)
      this.startupTab = 0
      
      while (this.results.length) {
          this.results.pop();
        }
      
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
        //alert('intraday: ' + buff[1])
  
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
      this.componentKey = 1;  
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

  loadCharts () {
    var arraylength = this.ts_results.length
    var iBeg
    var iEnd
    var iPtr=0
    var i = 0

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
      //alert('Boo!')

      this.ts_labels = [];
      this.ts_open = [];
      this.ts_high = [];
      this.ts_low = [];
      this.ts_close = [];
      this.ts_adjclose = [];
      this.ts_volume = [];
      /*
      while (this.ts_labels.length) {
          this.ts_labels.pop();
          this.ts_open.pop();
          this.ts_high.pop();
          this.ts_low.pop();
          this.ts_close.pop();
          this.ts_adjclose.pop();
          this.ts_volume.pop();
        }
      */  
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
    //alert('Boo!')
    },    
    editData () {
      // alert('AccountStatus - ' + this.$store.state.store_AccountStatus)
      document.getElementById('btn1').disabled = false
      this.formInvalid = false
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
      <div class="modal" role="dialog" style="width: 1120px; height: 720px;" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header id="modal-header" class="modal-header blue darken-4">
          
          <h3 style="color:white;">Symbol: {{ sTicker }} - Interval: {{ sInterval }}</h3>
          <button type="button" style="font-size: 24px;" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
        </header>
        <section id="modalDescription" class="modal-body" style="width: 1080px; height: 570px;">
          <slot name="body">
          
          <v-flex class="hidden-md-and-down" justify-center>
            <v-card>    
                  <div style="padding: 10px; width: 1080px; height: 520px;">
                    
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
                </v-card>
              </v-flex>
          
          </slot>
        </section>
        <footer class="modal-footer" style="height: 70px;">
          <v-flex class="hidden-md-and-down" justify-center>
          <v-layout row wrap justify-center>
          <slot name="footer">
            <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_3','loandata')">Export to Excel</v-btn>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-btn id="btn1" color="primary" style="width: 120px;" @click="close"><span >Close</span></v-btn>
          </slot>
          </v-layout>
          </v-flex >
        </footer>
      </div>
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
    height: 520x;
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
    padding: 10px 10px;
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
