<template>
  <div>
    <h2>Connectez vous !</h2>
    <input type="text" placeholder="E-mail" v-model="email" />
    <input type="text" placeholder="Mot de passe" v-model="password" />
    <button @click="logIn()">Se connecter</button>
    <a href='/#/register'> S"inscrire </a> 
  </div>
</template>

<script>
module.exports = {
  props: {},
  data() {
    return {
      email: "",
      password: ""
    };
  },
  async mounted() {},
  methods: {
    logIn() {
      this.$emit("log-in", this.email, this.password);
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