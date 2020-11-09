<template>
  <div>
    <div class="sfc"></div>
    <!--
    <div v-if="isConnected()" class='formulaire'>
      <h2>Connectez vous !</h2>
      <input type="text" placeholder="Pseudo" v-model="pseudo" />
      <input type="text" placeholder="Mot de passe" v-model="mdp" />
      <button @click="logIn()">Se connecter</button>
      <a href='/#/register'> S"inscrire </a> 
    </div>
-->
    <div class="body text-center" v-if="isConnected()">
      <form class="form-signin">
        <img
          class="mb-4"
          src="icon/favicon.png"
          alt=""
          width="72"
          height="72"
        />
        <h1 class="h3 mb-3 font-weight-normal">Veuillez renseigner les champs suivant</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="Pseudo"
          v-model="pseudo"
          autofocus
        />
        <label for="inputPassword" class="sr-only">Password</label>
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-model="mdp"
        />
        <button class="btn btn-lg btn-primary btn-block" @click="logIn()">
          Sign in
        </button>
        <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
      </form>
    </div>

    <div class="formulaire" v-else>
      <input type="button" value="Se deconnecter" @click="logOut()" />
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
    async logOut() {
      this.$emit("log-out");
    },
    getStatus() {
      if (this.account.loggedAt != null) {
        return "Connecté";
      } else {
        return "Non connecté";
      }
    },
    isConnected() {
      if (this.account.loggedAt != null) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
.formulaire {
  text-align: center;
  margin-top: 20px;
}

.sfc {
  margin-top: 60px;
}

html {

  height: 100%;

}

.body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>