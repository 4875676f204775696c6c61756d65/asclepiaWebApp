<template>
  <div>

    <div class="centrer" v-if="!isConnected()">
      
    </div>

    <div id="statusInfo" class="centrer">
      <div>Statut : {{ getStatus() }}</div>
      <div v-if="!isConnected()">
        Info : {{ account.nom }} {{ account.prenom }}
        <input type="button" value="Se deconnecter" @click="logOut()" />
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
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
        
    };
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
.centrer {
  text-align: center;
  margin-top: 20%;
}
</style>