<template>
  <div class="dashboard ">
    <v-layout class="my-5" justify-center>
      <h1 class="subheading grey--text text-center">About MarketWatch</h1>
    </v-layout>
    <v-flex light xs11 md8 xl6 class="mx-auto" pa-2>
      <v-card light outlined :elevation="2" class="px-4" router to="/indices">
        <v-layout pl-3 row wrap justify-center>
          <v-list-item-title class="headline">MarketWatch</v-list-item-title>
          <div class="indigo--text mx-auto">
            <span>
              This is an application that can track the activity of market indices and stock symbols. 
              Symbols are grouped into the following categories: Index, Futures, Currency, CryptoCurrency, Equities, Options, ETF, Mutual Funds. 
              Activity is refreshed every 1 minute during market trading hours and every 10 minutes during off hours.
              Users can add/delete to the symbols being tracked. 
            </span>
          </div>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs11 md8 xl6 class="mx-auto" pa-2>
      <v-spacer></v-spacer>
      <v-card light outlined :elevation="2" class="px-4" router to="/stocksymbol">
        <v-layout pl-3 row wrap justify-center>
          <v-list-item-title class="headline">Stocks</v-list-item-title>
          <div class="indigo--text mx-auto">
            <span>
              This is an application that the user can select a stock symbol and view in depth time series data.
            </span>
          </div>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs11 md8 xl6 class="mx-auto" pa-2>
      <v-spacer></v-spacer>
      <v-card light outlined :elevation="2" class="px-4" router to="/technical">
        <v-layout pl-3 row wrap justify-center>
          <v-list-item-title class="headline">Technical</v-list-item-title>
          <div class="indigo--text mx-auto">
            <span>
              This is an application that the user can select a stock symbol and view in depth technical time series data.
            </span>
          </div>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs11 md8 xl6 class="mx-auto" pa-2>
      <v-spacer></v-spacer>
      <v-card light outlined :elevation="2" class="px-4" router to="/sector">
        <v-layout pl-3 row wrap justify-center>
          <v-list-item-title class="headline">Sectors</v-list-item-title>
          <div class="indigo--text mx-auto">
            <span>
              This is an application that the user can view market sector data over various time lengths.
            </span>
          </div>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs11 md8 xl6 class="mx-auto" pa-2>
      <v-spacer></v-spacer>
      <v-card light outlined :elevation="2" class="px-4" router to="forex">
        <v-layout pl-3 row wrap justify-center>
          <v-list-item-title class="headline">Foreign Exchange</v-list-item-title>
          <div class="indigo--text mx-auto">
            <span>
              This is an application that the user can select currency symbols and view in depth time series data.
            </span>
          </div>
        </v-layout>
      </v-card>
    </v-flex>
    <v-flex xs6 md3 xl2 class="mx-auto" pa-2>
      <v-btn
        id="btn1"
        v-if="!$store.state.store_login_status"
        color="yellow darken-2"
        class="headline"
        style="width: 300px; height: 80px;"
        @click="guestLogin"><span>Login as guest</span></v-btn>
    </v-flex>
    <loginModal v-show="isLoginVisible" @close="closeLogin" />
    <profileModal v-show="isProfileVisible" @close="closeProfile" />
    <registerModal v-show="isRegisterVisible" @close="closeRegister" />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import loginModal from '@/components/Modal_Login.vue'
import profileModal from '@/components/Modal_Profile.vue'
import registerModal from '@/components/Modal_Register.vue'

export default {
  name: 'Modal',
  components: {
    loginModal,
    profileModal,
    registerModal
  },
  data () {
    return {
      isLoginVisible: false,
      isProfileVisible: false,
      isRegisterVisible: false,
      ssrcLoanName: '',
      snewLoanName: '',
      snewLoanStatus: 0,
      nonblankRules: [v => !!v || 'The input is required']
    }
  },
  metaInfo: {
    title: 'About LoanMaster',
    meta: [
      { vmid: 'og:title', property: 'og:title', content: 'About Loan Calculator' },
      { vmid: 'og:site_name', property: 'og:site_name', content: 'About' },
      { vmid: 'og:type', property: 'og:type', content: 'Website' },
      { vmid: 'og:url', property: 'og:url', content: 'https://pequasoft.com/About' },
      { vmid: 'og:description', property: 'og:description', content: 'This is where users can learn about this site.' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@pequasoft' },
      { name: 'twitter:title', content: 'About Loan Calculator' },
      { name: 'twitter:description', content: 'This is where users can learn about this site.' },
      { name: 'twitter:url', content: 'https://twitter.com/PequaSoft' },
      { name: 'twitter:domain', content: 'PequaSoft' },
      { itemprop: 'name', content: 'About Loan Calculator' },
      { itemprop: 'description', content: 'This is where users can learn about this site.' },
      { itemprop: 'image', content: 'https://pequasoft.com/About' }
    ]
  },
  created () {
    this.$bus.$on('HDR_LOGIN', (data) => {
      // alert('Login')
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
  },
  methods: {
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
    guestLogin () {
      // this.isLoginVisible = true
      this.$store.commit('globalData/setUID', 'guest')
      this.$store.commit('globalData/setPWD', 'guest')
      this.$store.commit('globalData/setEmail', 'guest@guest.com')
      this.$store.commit('globalData/setLoginStatus', 1)
      this.$store.commit('globalData/setExternalLogin', 1)
      this.$store.commit('globalData/setAlphaKey', '2DSCA5ETJKPTVOWN')
      this.$bus.$emit('UPDATE_PROFILE', 'guest', 'guest', 'guest@guest.com', '2DSCA5ETJKPTVOWN')
      this.$store.commit('globalData/loansClear')
      this.$bus.$emit('EXIT_LOGIN', 'guest', 'guest')

      // this.$store.state.store_external_login = 1
      // this.axiosLoadProfile()
    }
  }
}

</script>
