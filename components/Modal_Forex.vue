
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
      curr_From: 'usd-United States Dollar',
      curr_To: 'usd-United States Dollar',
      curr_FromFull: 'usd-United States Dollar',
      curr_ToFull: 'usd-United States Dollar',
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
      items: ['btc-BitCoin', 'cad-Canadian Dollar', 'chf-Swiss Franc', 'eur-Euro', 'usd-United States Dollar'],
      interval: ['1min', '5min', '15min', '30min', '60min','Daily','Weekly','Monthly'],
      headers: [  { text: 'Category', align: 'left', sortable: false, value: 'category',class: 'primary white--text title' },    //class: 'success--text title'
                  { text: 'Value', align: 'left', value: 'value',class: 'primary white--text title' }, ],
      tsheaders: [  { text: 'Item', align: 'left', sortable: false, value: 'item',class: 'primary white--text title' },    //class: 'success--text title'
                  { text: 'Timestamp', align: 'left', sortable: true, value: 'timestamp',class: 'primary white--text title' },
                  { text: 'Open', align: 'left', value: 'open',class: 'primary white--text title' },
                  { text: 'High', align: 'left', value: 'high',class: 'primary white--text title' },
                  { text: 'Low', align: 'left', value: 'low',class: 'primary white--text title' },
                  { text: 'Close', align: 'left', value: 'close',class: 'primary white--text title' }, ],                  
      results: [],
      ts_results: [],
      ts_labels: [],
      ts_open: [],
      ts_high: [],
      ts_low: [],
      ts_close: [],
      ts_volume: [],
      modal3: false,
      componentKey: 0,
      dataLabel: "Open",
      labelOpen: "Open",
      labelHigh: "High",
      labelLow: "Low",
      labelClose: "Close",
      labelVolume: "Volume",
      bgColor: "#81894e",
      beginZero: false,
      borderColor: "#81894e",
      currTab: 1,
      ssrcLoanName: '',
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
    xAlphaKey: 'globalData/get_AlphaKey'
  }),
  created () {
    this.$bus.$on('ACTIVATE_FOREXDETAIL', (data) => {
      var res = data.split('|')
      this.curr_From = res[0]
      this.curr_To = res[1]
      this.sInterval = res[2]
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
      var sCurrFrom = this.curr_From;
      var sCurrTo = this.curr_To;
      this.startupTab = 0

      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("fromCurrency", sCurrFrom)
      formData.append("toCurrency", sCurrTo)
      formData.append("Interval", this.sInterval)
      formData.append("alphakey", this.xAlphaKey)
      
      
      while (this.results.length) {
          this.results.pop();
        }
      //alert('Step 1' +  this.curr_From)  
      //alert('Step 2' +  this.curr_To)

      axios.post(this.xAxios + 'xForex', formData).then((res) => {
        // alert('return forex')
        //alert('Step 1' +  this.curr_From)  
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
        while (this.results.length) {
          this.results.pop();
        }

        while (this.ts_results.length) {
          this.ts_results.pop();
        }
        this.chartShow = 0
        this.beginZero = false
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
        var b
        var sSubBuff
        var updateBuffpt1
        var updateBuffpt2
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
        sValue = sSubBuff[1]
        this.results.push({category: sCategory , value: sValue})
        
        updateBuffpt1=metabuff[3]
        updateBuffpt1=metabuff[3].substring(18,28)
        updateBuffpt2=metabuff[3].substring(29)
        sSubBuff = metabuff[3].split(":")
        sCategory = sSubBuff[0]
        b = this.sInterval.includes("min", 1);
        if(b == true){sValue = updateBuffpt1 + ' ' + updateBuffpt2}
        if(b != true){sValue = sSubBuff[1]}
        this.results.push({category: sCategory , value: sValue})
        
        //alert('decode 1')
        if(metabuff.length > 4){
        b = this.sInterval.includes("min", 1);
        updateBuffpt1=metabuff[4]
        updateBuffpt2=""
        if(b == true){
          //alert('abc: ' + metabuff[4])
          
          sSubBuff = metabuff[4].split(":")
          sCategory = sSubBuff[0]
          sValue = sSubBuff[1]

          }
        if(b != true && this.sInterval == 'Daily'){
          updateBuffpt1=metabuff[4].substring(18,28)
          updateBuffpt2=metabuff[4].substring(29)
          sValue = updateBuffpt1 + ' ' + updateBuffpt2
          }
        if(b != true && this.sInterval == 'Weekly'){
          //alert('abc: ' + metabuff[4])
          sSubBuff = metabuff[4].split(":")
          sCategory = sSubBuff[0]
          sValue = sSubBuff[1]
          }  
        if(b != true && this.sInterval == 'Monthly'){
          //alert('abc: ' + metabuff[4])
          sSubBuff = metabuff[4].split(":")
          sCategory = sSubBuff[0]
          sValue = sSubBuff[1]
          }            

        sSubBuff = metabuff[4].split(":")
        sCategory = sSubBuff[0]
        
        // if(b == true){sValue = updateBuffpt1 + ' ' + updateBuffpt2}
        // if(b != true){sValue = sSubBuff[1]}
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
        if(metabuff.length > 6){
          sSubBuff = metabuff[6].split(":")
          sCategory = sSubBuff[0]
          sValue = sSubBuff[1]
          this.results.push({category: sCategory , value: sValue})
        }
        //alert('decode 3')
        var testlength = buff.length
        var arraylength = buff.length
        //var maxrows = arraylength - 5
        var maxrows = 1
        
        for (let i = 1; i < testlength; i++) {
          var dOpen = this.getTokenValue(buff[i],'open','0');

          if(dOpen != undefined){
            maxrows++;
          }
        }

        var ptr = maxrows - 1
        this.chartBeg = maxrows-10
        this.chartEnd = maxrows-1

        for (let i = 1; i < arraylength; i++) {
          if(maxrows == i+1){console.log('Last One!');this.loadCharts ();}  
          var sStub = "Time Series FX (" + this.sInterval + "):{"
          if(this.sInterval == 'Weekly'){sStub ="Time Series FX (Weekly):{";}
          if(this.sInterval == 'Monthly'){sStub ="Time Series FX (Monthly):{";}
          buff[i] = buff[i].replace(sStub,"")
          buff[i] = buff[i].replace("|",",")
          
          var xbuff = buff[i].split(":{")
          var ybuff = xbuff[1].split(",")
          var zBuff
          //numeral(xbuff[1]).format('0,0.0000')

          zBuff = this.getTokenValue(xbuff[1],'open','0');

          var dOpen = numeral(zBuff).format('0,0.0000')
          var dHigh = this.getTokenValue(xbuff[1],'high','0');
          var dLow = this.getTokenValue(xbuff[1],'low','0');
          var dClose = this.getTokenValue(xbuff[1],'close','0');

          if (maxrows > i){
            this.ts_results.push({item: maxrows - i, timestamp: xbuff[0] , open: dOpen , high: dHigh, low: dLow, close: dClose})
            ptr = (maxrows - i)-1
          }
        }

        // alert('force update')
        //this.$forceUpdate();
        
      })
      
      this.componentKey = 1;  
      this.$bus.$emit('UPDATE_LINECHART_LABELS', this.ts_labels)
      this.$bus.$emit('UPDATE_LINECHART_DATA', this.ts_open)
      
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
          this.ts_open.pop();
          this.ts_high.pop();
          this.ts_low.pop();
          this.ts_close.pop();
        }
      //alert('Beg-' + iBeg + 'End-' + iEnd + 'GetPtr-' + iGetPtr)  
      //alert('Beg-' + this.chartBeg + 'End-' + this.chartEnd + 'End-' + iGetPtr)

      for (i = iBeg; i < iEnd+1; i++) {
        this.ts_labels[iPtr] = i
        this.ts_open[iPtr] = this.ts_results[iGetPtr].open
        this.ts_high[iPtr] = this.ts_results[iGetPtr].high
        this.ts_low[iPtr] = this.ts_results[iGetPtr].low
        this.ts_close[iPtr] = this.ts_results[iGetPtr].close
        
        if(i >= iEnd){return;}
        iGetPtr--;
        iPtr++;
      }  
    
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
      <div class="modal" role="dialog" style="width: 1020px; height: 700px;" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header id="modal-header" class="modal-header blue darken-4">
          
          <h3 style="color:white;">From Symbol: {{ curr_From }} - To Symbol: {{ curr_To }} [Interval: {{ sInterval }}]</h3>
          <button type="button" style="font-size: 24px;" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
        </header>
        <section id="modalDescription" class="modal-body" style="width: 1020px; height: 570px;">
          <slot name="body">
            <v-flex class="hidden-md-and-down" justify-center>
              <v-card>    
                <div style="padding: 5px; width: 920px; height: 520px;">
                    <v-tabs v-model="startupTab">
                      <v-tab @click="showChart(1)">Summary</v-tab>
                      <v-tab @click="showChart(2)">Time Series</v-tab>
                      <v-tab @click="showChart(3)">Chart</v-tab>
                    <v-tab-item>
                      <v-card flat height="400">
                      <v-flex xs9 md9 lg9 class="my-1">
                      <v-data-table id="myDataTable_1" :headers="headers" :items="results" hide-default-footer dense class="elevation-1 fixed-header"></v-data-table> 
                      </v-flex>              
                      </v-card>
                    </v-tab-item>
                    <v-tab-item>
                      <v-card flat height="400">
                        <v-data-table id="myDataTable_2" :headers="tsheaders" :items="ts_results" dense class="elevation-1 fixed-header"></v-data-table>
                        <v-data-table id="myDataTable_3" :headers="tsheaders" :items="ts_results" hidden dense :items-per-page="-1" class="elevation-1 fixed-header"></v-data-table>
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
                          <canvas v-if="chartShow = 1" id="forex5" count="4"></canvas>
                          <chartjs-line target="forex5" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(180,180,180) :data="ts_open" :datalabel="labelOpen" :labels="ts_labels"/>
                          <chartjs-line target="forex5" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(200,0,0) :data="ts_high" :datalabel="labelHigh" :labels="ts_labels"/>
                          <chartjs-line target="forex5" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(0,0,200) :data="ts_low" :datalabel="labelLow" :labels="ts_labels"/>
                          <chartjs-line target="forex5" :backgroundcolor="bgColor" :beginzero="beginZero" :bind="true" bordercolor=rgb(20,180,150) :data="ts_close" :datalabel="labelClose" :labels="ts_labels"/>
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
