<template>
  <div>
      
    <div class="sfc"></div>

    <div v-if="isConnected()" class="center">
      <h2>Enregistrer vous !</h2>
      <input type="text" placeholder="Pseudo" v-model="email" />
      <input type="text" placeholder="Mot de passe" v-model="password" />
      <button @click="createUsers()">S'inscrire</button>
    </div>

    <div v-else class="center">

      <h3> Vous etes deja logger. Deconnecter vous pour creer un autre compte. </h3>
      <input type="button" value="Se deconnecter" @click="logOut()">

    </div>

    <div id='statusInfo' class="center">
      <div> Statut : {{ getStatus() }} </div>
      <div v-if="!isConnected()"> Info : {{ account.nom }} {{ account.prenom }} </div>
    </div>
    
  </div>
</template>

<script>
module.exports = {
  props: {
    account: { type: Object }
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  async mounted() {},
  methods: {
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
    isConnected() {

      if(this.account.loggedAt != null){
        return false
      }else{
        return true
      }

    },
    async logOut(){
      this.$emit('log-out')
    }
  }
};
</script>

<style scoped>
.center {
  text-align: center;
  margin-top: 20%;
}

.sfc {
  margin-top: 60px;
}

</style>