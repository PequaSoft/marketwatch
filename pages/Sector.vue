<template>
  <div class="dashboard ">
      <div align="center">
        <v-layout justify-center>
          <h1 class="subheading grey--text text-center ">Sectors</h1>
        </v-layout>        
      <v-layout row wrap justify-center>
        <v-flex>
                <v-card flat class="mx-auto" height="400" >
              <v-flex xs9 md9 lg9 >
                <v-tabs vertical class="text-left" background-color=rgb(230,230,235)>
                      <v-tab>Real-Time Performance</v-tab>
                      <v-tab>1 Day Performance</v-tab>
                      <v-tab>5 Day Performance</v-tab>
                      <v-tab>1 Month Performance</v-tab>
                      <v-tab>3 Month Performance</v-tab>
                      <v-tab>Year-to-Date Performance</v-tab>
                      <v-tab>1 Year Performance</v-tab>
                      <v-tab>3 Year Performance</v-tab>
                      <v-tab>5 Year Performance</v-tab>
                      <v-tab>10 Year Performance</v-tab>
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md9 lg12 >
                      <v-data-table id="myDataTable_1" :headers="headers" :items="results_a" :items-per-page="11" hide-default-footer class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>   
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_1','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md9 lg11>
                      <v-data-table id="myDataTable_2" :headers="headers" :items="results_b" :items-per-page="11" hide-default-footer class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_2','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md9 lg11>
                      <v-data-table id="myDataTable_3" :headers="headers" :items="results_c" :items-per-page="11" hide-default-footer class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_3','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md9 lg11>
                      <v-data-table id="myDataTable_4" :headers="headers" :items="results_d" :items-per-page="11" hide-default-footer class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_4','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item><v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md9 lg11>
                      <v-data-table id="myDataTable_5" :headers="headers" :items="results_e" :items-per-page="11" hide-default-footer class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_5','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item><v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md9 lg11>
                      <v-data-table id="myDataTable_6" :headers="headers" :items="results_f" :items-per-page="11" hide-default-footer class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_6','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item><v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md9 lg11>
                      <v-data-table id="myDataTable_7" :headers="headers" :items="results_g" :items-per-page="11" hide-default-footer class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_7','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item><v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md9 lg11>
                      <v-data-table id="myDataTable_8" :headers="headers" :items="results_h" :items-per-page="11" hide-default-footer class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_8','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item><v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md9 lg11 class="my-1">
                      <v-data-table id="myDataTable_9" :headers="headers" :items="results_i" :items-per-page="11" hide-default-footer class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_9','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item><v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md9 lg11>
                      <v-data-table id="myDataTable_10" :headers="headers" :items="results_j" :items-per-page="11" hide-default-footer class="elevation-1 fixed-header"></v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('myDataTable_10','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item>
                </v-tabs>                      
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
      curr_From: 'usd',
      curr_To: 'usd',
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
      items: ['btc', 'cad', 'chf', 'eur', 'usd'],
      interval: ['1min', '5min', '15min', '30min', '60min','Daily','Weekly','Monthly'],
      headers: [  { text: 'Section', align: 'left', sortable: false, value: 'section',class: 'primary white--text title' }, 
                  { text: 'Category', align: 'left', sortable: false, value: 'category',class: 'primary white--text title' }, 
                  { text: 'Value', align: 'right', value: 'value',class: 'primary white--text title' }, ],
      results_a: [],
      results_b: [],
      results_c: [],
      results_d: [],
      results_e: [],
      results_f: [],
      results_g: [],
      results_h: [],
      results_i: [],
      results_j: [],
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
    xForex: 'globalData/get_forex',
    xAlphaKey: 'globalData/get_AlphaKey'
  }),
  metaInfo: {
    title: "Sector",
    meta: [
      { vmid: 'og:title', property: 'og:title', content: 'Sector Page' },
      { vmid: 'og:site_name', property: 'og:site_name', content: 'Sector' },
      { vmid: 'og:type', property: 'og:type', content: 'Website'},
      { vmid: 'og:url', property: 'og:url', content: 'https://markettrackerpro.com/sector'},
      { vmid: 'og:description', property: 'og:description', content: 'This is where users can analyze sector data.'},
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@pequasoft' },
      { name: 'twitter:title', content: 'Sector' },
      { name: 'twitter:description', content: 'This is where users can analyze sector data.' },
      { name: 'twitter:url', content: 'https://twitter.com/PequaSoft' },
      { name: 'twitter:domain', content: 'PequaSoft' },
      { itemprop: 'name', content: 'Sector' },
      { itemprop: 'description', content: 'This is where users can analyze sector data.' },
      { itemprop: 'image', content: 'https://markettrackerpro.com/sector' }
    ]
  },
  created () {
    this.$bus.$on('HDR_LOGIN', (data) => {
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
  mounted () {
     // alert('Sector!!!')
     this.getIntraDay ()
  },
  methods: {
    axiosLoadIntraDay () {
      var token;
      token = localStorage.getItem("token")
      const formData = new FormData()

      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("fromCurrency", this.curr_From)
      formData.append("toCurrency", this.curr_To)
      formData.append("Interval", this.sInterval)
      formData.append("alphakey", this.xAlphaKey)
      
      while (this.results_a.length) {
          this.results_a.pop();
        }

      // alert('Load intraday - ' + this.xUID + ' - '  + this.xPWD  + ' - ' + this.sSymbol)
      (async () => {  
      axios.post(this.xAxios + 'xSector', formData).then((res) => {
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
        while (this.results_a.length) {
          this.results_a.pop();
        }

        while (this.results_b.length) {
          this.results_b.pop();
        }

        while (this.results_c.length) {
          this.results_c.pop();
        }

        this.chartShow = 0
        this.beginZero = true
        
        var buff = result.split("},")
        var b
        var sSubBuff
        var updateBuffpt1
        var updateBuffpt2
        var sSection
        var sOutputSection
        var sValue
        var sCategory

        var metabuff = buff[0].split(":{")
        var commabuff = metabuff[3].split(",")
        var sBuffpt1 = commabuff[0].split(":")
        var sBuffpt2 = commabuff[1].split(":") 

        sSection = 'Meta Data'
        sCategory = sBuffpt1[0]
        sValue = sBuffpt1[1]

        sSection = ''
        sCategory = sBuffpt2[0]
        sValue = sBuffpt2[1] + ':' + sBuffpt2[2] + ':' + sBuffpt2[3]

        var arraylength = buff.length
        for (let i = 1; i < arraylength; i++) {
          if(i >= 1){
            //alert('Details: ' + buff[i])  
            commabuff = buff[i].split(",")
            
            for (let k = 0; k < commabuff.length; k++) {
              //if(i == 1){alert('Comma Length: ' + commabuff[k]);}  
              sBuffpt1 = commabuff[k].split(":")
              if(k == 0){
                sOutputSection = sBuffpt1[0]
                sSection = sBuffpt1[0] + ':' + sBuffpt1[1]
                sCategory = sBuffpt1[2].substring(1)
                sValue = sBuffpt1[3]
                sValue = sValue.replace('}','')
              }  
              
              if(k > 0){
                sSection = ''
                sCategory = sBuffpt1[0]
                sValue = sBuffpt1[1]
                sValue = sValue.replace('}','')
                sValue = sValue.replace('}','')
              }
              if(sOutputSection == 'Rank A'){this.results_a.push({section: sSection , category: sCategory , value: sValue})}
              if(sOutputSection == 'Rank B'){this.results_b.push({section: sSection , category: sCategory , value: sValue})}
              if(sOutputSection == 'Rank C'){this.results_c.push({section: sSection , category: sCategory , value: sValue})}
              if(sOutputSection == 'Rank D'){this.results_d.push({section: sSection , category: sCategory , value: sValue})}
              if(sOutputSection == 'Rank E'){this.results_e.push({section: sSection , category: sCategory , value: sValue})}
              if(sOutputSection == 'Rank F'){this.results_f.push({section: sSection , category: sCategory , value: sValue})}
              if(sOutputSection == 'Rank G'){this.results_g.push({section: sSection , category: sCategory , value: sValue})}
              if(sOutputSection == 'Rank H'){this.results_h.push({section: sSection , category: sCategory , value: sValue})}
              if(sOutputSection == 'Rank I'){this.results_i.push({section: sSection , category: sCategory , value: sValue})}
              if(sOutputSection == 'Rank J'){this.results_j.push({section: sSection , category: sCategory , value: sValue})}
              //alert('Details: ' + buff[i])  
            }  
          }
        }  
      })
      // end asynch
      })();

      this.componentKey = 1;  
      this.$bus.$emit('UPDATE_LINECHART_LABELS', this.ts_labels)
      this.$bus.$emit('UPDATE_LINECHART_DATA', this.ts_open)
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
    getIntraDay () {
      // this.$forceUpdate();      
      this.axiosLoadIntraDay()
      
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
      if(iEnd > arraylength){iEnd = arraylength;}
      if(iBeg > iEnd){iBeg = iEnd;}

      var iCheck = this.ts_results.length   //this.ts_labels.length

      if(iCheck == undefined){return;}
      if(iCheck == 0){return;}

      var iGetPtr = iCheck-iBeg
      
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
    showChart () {
      this.chartShow = 1
      this.beginZero = false
      this.ts_high[0] = this.ts_results[0].high
      this.ts_high[1] = this.ts_results[1].high
      //alert('showChart: ' + this.ts_results[0].high)
      // alert('showChart:')
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
