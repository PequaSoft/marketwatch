<template>
  <div class="dashboard">
    <v-btn color="primary" @click="showModal" hidden>Open Modal !!</v-btn>
    <v-container>
      <v-flex xs12 md10 xl6 class="mx-auto">
        <v-layout row justify-center>
          <h1 class="subheading grey--text" justify-center>All Loans</h1>
        </v-layout>

        <v-container grid-list-md>
          <v-layout row justify-space-between>
            <v-flex md2>
              <span class="body-2">Sort By:</span>
            </v-flex>
            <v-flex class="hidden-sm-and-down" md2>
              <v-btn small color="grey" style="width: 110px;" dark @click="sortBy('loanid', 1)"><v-icon dark small left>mdi-alphabetical</v-icon><span class="caption text-lowercase">loan name</span></v-btn>
            </v-flex>
            <v-flex class="hidden-md-and-up" md2>
              <v-btn small color="grey" dark @click="sortBy('loanid', 1)"><v-icon small center>mdi-alphabetical</v-icon></v-btn>
            </v-flex>
            <v-flex class="hidden-sm-and-down" md2>
              <v-btn small color="grey" style="width: 110px;" dark @click="sortBy('dtStart', 2)"><v-icon small left>mdi-calendar-range</v-icon><span class="caption text-lowercase">start date</span></v-btn>
            </v-flex>
            <v-flex class="hidden-md-and-up" md2>
              <v-btn small color="grey" dark @click="sortBy('dtStart', 2)"><v-icon small center>mdi-calendar-range</v-icon></v-btn>
            </v-flex>
            <v-flex class="hidden-sm-and-down" md2>
              <v-btn small color="grey" style="width: 110px;" dark @click="sortBy('balance', 3)"><v-icon small left>mdi-scale</v-icon><span class="caption text-lowercase">balance</span></v-btn>
            </v-flex>
            <v-flex class="hidden-md-and-up" md2>
              <v-btn small color="grey" dark @click="sortBy('balance', 3)"><v-icon small center>mdi-alpha</v-icon></v-btn>
            </v-flex>
            <v-flex class="hidden-sm-and-down" md2>
              <v-chip color="yellow darken-4" @click="showAddLoan" text-color="white">Add Loan<v-icon right>mdi-plus</v-icon></v-chip>
            </v-flex>
            <v-flex class="hidden-md-and-up" md2>
              <v-chip class="ma-2" color="yellow darken-4" @click="showAddLoan" text-color="white"><v-icon center>mdi-clock</v-icon></v-chip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>

      <v-flex xs12 md10 xl6 class="mx-auto">
        <v-card v-for="loan in storeLoans" :key="loan.loanid" outlined class="mx-auto">
          <v-layout pl-3 row wrap justify-center>
            <v-flex class="hidden-sm-and-down" pa-2 xs3 md6>
              <div class="caption grey--text mx-auto">Loan Name</div>
              <div id="loanid" :title="`${loan.loanid}`">{{ loan.loanid }} </div>
            </v-flex>

            <v-flex class="hidden-md-and-up" pa-2 xs3 md6>
              <div class="caption grey--text mx-auto">Loan Name</div>
              <div class="caption">{{ loan.loanid }} </div>
            </v-flex>

            <v-flex class="hidden-sm-and-down" pa-2 xs3 md2>
              <div class="caption grey--text">Start Date</div>
              <div>{{ loan.StartDate }}</div>
              <div hidden>{{ loan.dtStart }}</div>
            </v-flex>

            <v-flex class="hidden-md-and-up" pa-2 xs3 md2>
              <div class="caption grey--text">Start Date</div>
              <div class="caption">{{ loan.StartDate }}</div>
              <div hidden>{{ loan.dtStart }}</div>
            </v-flex>

            <v-flex class="hidden-sm-and-down" pa-2 xs3 md2>
              <div class="caption grey--text">Balance</div>
              <div>{{ loan.balance | commaDisplay2 }}</div>
            </v-flex>

            <v-flex class="hidden-md-and-up" pa-2 xs3 md2>
              <div class="caption grey--text">Balance</div>
              <div class="caption">{{ loan.balance | commaDisplay0 }}</div>
            </v-flex>

            <v-flex class="hidden-sm-and-down" pa-2 xs3 md2>
              <div class="caption grey--text">Rate</div>
              <div>{{ loan.rate | commaDisplay4 }}</div>
            </v-flex>

            <v-flex class="hidden-md-and-up" pa-2 xs3 md2>
              <div class="caption grey--text">Rate</div>
              <div class="caption">{{ loan.rate | commaDisplay4 }}</div>
            </v-flex>
          </v-layout>
          <v-layout row wrap justify-center>
            <v-flex xs2 md2>
              <v-chip class="ma-3" style="width: 72px;" small color="blue" @click="showCopyLoan(`${loan.loanid}`)" text-color="white">Copy<v-icon x-small right>mdi-content-copy</v-icon></v-chip>
            </v-flex>
            <v-divider class="mx-2 white" inset vertical></v-divider>
            <v-flex xs2 md2 class="hidden-sm-and-down">
              <v-chip class="ma-3" small color="red" @click="showDeleteLoan(`${loan.loanid}`)" text-color="white">Delete<v-icon small right>mdi-delete</v-icon></v-chip>
            </v-flex>
            <v-flex xs2 md2 class="hidden-md-and-up">
              <v-chip class="ma-3" style="width: 72px;" small color="red" @click="showDeleteLoan(`${loan.loanid}`)" text-color="white">Del<v-icon small right>mdi-delete</v-icon></v-chip>
            </v-flex>
            <v-divider class="mx-2 white" inset vertical></v-divider>
            <v-flex xs2 md2>
              <v-chip class="ma-3" style="width: 72px;" small color="primary" @click="showEditLoan(`${loan.loanid}`)" text-color="white">Edit<v-icon small right>mdi-lead-pencil</v-icon></v-chip>
            </v-flex>
            <v-divider class="mx-2 white" inset vertical></v-divider>
            <v-flex xs2 md2 class="hidden-sm-and-down">
              <v-chip class="ma-3" small color="green" @click="showCalcLoan(`${loan.loanid}`)" text-color="white">Calculate<v-icon small right>mdi-play</v-icon></v-chip>
            </v-flex>
            <v-flex xs2 md2 class="hidden-md-and-up">
              <v-chip class="ma-3" style="width: 72px;" small color="green" @click="showCalcLoan(`${loan.loanid}`)" text-color="white">Calc<v-icon small right>mdi-play</v-icon></v-chip>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card>
      </v-flex>
    </v-container>
    <loginModal v-show="isLoginVisible" @close="closeLogin" />
    <profileModal v-show="isProfileVisible" @close="closeProfile" />
    <registerModal v-show="isRegisterVisible" @close="closeRegister" />
    <addloanModal v-show="isAddLoanVisible" @close="closeAddLoan" />
    <deleteloanModal v-show="isDeleteLoanVisible" @close="closeDeleteLoan" />
    <calcloanModal v-show="isCalcLoanVisible" @close="closeCalcLoan" />
    <copyloanModal v-show="isCopyLoanVisible" @close="closeCopyLoan" />
    <editloanModal v-show="isEditLoanVisible" @close="closeEditLoan" />

  </div>
</template>

<script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
<script src="sweetalert2.all.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
<script src="sweetalert2.min.js"></script>

<script>
import { mapGetters } from 'vuex'
import loginModal from '@/components/Modal_Login.vue'
import profileModal from '@/components/Modal_Profile.vue'
import registerModal from '@/components/Modal_Register.vue'
import addloanModal from '@/components/Modal_AddLoan.vue'
import deleteloanModal from '@/components/Modal_DeleteLoan.vue'
import calcloanModal from '@/components/Modal_CalcLoan.vue'
import copyloanModal from '@/components/Modal_CopyLoan.vue'
import editloanModal from '@/components/Modal_EditLoan.vue'
import Swal from 'sweetalert2'
import numeral from 'numeral'
import axios from 'axios'

export default {
  name: 'Modal',
  components: {
    loginModal,
    profileModal,
    registerModal,
    addloanModal,
    deleteloanModal,
    calcloanModal,
    copyloanModal,
    editloanModal
  },
  data () {
    return {
      isLoginVisible: false,
      isProfileVisible: false,
      isRegisterVisible: false,
      ssrcLoanName: '',
      snewLoanName: '',
      snewLoanStatus: 0,
      sExternalLogin: 0,
      nonblankRules: [v => !!v || 'The input is required'],
      sUID: '',
      sPWD: '',
      sortKey: 1,
      sortDirection: 0,
      isAddLoanVisible: false,
      isDeleteLoanVisible: false,
      isCopyLoanVisible: false,
      isEditLoanVisible: false,
      isCalcLoanVisible: false,
      srcLoan: '--',
      isOpen: false,
      blogs: [],
      search: '',
      user: '',
      message: '',
      storeLoans: []
    }
  },
  computed: mapGetters({
    xUID: 'globalData/get_uid',
    xPWD: 'globalData/get_pwd',
    xAxios: 'globalData/get_axios',
    xemail: 'globalData/get_email',
    xAccountStatus: 'globalData/get_AccountStatus',
    xLoginStatus: 'globalData/get_LoginStatus',
    xExternalLogin: 'globalData/get_ExternalLogin',
    xStoreLoans: 'globalData/get_StoreLoans',
    xFullLoan: 'globalData/get_FullLoan'
  }),
  metaInfo: {
    title: "ListLoans",
    meta: [
      { vmid: 'og:title', property: 'og:title', content: 'Loan Master Page' },
      { vmid: 'og:site_name', property: 'og:site_name', content: 'LoanMaster' },
      { vmid: 'og:type', property: 'og:type', content: 'Website'},
      { vmid: 'og:url', property: 'og:url', content: 'https://pequasoft.com/LoanMaster'},
      { vmid: 'og:description', property: 'og:description', content: 'This is where users can view their loans'},
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@pequasoft' },
      { name: 'twitter:title', content: 'Loan Master Page' },
      { name: 'twitter:description', content: 'This is where users can view their loans.' },
      { name: 'twitter:url', content: 'https://twitter.com/PequaSoft' },
      { name: 'twitter:domain', content: 'PequaSoft' },
      { itemprop: 'name', content: 'Loan Master Page' },
      { itemprop: 'description', content: 'This is where users can view their loans.' },
      { itemprop: 'image', content: 'https://pequasoft.com/LoanMaster' }
    ]
  },
  filters: {
  commaDisplay0 (value) {
    if (!value) return ''
    var buff = numeral(value).format('0,0');
    return buff;
    },
  commaDisplay2 (value) {
    if (!value) return ''
    var buff = numeral(value).format('0,0.00');
    return buff;
    },
  commaDisplay4 (value) {
    if (!value) return ''
    var buff = numeral(value).format('0,0.0000');
    return buff;
    }
  },
  created () {
    this.$bus.$on('HDR_LOGIN', (data) => {
      this.$bus.$emit('ACTIVATE_LOGIN', 'abc')
      this.isLoginVisible = true
    })
    this.$bus.$on('HDR_REGISTER', (data) => {
      this.$bus.$emit('ACTIVATE_REGISTER', 'abc')
      this.isRegisterVisible = true
    })
    this.$bus.$on('HDR_PROFILE', (data) => {
      this.$bus.$emit('ACTIVATE_PROFILE', 'abc')
      this.isProfileVisible = true
    })
    this.$bus.$on('DELETE_CONFIRMED', (data) => {
      alert('Delete confirmed'+ data);
      // this.DoDeleteLoan (data)
      //alert('Delete confirmed'+ data);
    })
    this.$bus.$on('HDR_CONFIRMCLEAR', (data) => {
      // alert('Clear confirmed')
      this.$store.commit('globalData/loansClear')
      this.refreshLocalLoans()
    })
    this.$bus.$on('EXIT_LOGIN', (parUID, parPWD) => {

      if(this.xExternalLogin === 1){
        // alert('Guest Login: ' + parUID);
        this.$store.commit('globalData/setExternalLogin', 0)
        this.$store.commit('globalData/loansClear')
        this.xExternalLogin = 1
        this.xUID = parUID
        this.xPWD = parPWD
        this.sUID = parUID
        this.sPWD = parPWD
        this.axiosLoadLoans()
      }
    })
  },
  mounted () {
    this.sExternalLogin = this.xExternalLogin
    // alert('Mounted - ' + this.storeLoans.length);
    if (this.xStoreLoans.length > 0){
      this.refreshLocalLoans()
    }
    if (this.xStoreLoans.length === 0){
      // alert('Empty set')
    }

    if(this.xExternalLogin === 1){
      // alert('External Login: ' + this.xUID + '|' + this.xPWD)
      this.$store.commit('globalData/setExternalLogin', 0)
      this.sUID = this.xUID
      this.sPWD = this.xPWD
      this.axiosLoadLoans()
    }
  },
  methods: {
    axiosLoadLoans () {
      var token;
      token = localStorage.getItem("token")
      const formData = new FormData()

      formData.append("title", JSON.stringify(this.sUID))
      formData.append("content", JSON.stringify(this.sPWD))
      axios.post(this.xAxios + 'loadloans', formData).then((res) => {
        var result = JSON.stringify(res.data.rows)
        result = this.cleanString(result)
        var buff = this.cleanString(result)
        var buff2=buff.substring(1, buff.length)
        var blogsArray = []
        var jsonData = JSON.parse(buff2.substring(0,buff2.length - 1))
        this.$store.commit('globalData/loansClear')
        for (var i = 0; i < jsonData.length; i++) {
          var counter = jsonData[i]
          blogsArray.push(counter)
          var www = this.cleanString(JSON.stringify(counter))
          var zzz = { loanid: 'abc', StartDate: '2020-03-19'}
          this.$store.commit('globalData/add', counter)
        }
        if (blogsArray.length ) { this.storeLoans = blogsArray }

        this.sortDirection = 0
        this.sortBy('loanid', 1)
        this.sortDirection = 0
      })
    },
    refreshLocalLoans () {
      this.storeLoans =[]
      // alert('Refresh Local' + this.xStoreLoans.length)
      for (var i = 0; i < this.xStoreLoans.length; i++) {
        var counter = this.xStoreLoans[i]
        var result = JSON.stringify(counter)
        var www = this.cleanString(result)
        var yyy = www.substring(8,www.length-1)
        var z0, z1, z2, z3,z4, z5, z6, z7, z8, z9
        yyy = yyy.replace('"text"', '')
        yyy = yyy.replace(':{', '')
        yyy = yyy.replace('"loanid"', '')
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
        z0 = res[0].substring(3,res[0].length-1)
        z1 = res[1].substring(11,res[1].length-1)
        z2 = res[2].substring(9,res[2].length-1)
        z3 = res[3].substring(8,res[3].length-1)
        z4 = res[4].substring(13,res[4].length-1)
        z5 = res[5].substring(17,res[5].length-1)
        z6 = res[6].substring(8,res[6].length-0)
        z7 = res[7].substring(5,res[7].length-0)
        z8 = res[8].substring(8,res[8].length-0)
        z9 = res[9].substring(8,res[9].length-0)
        var zzz = { loanid: z0 , StartDate: z1, dtStart: z2, Method: z3, Periodicity: z4, RatePeriodicity: z5, balance: z6, rate: z7, numpmts: z8, payment: z9}
        this.storeLoans.push(zzz)
      }
    },
    close () {
      alert('close This:')
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
    closeCopyLoan () {
      this.isCopyLoanVisible = false
      // alert('copying 5')
      this.refreshLocalLoans()
      var oldSortdirection = this.sortDirection
      if (this.sortKey === 1){this.sortBy('loanid', 1)}
      if (this.sortKey === 2){this.sortBy('dtStart', 2)}
      if (this.sortKey === 3){this.sortBy('balance', 3)}

      this.sortDirection = oldSortdirection
    },
    closeAddLoan () {
      this.isAddLoanVisible = false
      this.refreshLocalLoans()
      var oldSortdirection = this.sortDirection
      if (this.sortKey === 1){this.sortBy('loanid', 1)}
      if (this.sortKey === 2){this.sortBy('dtStart', 2)}
      if (this.sortKey === 3){this.sortBy('balance', 3)}

      this.sortDirection = oldSortdirection
    },
    closeEditLoan () {
      this.isEditLoanVisible = false
      this.refreshLocalLoans()
      var oldSortdirection = this.sortDirection
      if (this.sortKey === 1){this.sortBy('loanid', 1)}
      if (this.sortKey === 2){this.sortBy('dtStart', 2)}
      if (this.sortKey === 3){this.sortBy('balance', 3)}

      this.sortDirection = oldSortdirection
    },
    closeDeleteLoan () {
      this.isDeleteLoanVisible = false
      // alert('exiting delete 1')
      this.refreshLocalLoans()
      // alert('exiting delete 2')
      var oldSortdirection = this.sortDirection
      if (this.sortKey === 1){this.sortBy('loanid', 1)}
      if (this.sortKey === 2){this.sortBy('dtStart', 2)}
      if (this.sortKey === 3){this.sortBy('balance', 3)}
      // alert('exiting delete 3')
      this.sortDirection = oldSortdirection
    },
    closeCalcLoan () {
      this.isCalcLoanVisible = false
    },
    showCopyLoan (parLoan) {
      this.$bus.$emit('ACTIVATE_COPYLOAN', parLoan)
      this.isCopyLoanVisible = true
    },
    showEditLoan (parLoan) {
      this.$store.commit('globalData/getFullLoan', parLoan)
      const FullLoan = this.xFullLoan
      // alert('edit - ' + FullLoan)
      this.$bus.$emit('ACTIVATE_EDITLOAN', FullLoan)
      this.isEditLoanVisible = true
    },
    showCalcLoan (parLoan) {
      this.$store.commit('globalData/getFullLoan', parLoan)
      const FullLoan = this.xFullLoan
      this.$bus.$emit('ACTIVATE_CALCLOAN', FullLoan)
      this.isCalcLoanVisible = true
    },
    showAddLoan () {
      this.$bus.$emit('ACTIVATE_ADDLOAN', 'abc')
      this.isAddLoanVisible = true
    },
    showDeleteLoan (parLoan) {
      this.$bus.$emit('ACTIVATE_DELETELOAN', parLoan)
      this.isDeleteLoanVisible = true
    },
    xshowDeleteLoan (parLoan) {
      var id = parLoan

      // var arrayLength = this.$store.state.store_loans.length;
      var sDelMsg = '<font face="verdana" color="black">Do you want to delete '+ id + '?</font>'

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
          this.$bus.$emit('DELETE_CONFIRMED', parLoan)
        }
      })
      // this.DoDeleteLoan('abc')
    },
    axiosDeleteLoan (parLoan) {
      // alert("myLogin!");
      const formData = new FormData()
      formData.append('user', JSON.stringify(this.$store.state.store_uid))
      formData.append('srcloan', JSON.stringify(parLoan))

      axios.post(this.xAxios + 'loandelete', formData).then(res => {
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
      //result = result + "'"
      //alert(result);
      return result;
    },
    axiosLoadProfile () {
      //alert("myProfile!");
      var token;
      token = localStorage.getItem("token")

      const formData = new FormData()

      formData.append("title", JSON.stringify(this.sUID));
      formData.append("content", JSON.stringify(this.sPWD))
      // alert("myProfile: " + this.sUID);
      axios.post(this.xAxios + 'loadprofile', formData).then(res => {
        var result = JSON.stringify(res.data.rows)
        result = this.cleanString(result)
        var buff = this.cleanString(result)

        var buff2=buff.substring(1, buff.length)
        var blogsArray = []
        //alert("myProfile: " + buff2.substring(0,buff2.length-1));
        console.log(buff2.substring(0,buff2.length-1))
        var jsonData = JSON.parse(buff2.substring(0,buff2.length-1))

        for (var i = 0; i < jsonData.length; i++) {
          var counter = jsonData[i];
          this.$store.state.store_pwd = counter.password
          this.$store.state.store_email = counter.email
          this.$store.state.store_AccountStatus = counter.AccountStatus
          // alert("my EMail: " + counter.email);
        }
        bus.$emit('EDIT_PROFILE', 'abc')
      })
    },
  sortBy(prop, key) {
    var tsort = this.sortDirection
    this.sortKey = key

    if(tsort == 0){this.storeLoans.sort((a,b) => a[prop] < b[prop] ? -1 : 1); this.sortDirection = 1;}
    if(tsort == 1){this.storeLoans.sort((a,b) => a[prop] > b[prop] ? -1 : 1); this.sortDirection = 0;}
    }
  }
}
</script>
