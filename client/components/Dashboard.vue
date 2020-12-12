<template>
  <div>
    <div class="sfc"></div>

    <div v-if="!isConnected()">
      <div class="block">
        <div class="left">
          <div v-if="getMessageNonLu().length != 0">
            <h2>Vous avez des messages non lu !</h2>

            <ul class="list-group">
              <li v-for="message in nonLuMessage" :key="message.id" class="list-group-item">
                {{ message.sujet }} de {{ message.expediteur }}
              </li>
            </ul>

            <a href="#/message" class="btn btn-secondary my-2">
              Voir tous les messages
            </a>

          </div>

          <div v-else>
            <h2>Vous n'avez pas de messages non lu.</h2>
            <a href="#/message" class="btn btn-secondary my-2">
              Voir tous les messages
            </a>
          </div>

        </div>

        <div class="right">
          
          <div v-if="getEventReduit().length != 0">
            <h2>Vous avez des evénements prévu !</h2>

            <ul class="list-group">
              <li v-for="event in eventReduit" :key="event.id" class="list-group-item">
                {{ event.class }} : {{ event.title }}
              </li>
            </ul>

            <a href="#/calendar" class="btn btn-secondary my-2">
              Voir le calendrier complet
            </a>

          </div>

          <div v-else>
            <h2>Vous n'avez pas d'événement prévu.</h2>
            <a href="#/calendar" class="btn btn-secondary my-2">
              Voir le calendrier
            </a>
          </div>

        </div>
      </div>

      <div class="jumbotron jumbotron-fluid" v-if="typeof info[0] != 'undefined'">
        <div class="container">
          <div class="lead">
            <h1 class="display-4"> Mon compte </h1>
            <ul v-if="mode == 'view'" class="list-group centrerTxt">
                <li class="list-group-item">
                  Nom : {{ info[0].nom }}
                </li>
                <li class="list-group-item">
                  Prenom : {{ info[0].prenom }}
                </li>
                <li class="list-group-item">
                  Téléphone professionnel : {{ info[0].numpro }}
                </li>
                <li class="list-group-item">
                  Téléphone personnel : {{ info[0].numperso }}
                </li>
                <li class="list-group-item">
                  Specialite : {{ info[0].specialite }}
                </li>
            </ul>

            <div v-if="mode == 'change'"> 
              <form>
                <div class="form-group">
                  <label for="nom"> Nom : </label>
                  <input v-model="changeInfo.nom" type="text" class="form-control" id="nom">
                </div>
                <div class="form-group">
                  <label for="prenom"> Prénom : </label>
                  <input v-model="changeInfo.prenom" type="text" class="form-control" id="prenom">
                </div>
                <div class="form-group">
                  <label for="numpro"> Téléphone professionnel : </label>
                  <input v-model="changeInfo.numpro" type="text" class="form-control" id="numpro">
                </div>
                <div class="form-group">
                  <label for="numperso"> Téléphone personnel : </label>
                  <input v-model="changeInfo.numperso" type="text" class="form-control" id="numperso">
                </div>
                <div class="form-group">
                  <label for="spe"> Spécialité : </label>
                  <input v-model="changeInfo.specialite" type="text" class="form-control" id="spe">
                </div>
              </form>
            </div>

            <div v-if="mode == 'changepass'">
              <div class="form-group">
                <label for="mdp"> Entrez votre nouveau mot de passe : </label>
                <input type="text" name="mdp" class="form-control" v-model="nouveau" placeholder="mdp" />
              </div>
            </div>

        </div>

            <div class="chooseButton"> 
            
              <button class="btn btn-secondary" v-if="mode == 'change'" @click="applyChange()"> Valider les changements </button>
              <button class="btn btn-secondary" v-if="mode == 'changepass'" @click="changePass()"> Valider le changement </button>
              <button class="btn btn-secondary" v-if="mode == 'view'" @click="changeCurrentMode('change')"> Modifier les données </button>
              <button class="btn btn-secondary" v-if="mode == 'view'" @click="changeCurrentMode('changepass')"> Changer de mot de passe </button>
              <button class="btn btn-secondary" v-if="mode != 'view'" @click="changeCurrentMode('view')"> Annuler </button>

            </div>

      </div>
    </div>

    <div v-else>
      <section class="jumbotron text-center">
        <div class="container">
          <h1>Rejoignez-nous !</h1>
          <p class="lead text-muted">
            Pour pouvoir profiter pleinement des fonctionnalités du site il vous
            faut creer un compte. Si vous en avez deja un connecter vous pour
            acceder à vos informations personnel.
          </p>
          <p>
            <a href="#/register" class="btn btn-primary my-2">
              Je n'ai pas encore de compte
            </a>
            <a href="#/login" class="btn btn-secondary my-2">
              J'ai deja un compte
            </a>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    patients: { type: Array, default: [] },
    account: { type: Object },
    info: { type: Array, default: [] },
    messages: { type: Array, default: [] },
    events: { type: Array, default: [] }
  },
  data() {
    return {
      nouveau: "",
      nonLuMessage: [],
      eventReduit: [],
      changeInfo: {
        nom: "",
        prenom: "",
        numpro: "",
        numperso: "",
        specialite: ""
      },
      mode: "view"
    };
  },
  methods: {
    async logOut() {
      this.$emit("log-out");
    },
    isConnected() {
      if (this.account.loggedAt != null) {
        return false;
      } else {
        return true;
      }
    },
    getStatus() {
      if (this.account.loggedAt != null) {
        return "Connecté";
      } else {
        return "Non connecté";
      }
    },
    changePass() {
      this.$emit("change-pass", this.nouveau);
    },
    getMessageNonLu() {
      if (typeof this.messages[1] == "undefined") {
        return [];
      }

      for (i = 0; i < this.messages[1].length; i++) {
        if (this.messages[1][i].lu == false) {
          for (j = 0; j < this.nonLuMessage.length; j++) {
            if (this.messages[1][i] == this.nonLuMessage[j]) {
              return this.nonLuMessage;
            }
          }
          this.nonLuMessage.push(this.messages[1][i]);
        }

        if (this.nonLuMessage.length > 5) {
          return this.nonLuMessage;
        }
      }

      return this.nonLuMessage;
    },
    getEventReduit() {
      if (typeof this.events == "undefined") {
        return [];
      }

      for (i = 0; i < this.events.length; i++) {
        for (j = 0; j < this.eventReduit.length; j++) {
          if (this.events[i] == this.eventReduit[j]) {
            return this.eventReduit;
          }
        }

        this.eventReduit.push(this.events[i]);

        if (this.eventReduit.length > 5) {
          return this.eventReduit;
        }
      }
      return this.eventReduit;
    },
    changeCurrentMode(nouveau) {
      this.mode = nouveau;
    },
    applyChange() {
      this.$emit("change-info-perso", this.changeInfo);
    }
  }
};
</script>

<style scoped>
.centrer {
  text-align: center;
  margin-top: 20%;
}

.sfc {
  margin-top: 60px;
}

.block {
  display: flex;
  flex-wrap: wrap;
}

.right {
  flex: 1;
  margin: 20px;
  background-color: rgb(243, 237, 237);
  padding: 10px;
  border: solid rgb(99, 94, 94) 2px;
  text-align: center;
}

.left {
  flex: 1;
  margin: 20px;
  padding: 10px;
  background-color: rgb(243, 237, 237);
  border: solid rgb(99, 94, 94) 2px;
  text-align: center;
}

.centrerTxt {
  text-align: center;
}

.chooseButton {
  text-align: center;
  margin: 5px;
  margin-top: 10px;
}
</style>