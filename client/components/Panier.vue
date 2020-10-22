<template>
  <div>
    <h2>Mon Panier</h2>
    <article
      v-for="article in panier.articles"
      :key="article.articleId"
      class="list-group-item list-group-item-action d-flex bd-highlight align-items-start"
    >
      <div class="p-2 bd-highlight">
        <div
          class="image"
          :style="{ backgroundImage: 'url(' + getUrl(article.articleId) + ')' }"
        ></div>
      </div>
      <div class="p-2 flex-grow-1 bd-highlight">
        <div>
          <h2>
            {{ getName(article.articleId) }} -
            {{ getPrice(article.articleId) }}€
          </h2>
          <p>{{ getDescription(article.articleId) }}</p>
          <div class="btn-group mr-2" role="group" aria-label="First group">
            <button
              class="btn btn-secondary"
              @click="reduireQ(article.articleId)"
            >
              -
            </button>
            <button class="btn btn-secondary" disabled>
              {{ article.number }}
            </button>
            <button
              class="btn btn-secondary"
              @click="augmenterQ(article.articleId)"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object },
  },
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    getUrl(id) {
      for (i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          return this.articles[i].image;
        }
      }
    },
    getName(id) {
      for (i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          return this.articles[i].name;
        }
      }
    },
    getPrice(id) {
      for (i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          return this.articles[i].price;
        }
      }
    },
    getDescription(id) {
      for (i = 0; i < this.articles.length; i++) {
        if (this.articles[i].id === id) {
          return this.articles[i].description;
        }
      }
    },
    reduireQ(id) {
      this.$emit("reduire-quantity", id);
    },
    augmenterQ(id) {
      this.$emit("augmenter-quantity", id);
    },
  },
};
</script>

<style scoped>
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

.article-content {
  flex: 3;
}

.article-title {
  display: flex;
  justify-content: space-between;
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
</style>
