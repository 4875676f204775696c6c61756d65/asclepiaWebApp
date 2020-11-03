<template>
  <div>
    <h2>Connectez vous !</h2>
    <input type="text" placeholder="Pseudo" v-model="pseudo" />
    <input type="text" placeholder="Mot de passe" v-model="mdp" />
    <button @click="logIn()">Se connecter</button>
    <a href='/#/register'> S"inscrire </a> 
  </div>
</template>

<script>
module.exports = {
  props: {},
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
    }
  }
};
</script>

<style scoped>
div {
  text-align: center;
  margin-top: 20%;
}
</style>