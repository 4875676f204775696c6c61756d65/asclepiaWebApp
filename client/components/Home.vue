<template>
  <div>
    <div class="list-group">
      <article
        v-for="article in articles"
        :key="article.id"
        class="list-group-item list-group-item-action d-flex bd-highlight align-items-start"
      >
        <div class="p-2 bd-highlight">
          <div
            class="image"
            :style="{ backgroundImage: 'url(' + article.image + ')' }"
          ></div>
        </div>
        <div
          class="p-2 flex-grow-1 bd-highlight"
          v-if="editingArticle.id !== article.id"
        >
          <div>
            <h2>{{ article.name }} - {{ article.price }}€</h2>
            <p>{{ article.description }}</p>
            <div class="btn-group mr-2" role="group" aria-label="First group">
              <button
                type="button"
                class="btn btn-secondary"
                :disabled="estDansLePanier(article.id)"
                @click="removeFromPanier(article.id)"
              >
                Retirer du panier
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                :disabled="!estDansLePanier(article.id)"
                @click="addToPanier(article.id)"
              >
                Ajouter au panier
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="deleteArticle(article.id)"
              >
                Supprimer
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="editArticle(article)"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="article-title">
            <h2>
              <input type="text" v-model="editingArticle.name" /> -
              <input type="number" v-model="editingArticle.price" />
            </h2>
            <div>
              <button @click="sendEditArticle()">Valider</button>
              <button @click="abortEditArticle()">Annuler</button>
            </div>
          </div>
          <p><textarea v-model="editingArticle.description"></textarea></p>
          <input
            type="text"
            v-model="editingArticle.image"
            placeholder="Lien vers l'image"
          />
        </div>
      </article>
    </div>

    <hr class="mt-2 mb-3" />

    <form @submit.prevent="addArticle">
      <h2 class="titreForm">Nouveau produit à ajouter</h2>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="Nom">Nom</label>
          <input
            type="text"
            name="Nom"
            v-model="newArticle.name"
            placeholder="Nouveau produit"
            required
          />
        </div>
        <div class="form-group col-md-4">
          <label for="prix">Prix</label>
          <input
            type="number"
            name="prix"
            v-model="newArticle.price"
            placeholder="Prix affiché"
            required
          />
        </div>
        <div class="form-group col-md-4">
          <label for="lien">Image</label>
          <input
            type="text"
            name="lien"
            v-model="newArticle.image"
            placeholder="Lien vers l'image"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="description">Descritption</label>
        <textarea
          type="text"
          name="descritpion"
          v-model="newArticle.description"
          required
        ></textarea>
      </div>
      <div style="text-align: center">
        <button type="submit" class="btn btn-secondary">Ajouter</button>
      </div>
    </form>
  </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object },
  },
  data() {
    return {
      newArticle: {
        name: "",
        description: "",
        image: "",
        price: 0,
      },
      editingArticle: {
        id: -1,
        name: "",
        description: "",
        image: "",
        price: 0,
      },
    };
  },
  methods: {
    addArticle() {
      this.$emit("add-article", this.newArticle);
    },
    deleteArticle(articleId) {
      this.$emit("delete-article", articleId);
    },
    editArticle(article) {
      this.editingArticle.id = article.id;
      this.editingArticle.name = article.name;
      this.editingArticle.description = article.description;
      this.editingArticle.image = article.image;
      this.editingArticle.price = article.price;
    },
    sendEditArticle() {
      this.$emit("update-article", this.editingArticle);
      this.abortEditArticle();
    },
    abortEditArticle() {
      this.editingArticle = {
        id: -1,
        name: "",
        description: "",
        image: "",
        price: 0,
      };
    },
    addToPanier(articleId) {
      this.$emit("add-to-panier", articleId);
    },
    removeFromPanier(articleId) {
      this.$emit("remove-from-panier", articleId);
    },
    estDansLePanier(articleId) {
      for (i = 0; i < this.panier.articles.length; i++) {
        if (this.panier.articles[i].articleId == articleId) return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
form {
  margin-left: 5em;
  margin-right: 5em;
  margin-top: 3em;
}

form button {
  margin: auto;
}

.titreForm {
  margin-bottom: 1em;
}

article {
  display: flex;
}

.article-img {
  flex: 1;
}

.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}

@media screen and (max-width: 1069px) {
  .image {
    width: 100px;
    height: 100px;
    background-size: cover;
    margin-left: 2em;
    margin-right: 7em;
  }
}

@media screen and (max-width: 1390px) and (min-width: 1070px) {
  .image {
    width: 100px;
    height: 100px;
    background-size: cover;
    margin-left: 10em;
    margin-right: 15em;
  }
}

@media screen and (min-width: 1391px) {
  .image {
    width: 100px;
    height: 100px;
    background-size: cover;
    margin-left: 20em;
    margin-right: 25em;
  }
}

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: 100%;
}
</style>
