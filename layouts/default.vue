<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" class="primary" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" class="red darken-2" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped" class="hidden-md-and-down">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed" class="hidden-md-and-down">
        <v-icon>mdi-minus</v-icon>
      </v-btn>

      <v-flex class="hidden-md-and-down" xs-none md4 lg3>
        <img src="PequaSoft.png" class="mx-4" alt="Forest" style="width:125px">
      </v-flex>

      <v-toolbar-title class="text-uppercase grey--text">
        <span class="white--text font-weight-light">Market Tracker</span>
        <span class="white--text">Pro</span>
      </v-toolbar-title>
      <v-spacer />

      <v-spacer></v-spacer>
      <v-flex class="hidden-sm-and-down" xs-none>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" class="red darken-2 white--text mr-3" v-on="on">Menu</v-btn>
          </template>
          <v-list class="red darken-1">
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
              <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-flex>
      <span v-if="LoginStatus === 1" text color="white" class="font-weight-bold" @click="showModal3">{{ sUID }}</span>
      <v-flex class="hidden-sm-and-down" right xs-none md1 lg1>
        <v-icon v-if="LoginStatus === 1" right @click="showModal3">mdi-account</v-icon>
      </v-flex>
      <v-btn v-if="LoginStatus === 0" text color="white" @click="showModal">
        <span>Login</span>
      </v-btn>

      <v-btn v-if="LoginStatus === 0" text color="white" @click="showModal2">
        <span>Register</span>
      </v-btn>

      <v-btn text color="white" @click="logout">
        <span v-if="LoginStatus === 1">Sign Out</span>
        <v-icon v-if="LoginStatus === 1" right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" class="red darken-2" app>
      <v-flex class="hidden-sm-and-down " xs11 md11 xl11>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-flex>
      <v-layout row wrap justify-center>
        <v-flex class="hidden-sm-and-down right" xs1 md1 xl1>
          <img src="smallicon.png" alt="Forest" style="width:22px">
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      isModalVisible: false,
      sUID: '',
      sPWD: '',
      LoginStatus: 0,
      links: [
        { icon: 'dashboard', text: 'Market Tracker', route: '/indices' },
        { icon: 'dashboard', text: 'Technical', route: '/technical' },
        { icon: 'dashboard', text: 'Stocks', route: '/stocksymbol' },
        { icon: 'dashboard', text: 'Sector', route: '/sector' },
        { icon: 'business', text: 'Foreign Exchange', route: '/forex' },
        { icon: 'home', text: 'About', route: '/About' }
      ],
      items: [
        {
          icon: 'mdi-human-greeting',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-poll',
          title: 'Market Tracker',
          to: '/indices'
        },
        {
          icon: 'mdi-bank',
          title: 'Stocks',
          to: '/stocksymbol'
        },
        {
          icon: 'mdi-equalizer',
          title: 'Technical',
          to: '/technical'
        },        
        {
          icon: 'mdi-apps',
          title: 'Sectors',
          to: '/sector'
        },        
        {
          icon: 'mdi-calculator',
          title: 'Foreign Exchange',
          to: '/forex'
        },
         {
          icon: 'mdi-home',
          title: 'About',
          to: '/About'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'LoanMaster'
    }
  },
  metaInfo: {
    title: 'Home',
    meta: [
      { vmid: 'og:title', property: 'og:title', content: 'Loan Master Menu' },
      { vmid: 'og:site_name', property: 'og:site_name', content: 'LoanMaster' },
      { vmid: 'og:type', property: 'og:type', content: 'Website' },
      { vmid: 'og:url', property: 'og:url', content: 'https://pequasoft.com' },
      { vmid: 'og:description', property: 'og:description', content: 'This is where users can view the site' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@pequasoft' },
      { name: 'twitter:title', content: 'Menu Page' },
      { name: 'twitter:description', content: 'This is where users can view the site.' },
      { name: 'twitter:url', content: 'https://twitter.com/PequaSoft' },
      { name: 'twitter:domain', content: 'PequaSoft' },
      { itemprop: 'name', content: 'Menu Page' },
      { itemprop: 'description', content: 'This is where users can view the site.' },
      { itemprop: 'image', content: 'https://pequasoft.com' }
    ]
  },
  computed: mapGetters({
    xUID: 'globalData/get_uid',
    xPWD: 'globalData/get_pwd',
    xAxios: 'globalData/get_axios',
    xemail: 'globalData/get_email',
    xAlphaKey: 'globalData/get_AlphaKey',
    xAccountStatus: 'globalData/get_AccountStatus',
    xLoginStatus: 'globalData/get_LoginStatus'
  }),
  created () {
    this.$bus.$on('BUS_LOANPMTS', (data) => {
      // console.log('Received BUS_LOANPMTS ' + data)
      // alert('Received BUS_LOANPMTS-' + data);
      this.Calc_numpmts = data
    })
    this.$bus.$on('HDR_CONFIRMED', (data) => {
      this.$store.state.store_login_status = 0
      this.LoginStatus = this.$store.state.store_login_status
      this.$bus.$emit('HDR_CLEARSTAYLOGGEDIN', 'abc')
      this.$bus.$emit('HDR_CLEAR', 'abc')
    })
    this.$bus.$on('EXIT_LOGIN', (parUID, parPWD) => {
      // alert('EXIT_LOGIN: ' + parUID + '|' + parPWD)
      this.sUID = parUID
      this.sPWD = parPWD
      this.LoginStatus = 1
      // alert('EXIT_LOGIN: ' + this.xLoginStatus)
      // console.log('HDR_LOGIN')
    })
    this.$bus.$on('EXIT_REGISTER', (data) => {
      this.sUID = this.$store.state.store_uid
      this.sPWD = this.$store.state.store_pwd
      this.LoginStatus = this.$store.state.store_login_status
      // console.log('HDR_REGISTER')
    })
   
  },
  mounted () {
    
    //var abc = this.$cookies.get('PS_bStayLoggedIn')
    //var uid = this.$cookies.get('PS_UID')
    //var pwd = this.$cookies.get('PS_PWD')

    const formData = new FormData()
    formData.append('user', JSON.stringify('user'))
    formData.append('newloan', JSON.stringify('newloan'))
     
    this.$store.commit('globalData/loadCcy',this.xAxios)
    
    /*
    axios.post(this.xAxios + 'xcurrency', formData).then((res) => {
      //var result = this.prepString(JSON.stringify(res.data))
      //var sBBuff = result.split(",")

      var sBBuff = this.prepString(JSON.stringify(res.data))

        for (let i = 1; i < sBBuff.length; i++) {
          //alert('Ccy Item Buff-'+ sBBuff[i].substring(7))
          this.$store.commit('globalData/addNewCcy', sBBuff[i].substring(7))
        }

       })
      */
      this.$store.commit('globalData/loadTech')
      this.$store.commit('globalData/loadIndex')
      this.$bus.$emit('LOAD_INITIAL', 'abc')
      /*
      axios.post(this.xAxios + 'xtechlist', formData).then((res) => {
        //var result = this.prepString(JSON.stringify(res.data))
        //var sBBuff = result.split(",")
        var sBBuff = this.prepString(JSON.stringify(res.data))

        for (let i = 1; i < sBBuff.length; i++) {
          //alert('Ccy Item Buff-'+ sBBuff[i].substring(7))
          this.$store.commit('globalData/addNewTech', sBBuff[i].substring(8))
        }
       })
      */
    },
  
  methods: {
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
    prepString (parInput) {
      var result = parInput;
      result = this.cleanString(result,92)
      result = this.cleanString(result,34)
      result = this.cleanString(result,39)
        
      result = result.replace("rows","")
        
      result = this.cleanString(result,123)
      result = this.cleanString(result,125)
      result = this.cleanString(result,133)
      result = this.cleanString(result,135)
      result = this.cleanString(result,58)

      result = result.replace("[","")
      result = result.replace("]","")
      var sBBuff = result.split(",")

      return sBBuff;
    },

    showModal () {
      // console.log('created-1')
      this.isModalVisible = true
      this.$bus.$emit('HDR_LOGIN', 'abc')
      // alert('Show Modal');
    },
    showModal2 () {
      this.isModalVisible = true
      this.$bus.$emit('HDR_REGISTER', 'abc')
      // alert('Show Modal');
    },
    showModal3 () {
      this.isModalVisible = true
      // bus.$emit('EDIT_PROFILE', 'abc');
      this.$bus.$emit('HDR_PROFILE', 'abc')
      // bus.$emit('HDR_PROFILE_1', 'abc')
    },
    closeModal () {
      this.isModalVisible = false
    },
    logout () {
      // alert('Signout')
      this.$store.commit('globalData/setUID', '')
      this.$store.commit('globalData/setPWD', '')
      this.$store.commit('globalData/setLoginStatus', 0)
      this.sUID = ''
      this.sPWD = ''
      this.LoginStatus = 0
      this.$cookies.set('PS_bStayLoggedIn', 'false', 1)
      // this.$cookie.set('PS_bStayLoggedIn', 'false', 1)

      this.$bus.$emit('HDR_CONFIRMCLEAR', 'abc')
    }
  }

}
</script>
