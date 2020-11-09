<template>
  <div>
    <div v-if="isConnected()" class='formulaire'>
      <h2>Connectez vous !</h2>
      <input type="text" placeholder="Pseudo" v-model="pseudo" />
      <input type="text" placeholder="Mot de passe" v-model="mdp" />
      <button @click="logIn()">Se connecter</button>
      <a href='/#/register'> S"inscrire </a> 
    </div>

    <div class="formulaire" v-else>
      <input type="button" value="Se deconnecter" @click="logOut()">
    </div>

    <div id='statusInfo' class="formulaire">
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
      pseudo: "",
      mdp: ""
    };
  },
  async mounted() {},
  methods: {
    logIn() {
      this.$emit("log-in", this.pseudo, this.mdp);
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
    isConnected() {

      if(this.account.loggedAt != null){
        return false
      }else{
        return true
      }

    }, 
  }
};
</script>

<style scoped>
.formulaire {
  text-align: center;
  margin-top: 20%;
}
</style>