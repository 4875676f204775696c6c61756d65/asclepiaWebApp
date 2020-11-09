<template>
  <div>

    <div class="sfc"></div>

    <h1> Mes patients </h1>

    <ul>

      <li v-for="patient in patients" :key="patient.id"> Nom : {{ patient.nom }} {{ patient.prenom }} </li>

    </ul>

    <div class="centrer">
      <input type="button" value="charger patient" :disabled="isConnected()" @click='loadPatient()' class="bouton">

      <div v-if="!isConnected()">
        <input type="button" value="Se deconnecter" @click="logOut()" class="bouton">
      </div>
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
    async loadPatient(){
      this.$emit('load-patient')
    },
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
