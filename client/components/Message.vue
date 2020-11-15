<template>
  <div>

    <div class="sfc"></div>

    <h1> Mes messages </h1>

    <div v-if="!isConnected()">
        <input type="button" value="Se deconnecter" @click="logOut()" class="bouton">
    </div>

    <div id='statusInfo' class="centrer">
      <div> Statut : {{ getStatus() }} </div>
      <div v-if="!isConnected()"> Info : {{ account.nom }} {{ account.prenom }} </div>
    </div>

  </div>
</template>

<script>
module.exports = {
  props: {
    patients: {type: Array, default: []},
    account: { type: Object }
  },
  data() {
    return {};
  },
  async mounted() {

  },
  methods: {
    isConnected() {

      if(this.account.loggedAt != null){
        return false
      }else{
        return true
      }

    },
    async logOut(){
      this.$emit('log-out')
    },
    getStatus(){
      if(this.account.loggedAt != null){
        return 'Connecté'
      }else{
        return 'Non connecté'
      }
    },   
  },
};
</script>

<style scoped>

.centrer{
  
  text-align: center;
  margin-top: 20%;

}

.bouton {

  margin: 5px;

}

.sfc {
  margin-top: 60px;
}

</style>