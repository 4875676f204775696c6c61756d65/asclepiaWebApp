<template>
  <div style="background-image: url(./icon/fond.png); height: 100%;">

      <div class="sfc"></div>
    <div>
      <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center">
        <div class="col-md-10 p-lg-5 mx-auto my-5">
          <h1 class="font-weight-normal"> Bienvenue sur ASCLEPIA votre site de Gestion Médical. </h1>
          <p class="lead font-weight-normal">Ce site a pour objectif de venir vous assister et épauler au quotidien en vous mettant a disposition un environnement de travail claire et efficace !
             Pour cela dans votre environnement vous trouverez un tableau de bord ergonomique qui vous permettra de voir vos patients récents ainsi 
             que les examens à venir ou encore les éventuels messages non-lu ! <br>Vous y trouverez également d’autres onglets à votre disposition comme un 
             calendrier qui vous permettra d’avoir un suivi constant de vos programmes, ainsi qu’un espace pour gérer les dossiers de vos patients 
             patients ce qui vous permettra d’avoir accès à n’importe quel moment à leurs informations comme leurs antécédents médicaux par exemple. 
             <br>De plus cette environnement a pour objectif de devenir une plateforme de partage avec les autres professionnels de santé qui pourront 
             notamment vous adresser des courriers. D’autres modules sont en développement et pourront s’ajouter très prochainement a votre 
             environnement préfère ce qui vous permettra d’être constamment a la pointe de la technologie.</p>
          <a class="btn btn-outline-secondary" href="#/register"> Rejoindre </a>
          <a class="btn btn-outline-secondary" href="#/login"> Se connecter </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    patients: { type: Array, default: [] },
    account: { type: Object }
  },
  data() {
    return {};
  },
  methods: {
    async logOut() {
      this.$emit("log-out");
    },
    isConnected() {
      if (this.account.loggedAt != null) {
        return false;
      } else {
        return true;
      }
    },
    getStatus() {
      if (this.account.loggedAt != null) {
        return "Connecté";
      } else {
        return "Non connecté";
      }
    }
  }
};
</script>

<style scoped>

.centrer{

  text-align: center;
  margin-top: 20%;

}

.sfc {
  margin-top: 56px;
}

</style>
