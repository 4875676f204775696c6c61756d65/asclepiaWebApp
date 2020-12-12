<template>
  <div>

    <div class="sfc"></div>

    <div v-if="isConnected()">
      
      <section class="jumbotron text-center">
        <div class="container">
          <h1> Rejoignez-nous ! </h1>
          <p class="lead text-muted"> Pour pouvoir profiter pleinement des fonctionnalités du site il vous faut creer un compte. Si vous en avez deja un connecter vous pour acceder à vos informations personnel. </p>
          <p v-if="isConnected()">
            <a href="#/register" class="btn btn-primary my-2"> Je n'ai pas encore de compte </a>
            <a href="#/login" class="btn btn-secondary my-2"> J'ai deja un compte </a>
          </p>
        </div>
      </section>
    </div>

    <div v-if="!isConnected()" id="conteneur">
        
      <h1> Mes messages </h1>

        <button class="btn btn-secondary" id="topRightButton" @click="newMessageAction()"> {{ getNewMessageStatus() }} </button>

        <div class="block">

        <div class="right">

          <div class="choixview">
            <button
              type="button"
              :class="getClassView('envoi')"
              @click="changeCurrentView('envoi')"
            >
            Message envoyé
            </button>
            <button
              type="button"
              :class="getClassView('recu')"
              @click="changeCurrentView('recu')"
            >
            Message recu
            </button>
          </div>

          <div v-if="messages.length != 0">
            <ul v-if="cat == 'recu'" class="list-group">
              <li class="list-group-item message" v-for="message in messages[1]" :key="message.id" @click="changeCurrentMessage(message)"> {{ message.sujet }} <button type="button" class="btn btn-sm btn-outline-secondary" @click="supprimerMessage(message.id)"> supprimer</button> </li>
            </ul>

            <ul v-if="cat == 'envoi'" class="list-group">
              <li class="list-group-item message" v-for="message in messages[0]" :key="message.id" @click="changeCurrentMessage(message)"> {{ message.sujet }} </li>
            </ul>
          </div>

        <div v-else> Vous n'avez pas de message ! </div>

        </div>

        <div class="left">

          <div v-if="mode == 'nouveau'">

            <div class="champ">
              <label for="destRole"> Choissisez le groupe du destinataire : </label>
              <select class="form-control" name="destRole" v-model="nouveau.destRole">
                <option value="medecin"> Medecin </option>
                <option value="administratif"> Administratif </option>
              </select>
            </div>
            
            <div class="champ">
              <label for="destinataire"> Choissisez le destinataire : </label>
              <select class="form-control" name="destinataire" v-model="nouveau.destinataire">
                <option v-for="contact in getCurrentListe()" :key="contact.id" :value="contact.id"> {{ contact.nom }} {{ contact.prenom }} </option>
              </select>
            </div>

            <div> 
              
              <div class="input-group mb-3 champ">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default"> Sujet </span>
                </div>
                <input type="text" v-model="nouveau.sujet" class="form-control" aria-label="Default" placeholder="Sujet..." aria-describedby="inputGroup-sizing-default">
              </div>
              
            </div>

            <div class="champ"> 
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text"> Message : </span>
                </div>
                <textarea class="form-control" v-model="nouveau.contenu" placeholder="Corps du message..."></textarea>
              </div>
            </div>

          </div>

          <div v-else>

            <ul v-if="cat == 'recu'" class="list-group">
              <li class="list-group-item"> De : {{ currentMessage.expediteur }} </li>
              <li class="list-group-item"> Le : {{ currentMessage.date }} à {{ currentMessage.heure }} </li>
              <li class="list-group-item"> Sujet : {{ currentMessage.sujet }} </li>
              <textarea class="form-control" v-model="currentMessage.contenu" readonly></textarea>
            </ul>

            <ul v-if="cat == 'envoi'" class="list-group">
              <li class="list-group-item"> A : {{ currentMessage.destinataire }} </li>
              <li class="list-group-item"> Le : {{ currentMessage.date }} à {{ currentMessage.heure }} </li>
              <li class="list-group-item"> Sujet : {{ currentMessage.sujet }} </li>
              <textarea class="form-control" v-model="currentMessage.contenu" readonly></textarea>
            </ul>

          </div>

        </div>

        </div>

    </div>

  </div>
</template>

<script>
module.exports = {
  props: {
    patients: { type: Array, default: [] },
    account: { type: Object },
    messages: { type: Array, default: [] },
    contacts: { type: Array, default: [] }
  },
  data() {
    return {
      cat: "recu",
      mode: "nouveau",
      nouveau: {
        destinataire: "",
        destRole: "medecin",
        sujet: "",
        contenu: ""
      },
      currentMessage: {}
    };
  },
  async mounted() {},
  methods: {
    isConnected() {
      if (this.account.loggedAt != null) {
        return false;
      } else {
        return true;
      }
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
    getCurrentListe() {
      if (this.nouveau.destRole == "medecin") {
        return this.contacts[0];
      } else {
        return this.contacts[1];
      }
    },
    sendNewMessage() {
      this.$emit(
        "send-new-message",
        this.nouveau.destinataire,
        this.nouveau.destRole,
        this.nouveau.sujet,
        this.nouveau.contenu
      );
    },
    getClassView(bouton) {
      if (bouton == this.cat) {
        return "btn btn-secondary choixbutton active";
      } else {
        return "btn btn-secondary choixbutton";
      }
    },
    changeCurrentView(view) {
      this.cat = view;
    },
    changeCurrentMode(mode) {
      this.mode = mode;
    },
    changeCurrentMessage(message) {
      this.changeCurrentMode("lecture");
      this.currentMessage = message;
    },
    createNewMessage() {
      this.changeCurrentMode("nouveau");
    },
    getNewMessageStatus() {
      if(this.mode == 'lecture'){
        return 'Nouveau message'
      }else{
        return 'Envoyer le message'
      }
    },
    newMessageAction(){
      if(this.mode == 'nouveau'){
        this.sendNewMessage()
      }else{
        this.changeCurrentMode('nouveau')
      }
    },
    supprimerMessage(id) {
      this.$emit('supprimer-message',id)
    }
  }
};
</script>

<style scoped>
.centrer {
  text-align: center;
  margin-top: 20%;
}

.bouton {
  margin: 5px;
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
  background-color: rgb(243, 237, 237);
  padding: 10px;
  border: solid rgb(99, 94, 94) 2px;
  border-right: none;
}

.left {
  flex: 1;
  flex-grow: 3;
  padding: 10px;
  border: solid rgb(99, 94, 94) 2px;
}

.message:hover {
  background-color: rgb(88, 94, 100);
  color: antiquewhite;
}

.choixview {
  margin: 15px;
  text-align: center;
}

@media (min-width: 456px) {
  
  #topRightButton {

    position:absolute;
    top:10;
    right:15;

  }

  .choixbutton {

    margin: 10px;

  }

}

@media (max-width: 455px) {
  
  #topRightButton {

    position: relative;
    margin: 10px;

  }

  .choixbutton {

    margin: 5px;

  }

  #conteneur {
    text-align: center;
  }

}

#conteneur {
  position: relative;
}

.champ {

  padding: 5px;
  border-top: solid rgb(88, 94, 100) 1px;
  border-bottom: solid rgb(88, 94, 100) 1px;

}

</style>