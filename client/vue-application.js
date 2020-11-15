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
  },
  async mounted() {

    const res = await axios.get('api/whoiam')

    if (res.status == 200 && res.data.message != 'Pas de session active') {
      this.account.loggedAt = res.data.loggedAt
      this.account.nom = res.data.nom
      this.account.prenom = res.data.prenom
      this.account.role = res.data.role
      this.account.poste = res.data.poste
    }else{
      console.log('Non logger')
    }

    if(this.account.loggedAt != null){

      const calendar = await axios.post('api/calendar/all')

      if(calendar.status == 200){

        this.events = calendar.data

      }else{

        console.log('Erreur lors de la requete. Verifier la connection.')

      }

      if(this.account.role == 'medecin'){

        const req_patient = await axios.get('/api/myPatient')

        this.patients = req_patient.data

      }

    }

  },
  methods: {
    async logIn(_pseudo, _mdp,_role) {

      if(_role == 'administratif'){

        const res = await axios.post('/api/login/administratif', { pseudo: _pseudo, mdp: _mdp })
        if (res.status == 200) {
          alert("Vous êtes connecté.")
          this.account.loggedAt = res.data.loggedAt
          this.account.nom = res.data.nom
          this.account.prenom = res.data.prenom
          this.account.role = res.data.role
          this.account.poste = res.data.poste

          return 
        }
        alert('Echec de la connexion.')
      }else{

        const res = await axios.post('/api/login/medecin', { pseudo: _pseudo, mdp: _mdp })
        if (res.status == 200) {
          alert("Vous êtes connecté.")
          this.account.loggedAt = res.data.loggedAt
          this.account.nom = res.data.nom
          this.account.prenom = res.data.prenom
          this.account.role = res.data.role
          this.account.poste = res.data.specialite
          this.account.service = res.data.service

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

      if(type == 'patient'){

        const calendar = await axios.post('api/calendar/patient', {patient: id})

        if(calendar.status == 200){

          this.events = calendar.data

        }else{

          console.log('Erreur lors de la requete. Verifier la connection.')

        }

      }else{

        const calendar = await axios.post('api/calendar/' + type)

        if(calendar.status == 200){

          this.events = calendar.data

        }else{

          console.log('Erreur lors de la requete. Verifier la connection.')

        }

      }

    }
  }
})
