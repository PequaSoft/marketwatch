<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" style="height: 350px; width: 450px;" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header id="modal-header" class="modal-header blue darken-4">
          <h2 id="myModalLabel" style="color:lightblue; font-family:verdana;">Login</h2>
          <button type="button" style="font-size: 24px;" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
        </header>
        <section id="modalDescription" class="modal-body" style="height: 210px;">
          <slot name="body">
            <v-text-field
              id="text11"
              v-model="sUID"
              label="User ID"
              class="compact-form"
              light
              outlined
              style="height: 55px;">
            </v-text-field>
            <v-text-field
              id="text33"
              v-model="sPWD"
              label="Password"
              class="compact-form"
              light
              :type="false ? 'text' : 'password'"
              outlined
              style="height: 55px;">
            </v-text-field>
            <v-checkbox
              v-model="bStayLoggedIn"
              class="mx-2 compact-form"
              light
              outlined
              style="height: 55px;"
              label="Stay logged in?">
            </v-checkbox>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <v-btn color="primary" style="width: 120px;" @click="close2">Submit</v-btn>
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
  created () {
    this.$bus.$on('ACTIVATE_LOGIN', (data) => {
      this.sUID = this.xUID
      this.sPWD = this.xPWD
      this.sAxios = this.xAxios
      this.semail = this.xemail
    })

    this.$bus.$on('HDR_CLEARSTAYLOGGEDIN', (data) => {
      this.$cookie.set('PS_bStayLoggedIn', 'false', 1)
      this.bStayLoggedIn = false
      // alert('HDR_CLEARSTAYLOGGEDIN')
    })

  },
  mounted () {
  // alert('2-cookies Stay Logged: ' + abc)
    var abc = this.$cookies.get('PS_bStayLoggedIn')
    var uid = this.$cookies.get('PS_UID')
    var pwd = this.$cookies.get('PS_PWD')

    // alert('1-cookies Stay Logged: ' + abc)
    // this.bStayLoggedIn = false
    
    //alert('2-cookies Stay Logged: ' + abc)

    if (abc === true) {
      //alert('3-cookies Stay Logged: ' + abc)
      this.bStayLoggedIn = true
      if (uid) { this.sUID = uid }
      if (pwd) { this.sPWD = pwd }
      this.axiosLoadUID()
      this.axiosLoadProfile()
      this.axiosAddUser()

    }
  },

  methods: {
    close () {
      this.$emit('close')
    },
    close2 () {

      this.$store.commit('globalData/setUID', this.sUID)
      this.$store.commit('globalData/setPWD', this.sPWD)
      
      if (this.bStayLoggedIn === true) {
        this.$cookies.set('PS_bStayLoggedIn', 'true', 1)
        this.$cookies.set('PS_UID', this.sUID, 1)
        this.$cookies.set('PS_PWD', this.sPWD, 1)
        //alert("myLogin: " + this.sUID + '|' + this.sPWD );
      }

      this.axiosLoadUID()
      this.axiosLoadProfile()
      this.axiosAddUser()
      // this.$bus.$emit('EXIT_LOGIN', this.sUID, this.sPWD)
      
    },
    cleanString (parInput) {
      const source = parInput
      let result = ''
      for (let i = 0; i < parInput.length; i++) {
        if (source.charCodeAt(i) !== 92) {
          result = result + parInput[i]
        }
      }
      return result
    },
    axiosLoadUID () {
      const formData = new FormData()
      const sErrorMsg = '<font face="verdana" color="black">Invalid Login/Password Entered!</font>'
      formData.append('title', JSON.stringify(this.sUID))
      formData.append('content', JSON.stringify(this.sPWD))

      axios.post(this.xAxios + 'loaduid', formData).then((res) => {
        const result = JSON.stringify(res.data.rows)

        const result2 = this.cleanString(result)
        const buff = this.cleanString(result2)
        const buff2 = buff.substring(1, buff.length)
        // alert('2-result: ' + buff2)
        const jsonData = JSON.parse(buff2.substring(0, buff2.length - 1))
        // alert('3-axiosLoadUID' + jsonData)
        let loginResult = 'false'
        let i = 0
        for (i = 0; i < jsonData.length; i++) {
          const counter = jsonData[i]
          loginResult = counter.AccountStatus
          // alert('loginResult: ' + loginResult)
        }
        // alert('EXIT_LOGIN: ' + loginResult)
        if (loginResult === 'Yes') {
          this.$store.commit('globalData/setUID', this.sUID)
          this.$store.commit('globalData/setPWD', this.sPWD)
          this.$store.commit('globalData/setLoginStatus', 1)
          this.$store.commit('globalData/setExternalLogin', 1)
          //this.$store.commit('globalData/loansClear')
          this.$bus.$emit('EXIT_LOGIN', this.sUID, this.sPWD)
          this.$emit('close')
          // alert('EXIT_LOGIN: ' + this.sUID)
        }
        if (loginResult !== 'Yes') {
          this.sLoginStatus = 0
          this.$store.commit('globalData/setUID', '')
          this.$store.commit('globalData/setPWD', '')
          this.$store.commit('globalData/setLoginStatus', 0)
          this.$store.commit('globalData/setExternalLogin', 0)
          // alert('Invalid Login-' + result + '|' + this.sLoginStatus)
          Swal.fire({
            title: '<font face="verdana" color="red">Login Error</font>',
            html: sErrorMsg,
            type: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          })
        }
      })
    },
    axiosLoadProfile () {
      const formData = new FormData()

      formData.append('title', JSON.stringify(this.sUID))
      formData.append('content', JSON.stringify(this.sPWD))

      axios.post(this.xAxios + 'loadprofile', formData).then((res) => {
        let result = JSON.stringify(res.data.rows)
        result = this.cleanString(result)
        const buff = this.cleanString(result)

        const buff2 = buff.substring(1, buff.length)

        console.log(buff2.substring(0, buff2.length - 1))
        const jsonData = JSON.parse(buff2.substring(0, buff2.length - 1))

        for (let i = 0; i < jsonData.length; i++) {
          const counter = jsonData[i]
          // alert('email: ' + counter.email)
          this.$store.commit('globalData/setPWD', counter.password)
          this.$store.commit('globalData/setEmail', counter.email)
          this.$store.commit('globalData/setAlphaKey', counter.AlphaKey)
          this.$store.commit('globalData/setAccountStatus', counter.AccountStatus)
          //this.$store.commit('globalData/loansClear')
          this.$bus.$emit('UPDATE_PROFILE', this.sUID, counter.password, counter.email, counter.AlphaKey)
        }
        this.$bus.$emit('EDIT_PROFILE', 'abc')
      })
    },
    axiosAddUser () {
      const formData = new FormData()

      formData.append('title', JSON.stringify(this.sUID))
      formData.append('content', JSON.stringify(this.sPWD))

      axios.post(this.xAxios + 'adduser', formData).then((res) => {
        let result = JSON.stringify(res.data.rows)
      })
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
