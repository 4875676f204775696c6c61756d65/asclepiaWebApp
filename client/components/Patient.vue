<template>
  <div>
    <div class="sfc"></div>

    <div v-if="!isConnected() && account.role == 'medecin'">
      <h1>Gerer mes patients</h1>

      <div class="block">
        <div class="left">
          <h2>Informations générales</h2>

          <div class="interne">
            <div
              class="btn-group-vertical choix"
              role="group"
              aria-label="Vertical button group"
              v-if="mode != 'creer'"
            >
              <button
                type="button"
                class="btn btn-outline-info"
                v-for="item in patients"
                :key="item.id"
                @click="changeCurrentPatient(item)"
              >
                {{ item.nom }} {{ item.prenom }}
              </button>
            </div>

            <ul v-if="mode == 'lecture'" class="list-group affichage">
              <li class="list-group-item">
                Numéro de sécurité social : {{ currentPatient.nsc }}
              </li>
              <li class="list-group-item">
                Nom et prénom : {{ currentPatient.nom }}
                {{ currentPatient.prenom }}
              </li>
              <li class="list-group-item">Age : {{ currentPatient.age }}</li>
              <li class="list-group-item">Sexe : {{ currentPatient.sexe }}</li>
              <li class="list-group-item">
                Téléphone : {{ currentPatient.tel }}
              </li>
              <li class="list-group-item">
                Adresse : {{ currentPatient.adresse }}
              </li>
              <li class="list-group-item">
                Profession : {{ currentPatient.profession }}
              </li>
              <li class="list-group-item">
                Mutuelle : {{ currentPatient.mutuelle }}
              </li>
              <li class="list-group-item">
                Antécédant : {{ currentPatient.antecedent }}
              </li>
              <li class="list-group-item">
                Sport : {{ currentPatient.sport }}
              </li>
              <li class="list-group-item">
                Nombre d'enfant : {{ currentPatient.enfant }}
              </li>
              <li class="list-group-item">
                Date de naissance : {{ currentPatient.naissance }}
              </li>
              <li class="list-group-item">
                Lieu de naisssance : {{ currentPatient.lieu }}
              </li>
            </ul>

            <div v-if="mode == 'modification'">
              <form>
                <div class="form-group">
                  <label for="nsc"> NSC : </label>
                  <input
                    v-model="changePatient.nsc"
                    type="text"
                    class="form-control"
                    id="nsc"
                  />
                </div>
                <div class="form-group">
                  <label for="nom"> Nom </label>
                  <input
                    v-model="changePatient.nom"
                    type="text"
                    class="form-control"
                    id="nom"
                  />
                </div>
                <div class="form-group">
                  <label for="prenom"> Prénom </label>
                  <input
                    v-model="changePatient.prenom"
                    type="text"
                    class="form-control"
                    id="prenom"
                  />
                </div>
                <div class="form-group">
                  <label for="age"> Age </label>
                  <input
                    v-model="changePatient.age"
                    type="text"
                    class="form-control"
                    id="age"
                  />
                </div>
                <div class="form-group">
                  <label for="sexe"> Sexe </label>
                  <select
                    v-model="changePatient.sexe"
                    class="form-control"
                    id="sexe"
                  >
                    <option value="true"> Homme </option>
                    <option value="false"> Femme </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="tel"> Téléphone </label>
                  <input
                    v-model="changePatient.tel"
                    type="text"
                    class="form-control"
                    id="tel"
                  />
                </div>
                <div class="form-group">
                  <label for="adresse"> adresse </label>
                  <input
                    v-model="changePatient.adresse"
                    type="text"
                    class="form-control"
                    id="adresse"
                  />
                </div>
                <div class="form-group">
                  <label for="profession"> Profession </label>
                  <input
                    v-model="changePatient.profession"
                    type="text"
                    class="form-control"
                    id="profession"
                  />
                </div>
                <div class="form-group">
                  <label for="antecedant"> Antécédent </label>
                  <input
                    v-model="changePatient.antecedant"
                    type="text"
                    class="form-control"
                    id="antecedant"
                  />
                </div>
                <div class="form-group">
                  <label for="sport"> Sport </label>
                  <input
                    v-model="changePatient.sport"
                    type="text"
                    class="form-control"
                    id="sport"
                  />
                </div>
                <div class="form-group">
                  <label for="enfant"> Enfant </label>
                  <input
                    v-model="changePatient.enfant"
                    type="text"
                    class="form-control"
                    id="enfant"
                  />
                </div>
                <div class="form-group">
                  <label for="naissance"> Date de naissance </label>
                  <input
                    v-model="changePatient.date"
                    type="text"
                    class="form-control"
                    id="naissance"
                    placeholder="format: DD/MM/AAAA"
                  />
                </div>
                <div class="form-group">
                  <label for="lieu"> Lieu de naisssance </label>
                  <input
                    v-model="changePatient.lieu"
                    type="text"
                    class="form-control"
                    id="lieu"
                  />
                </div>
              </form>
            </div>

            <div class="champCreer" v-if="mode == 'creer'">
              <form>
                <div class="form-group">
                  <label for="nsc"> NSC : </label>
                  <input
                    v-model="newPatient.nsc"
                    type="text"
                    class="form-control"
                    id="nsc"
                  />
                </div>
                <div class="form-group">
                  <label for="nom"> Nom </label>
                  <input
                    v-model="newPatient.nom"
                    type="text"
                    class="form-control"
                    id="nom"
                  />
                </div>
                <div class="form-group">
                  <label for="prenom"> Prénom </label>
                  <input
                    v-model="newPatient.prenom"
                    type="text"
                    class="form-control"
                    id="prenom"
                  />
                </div>
                <div class="form-group">
                  <label for="age"> Age </label>
                  <input
                    v-model="newPatient.age"
                    type="text"
                    class="form-control"
                    id="age"
                  />
                </div>
                <div class="form-group">
                  <label for="sexe"> Sexe </label>
                  <select
                    v-model="newPatient.sexe"
                    class="form-control"
                    id="sexe"
                  >
                    <option value="true"> Homme </option>
                    <option value="false"> Femme </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="tel"> Téléphone </label>
                  <input
                    v-model="newPatient.tel"
                    type="text"
                    class="form-control"
                    id="tel"
                  />
                </div>
                <div class="form-group">
                  <label for="adresse"> adresse </label>
                  <input
                    v-model="newPatient.adresse"
                    type="text"
                    class="form-control"
                    id="adresse"
                  />
                </div>
                <div class="form-group">
                  <label for="profession"> Profession </label>
                  <input
                    v-model="newPatient.profession"
                    type="text"
                    class="form-control"
                    id="profession"
                  />
                </div>
                <div class="form-group">
                  <label for="antecedant"> Antécédent </label>
                  <input
                    v-model="newPatient.antecedant"
                    type="text"
                    class="form-control"
                    id="antecedant"
                  />
                </div>
                <div class="form-group">
                  <label for="sport"> Sport </label>
                  <input
                    v-model="newPatient.sport"
                    type="text"
                    class="form-control"
                    id="sport"
                  />
                </div>
                <div class="form-group">
                  <label for="enfant"> Enfant </label>
                  <input
                    v-model="newPatient.enfant"
                    type="text"
                    class="form-control"
                    id="enfant"
                  />
                </div>
                <div class="form-group">
                  <label for="naissance"> Date de naissance </label>
                  <input
                    v-model="newPatient.date"
                    type="text"
                    class="form-control"
                    id="naissance"
                    placeholder="format: DD/MM/AAAA"
                  />
                </div>
                <div class="form-group">
                  <label for="lieu"> Lieu de naisssance </label>
                  <input
                    v-model="newPatient.lieu"
                    type="text"
                    class="form-control"
                    id="lieu"
                  />
                </div>
              </form>
            </div>
          </div>

          <div class="mode">
            <button
              type="button"
              class="btn btn-secondary"
              v-if="mode == 'lecture' && currentPatient.id != null"
              @click="changeCurrentMode('modification')"
            >
              Modifier
            </button>

            <button
              type="button"
              v-if="mode == 'modification'"
              class="btn btn-secondary"
              @click="saveData()"
            >
              Enregistrer
            </button>

            <button
              type="button"
              class="btn btn-secondary"
              v-if="mode == 'lecture'"
              @click="changeCurrentMode('creer')"
            >
              Nouveau patient
            </button>

            <button
              type="button"
              v-if="mode == 'creer'"
              class="btn btn-secondary"
              @click="createNewPatient()"
            >
              Creer
            </button>
          </div>
        </div>
        <div class="right">
          <h2>Suivi du dossier</h2>

          <div class="choixDossier">
            <button
              type="button"
              class="btn btn-secondary"
              @click="changeCurrentTab('hospitalisation')"
            >
              Hospitalisations
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="changeCurrentTab('consultation')"
            >
              Consultations
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="changeCurrentTab('examen')"
            >
              Examens
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="changeCurrentTab('maladie')"
            >
              Maladies
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="changeCurrentTab('allergie')"
            >
              Allergies
            </button>
          </div>

          <div class="interne" style="margin-top: 20px;">
            <div
              class="btn-group-vertical choix"
              role="group"
              aria-label="Vertical button group"
            >
              <button
                type="button"
                class="btn btn-outline-info"
                v-for="dossier in getMenu()"
                :key="dossier.id"
                @click="changeCurrentTabInfo(dossier.id)"
              >
                {{ getTitre(dossier) }}
              </button>
            </div>

            <div class="affichage">
              <div
                v-if="
                  currentTab == 'consultation' &&
                    currentTabInfo.type == currentTab
                "
              >
                <ul class="list-group">
                  <li class="list-group-item">
                    Sujet : {{ currentTabInfo.nom }}
                  </li>
                  <li class="list-group-item">
                    Date : {{ currentTabInfo.date }}
                  </li>
                  <li class="list-group-item">
                    Commentaire : {{ currentTabInfo.commentaire }}
                  </li>
                </ul>
              </div>
              <div
                v-else-if="
                  currentTab == 'examen' && currentTabInfo.type == currentTab
                "
              >
                <ul class="list-group">
                  <li class="list-group-item">
                    Nom : {{ currentTabInfo.nom }}
                  </li>
                  <li class="list-group-item">
                    Resultat : {{ currentTabInfo.resultat }}
                  </li>
                  <li class="list-group-item">
                    Date : {{ currentTabInfo.date }}
                  </li>
                  <li class="list-group-item">
                    Heure : {{ currentTabInfo.heure }}
                  </li>
                </ul>
              </div>
              <div
                v-else-if="
                  currentTab == 'hospitalisation' &&
                    currentTabInfo.type == currentTab
                "
              >
                <ul class="list-group">
                  <li class="list-group-item">
                    Resume : {{ currentTabInfo.resume }}
                  </li>
                  <li class="list-group-item">
                    Debut : {{ currentTabInfo.debut }}
                  </li>
                  <li class="list-group-item">
                    Fin : {{ currentTabInfo.fin }}
                  </li>
                </ul>
              </div>
              <div
                v-else-if="
                  currentTab == 'maladie' && currentTabInfo.type == currentTab
                "
              >
                <ul class="list-group">
                  <li class="list-group-item">
                    Nom : {{ currentTabInfo.nom }}
                  </li>
                  <li class="list-group-item">
                    Cause : {{ currentTabInfo.cause }}
                  </li>
                  <li class="list-group-item">
                    Diagnostic : {{ currentTabInfo.diagnostic }}
                  </li>
                </ul>
              </div>
              <div
                v-else-if="
                  currentTab == 'allergie' && currentTabInfo.type == currentTab
                "
              >
                <ul class="list-group">
                  <li class="list-group-item">
                    Nom : {{ currentTabInfo.nom }}
                  </li>
                  <li class="list-group-item">
                    Examen lié : {{ currentTabInfo.examen }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isConnected() && account.role == 'administratif'">
      <section class="jumbotron text-center">
        <div class="container">
          <h1>Oups...</h1>
          <p class="lead text-muted">
            Il semble que l'interface de gestion pour le personnel administratif
            ne soit pas tout a fait prête.
          </p>
        </div>
      </section>
    </div>

    <div v-if="isConnected()">
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
    dossiers: { type: Array, default: [] }
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
      currentTab: "examen",
      currentTabInfo: {
        type: null,
        id: null,
        nom: null,
        resultat: null,
        consultation: null,
        date: null,
        patient: null,
        maladie: null,
        heure: null,
        debut: null,
        fin: null,
        resume: null,
        date: null,
        commentaire: null,
        date: null,
        heure: null,
        organisateur: null,
        cause: null,
        diagnostic: null,
        actuel: null,
        traitement: null
      },
      newPatient: {
        id: 0,
        nsc: "",
        nom: "",
        prenom: "",
        age: "",
        sexe: "",
        tel: "",
        adresse: "",
        profession: "",
        mutuelle: "",
        antecedent: "",
        sport: "",
        enfant: "",
        service: 0,
        urgence: "",
        medecin: "",
        lieu: "",
        naissance: ""
      },
      changePatient: {
        id: 0,
        nsc: "",
        nom: "",
        prenom: "",
        age: "",
        sexe: "",
        tel: "",
        adresse: "",
        profession: "",
        mutuelle: "",
        antecedent: "",
        sport: "",
        enfant: "",
        service: 0,
        urgence: "",
        medecin: "",
        lieu: "",
        naissance: ""
      },
      mode: "lecture"
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
    changeCurrentPatient(nouveau) {
      if (nouveau.sexe == true) {
        nouveau.sexe = "Femme";
      } else {
        nouveau.sexe = "Homme";
      }

      this.currentPatient = nouveau;
    },
    changeCurrentTab(tab) {
      this.currentTab = tab;
    },
    changeCurrentTabInfo(elementId) {
      this.currentTabInfo.type = this.currentTab;
      this.currentTabInfo.id = null;
      this.currentTabInfo.nom = null;
      this.currentTabInfo.resultat = null;
      this.currentTabInfo.consultation = null;
      this.currentTabInfo.date = null;
      this.currentTabInfo.patient = null;
      this.currentTabInfo.maladie = null;
      this.currentTabInfo.heure = null;
      this.currentTabInfo.debut = null;
      this.currentTabInfo.fin = null;
      this.currentTabInfo.resume = null;
      this.currentTabInfo.date = null;
      this.currentTabInfo.commentaire = null;
      this.currentTabInfo.date = null;
      this.currentTabInfo.heure = null;
      this.currentTabInfo.organisateur = null;
      this.currentTabInfo.cause = null;
      this.currentTabInfo.diagnostic = null;
      this.currentTabInfo.actuel = null;
      this.currentTabInfo.traitement = null;

      if (this.currentTab == "examen") {
        for (i = 0; i < this.dossiers.length; i++) {
          if (this.dossiers[i].id == this.currentPatient.id) {
            for (j = 0; j < this.dossiers[i].examen.length; j++) {
              if (this.dossiers[i].examen[j].id == elementId) {
                this.currentTabInfo.id = this.dossiers[i].examen[j].id;
                this.currentTabInfo.nom = this.dossiers[i].examen[j].nom;
                this.currentTabInfo.resultat = this.dossiers[i].examen[
                  j
                ].resultat;
                this.currentTabInfo.consultation = this.dossiers[i].examen[
                  j
                ].consultation;
                this.currentTabInfo.date = this.dossiers[i].examen[j].date;
                this.currentTabInfo.patient = this.currentPatient.nom;
                this.currentTabInfo.maladie = this.dossiers[i].examen[
                  j
                ].maladie;
                this.currentTabInfo.heure = this.dossiers[i].examen[j].heure;
                this.currentTabInfo.médecin = this.dossiers[i].examen[
                  j
                ].médecin;
              }
            }
          }
        }
      } else if (this.currentTab == "hospitalisation") {
        for (i = 0; i < this.dossiers.length; i++) {
          if (this.dossiers[i].id == this.currentPatient.id) {
            for (j = 0; j < this.dossiers[i].hospitalisation.length; j++) {
              if (this.dossiers[i].hospitalisation[j].id == elementId) {
                this.currentTabInfo.id = this.dossiers[i].hospitalisation[j].id;
                this.currentTabInfo.resume = this.dossiers[i].hospitalisation[
                  j
                ].resume;
                this.currentTabInfo.debut = this.dossiers[i].hospitalisation[
                  j
                ].debut;
                this.currentTabInfo.fin = this.dossiers[i].hospitalisation[
                  j
                ].fin;
                this.currentTabInfo.patient = this.currentPatient.nom;
                this.currentTabInfo.médecin = this.dossiers[i].hospitalisation[
                  j
                ].médecin;
              }
            }
          }
        }
      } else if (this.currentTab == "consultation") {
        for (i = 0; i < this.dossiers.length; i++) {
          if (this.dossiers[i].id == this.currentPatient.id) {
            for (j = 0; j < this.dossiers[i].consultation.length; j++) {
              if (this.dossiers[i].consultation[j].id == elementId) {
                this.currentTabInfo.id = this.dossiers[i].consultation[j].id;
                this.currentTabInfo.nom = this.dossiers[i].consultation[j].nom;
                this.currentTabInfo.date = this.dossiers[i].consultation[
                  j
                ].date;
                this.currentTabInfo.patient = this.currentPatient.nom;
                this.currentTabInfo.commentaire = this.dossiers[i].consultation[
                  j
                ].commentaire;
                this.currentTabInfo.médecin = this.dossiers[i].consultation[
                  j
                ].médecin;
              }
            }
          }
        }
      } else if (this.currentTab == "maladie") {
        for (i = 0; i < this.dossiers.length; i++) {
          if (this.dossiers[i].id == this.currentPatient.id) {
            for (j = 0; j < this.dossiers[i].maladie.length; j++) {
              if (this.dossiers[i].maladie[j].id == elementId) {
                this.currentTabInfo.id = this.dossiers[i].maladie[j].id;
                this.currentTabInfo.nom = this.dossiers[i].maladie[j].nom;
                this.currentTabInfo.hospitalisation = this.dossiers[i].maladie[
                  j
                ].hospitalisation;
                this.currentTabInfo.cause = this.dossiers[i].maladie[j].cause;
                this.currentTabInfo.patient = this.currentPatient.nom;
                this.currentTabInfo.diagnostic = this.dossiers[i].maladie[
                  j
                ].diagnostic;
                this.currentTabInfo.actuel = this.dossiers[i].maladie[j].actuel;
              }
            }
          }
        }
      } else if (this.currentTab == "allergie") {
        for (i = 0; i < this.dossiers.length; i++) {
          if (this.dossiers[i].id == this.currentPatient.id) {
            for (j = 0; j < this.dossiers[i].allergie.length; j++) {
              if (this.dossiers[i].allergie[j].id == elementId) {
                this.currentTabInfo.id = this.dossiers[i].allergie[j].id;
                this.currentTabInfo.nom = this.dossiers[i].allergie[j].nom;
                this.currentTabInfo.patient = this.currentPatient.nom;
                this.currentTabInfo.examen = this.dossiers[i].allergie[
                  j
                ].examen;
              }
            }
          }
        }
      }
    },
    getMenu() {
      if (this.currentPatient.id == null) {
        return null;
      }

      if (this.currentTab == "examen") {
        for (i = 0; i < this.dossiers.length; i++) {
          if (this.dossiers[i].id == this.currentPatient.id) {
            return this.dossiers[i].examen;
          }
        }
      } else if (this.currentTab == "hospitalisation") {
        for (i = 0; i < this.dossiers.length; i++) {
          if (this.dossiers[i].id == this.currentPatient.id) {
            return this.dossiers[i].hospitalisation;
          }
        }
      } else if (this.currentTab == "consultation") {
        for (i = 0; i < this.dossiers.length; i++) {
          if (this.dossiers[i].id == this.currentPatient.id) {
            return this.dossiers[i].consultation;
          }
        }
      } else if (this.currentTab == "maladie") {
        for (i = 0; i < this.dossiers.length; i++) {
          if (this.dossiers[i].id == this.currentPatient.id) {
            return this.dossiers[i].maladie;
          }
        }
      } else if (this.currentTab == "allergie") {
        for (i = 0; i < this.dossiers.length; i++) {
          if (this.dossiers[i].id == this.currentPatient.id) {
            return this.dossiers[i].allergie;
          }
        }
      }
    },
    getTitre(element) {
      if (this.currentTab == "hospitalisation") {
        return element.resume;
      } else {
        return element.nom;
      }
    },
    changeCurrentMode(nouveau) {
      this.mode = nouveau;
    },
    createNewPatient() {
      this.$emit("create-new-patient", this.newPatient);
      this.changeCurrentMode("lecture");
    },
    saveData() {
      this.changePatient.id = this.currentPatient.id;
      this.$emit("update-patient", this.changePatient);
      this.changeCurrentMode("lecture");
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
  background-color: rgb(243, 237, 237);
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

.mode {
  margin: 7px;
  text-align: center;
}

.champcreer {
  text-align: center;
}

.choixDossier {
  display: flex;
  flex-wrap: wrap;
}

.choixDossier button {
  margin: 5px;
}
</style>
