<template>
  <div>
    <div class="sfc"></div>

    <div class="centrer" v-if="!isConnected()">
      <div id="menuShort">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-outline-info" @click="getAll()">
            Tous
          </button>
          <button
            type="button"
            class="btn btn-outline-info"
            @click="getConsultation()"
          >
            Consultations
          </button>
          <button
            type="button"
            class="btn btn-outline-info"
            @click="getExamen()"
          >
            Examens
          </button>
        </div>

        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn btn-outline-info"
            @click="getHospitalisation()"
          >
            Hospitalisations
          </button>
          <button
            type="button"
            class="btn btn-outline-info"
            @click="getReunion()"
          >
            Reunions
          </button>
          <button type="button" class="btn btn-outline-info">Autres</button>
        </div>
      </div>

      <div id="menuLong" class="container-fluid">
        <div class="row">
          <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="getAll()">
                    <span data-feather="home"></span>
                    Tous
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="getConsultation()">
                    <span data-feather="file"></span>
                    Consultations
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="getExamen()">
                    <span data-feather="shopping-cart"></span>
                    Examen
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="getHospitalisation()">
                    <span data-feather="users"></span>
                    Hospitalisation
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#" @click="getReunion()">
                    <span data-feather="bar-chart-2"></span>
                    Reunion
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="layers"></span>
                    Autres
                  </a>
                </li>
              </ul>

              <h6
                class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
              >
                <span>Voir par patient</span>
                <a class="d-flex align-items-center text-muted" href="#">
                  <span data-feather="plus-circle"></span>
                </a>
              </h6>
              <ul class="nav flex-column mb-2">
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    v-for="item in patients"
                    :key="item.id"
                    @click="getPatient(item.id)"
                  >
                    <span data-feather="file-text"></span>
                    {{ item.prenom }} {{ item.nom }}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <vuecal
        class="cal"
        :events="events"
        :time-from="7 * 60"
        :time-to="23 * 60"
        :on-event-click="onEventClick"
        :time-step="30"
        events-on-month-view="short"
        active-view="month"
      >
      </vuecal>

      <div v-if="Object.keys(selectedEvent).length != 0">
        <ul class="list-group cal">
          <li class="list-group-item">
            Type d'événement : {{ selectedEvent.class }}
          </li>
          <li class="list-group-item">
            Nom de l'événement : {{ selectedEvent.title }}
          </li>
          <li class="list-group-item">
            Début : le {{ selectedEvent.start.format("DD/MM/YYYY") }} à
            {{ selectedEvent.start.formatTime() }}
          </li>
          <li class="list-group-item">
            Fin : le {{ selectedEvent.end.format("DD/MM/YYYY") }} à
            {{ selectedEvent.end.formatTime() }}
          </li>
          <li class="list-group-item">Détails : {{ selectedEvent.content }}</li>
        </ul>
      </div>
    </div>

    <div v-if="isConnected()">
      <section class="jumbotron text-center">
        <div class="container">
          <h1>Rejoignez-nous !</h1>
          <p class="lead text-muted">
            Pour pouvoir profiter pleinement des fonctionnalités du site il vous
            faut creer un compte. Si vous en avez deja un connecter vous pour
            acceder à vos informations personnel.
          </p>
          <p>
            <a href="#/register" class="btn btn-primary my-2">
              Je n'ai pas encore de compte
            </a>
            <a href="#/login" class="btn btn-secondary my-2">
              J'ai deja un compte
            </a>
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
module.exports = {
  components: { vuecal },
  props: {
    patients: { type: Array, default: [] },
    account: { type: Object },
    events: { type: Array, default: [] }
  },
  data() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      selectedEvent: {}
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
    },
    onEventClick(event, e) {
      this.selectedEvent = event;
      console.log(this.selectedEvent.title);
      // affichage ddes details en dessous
    },
    getAll() {
      this.$emit("get-calendar", "all");
    },
    getReunion() {
      this.$emit("get-calendar", "reunion");
    },
    getConsultation() {
      this.$emit("get-calendar", "consultation");
    },
    getHospitalisation() {
      this.$emit("get-calendar", "hospitalisation");
    },
    getExamen() {
      this.$emit("get-calendar", "examen");
    },
    getPatient(id) {
      this.$emit("get-calendar", "patient", id);
    }
  }
};
</script>

<style scoped>
@media (max-width: 850px) {
  #menuLong {
    display: none;
  }

  #menuShort {
    margin-top: 15px;
    margin-bottom: 10px;
  }
}

@media (min-width: 851px) {
  .cal {
    margin-left: 17%;
  }

  #menuShort {
    display: none;
  }
}

button {
  margin: 3px;
}

.centrer {
  text-align: center;
  margin-top: 20px;
}

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  margin-top: 60px;
}

.sidebar-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 48px; /* Height of navbar */
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar a:hover {
  color: #999;
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

.sfc {
  margin-top: 60px;
}

.cal button {
  border: none;
  background-color: #dfe0e1;
}

.vuecal__event.Consultation {
  background-color: rgba(253, 156, 66, 0.7);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.Examen {
  background-color: rgba(255, 102, 102, 0.7);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}

.vuecal__event.Hospitalisation {
  background-color: rgba(128, 255, 102, 0.7);
  border: 1px solid rgb(82, 235, 120);
  color: #fff;
}

.vuecal__event.Reunion {
  background-color: rgba(102, 138, 255, 0.7);
  border: 1px solid rgb(102, 138, 255, 0.7);
  color: #fff;
}
</style>

