<template>
  <div>
    <h1> Welcome on asclepia </h1>

    <ul>

      <li v-for="patient in patients" :key="patient.id"> Nom : {{ patient.nom }} {{ patient.prenom }} </li>

    </ul>

  </div>
</template>

<script>
module.exports = {
  props: {
    patient: { type: Array, default: [] }
  },
  data() {
    return {
      
    };
  },
  methods: {
    async loadPatient(){
      this.$emit('load-patient')
    }
  },
};
</script>

<style scoped>

/* Code css */

</style>
