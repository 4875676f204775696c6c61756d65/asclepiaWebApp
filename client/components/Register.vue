<template>
  <div>
      
    <div class="sfc"></div>

    <!--

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
        <h1 class="h3 mb-3 font-weight-normal">Veuillez renseigner les champs suivants</h1>
        <input
          type="text"
          id="inputEmail"
          class="form-control"
          placeholder="Pseudo"
          v-model="pseudo"
          autofocus
        />
        <input
          type="password"
          id="inputPassword"
          class="form-control"
          placeholder="Password"
          v-model="mdp"
        />
        <label for="inputRole" class="sr-only">Role</label>
        <select id="inputRole" class="form-control" v-model="role">
          <option value="medecin" selected> Médecin </option>
          <option value="administratif"> Personnel administratif </option>
        </select>
        <button class="btn btn-lg btn-block selfbutton" @click="logIn()">
          Sign in
        </button>
        <p class="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
      </form>
    </div>

    <div class="formulaire" v-else>
      <button class="btn btn-lg btn-block selfbutton" @click="logOut()">
          Se deconnecter
      </button>
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
      mdp: "",
      pseudo: "",
      role: "",
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

@media (min-width: 826px) {
  .formulaire {
    text-align: center;
    margin-top: 30%;
    margin-left: 40%;
    margin-right: 40%;
  }
}

@media (max-width: 825px) {
  
  .formulaire {
    text-align: center;
    margin-top: 40%;
    margin-right: 10%;
    margin-left: 10%;
  }

}

template {

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

.selfbutton {

  background-color: darkcyan;
  color: antiquewhite;

}

.selfbutton:hover {

  color: dimgrey;

}

select {

  margin: 5px;

}

</style>