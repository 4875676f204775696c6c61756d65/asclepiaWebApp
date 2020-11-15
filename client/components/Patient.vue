<template>
  <div>

    <div class="sfc"></div>

    <h1> Gerer mes patients </h1>

    <div v-if="!isConnected()">
       <div class="block">
          <div class="left">
            <h2> Informations générales </h2>

            <div class="interne">
              <div class="btn-group-vertical choix" role="group" aria-label="Vertical button group">
                <button type="button" class="btn btn-outline-info" v-for="item in patients" :key="item.id" @click="changeCurrentPatient(item)">{{item.nom}} {{item.prenom}}</button>
              </div>

              <ul class="list-group affichage">
                <li class="list-group-item"> Numéro de sécurité social : {{currentPatient.nsc}} </li>
                <li class="list-group-item"> Nom et prénom : {{currentPatient.nom}} {{currentPatient.prenom}} </li>
                <li class="list-group-item"> Age : {{currentPatient.age}} </li>
                <li class="list-group-item"> Sexe : {{currentPatient.sexe}} </li>
                <li class="list-group-item"> Téléphone : {{currentPatient.tel}} </li>
                <li class="list-group-item"> Adresse : {{currentPatient.adresse}} </li>
                <li class="list-group-item"> Profession : {{currentPatient.profession}} </li>
                <li class="list-group-item"> Mutuelle : {{currentPatient.mutuelle}} </li>
                <li class="list-group-item"> Antécédant : {{currentPatient.antecedent}} </li>
                <li class="list-group-item"> Sport : {{currentPatient.sport}} </li>
                <li class="list-group-item"> Nombre d'enfant : {{currentPatient.enfant}} </li>
                <li class="list-group-item"> Date de naissance : {{currentPatient.naissance}} </li>
                <li class="list-group-item"> Lieu de naisssance : {{currentPatient.lieu}} </li>
              </ul>
            </div>

          </div>
          <div class="right">
            <h2> Suivi du dossier </h2>

            <div class="btn-group" role="group">
              <button type="button" class="btn btn-secondary">Hospitalisations</button>
              <button type="button" class="btn btn-secondary">Consultations</button>
              <button type="button" class="btn btn-secondary">Examens</button>
              <button type="button" class="btn btn-secondary">Maladies</button>
              <button type="button" class="btn btn-secondary">Allergies</button>
            </div>

            <div>

              <div v-for="dossier in patientDossier" :key="dossier.id"> {{dossier.id}} </div>

            </div>

          </div>
        </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    patients: {type: Array, default: []},
    account: { type: Object },
    patientDossier: {type: Array, default: []}
  },
  data() {
    return {
      currentPatient: {
        id: null,
        nsc: null,
        nom: null,
        prenom: null,
        age: null,
        sexe: null,
        tel: null,
        adresse: null,
        profession: null,
        mutuelle: null,
        antecedent: null,
        sport: null,
        enfant: null,
        service: null,
        urgence: null,
        medecin: null,
        lieu: null,
        naissance: null
      },
      currentTab: null,
      currentTabInfo: {
        here: null
      },
    };
  },
  async mounted() {

  },
  methods: {
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
    changeCurrentPatient(nouveau){

      if(nouveau.sexe == true){
        nouveau.sexe = "Homme"
      }else{
        nouveau.sexe = "Femme"
      }

      this.currentPatient = nouveau

    },
    changeCurrentTab(tab){

      this.currentTab = tab

    }
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

.block {

  display: flex;
  background-color:rgb(243, 237, 237);
  flex-wrap: wrap;

}

.right {

  flex: 1;
  padding: 10px;

}

.left {

  flex: 1;
  padding: 10px;

}

.interne {

  display: flex;
  flex-wrap: wrap;

}

.choix {

  flex: 1;
  margin-right: 10px;
  margin-left: 10px;

}

.affichage {

  flex: 1;
  flex-grow: 3;
  margin-right: 10px;
  margin-left: 10px;

}


</style>
