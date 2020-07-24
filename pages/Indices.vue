<template>
  <div class="dashboard ">
      <div align="center">
        <v-layout justify-center>
          <v-flex class="hidden-sm-and-down" md10>
          <h1 class="subheading grey--text text-center ">Market Watch</h1>
          </v-flex> 
          <v-flex class="hidden-sm-and-down" md1>
            <v-dialog v-model="modal2" :return-value.sync="sSearchSelect" persistent max-width="500px">
              <template v-slot:activator="{ on }">
                <v-chip color="yellow darken-4" v-show="xLoginStatus === 1" ref="dialog2" v-on="on" text-color="white">Add item<v-icon v-on="on" right>mdi-plus</v-icon></v-chip>
              </template>
              <v-card>
                <v-layout justify-center>
                  <v-card-title>Select Symbol</v-card-title>
                </v-layout>
                <v-divider></v-divider>
                <div style="padding: 15px;">
                  <v-layout row wrap style="height: 65px; width: 450px;" pl-3 justify-center>
                    <v-text-field hint="enter companny name" dense outlined style="height: 65px;" v-model="sSearch"></v-text-field>     
                    <v-btn text color="primary" @click="axiosLoadSearch">Search</v-btn>
                  </v-layout>
                    <div style="padding: 5px; height: 300px; text-align: left; overflow-y: scroll;">               
                      <v-layout row wrap style="width: 330px;" >
                        <v-list dense>
                          <v-subheader>Companies</v-subheader>
                            <v-list-item-group v-model="searchResults" color="primary">
                              <v-list-item v-for="(item, i) in searchResults" :key="i">
                                <v-list-item-content>
                                  <v-list-item-title v-text="item" v-model="sSearchSelect" @click="addSymbol(item)"></v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-layout>                                            
                    </div >
                  </div>
                <v-divider></v-divider>
                <v-spacer></v-spacer>
                <v-btn hidden text color="primary" @click="addSymbol(sSearchSelect)">OK</v-btn>
                <v-btn text color="primary" @click="modal2 = false">Cancel</v-btn>
              </v-card>
            </v-dialog>



          </v-flex> 
        </v-layout>        
      <v-layout row wrap justify-center>
        <v-flex>
                <v-card flat class="mx-auto" height="400" >
            
              <v-flex xs11 md12 lg11 >
                <v-tabs class="text-left" v-model="startupTab" background-color=rgb(230,230,235)>
                  <v-tab>Index</v-tab>
                  <v-tab>Futures</v-tab>
                  <v-tab>Currency</v-tab>
                  <v-tab>Crypto</v-tab>
                  <v-tab>Equities</v-tab>                      
                  <v-tab>Options</v-tab>                      
                  <v-tab>ETF</v-tab>                      
                  <v-tab>Mutual Funds</v-tab>                      
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md12 lg12 class="my-1">
                      <v-data-table id="IndicesTable_1" :headers="headers" :sort-by="['section']" :items="results_a" :items-per-page="10" class="elevation-1 fixed-header">
                        <template v-slot:item.actions="{ item }" v-slot:activator="{ on, attrs }">
                          <v-tooltip left v-model="toolTipView">View Item</v-tooltip>
                          <v-icon color="green darken-2" @mouseover="toolTipView = true" @mouseleave="toolTipView = false" @click="handleClick('INDEX',item)">mdi-format-list-bulleted-square</v-icon>
                          <v-tooltip left v-model="toolTipDelete">Delete Item</v-tooltip>
                          <v-icon color="red darken-2" @mouseover="toolTipDelete = true" @mouseleave="toolTipDelete = false" @click="deleteItem('INDEX',item)">mdi-delete</v-icon>
                        </template>
                      </v-data-table> 
                    </v-flex>   
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('IndicesTable_1','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md12 lg12 class="my-1">
                      <v-data-table id="IndicesTable_2" :headers="headers" :sort-by="['section']" :items="results_b" :items-per-page="10" class="elevation-1 fixed-header">
                        <template v-slot:item.actions="{ item }">
                          <v-tooltip left v-model="toolTipView">View Item</v-tooltip>
                          <v-icon color="green darken-2" @mouseover="toolTipView = true" @mouseleave="toolTipView = false" @click="handleClick('FUTURES',item)">mdi-format-list-bulleted-square</v-icon>
                          <v-tooltip left v-model="toolTipDelete">Delete Item</v-tooltip>
                          <v-icon color="red darken-2" @mouseover="toolTipDelete = true" @mouseleave="toolTipDelete = false" @click="deleteItem('FUTURES',item)">mdi-delete</v-icon>
                        </template>
                      </v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('IndicesTable_2','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md12 lg12 class="my-1">
                      <v-data-table id="IndicesTable_3" :headers="headers" :sort-by="['section']" :items="results_c" :items-per-page="10" class="elevation-1 fixed-header">
                        <template v-slot:item.actions="{ item }">
                          <v-tooltip left v-model="toolTipView">View Item</v-tooltip>
                          <v-icon color="green darken-2" @mouseover="toolTipView = true" @mouseleave="toolTipView = false" @click="handleClick('CURRENCY',item)">mdi-format-list-bulleted-square</v-icon>
                          <v-tooltip left v-model="toolTipDelete">Delete Item</v-tooltip>
                          <v-icon color="red darken-2" @mouseover="toolTipDelete = true" @mouseleave="toolTipDelete = false" @click="deleteItem('CURRENCY',item)">mdi-delete</v-icon>
                        </template>
                      </v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('IndicesTable_3','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md12 lg12 class="my-1">
                      <v-data-table id="IndicesTable_4" :headers="headers" :sort-by="['section']" :items="results_d" :items-per-page="10" class="elevation-1 fixed-header">
                        <template v-slot:item.actions="{ item }">
                          <v-tooltip left v-model="toolTipView">View Item</v-tooltip>
                          <v-icon color="green darken-2" @mouseover="toolTipView = true" @mouseleave="toolTipView = false" @click="handleClick('CRYPTOCURRENCY',item)">mdi-format-list-bulleted-square</v-icon>
                          <v-tooltip left v-model="toolTipDelete">Delete Item</v-tooltip>
                          <v-icon color="red darken-2" @mouseover="toolTipDelete = true" @mouseleave="toolTipDelete = false" @click="deleteItem('CRYPTOCURRENCY',item)">mdi-delete</v-icon>
                        </template>
                      </v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('IndicesTable_4','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item>                
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md12 lg12 class="my-1">
                      <v-data-table id="IndicesTable_5" :headers="headers" :sort-by="['section']" :items="results_e" :items-per-page="10" class="elevation-1 fixed-header">
                        <template v-slot:item.actions="{ item }">
                          <v-tooltip left v-model="toolTipView">View Item</v-tooltip>
                          <v-icon color="green darken-2" @mouseover="toolTipView = true" @mouseleave="toolTipView = false" @click="handleClick('EQUITY',item)">mdi-format-list-bulleted-square</v-icon>
                          <v-tooltip left v-model="toolTipDelete">Delete Item</v-tooltip>
                          <v-icon color="red darken-2" @mouseover="toolTipDelete = true" @mouseleave="toolTipDelete = false" @click="deleteItem('EQUITY',item)">mdi-delete</v-icon>
                        </template>
                      </v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('IndicesTable_5','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item>                
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md12 lg12 class="my-1">
                      <v-data-table id="IndicesTable_6" :headers="headers" :sort-by="['section']" :items="results_f" :items-per-page="10" class="elevation-1 fixed-header">
                        <template v-slot:item.actions="{ item }">
                          <v-tooltip left v-model="toolTipView">View Item</v-tooltip>
                          <v-icon color="green darken-2" @mouseover="toolTipView = true" @mouseleave="toolTipView = false" @click="handleClick('OPTIONS',item)">mdi-format-list-bulleted-square</v-icon>
                          <v-tooltip left v-model="toolTipDelete">Delete Item</v-tooltip>
                          <v-icon color="red darken-2" @mouseover="toolTipDelete = true" @mouseleave="toolTipDelete = false" @click="deleteItem('OPTIONS',item)">mdi-delete</v-icon>
                        </template>
                      </v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('IndicesTable_6','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item>                
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md12 lg12 class="my-1">
                      <v-data-table id="IndicesTable_7" :headers="headers" :sort-by="['section']" :items="results_g" :items-per-page="10" class="elevation-1 fixed-header">
                        <template v-slot:item.actions="{ item }">
                          <v-tooltip left v-model="toolTipView">View Item</v-tooltip>
                          <v-icon color="green darken-2" @mouseover="toolTipView = true" @mouseleave="toolTipView = false" @click="handleClick('ETF',item)">mdi-format-list-bulleted-square</v-icon>
                          <v-tooltip left v-model="toolTipDelete">Delete Item</v-tooltip>
                          <v-icon color="red darken-2" @mouseover="toolTipDelete = true" @mouseleave="toolTipDelete = false" @click="deleteItem('ETF',item)">mdi-delete</v-icon>
                        </template>
                      </v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('IndicesTable_7','sectordata')">Export to Excel</v-btn>                           
                    </div>
                  </v-card>
                </v-tab-item>                                
                <v-tab-item>
                  <v-card flat height="400">
                    <v-flex xs9 md12 lg12 class="my-1">
                      <v-data-table id="IndicesTable_8" :headers="mf_headers" :sort-by="['section']" :items="results_h" :items-per-page="10" class="elevation-1 fixed-header">
                        <template v-slot:item.actions="{ item }">
                          <v-tooltip left v-model="toolTipView">View Item</v-tooltip>
                          <v-icon color="green darken-2" @mouseover="toolTipView = true" @mouseleave="toolTipView = false" @click="handleClick('MUTUALFUNDS',item)">mdi-format-list-bulleted-square</v-icon>
                          <v-tooltip left v-model="toolTipDelete">Delete Item</v-tooltip>
                          <v-icon color="red darken-2" @mouseover="toolTipDelete = true" @mouseleave="toolTipDelete = false" @click="deleteItem('MUTUALFUNDS',item)">mdi-delete</v-icon>
                        </template>
                      </v-data-table> 
                    </v-flex>              
                    <div style="padding-top: 10px;">  
                     <v-btn color="primary" style="width: 200px;" @click="exportTableToExcel('IndicesTable_8','sectordata')">Export to Excel</v-btn>                           
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
    <indexModal v-show="isIndexVisible" @close="closeIndex" />
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
import indexModal from '@/components/Modal_Index.vue'
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
    indexModal,
    ChartLine
  },
  props: ["id"],
  data () {
    return {
      activeTab: `/intraday/${this.id}`,
      isLoginVisible: false,
      isProfileVisible: false,
      isRegisterVisible: false,
      isIndexVisible: false,
      modal2: false,
      itemsx: ['Per Year', 'Per Month', 'Per Quarter'],
      searchResults: ['msft', 'ibm', 'goog'],
      sSearch: '',
      sSearchSelect: '',  
      startupTab: '0',    
      Calc_principal: '0',
      Calc_rate: '0.0000',
      index: '^dji',
      sInterval: '1min',
      Calc_pmtsperyear: 12,
      Calc_numpmts: '0',
      Calc_pmt: '0.00',
      sYears: '0',
      sPmtsPeryear: 'Monthly',
      sPmts: '0',
      startupTab: 0,
      iCountdown: 0,
      activated: false,
      toolTipView: false,
      toolTipDelete: false,
      tabs: [
        { id: 1, name: "Task", route: `/intraday/task` },
        { id: 2, name: "Project", route: `/intraday/project` }
      ],
      items: ['btc', 'cad', 'chf', 'eur', 'usd'],
      interval: ['1min', '5min', '15min', '30min', '60min','Daily','Weekly','Monthly'],
      headers: [  { text: 'Item', align: 'left', sortable: false, value: 'section',class: 'primary white--text title' }, 
                  { text: 'Symbol', align: 'center', sortable: false, value: 'index',class: 'primary white--text title' }, 
                  { text: 'Market Time', align: 'center', sortable: false, value: 'category',class: 'primary white--text title' }, 
                  { text: 'Value', align: 'right', value: 'value',class: 'primary white--text title' }, 
                  { text: 'High', align: 'right', value: 'high',class: 'primary white--text title',visibility: 'hidden' }, 
                  { text: 'Low', align: 'right', value: 'low',class: 'primary white--text title' }, 
                  { text: 'Open', align: 'right', value: 'open',class: 'primary white--text title' }, 
                  { text: 'Volume', align: 'right', value: 'vol',class: 'primary white--text title' }, 
                  { text: 'Actions', align: 'center', value: 'actions',class: 'primary white--text title' }, ],
      mf_headers: [  { text: 'Item', align: 'left', sortable: false, value: 'section',class: 'primary white--text title' }, 
                  { text: 'Symbol', align: 'center', sortable: false, value: 'index',class: 'primary white--text title' }, 
                  { text: 'Market Time', align: 'center', sortable: false, value: 'category',class: 'primary white--text title' }, 
                  { text: 'Value', align: 'right', value: 'value',class: 'primary white--text title' }, 
                  { text: '52 Week High', align: 'right', value: 'high',class: 'primary white--text title',visibility: 'hidden' }, 
                  { text: '52 Week Low', align: 'right', value: 'low',class: 'primary white--text title' }, 
                  { text: 'YTD Return', align: 'right', value: 'open',class: 'primary white--text title' }, 
                  { text: 'Total Assets', align: 'right', value: 'vol',class: 'primary white--text title' },
                  { text: 'Actions', align: 'center', value: 'actions',class: 'primary white--text title' }, ],
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
      timer: null,
      totalTime: (25 * 60),
      resetButton: false,
      nonblankRules: [v => !!v || 'The input is required']
    }
  },
  computed: mapGetters({
    xUID: 'globalData/get_uid',
    xPWD: 'globalData/get_pwd',
    xAxios: 'globalData/get_axios',
    xForex: 'globalData/get_forex',
    xIndex: 'globalData/get_IndexList',
    xFullIndex: 'globalData/get_FullIndex',
    xLoginStatus: 'globalData/get_LoginStatus'
  }),
  /*
  timers: {
    log: { time: 3000, autostart: true }
  },
  */
  created () {
    this.$bus.$on('DELETE_CONFIRMED', (data) => {
      alert('Delete confirmed'+ data);
      // this.DoDeleteLoan (data)
      //alert('Delete confirmed'+ data);
    })
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
    this.$bus.$on('LOAD_INITIAL', (data) => {
      var arraylength = this.xIndex.length
      var myVar
      var iTest = 0
      //this.$store.commit('globalData/loadIndex')
      
      if(this.xIndex.length == 0){
        this.delayedCheck(500);
        //console.log('stop 1');
        //alert('stop 1');
      
      }
      
      //alert('Load Initial: ' + arraylength)
      //alert('Load Initial')
      this.iCountdown = 60;
      this.axiosAddUser()
      this.getIntraDay () 
    })

  },
  mounted () {
    // alert('Load Initial')
    this.results_a = [];  
    this.results_b = [];  
    this.results_c = [];  
    this.results_d = [];  
    this.results_e = [];  
    this.results_f = [];  
    this.results_g = [];  
    this.results_h = [];  
    this.results_i = [];  
    this.results_j = [];  

    this.iCountdown = 60;
    this.axiosAddUser()
    this.getIntraDay ()
     //this.$timer.start('log')
    this.startTimer(1)
  },
 
  methods: {
    handleClick(parQuote,value) {
      //alert('clicked - ' + JSON.stringify(value))
      //alert('clicked - ' + value.section)
    this.$store.commit('globalData/setTicker', value.index)
    this.$store.commit('globalData/setIndex', value.section)
    this.$store.commit('globalData/getFullIndex', value.index)
    
    var FullIndex = this.xFullIndex
    FullIndex = value.index + '|' + value.section + '|' + value.value + '|' + value.high + '|' + value.low + '|' + value.vol + '|' + value.open + '|' + parQuote
    //alert('launch - ' + FullIndex)
    this.isIndexVisible = true
    
    this.$bus.$emit('ACTIVATE_INDEX', FullIndex)    
    //this.highlightClickedRow(value);
    //this.viewDetails(value);
    },
    sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    },
    async delayedCheck(parMS) {
      var iTest = 0

      this.axiosAddUser()
      while(iTest < 100)
        {
          console.log('stop-'+ iTest + '|' + this.xIndex.length);
          await this.sleep(parMS);
          if(this.xIndex.length > 0){this.getIntraDay ();return;}
          iTest++
        }
     
      this.getIntraDay () 
    },

    async delayedCheckIndex(parSymbol,parMS) {
      var iTest = 0

      this.axiosAddUser()
      this.axiosLoadQuoteDB(parSymbol)
      while(iTest < 100)
        {
          console.log('stop-'+ iTest + '|' + this.xIndex.length);
          await this.sleep(parMS);
          //this.getIntraDay ();
          this.axiosLoadQuoteDB(parSymbol)
          //alert('checking: ' + iTest)
          if(this.results_e[this.results_e.length-1].value != '-'){return;}
          //if(this.xIndex.length > 0){this.getIntraDay ();return;}
          iTest++
        }
     
      this.getIntraDay () 
    },
   
    startTimer(parSeconds) {
      //alert('Start Timer')
      
      this.timer = setInterval(() => this.countdown(), parSeconds * 1000);
      
    },
    countdown: function() {
      //alert('Hello world')
      //console.log('Cant stop me now:' + this.iCountdown);
      if(this.iCountdown > 0){this.iCountdown--; }

      if(this.iCountdown == 0){
		    var offset = new Date().getTimezoneOffset();// getting offset to make time in gmt+0 zone (UTC) (for gmt+5 offset comes as -300 minutes)
		    var date = new Date();
		    date.setMinutes ( date.getMinutes() + offset);// date now in UTC time

		    var easternTimeOffset = -240; //for dayLight saving, Eastern time become 4 hours behind UTC thats why its offset is -4x60 = -240 minutes. So when Day light is not active the offset will be -300
		    date.setMinutes ( date.getMinutes() + easternTimeOffset);
		    var iDay = date.getDay()
		    var iHours = date.getHours()
		    //console.log('Blastoff:' + this.iCountdown);
        
        if(this.isIndexVisible == false){
        this.axiosAddUser()
        this.getIntraDay ()
        }

		    this.iCountdown = 60; 
		    if(iDay == 0){this.iCountdown = 600; }
		    if(iDay == 6){this.iCountdown = 600; }
		    if(iDay > 0 && iDay < 6){
			    if(iHours > 16 ){this.iCountdown = 600;}
			    if(iHours < 9 ){this.iCountdown = 600;}
		    }
	    }
    },
    axiosAddUser () {
      const formData = new FormData()
      var sBuff = JSON.stringify(this.xUID)
      var sUser

      sUser = sBuff
      sUser = sUser.replace('"','')
      sUser = sUser.replace('"','')

      // alert('update user:'+ sUser)
      if(sUser == '--'){sUser = '_Master'}

      //if(sUser == undefined){sUser = '_Master'}
      //alert('add user 1:' + this.xAxios + 'adduser')
      // alert('update user-'+ sUser)
      formData.append('title', sUser)
      formData.append('content', JSON.stringify(this.xPWD))

      axios.post(this.xAxios + 'adduser', formData).then((res) => {
        //alert('add user 2')
        let result = JSON.stringify(res.data.rows)
        
      })
    },    
    axiosLoadQuote (parIndex) {
      var token;
      token = localStorage.getItem("token")
      const formData = new FormData()

      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("index", parIndex)

      alert('return quote 1')
      //(async () => {  
      axios.post(this.xAxios + 'xquote', formData).then((res) => {
        alert('return quote 2')
        var result = JSON.stringify(res.data)
        
        result = this.cleanString(result,92)
        result = this.cleanString(result,34)
        result = this.cleanString(result,39)
        //alert('intraday: ' + result)
        //console.log(result);
        var cbuff = result.split("{")

        this.chartShow = 0
        this.beginZero = true
        
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
        var sCategory
        var sValue
        var sValuePt2
        var sValuePt3
        var arraylength = buff.length
        //alert('array length: ' + arraylength)
        for (let i = 0; i < arraylength; i++) {
          var commabuff = buff[i].split(":")
        
          sCategory = commabuff[0]
          sValue = commabuff[1]
          sValue = sValue.replace("}","")
          
          var sValBuff = numeral(sValue).format('0,0.0')
          if(sCategory == "shortName"){sSection = sValue}
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
        // if (parIndex == '^dji') {alert('array length: ' + parIndex + '|' + sSectionValue + '|' + sSectionHigh)}
        var sValBuff = numeral(sSectionValue).format('0,0.0')
        if(sQuoteType == 'CURRENCY'){sValBuff = numeral(sSectionValue).format('0,0.0000')}
        if(sQuoteType == 'CRYPTOCURRENCY'){sValBuff = numeral(sSectionValue).format('0,0.0000')}
        
        if(sQuoteType == 'INDEX'){this.DoIndex(this.results_a, parIndex, sSection , sSectionTime , sValBuff, numeral(sSectionHigh).format('0,0.0'), numeral(sSectionLow).format('0,0.0'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0'))}
        
        if(sQuoteType == 'FUTURE'){this.DoIndex(this.results_b, parIndex, sSection , sSectionTime , sValBuff, numeral(sSectionHigh).format('0,0.0'), numeral(sSectionLow).format('0,0.0'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0'))}

        if(sQuoteType == 'CURRENCY'){this.DoIndex(this.results_c, parIndex, sSection , sSectionTime , sValBuff, numeral(sSectionHigh).format('0,0.0000'), numeral(sSectionLow).format('0,0.0000'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0000'))}
        if(sQuoteType == 'CRYPTOCURRENCY'){this.DoIndex(this.results_c, parIndex, sSection , sSectionTime, sValBuff, numeral(sSectionHigh).format('0,0.0000'), numeral(sSectionLow).format('0,0.0000'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0000'))}
        
        if(sQuoteType == 'EQUITY'){this.DoIndex(this.results_d, parIndex, sSection , sSectionTime , sValBuff, numeral(sSectionHigh).format('0,0.0'), numeral(sSectionLow).format('0,0.0'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0'))}
        if(sQuoteType == 'OPTION'){this.DoIndex(this.results_g, parIndex, sSection , sSectionTime , numeral(sValBuff).format('0,0.00'), numeral(sSectionHigh).format('0,0.0'), numeral(sSectionLow).format('0,0.0'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0'))}

      })

    },
    axiosLoadQuoteDB (parIndex) {
      var token;
      var sOperation = 'loadindex';

      if (parIndex != 'abc'){sOperation = 'loadindexone'}
      token = localStorage.getItem("token")
      const formData = new FormData()
      var sUser = '_Master'
      if(this.xUID != '--' &&  this.xUID != undefined){sUser = this.xUID}

      formData.append("title", JSON.stringify(sUser))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("index", parIndex)
      //alert('found Token: ' + parIndex)
      //(async () => {  
      //if (parIndex != 'abc'){alert('Index One-b: ' + parIndex)}  
      //alert('return quote 1')
      axios.post(this.xAxios + sOperation, formData).then((res) => {
        //alert('axiosLoadQuoteDB')
        //alert('return quote 2')
        //if (parIndex != 'abc'){alert('Index One-b: ' + parIndex)}
        var result = JSON.stringify(res.data)
        
        result = this.cleanString(result,92)
        result = this.cleanString(result,34)
        result = this.cleanString(result,39)

        var cbuff = result.split("[{")
        var dbuff = cbuff[1].split("}")
        var buff = cbuff[1].split(",")

        var indexlength = dbuff.length
        var arraylength = buff.length
        // alert('buff' + indexlength);

        var sSymbol = ''
        var sSection = ''
        var sSectionCategory = ''
        var sSectionTime = ''
        var sQuoteType = ''
        var sSectionValue = 0
        var sSectionHigh = 0
        var sSectionLow = 0
        var sSectionOpen = 0
        var sSectionVol = 0
        var eBuff
        var fBuff
        
        for (let j = 0; j < indexlength; j++) {
          arraylength = dbuff[j].length
          eBuff = dbuff[j]
          eBuff = eBuff.replace(",{","")
          fBuff = eBuff.split(",")
          //alert('buff ' + j + '-' + eBuff);
          arraylength = fBuff.length
          //if(j == 1){alert('F-buff: ' + fBuff[0]);}
          for (let i = 0; i < arraylength; i++) {
            //alert('buff: ' + buff[i]);
            var colonbuff = fBuff[i].split(":")
            //var colonbuff = buff[i].split(":")
          
            var sCategory = colonbuff[0]
            var sValue = colonbuff[1]
            //alert('buff' + colonbuff[0] + '|' + colonbuff[1]);

            if(sCategory == "indexid"){sSymbol = sValue}
            if(sCategory == "indexdesc"){sSection = sValue}
            if(sCategory == "dtTimestamp"){
              sSectionTime = sValue + ':' + colonbuff[2];
              //if(colonbuff[2] != undefined){sSectionTime = sSectionTime + ':' + colonbuff[2];}
              if(colonbuff[3] != undefined){sSectionTime = sSectionTime + ':' + colonbuff[3];}
              }
            if(sCategory == "dValue"){sSectionValue = sValue;}

            if(sCategory == "dHigh"){sSectionHigh = sValue;}
            if(sCategory == "dLow"){sSectionLow = sValue;}
            if(sCategory == "dVolume"){sSectionVol = sValue;}
            if(sCategory == "dOpen"){sSectionOpen = sValue;}
            if(sCategory == "quotetype"){sQuoteType = sValue;}
          }
        var sValBuff = numeral(sSectionValue).format('0,0.0')

        //if (parIndex != 'abc'){alert('Index One: ' + sSymbol)}

        if(sQuoteType == 'CURRENCY'){sValBuff = numeral(sSectionValue).format('0,0.0000')}
        if(sQuoteType == 'CRYPTOCURRENCY'){sValBuff = numeral(sSectionValue).format('0,0.0000')}
        
        if(sQuoteType == 'INDEX'){this.DoIndex(this.results_a, sSymbol, sSection , sSectionTime , sValBuff, numeral(sSectionHigh).format('0,0.0'), numeral(sSectionLow).format('0,0.0'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0'))}
        
        if(sQuoteType == 'FUTURE'){this.DoIndex(this.results_b, sSymbol, sSection , sSectionTime , sValBuff, numeral(sSectionHigh).format('0,0.0'), numeral(sSectionLow).format('0,0.0'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0'))}

        if(sQuoteType == 'CURRENCY'){this.DoIndex(this.results_c, sSymbol, sSection , sSectionTime , sValBuff, numeral(sSectionHigh).format('0,0.0000'), numeral(sSectionLow).format('0,0.0000'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0000'))}
        if(sQuoteType == 'CRYPTOCURRENCY'){this.DoIndex(this.results_d, sSymbol, sSection , sSectionTime, sValBuff, numeral(sSectionHigh).format('0,0.0000'), numeral(sSectionLow).format('0,0.0000'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0000'))}
        if(sQuoteType == 'EQUITY'){this.DoIndex(this.results_e, sSymbol, sSection , sSectionTime, numeral(sValBuff).format('0,0.00'), numeral(sSectionHigh).format('0,0.00'), numeral(sSectionLow).format('0,0.00'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.00'))}
        if(sQuoteType == 'OPTION'){this.DoIndex(this.results_f, sSymbol, sSection , sSectionTime, sValBuff, numeral(sSectionHigh).format('0,0.0000'), numeral(sSectionLow).format('0,0.0000'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0000'))}
        if(sQuoteType == 'ETF'){this.DoIndex(this.results_g, sSymbol, sSection , sSectionTime, sValBuff, numeral(sSectionHigh).format('0,0.0000'), numeral(sSectionLow).format('0,0.0000'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0000'))}
        if(sQuoteType == 'MUTUALFUND'){this.DoIndex(this.results_h, sSymbol, sSection , sSectionTime, numeral(sValBuff).format('0,0.00'), numeral(sSectionHigh).format('0,0.00'), numeral(sSectionLow).format('0,0.00'), numeral(sSectionVol).format('0,0'), numeral(sSectionOpen).format('0,0.0000'))}
        }                

      })

    },    
    DoIndex (parArray, parIndex, parSection, parSectionTime,parVal,parHigh,parLow,parVol,parOpen) {
      var arraycount = parArray.length
      var sbuff

      sbuff = parSection // + ' [' + parIndex + ']'
      //alert('Count:' + arraycount)
      if(arraycount == 0){
        parArray.push({index: parIndex, section: parSection , category: parSectionTime , value: parVal, high: parHigh, low: parLow, vol: parVol, open: parOpen})
        return
      }

      for (let i = 0; i < arraycount; i++) {
        sbuff = parArray[i]
        //alert('Section:' + sbuff.section)
        if(sbuff.index == parIndex){
          parArray[i].category = parSectionTime
          parArray[i].value = parVal
          parArray[i].high = parHigh
          parArray[i].low = parLow
          parArray[i].open = parOpen
          parArray[i].vol = parVol
          return;
        }
        
      }

      parArray.push({index: parIndex, section: parSection , category: parSectionTime , value: parVal, high: parHigh, low: parLow, vol: parVol, open: parOpen})
      
    },
    delIndex (parArray, parIndex) {
      var arraycount = parArray.length
      var sbuff

      for (let i = 0; i < arraycount; i++) {
        sbuff = parArray[i]
        // alert('Section:' + sbuff.section)
        if(sbuff.index == parIndex){
          parArray.splice(i, 1)
          return;
        }
      }
      
    },
    IsNumber (parInput) {
      var source=parInput
      var result = 1
      for (var i = 0; i < parInput.length; i++) {
         
        if(source.charCodeAt(i) > 57){
          result=0
          return result
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
    getIntraDay () {
      var arraylength = this.xIndex.length
      //alert('array length: ' + arraylength)
      /*
      for (let i = 0; i < arraylength; i++) {
        var sToken = this.xIndex[i]
        //console.log('Index Load: '+ sToken);
        //this.axiosLoadQuoteDB(sToken)
      } 
      */
      this.axiosLoadQuoteDB('abc')
      //console.log('Index Length: '+ arraylength); 
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
      this.iCountdown = 60;
      this.axiosAddUser()
      this.getIntraDay () 
    },
    closeProfile () {
      this.isProfileVisible = false
    },
    closeRegister () {
      this.isRegisterVisible = false
    },
    closeIndex () {
      this.startTimer(1)
      this.isIndexVisible = false
    },
    showIndex () {
      //this.startTimer(3600)
      // this.$bus.$emit('ACTIVATE_LOANPMTS', 'abc')
      this.isIndexVisible = true
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
      axios.post(this.xAxios + 'ysearch', formData).then((res) => {
        // alert('return forex')
        // alert('search 3')
        
        var result = JSON.stringify(res.data)
        
        result = this.cleanString(result,92)
        result = this.cleanString(result,34)
        result = this.cleanString(result,39)
        var aBuff = result.split("[{")
        // alert('y search-' + aBuff[1])

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

        //var sBbuff = result.split("{")
        var sBbuff = aBuff[1].split(",{")
        var sTbuff = sBbuff[0].split("}")
        //console.log(response.data);
        //alert('y search-' + sTbuff)
        var arraylength = sBbuff.length
        var ptr = 0;
        /*
        while (this.searchResults.length) {
          this.searchResults.pop();
        }
        */

        for (let i = 0; i < arraylength; i++) {
          var xBbuff = sBbuff[i].split(",")
          var wBbuff = xBbuff[0].split(":")
          var uBbuff = xBbuff[1].split(":")
          var nBuff = JSON.stringify(xBbuff)

          nBuff = this.cleanString(nBuff,91)
          nBuff = this.cleanString(nBuff,93)
          nBuff = this.cleanString(nBuff,34)
          nBuff = this.cleanString(nBuff,125)

          var typeBbuff = this.getTokenValue(nBuff,'typeDisp','0');

          //alert('y buff-' + wBbuff[1] + '-'+ uBbuff[1])

          var sSearchItem = wBbuff[1] +'-' + uBbuff[1]  + ' [' + typeBbuff + ']'
          this.searchResults.push(sSearchItem)
         
          ptr++;
        }
        this.loadData = 1;
        // ChartLine.changeData(5)
       
      })
      })();
      
    },
    addSymbol (parSymbol) {
      const formData = new FormData()
      var addSymbol =  parSymbol.split("-")
      var TypeSymbol =  parSymbol.split("[")
      var arraylength = this.xIndex.length
      
      var sSymbol = addSymbol[0]
      var sSection = addSymbol[1]
      var sQuoteType = TypeSymbol[1]
      var cleanupSection =  sSection.split("[")
      sSection = cleanupSection[0].trimRight()
      
      sQuoteType = this.cleanString(sQuoteType,91)
      sQuoteType = this.cleanString(sQuoteType,93)
      sQuoteType = sQuoteType.toUpperCase()
      var sSectionTime = ''
      //alert('Symbol-' + sSymbol + '|' + sSection + '|' + sQuoteType + '|' + arraylength)  

      for (let i = 0; i < arraylength; i++) {
        //alert('test Symbol-' + addSymbol[0] + '|' + this.xIndex[i])
        //if(i > 25){alert('Symbol-' + this.xIndex[i])}
        if(sSymbol == this.xIndex[i].toUpperCase()){
          //alert('Duplicate Symbol-' + addSymbol[0])  
          //return
          Swal.fire({
            title: '<font face="verdana" color="red">Symbol Exists</font>',
            html: '<font face="verdana" color="black">Symbol already exists.</font>',
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
          return;
        }

      }

      this.$store.commit('globalData/addIndex', sSymbol)
        
      if(sQuoteType == 'INDEX'){this.DoIndex(this.results_a, sSymbol, sSection , sSectionTime , '-', '-', '-', '-', '-'); this.startupTab = 0;}
      if(sQuoteType == 'FUTURE'){this.DoIndex(this.results_b, sSymbol, sSection , sSectionTime , '-', '-', '-', '-', '-'); this.startupTab = 1;}

      if(sQuoteType == 'CURRENCY'){this.DoIndex(this.results_c, sSymbol, sSection , sSectionTime ,  '-', '-', '-', '-', '-'); this.startupTab = 2;}
      if(sQuoteType == 'CRYPTOCURRENCY'){this.DoIndex(this.results_d, sSymbol, sSection , sSectionTime,  '-', '-', '-', '-', '-'); this.startupTab = 3;}
      if(sQuoteType == 'EQUITY'){this.DoIndex(this.results_e, sSymbol, sSection , sSectionTime,  '-', '-', '-', '-', '-'); this.startupTab = 4;}
      if(sQuoteType == 'OPTION'){this.DoIndex(this.results_f, sSymbol, sSection , sSectionTime,  '-', '-', '-', '-', '-'); this.startupTab = 5;}
      if(sQuoteType == 'ETF'){this.DoIndex(this.results_g, sSymbol, sSection , sSectionTime,  '-', '-', '-', '-', '-'); this.startupTab = 6;}
      if(sQuoteType == 'MUTUALFUND'){this.DoIndex(this.results_h, sSymbol, sSection , sSectionTime,  '-', '-', '-', '-', '-'); this.startupTab = 7;}

      this.modal2 = false

      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("Index", sSymbol)
      

      axios.post(this.xAxios + 'indexadd', formData).then(res => {
        var resultx = JSON.stringify(res.data.rows)
        this.axiosLoadQuoteDB('abc')
      })

      if(this.results_e[this.results_e.length-1].value == '-'){
        //alert('Symbol missing: '+ this.results_e[this.results_e.length-1].value)  
        this.delayedCheckIndex(sSymbol,500);
      }

      Swal.fire({
            title: '<font face="verdana" color="red">Symbol Added</font>',
            html: '<font face="verdana" color="black">Item ' + sSection + ' Added to the ' + sQuoteType + ' Section</font>',
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          })
          
      this.axiosLoadQuoteDB('abc')
      //alert('Add Symbol-' + sSymbol + '|'+ sQuoteType)

    },
    async confirm(message) {
        
    return Swal({
        title: 'Delete',
        text: message,
        buttons: true
    });
    
    },
    deleteItem (parQuote,parItem){
      var select = this;
      //alert('Delete Symbol-' + parItem.index)
      var sDelMsg = 'Delete: '+ parItem.section + ' - Are you sure?'

      if (!confirm(sDelMsg)) {
        return;
      }

      const formData = new FormData()    
          
      formData.append("title", JSON.stringify(this.xUID))
      formData.append("content", JSON.stringify(this.xPWD))
      formData.append("Index", parItem.index)
      
      axios.post(this.xAxios + 'indexdelete', formData).then(res => {
            var resultx = JSON.stringify(res.data.rows)
          })
      
      if(parQuote == 'INDEX'){this.delIndex(this.results_a, parItem.index)}
      if(parQuote == 'FUTURE'){this.delIndex(this.results_b, parItem.index)}

      if(parQuote == 'CURRENCY'){this.delIndex(this.results_c, parItem.index)}
      if(parQuote == 'CRYPTOCURRENCY'){this.delIndex(this.results_d, parItem.index)}
      if(parQuote == 'EQUITY'){this.delIndex(this.results_e, parItem.index)}
      if(parQuote == 'OPTION'){this.delIndex(this.results_f, parItem.index)}
      if(parQuote == 'ETF'){this.delIndex(this.results_g, parItem.index)}
      if(parQuote == 'MUTUALFUND'){this.delIndex(this.results_h, parItem.index)}

      alert('Deleted Symbol-' + parItem.index)    

      /*
      Swal.fire({
        title: '<font face="verdana" color="red">Delete Loan  ?</font>',
        html: sDelMsg,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
        }).then(function(isConfirm){
          var res=JSON.stringify(isConfirm.value)
          
        if (res === 'true') {
          
          alert('pre-Delete Symbol-' + parItem.index)
          this.$bus.$emit('DELETE_CONFIRMED', 'parItem.index') 
          this.deleteItemDB(parItem.index)  
        
          const formData = new FormData()    
          
          formData.append("title", JSON.stringify(this.xUID))
          //alert('Delete Symbol-' + parItem.index)
          formData.append("content", JSON.stringify(this.xPWD))
          formData.append("Index", parItem.index)
        
          axios.post(this.xAxios + 'indexdelete', formData).then(res => {
            var resultx = JSON.stringify(res.data.rows)
          })

        }
      })
      */

    },
    deleteItemDB (parSymbol){
        alert('Delete Symbol B-' + parSymbol)

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
