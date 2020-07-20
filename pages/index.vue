<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm12 md12 xl12 class="mx-auto">
      <v-card class="accent">
        <v-card-title class="grey--text text--lighten-2 headline">
          <v-flex pa-2 md7 xl8>
            MarketWatch By PequaSoft
          </v-flex>
          <v-flex pa-2 md5 xl4>
            <vuetify-logo />
          </v-flex>
        </v-card-title>
        <v-card-text class="grey--text text--lighten-2">
          <p>MarketWatch is a financial market data program developed in the Nuxt Vuetify framework.</p>
          <p>
            <br>
            <br>
            <br>
            <br>
            <br>
          </p>
          <p>Thank you for visiting this site look forward to bringing more exciting features in the future.</p>
          <div class="text-xs-right">
            <em><small>&mdash; PequaSoft</small></em>
          </div>
          <hr class="my-3">
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/indices">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <loginModal v-show="isLoginVisible" @close="closeLogin" />
    <profileModal v-show="isProfileVisible" @close="closeProfile" />
    <registerModal v-show="isRegisterVisible" @close="closeRegister" />
  </v-layout>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'
import loginModal from '@/components/Modal_Login.vue'
import profileModal from '@/components/Modal_Profile.vue'
import registerModal from '@/components/Modal_Register.vue'

export default {
  components: {
    // Logo,
    VuetifyLogo,
    loginModal,
    profileModal,
    registerModal
  },
  data () {
    return {
      isLoginVisible: false,
      isProfileVisible: false,
      isRegisterVisible: false
    }
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
  mounted () {
    //alert('Index')
    
    //this.$router.push('/indices');
    this.$bus.$emit('LOAD_INITIAL', 'abc')
    setTimeout(this.goIndices, 3000)
    //this.$bus.$emit('LOAD_INITIAL', 'abc')
    //this.goIndices()
    
  },
  methods: {
    goIndices () {
      this.$router.push('/indices');
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
  },
  metaInfo: {
    title: 'Index',
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
  }
}
</script>
