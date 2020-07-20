<template>
  <v-layout>
    <v-flex class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <v-btn color="primary" style="width: 200px;" @click="showLogin">Launch Login</v-btn>
      <v-btn color="primary" style="width: 200px;" @click="showProfile">Launch Profile</v-btn>
      <v-btn color="primary" style="width: 200px;" @click="showRegister">Launch Register</v-btn>
      <v-btn color="primary" style="width: 200px;" @click="showAddLoan">Launch AddLoan</v-btn>
      <v-btn color="primary" style="width: 200px;" @click="showCalcLoan">Launch CalcLoan</v-btn>
      <v-btn color="primary" style="width: 200px;" @click="showCopyLoan">Launch CopyLoan</v-btn>
      <v-btn color="primary" style="width: 200px;" @click="showEditLoan">Launch EditLoan</v-btn>
      <v-btn color="primary" style="width: 200px;" @click="showLoanPmts">Launch LoanPmts</v-btn>
      <loginModal v-show="isLoginVisible" @close="closeLogin" />
      <profileModal v-show="isProfileVisible" @close="closeProfile" />
      <registerModal v-show="isRegisterVisible" @close="closeRegister" />
      <addloanModal v-show="isAddLoanVisible" @close="closeAddLoan" />
      <calcloanModal v-show="isCalcLoanVisible" @close="closeCalcLoan" />
      <copyloanModal v-show="isCopyLoanVisible" @close="closeCopyLoan" />
      <editloanModal v-show="isEditLoanVisible" @close="closeEditLoan" />
      <loanpmtsModal v-show="isLoanPmtsVisible" @close="closeLoanPmts" />
    </v-flex>
  </v-layout>
</template>

<script>
// import { mapGetters } from 'vuex'
import loginModal from '@/components/Modal_Login.vue'
import profileModal from '@/components/Modal_Profile.vue'
import registerModal from '@/components/Modal_Register.vue'
import addloanModal from '@/components/Modal_AddLoan.vue'
import calcloanModal from '@/components/Modal_CalcLoan.vue'
import copyloanModal from '@/components/Modal_CopyLoan.vue'
import editloanModal from '@/components/Modal_EditLoan.vue'
import loanpmtsModal from '@/components/Modal_LoanPmts.vue'

export default {
  name: 'Modal',
  components: {
    loginModal,
    profileModal,
    registerModal,
    addloanModal,
    calcloanModal,
    copyloanModal,
    editloanModal,
    loanpmtsModal
  },
  data () {
    return {
      isLoginVisible: false,
      isProfileVisible: false,
      isRegisterVisible: false,
      isAddLoanVisible: false,
      isCalcLoanVisible: false,
      isCopyLoanVisible: false,
      isEditLoanVisible: false,
      isLoanPmtsVisible: false,
      ssrcLoanName: '',
      snewLoanName: '',
      snewLoanStatus: 0,
      nonblankRules: [v => !!v || 'The input is required']
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
    showAddLoan () {
      this.$bus.$emit('ACTIVATE_ADDLOAN', 'abc')
      this.isAddLoanVisible = true
    },
    showCalcLoan () {
      this.$bus.$emit('ACTIVATE_CALCLOAN', 'abc')
      this.isCalcLoanVisible = true
    },
    showCopyLoan () {
      this.$bus.$emit('ACTIVATE_COPYLOAN', 'abc')
      this.isCopyLoanVisible = true
    },
    showEditLoan () {
      this.$bus.$emit('ACTIVATE_EDITLOAN', 'abc')
      this.isEditLoanVisible = true
    },
    showLoanPmts () {
      this.$bus.$emit('ACTIVATE_LOANPMTS', 'abc')
      this.isLoanPmtsVisible = true
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
    closeAddLoan () {
      this.isAddLoanVisible = false
    },
    closeCalcLoan () {
      this.isCalcLoanVisible = false
    },
    closeCopyLoan () {
      this.isCopyLoanVisible = false
    },
    closeEditLoan () {
      this.isEditLoanVisible = false
    },
    closeLoanPmts () {
      this.isLoanPmtsVisible = false
    }
  }
}

</script>
