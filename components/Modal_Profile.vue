<script>
// import Swal from 'sweetalert2'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      status: 0,
      sUID: '',
      sPWD: '',
      sPWD2: '',
      sEMail: '',
      sAlphaKey: '--',
      sLoginStatus: 0,
      formReadonly: 0,
      formInvalid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid']
    }
  },
  computed: mapGetters({
    xUID: 'globalData/get_uid',
    xPWD: 'globalData/get_pwd',
    xAxios: 'globalData/get_axios',
    xEMail: 'globalData/get_email',
    xAlphaKey: 'globalData/get_AlphaKey',
    xAccountStatus: 'globalData/get_AccountStatus'
  }),
  created () {
    this.$bus.$on('ACTIVATE_PROFILE', (data) => {
      this.sUID = this.xUID
      this.sPWD = this.xPWD
      this.sPWD2 = this.xPWD
      this.sAxios = this.xAxios
      this.sEMail = this.xEMail
      this.sAlphaKey = this.xAlphaKey
      this.formReadonly = 1
      if (this.xAccountStatus === 'Yes') {
        this.formReadonly = 0
      }
    })

    this.$bus.$on('UPDATE_PROFILE', (parUID, parPWD, parEMAIL, parAlphaKey) => {
      this.sUID = parUID
      this.sPWD = parPWD
      this.sPWD2 = parPWD
      this.sEMail = parEMAIL
      this.sAlphaKey = parAlphaKey
      this.formReadonly = 1
      //alert('Update Profie:' + this.sUID + '|' + this.sPWD + '|' + this.sEMail + '|' + this.sAlphaKey)
      //alert('Profile - ' + this.xUID + '-' + this.xPWD + '-' + this.xEMail + '-' + this.xAlphaKey)
      //alert('Profile - ' + parUID + '-' + parPWD + '-' + parEMail + '-' + parAlphaKey)
      if (this.xAccountStatus === 'Yes') {
        this.formReadonly = 0
      }
    })
  },
  methods: {
    close () {
      // this.$root.$emit('clickedSomething',this.sUID)
      // this.sendMessage();
      this.$emit('close')
      // alert('close register');
    },

    close2 () {
      // var buff = JSON.stringify(this.sEMail)

      if (this.sUID === undefined) { alert('Missing User ID'); return }
      if (this.sEMail === undefined) { alert('Missing Email'); return }
      if (this.sPWD === undefined) { alert('Missing Password'); return }
      if (this.sPWD !== this.sPWD2) { alert('Passwords do not match'); return }

      this.$bus.$emit('BUS_LOANPMTS', this.sUID)

      this.$emit('clickedLoanPmts', this.sUID)
      // this.$store.state.store_uid = this.sUID
      // this.$store.state.store_pwd = this.sPWD
      // this.$store.state.store_login_status = 1

      //alert('Profile - ' + this.sUID + '-' + this.sPWD + '-' + this.sEMail + '-' + this.sAlphaKey)
      this.$store.commit('globalData/setUID', this.sUID)
      this.$store.commit('globalData/setPWD', this.sPWD)
      this.$store.commit('globalData/setEmail', this.sEMail)
      this.$store.commit('globalData/setAlphaKey', this.sAlphaKey)
      this.$store.commit('globalData/setAccountStatus', 1)

      // sLoginStatus
      // this.sendMessage()
      this.axiosUpdateProfile()
      this.$emit('close')
    },

    editData () {
      // alert('AccountStatus - ' + this.$store.state.store_AccountStatus)
      document.getElementById('btn1').disabled = false
      this.formInvalid = false
    },
    axiosUpdateProfile () {
      // alert("myLogin!");
      const formData = new FormData()
      this.sUID = this.xUID
      this.sPWD = this.xPWD
      this.sPWD2 = this.xPWD
      this.sEMail = this.xEMail
      this.sAlphakKey = this.xAlphaKey

      formData.append('user', JSON.stringify(this.sUID))
      formData.append('pwd', JSON.stringify(this.sPWD))
      formData.append('email', JSON.stringify(this.sEMail))
      formData.append('alphakey', JSON.stringify(this.sAlphaKey))

      // alert('Profile - ' + this.sUID + '-' + this.sPWD + '-' + this.sEMail + '-' + this.sAlphakKey)
      axios.post(this.sAxios + 'profileupdate', formData).then((res) => {
        // const result = JSON.stringify(res.data.rows)
        // console.log(result)
      })
    }
  }
}
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" style="height: 470px; width: 450px;" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header id="modal-header" class="modal-header blue darken-4">
          <h2 id="myModalLabel" style="color:lightblue; font-family:verdana;">Edit Profile</h2>
          <button type="button" style="font-size: 24px;" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
        </header>
        <section id="modalDescription" class="modal-body" style="height: 330px;">
          <slot name="body">
            <v-text-field
              id="text1"
              label="User ID"
              class="compact-form"
              light
              outlined
              style="height: 60px;"
              :readonly="formReadonly ==1"
              @:input="editData"
              v-model="sUID"></v-text-field>
            <v-text-field
              id="text3"
              label="eMail"
              class="compact-form"
              light
              outlined
              style="height: 60px;"
              :readonly="formReadonly ==1"
              :rules="emailRules"
              v-model="sEMail"></v-text-field>

            <v-text-field
              id="text3"
              label="Password"
              class="compact-form"
              :type="false ? 'text' : 'password'"
              :readonly="formReadonly ==1"
              light
              outlined
              style="height: 60px;"
              v-model="sPWD"></v-text-field>
            <v-text-field
              id="text3"
              label="Reenter Password"
              class="compact-form"
              :type="false ? 'text' : 'password'"
              :readonly="formReadonly==1"
              light
              outlined
              style="height: 60px;"
              v-model="sPWD2"></v-text-field>
              <v-text-field
              id="text4"
              label="Alpha Vantage Key"
              class="compact-form"
              light
              outlined
              style="height: 60px;"
              v-model="sAlphaKey"></v-text-field>
          </slot>
        </section>
        <footer class="modal-footer" style="height: 80px;">
          <slot name="footer">
            <v-btn id="btn1" color="primary" style="width: 220px;" href="https://www.alphavantage.co/support/#api-key"><span >Get Alpha Vantage Key</span></v-btn>
            <v-divider class="mx-4" color="white" style="height: 60px;" inset vertical></v-divider>
            <v-btn id="btn1" color="primary" style="width: 120px;" @click="close2"><span>Submit</span></v-btn>
          </slot>
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
