const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/panier', component: Panier },
  { path: '/register', component: Register },
  { path: '/login', component: Login }
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
      constructor() {
        this.loggedAt
        this.nom
        this.prenom
        this.role
        this.service
        this.poste
    }
    },
  },
  async mounted() {

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
        console.log(this.account)
      }
    }
  }
})
