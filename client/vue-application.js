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
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    }
  },
  async mounted() {
    const res = await axios.get('/api/articles')
    this.articles = res.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data
  },
  methods: {
    async addArticle(article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },
    async updateArticle(newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },
    async deleteArticle(articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    },
    async addToPanier(articleId) {
      const res = await axios.post('/api/panier', { id: articleId, quantity: 1 })
      this.panier.articles.push(res.data)
    },
    async removeFromPanier(articleId) {
      const res = await axios.delete('/api/panier/' + articleId)
      const index = this.panier.articles.findIndex(a => a.articleId === articleId)
      this.panier.articles.splice(index, 1)
    },
    async augmenterQ(articleId) {
      const index = this.panier.articles.findIndex(a => a.articleId === articleId)
      let quantity = this.panier.articles[index].number + 1
      const res = await axios.put('/api/panier/' + articleId, { quantity: quantity })
      this.panier.articles[index].number = quantity
    },
    async reduireQ(articleId) {
      const index = this.panier.articles.findIndex(a => a.articleId === articleId)
      let quantity = this.panier.articles[index].number - 1
      if (quantity <= 0) { return }
      const res = await axios.put('/api/panier/' + articleId, { quantity: quantity })
      this.panier.articles[index].number = quantity
    },
    async createUsers(newEmail, newPassword) {
      const res = await axios.post('/api/register', { email: newEmail, password: newPassword })
    },
    async logIn(email, password) {
  
      try {

        const response = await axios.get('/api/me')
        console.log(response)
        alert('Vous êtes deja connecté')
        return

      } catch {

        const res = await axios.post('/api/login', { email: email, password: password })
        if(res.status == 200){
          alert("Vous êtes connecté.")
        }

      }

    }
  }
})
