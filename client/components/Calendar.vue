<template>
  <div>
    <div class="sfc"></div>

    <div class="centrer" v-if="!isConnected()">
      <div class="container-fluid">
        <div class="row">
          <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="home"></span>
                    Tous
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file"></span>
                    Consultations
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="shopping-cart"></span>
                    Examen
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="users"></span>
                    Hospitalisation
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
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
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Patient 1
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Patient 2
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Patient 3
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Patient 4
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
        :time-from="9 * 60"
        :time-to="23 * 60"
        :on-event-click="onEventClick"
        events-on-month-view="short"
      >
        </vuecal>
    </div>

    <div v-else>
      Connecter vous pour pour acceder a votre calendirer personnel. Si vous
      n'avez pas de compte inscrivez vous.
    </div>

    <div id="statusInfo" class="centrer">
      <div>Statut : {{ getStatus() }}</div>
      <div v-if="!isConnected()">
        Info : {{ account.nom }} {{ account.prenom }}
        <div>
          <input type="button" value="Se deconnecter" @click="logOut()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//const { mounted }=require("./Register.vue");

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
      selectedEvent: {},
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
    onEventClick (event, e) {
      this.selectedEvent = event

      // affichage ddes details en dessous
    }
  }
};
</script>

<style scoped>
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

.cal {
  margin-left: 17%;
}

.cal button {
  border: none;
  background-color: #dfe0e1;
}

.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.sport {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
</style>

