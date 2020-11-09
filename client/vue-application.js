const Home = window.httpVueLoader('./components/Home.vue')
const Patient = window.httpVueLoader('./components/Patient.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Calendar = window.httpVueLoader('./components/Calendar.vue')
const Dashboard = window.httpVueLoader('./components/Dashboard.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/patient', component: Patient },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/calendar', component: Calendar },
  { path: '/dashboard', component: Dashboard }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    patients: [],
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

  },
  methods: {
    async loadPatient() {
      const res = await axios.get('/api/table/patient')
      this.patients = res.data
      console.log(this.patients)
    },
    async logIn(_pseudo, _mdp) {

      const res = await axios.post('/api/login/administratif', { pseudo: _pseudo, mdp: _mdp })
      if (res.status == 200) {
        alert("Vous êtes connecté.")
        this.account.loggedAt = res.data.loggedAt
        this.account.nom = res.data.nom
        this.account.prenom = res.data.prenom
        this.account.role = res.data.role
        this.account.poste = res.data.poste
      } else {
        alert('Echec de la connexion.')
        console.log(res)
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

    }
  }
})
