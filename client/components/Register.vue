<template>
  <div>
    <h2>Enregistrer vous !</h2>
    <input type="text" placeholder="E-mail" v-model="email" />
    <input type="text" placeholder="Mot de passe" v-model="password" />
    <button @click="createUsers()">S'inscrire</button>
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
    createUsers() {
      this.$emit("create-users", this.email, this.password);
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