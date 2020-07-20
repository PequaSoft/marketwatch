<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
<script src="sweetalert2.all.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
<script src="sweetalert2.min.js"></script>
<script>

// import { bus } from '../main'
// import io from 'socket.io-client'
import Swal from 'sweetalert2'
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  name: 'modal',
  data () {
    return {
      sdelLoanName: '',
      snewLoanStatus: 0,
      nonblankRules: [v => !!v || "The input is required"]
    }
  },
 computed: mapGetters({
    xUID: 'globalData/get_uid',
    xAxios: 'globalData/get_axios',
    xStoreLoans: 'globalData/get_StoreLoans'
  }),
  methods: {
    close () {
      // this.$root.$emit('clickedSomething', this.sdelLoanName)
      // alert('close This: '+ this.sUID + '-' + this.sPWD);
      this.$emit('close')
    },
    close2 () {
      // alert('predelete 1 - ' + this.sdelLoanName)
      this.$store.commit('globalData/deleteLoan',this.sdelLoanName)
      // alert('exit predelete 2')
      Swal.fire({
          title: '<font face="verdana" color="red">Loan Deletion</font>',
          html: '<font face="verdana" color="black">Loan ' + this.sdelLoanName + ' Deleted</font>',
          type: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        })

      // this.axiosAddLoan()
      this.$emit('close')
    },
    cleanString (parInput) {
      var source=parInput
      var result = ""
      for (var i = 0; i < parInput.length; i++) {
        if(source.charCodeAt(i) !== 92){
          result=result+parInput[i];
          }
      }
      return result;
    },
    axiosAddLoan () {
      // alert("myLogin!");
      const formData = new FormData()
      formData.append('user', JSON.stringify(this.xUID))
      formData.append('newloan', JSON.stringify(this.sdelLoanName))

      axios.post(this.xAxios + 'loanadd', formData).then(res => {
        var result = JSON.stringify(res.data.rows)
      })
    }
  },
  created () {
    this.$bus.$on('ACTIVATE_DELETELOAN', (data) => {
      this.sdelLoanName = data
    })
  },
  mounted () {
    /*
    // alert('checking');
    */
  }
}

</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" style="height: 240px; width: 400px;" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header id="modal-header" class="modal-header blue darken-4">
          <h2 id="myModalLabel" style="color:lightblue; font-family:verdana;">Delete This Loan?</h2>
          <button type="button" style="font-size: 24px;" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <v-text-field id="text1" label="New Loan Name" class="compact-form" readonly outlined style="height: 55px;" :rules="nonblankRules" v-model="sdelLoanName"></v-text-field>
          </slot>
        </section>
        <footer class="modal-footer" style="height: 80px;">
          <v-btn color="primary" style="width: 120px;" @click="close2">Submit</v-btn>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style>
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
    height: 500x;
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
    transform-origin: 50% 50% 0;;
}
  .compact-form-left {
    transform: scale(0.875);
    transform-origin: left;
}
  .compact-form-right {
    transform: scale(0.875);
    transform-origin: right;
}

</style>
