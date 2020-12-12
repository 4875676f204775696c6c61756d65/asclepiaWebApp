const Home = window.httpVueLoader('./components/Home.vue')
const Patient = window.httpVueLoader('./components/Patient.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Calendar = window.httpVueLoader('./components/Calendar.vue')
const Dashboard = window.httpVueLoader('./components/Dashboard.vue')
const Message = window.httpVueLoader('./components/Message.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/patient', component: Patient },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/calendar', component: Calendar },
  { path: '/dashboard', component: Dashboard },
  { path: '/message', component: Message }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    patients: [],
    events: [],
    account: {
      loggedAt: null,
      nom: null,
      prenom: null,
      role: null,
      service: null,
      poste: null
    },
    dossiers: [],
    messages: [],
    contacts: [],
    info: []
  },
  async mounted() {

    const res = await axios.get('api/whoiam')

    if (res.status == 200 && res.data.message != 'Pas de session active') {
      this.account.loggedAt = res.data.loggedAt
      this.account.nom = res.data.nom
      this.account.prenom = res.data.prenom
      this.account.role = res.data.role
      this.account.poste = res.data.poste
    } else {
      console.log('Non logger')
    }

    if (this.account.loggedAt != null) {

      const calendar = await axios.post('api/calendar/all')

      if (calendar.status == 200) {

        this.events = calendar.data

      } else {

        console.log('Erreur lors de la requete. Verifier la connection.')

      }

      if (this.account.role == 'medecin') {

        const req_patient = await axios.get('/api/myPatient')

        this.patients = req_patient.data

        await this.getPatientInfo()

        await this.getInfoPerso()

      }

      await this.getContact()

      await this.getMessage()


    }

  },
  methods: {
    async logIn(_pseudo, _mdp, _role) {

      if (_role == 'administratif') {

        const res = await axios.post('/api/login/administratif', { pseudo: _pseudo, mdp: _mdp })
        if (res.status == 200) {
          alert("Vous êtes connecté.")
          this.account.loggedAt = res.data.loggedAt
          this.account.nom = res.data.nom
          this.account.prenom = res.data.prenom
          this.account.role = res.data.role
          this.account.poste = res.data.poste

          document.location = '#/'
          document.location.reload()

          return
        }
        alert('Echec de la connexion.')
      } else {

        const res = await axios.post('/api/login/medecin', { pseudo: _pseudo, mdp: _mdp })
        if (res.status == 200) {
          alert("Vous êtes connecté.")
          this.account.loggedAt = res.data.loggedAt
          this.account.nom = res.data.nom
          this.account.prenom = res.data.prenom
          this.account.role = res.data.role
          this.account.poste = res.data.specialite
          this.account.service = res.data.service

          document.location = '#/'

          //necessaire pour faire les requetes async. (chargement calendrier par exemple).
          document.location.reload()

          return
        }
        alert('Echec de la connexion.')

      }
    },
    async logOut() {

      const res = await axios.post('/api/end')

      if (res.status == 200) {
        this.account.loggedAt = null
        this.account.nom = null
        this.account.prenom = null
        this.account.role = null
        this.account.poste = null
        alert('Vous etes deconnecter')
      } else {
        alert('Vous n\'etes pas connecter')
      }

    },
    async getCalendar(type, id = -1) {

      if (type == 'patient') {

        const calendar = await axios.post('api/calendar/patient', { patient: id })

        if (calendar.status == 200) {

          this.events = calendar.data

        } else {

          console.log('Erreur lors de la requete. Verifier la connection.')

        }

      } else {

        const calendar = await axios.post('api/calendar/' + type)

        if (calendar.status == 200) {

          this.events = calendar.data

        } else {

          console.log('Erreur lors de la requete. Verifier la connection.')

        }

      }

    },
    async getPatientInfo() {

      const res = await axios.get('/api/myPatientInfo')

      this.dossiers = res.data

    },
    async getContact() {

      const res = await axios.get('/api/contact')

      this.contacts = res.data

    },
    async getMessage() {

      const res = await axios.get('/api/message')

      this.messages = res.data

    },
    async sendNewMessage(destinataire, role, sujet, contenu) {

      const sending = await axios.post('api/message', { dest: destinataire, destr: role, sujet: sujet, contenu: contenu })

      if (sending.status == 200) {
        alert('Message envoyé.')
        document.location.reload()
      }

    },
    async supprimerMessage(id) {

      const sending = await axios.delete('api/message/' + id)

      if (sending.status == 200) {
        alert('Message supprimé.')
        document.location.reload()
      }

    },
    async createNewPatient(patient) {

      for (const ele in patient) {
        if (patient[ele] == '' || patient[ele] == 0) {
          alert('Attention les champs ne peuvent pas etre vide !')
          return
        }
      }

      const sending = await axios.post('api/add/patient', { nsc: patient.nsc, nom: patient.nom, prenom: patient.prenom, sexe: patient.sexe, age: patient.age, tel: patient.tel, adresse: patient.adresse, profession: patient.profession, mutuelle: patient.mutuelle, antecedent: patient.antecedent, sport: patient.sport, enfant: patient.enfant, service: patient.service, urgence: patient.urgence, lieu: patient.lieu, naissance: patient.naissance })

      if (sending.status == 200) {

        alert('Fiche patient ajouter.')
        document.location.reload()

      }

    },
    async updatePatient(patient) {

      for (const ele in patient) {
        if (patient[ele] != '' && patient[ele] != 0 && ele != 'id' && ele != 'mdp') {
          const sending = await axios.put('api/update/' + 'patient', { champ: ele, id: patient.id, valeur: patient[ele] })
        }
      }

      alert('Fiche patient mise à jour.')
      document.location.reload()

    },
    async changeInfoPerso(info) {

      for (const ele in info) {
        if (info[ele] != '') {
          const sending = await axios.put('api/update/' + this.account.role, { champ: ele, id: -1, valeur: info[ele] })
        }
      }

      alert('Informations personnelle.')
      document.location.reload()

    },
    async changePassword(newPass) {

      if (newPass == '') {
        alert('Attention le mot de passe ne peut pas etre vide !')
        return
      }

      const sending = await axios.put('api/changepass/medecin', { nouveau: newPass })

      if (sending.status == 200) {
        alert("Mdp changé")
        document.location.reload()
      }

    },
    async getInfoPerso() {

      const sending = await axios.get('api/infoperso')

      this.info = sending.data

    },
    async Register(nom, prenom, pseudo, mdp, fonction, numpro, numperso, role) {

      const sending = await axios.post('api/register/' + role, { nom: nom, prenom: prenom, pseudo: pseudo, mdp: mdp, poste: fonction, emplacement: 'chu', numPro: numpro, numPerso: numperso, spe: fonction, service: 0 })

      if (sending.status == 200) {
        alert('Compte creer !')
        document.location = '#/login'
      }

    }

  }
})
