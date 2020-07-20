<script>

// import { bus } from '../main'
// import io from 'socket.io-client'

export default {
  name: 'Modal',
  data () {
    return {
      sUID: '',
      sPWD: '',
      sYears: '0',
      sPmts: '0',
      sPmtsPeryear: 'Monthly',
      items: ['Monthly', 'Quarterly', 'Annual']
      /*
      socket: io('https://testbedFL.azurewebsites.net', {
        reconnectionDelay: 1000,
        reconnection: true,
        reconnectionAttempts: 10,
        agent: false, // [2] Please don't set this to true
        upgrade: false,
        rejectUnauthorized: false
      })
      */
    }
  },
  created () {
    this.$bus.$on('toggleModal', (data) => {
      console.log('Received toggleModal ' + data)
      // alert('Received BUS_LOANPMTS-' + data);
      this.sUID = data
    })
  },
  methods: {
    close () {
      this.$bus.$emit('BUS_LOANPMTS', this.sUID)
      this.$emit('clickedLoanPmts', this.sUID)
      // this.sendMessage()
      this.$emit('close')
    },
    close2 () {
      this.$bus.$emit('BUS_LOANPMTS', this.sUID)
      this.$emit('clickedLoanPmts', this.sUID)
      this.$store.state.store_numpmts = this.sPmts
      // this.sendMessage();
      this.$emit('close')
    },
    editData () {
      let mult = 12
      // alert('edit data-' + this.sPmtsPeryear);
      if (this.sPmtsPeryear === '"Monthly') { mult = 12 }
      if (this.sPmtsPeryear === 'Quarterly') { mult = 4 }
      if (this.sPmtsPeryear === 'Annual') { mult = 1 }
      // alert('edit data-' + mult + '|' + this.sYears);
      this.sPmts = this.sYears * mult
      // document.getElementById("text3").value = this.sPmts;
      document.getElementById('text3').value = 'ABC'
    }
  }
}
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <h2 class="modal-title" id="myModalLabel">Number of Loan Payments</h2>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" @click="close"><span aria-hidden="true">&times;</span></button>
        </header>
        <section
          class="modal-body"
          id="modalDescription">
          <slot name="body">
            <v-text-field id="text1" label="Number of Years" outlined style="height: 65px;" @:input="editData" v-model="sYears"></v-text-field>
            <v-select :items="items" label="Payments per Year" outlined style="height: 65px;" @change="editData" v-model="sPmtsPeryear"></v-select>
            <v-text-field id="text3" label="Number of Payments" outlined style="height: 65px;" v-model="sPmts"></v-text-field>
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
    width: 600px;
    height: 380x;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    background-color: #000080;
    color: white;
    height: 80px;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #561763;
    justify-content: left;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    height: 220px;
  }

  .btn-close {
    border: none;
    font-size: 24px;
    padding: 2px;
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
</style>
