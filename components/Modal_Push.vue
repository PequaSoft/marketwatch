<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" style="height: 410px; width: 400px;" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header id="modal-header" class="modal-header blue darken-4">
          <h2 id="myModalLabel" style="color:lightblue; font-family:verdana;">Please Login</h2>
          <button type="button" style="font-size: 24px;" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
        </header>
        <section id="modalDescription" class="modal-body" style="height: 270px;">
            <v-flex class="justify-center" pa-1>
            <v-btn color="teal darken-2 white--text" dark style="width: 360px;" @click="close3">Login</v-btn>
            <v-subheader class="justify-center">Or</v-subheader>
          </v-flex>
          
          <v-flex class="justify-center" pa-1>
            <v-btn color="deep-purple darken-2 white--text" style="width: 360px;" @click="close4">Register</v-btn>
            <v-subheader class="justify-center">Or</v-subheader>
          </v-flex>

          <v-flex class="justify-center" pa-1>
            <v-btn color="orange darken-2 white--text" style="width: 360px;" @click="close5">Continue as Guest</v-btn>
          </v-flex>

        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <v-btn color="primary" style="width: 120px;" @click="close">Close</v-btn>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>

import Swal from 'sweetalert2'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Modal',
  data () {
    return {
      sUID: '',
      sPWD: '',
      sAxios: '',
      semail: '',
      sLoginStatus: 0,
      bStayLoggedIn: true
    }
  },
  computed: mapGetters({
    xUID: 'globalData/get_uid',
    xPWD: 'globalData/get_pwd',
    xAxios: 'globalData/get_axios',
    xemail: 'globalData/get_email',
    xAccountStatus: 'globalData/get_AccountStatus',
    xLoginStatus: 'globalData/get_LoginStatus'
  }),

  methods: {
    close () {
      this.$emit('close')
    },
    close3 () {
      this.$bus.$emit('HDR_LOGIN', 'abc')
      this.$emit('close')
    },
    close4 () {
      this.$bus.$emit('HDR_REGISTER', 'abc')
      this.$emit('close')
    },    
    close5 () {
      this.$store.commit('globalData/setUID', 'guest')
      this.$store.commit('globalData/setPWD', 'guest')
      this.$store.commit('globalData/setEmail', 'guest@guest.com')
      this.$store.commit('globalData/setLoginStatus', 1)
      this.$store.commit('globalData/setExternalLogin', 1)
      this.$store.commit('globalData/setAlphaKey', '2DSCA5ETJKPTVOWN')
      this.$bus.$emit('UPDATE_PROFILE', 'guest', 'guest', 'guest@guest.com', '2DSCA5ETJKPTVOWN')
      this.$store.commit('globalData/loansClear')
      this.$bus.$emit('EXIT_LOGIN', 'guest', 'guest')

      this.$emit('close')
    }
  }
}
</script>

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
