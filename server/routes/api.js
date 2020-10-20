const express = require('express')
const router = express.Router()

//  Load dependencies for database connect and manage

const bcrypt = require('bcrypt')
const { Client } = require('pg')

const db = new Client({
    user: 'postgres',
    host: 'localhost',
    port: '5433',
    password: 'toor',
    database: 'ASCLEPIA'
})

db.connect()


router.use((req, res, next) => {

    next()

})

router.get('/test', (req, res) => {

    res.json({ message: 'hola pepito' })

})

router.get('/table/:nom', async (req, res) => {

    const table = req.params.nom

    let exist

    if (table == 'index') {
        exist = true
    } else {
        exist = false
    }

    if (exist === false) {

        const verif_req = "SELECT * FROM index"

        const verif = await db.query({
            text: verif_req
        })

        for (i = 0; i < verif.rowCount; i++) {

            if (table == verif.rows[i].nom) {
                exist = true
            }

        }

    }

    if (exist === true) {

        let requete

        if (table == 'medecin') {

            requete = "SELECT id,nom,prenom,specialite,emplacement,numpro,numperso,service,pseudo FROM " + table

        } else {

            requete = "SELECT * FROM " + table

        }


        const result = await db.query({
            text: requete
        })

        if (result.rowCount == 0) {
            res.json({ message: 'Empty' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(404).json({ message: 'Table not found' })

    }

})

router.post(('/add/index'), async (req, res) => {

    const nom = req.body.nom

    if (typeof nom != String && nom != '') {

        const requete = "INSERT INTO index(nom) VALUES($1) RETURNING *"

        const result = await db.query({
            text: requete,
            values: [nom]
        })

        if (result.rowCount == 0) {
            res.json({ message: 'Erreur lors de l\'ajout' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(400).json({ message: 'Bad request' })

    }

})

router.post('/register/medecin', async (req, res) => {

    const nom = req.body.nom
    const prenom = req.body.prenom
    const pseudo = req.body.pseudo
    let mdp = req.body.mdp
    const specialite = req.body.spe
    const lieuDeTravail = req.body.lieu
    const numPro = req.body.numPro
    const numPerso = req.body.numPerso
    const service = req.body.service

    mdp = await bcrypt.hash(mdp, 10)

    //Rajouter des verifs ou ici ou cote client

    let validation = true

    const verif_req_pseudo = "SELECT pseudo FROM medecin"

    const verif_pseudo = await db.query({
        text: verif_req_pseudo
    })

    for (i = 0; i < verif_pseudo.rowCount; i++) {

        if (pseudo == verif_pseudo.rows[i].pseudo) {
            validation = false
        }

    }

    //Tester cette partie apres avoir fait un service ...
    let serviceId = -1

    const verif_req_service = "SELECT id,nom FROM " + service

    const verif_service = await db.query({
        text: verif_req_service
    })

    for (i = 0; i < verif_service.rowCount; i++) {

        if (service == verif_service.rows[i].nom) {
            serviceId = verif_service.rows[i].id
        }

    }

    if (serviceId == -1) {
        validation = false
    }


    if (validation === true) {

        const requete = "INSERT INTO medecin(nom,mdp,prenom,specialite,emplacement,numpro,numperso,service,pseudo) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *"

        const result = await db.query({
            text: requete,
            values: [nom, mdp, prenom, specialite, lieuDeTravail, numPro, numPerso, service, pseudo]
        })

        if (result.rowCount == 0) {
            res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer.' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(400).json({ message: 'Bad request. Deja pris.' })

    }



})

router.post('/register/administratif', async (req, res) => {

    const nom = req.body.nom
    const prenom = req.body.prenom
    const pseudo = req.body.pseudo
    let mdp = req.body.mdp
    const poste = req.body.poste
    const lieuDeTravail = req.body.emplacement
    const numPro = req.body.numPro
    const numPerso = req.body.numPerso

    mdp = await bcrypt.hash(mdp, 10)

    let validation = true

    const verif_req_pseudo = "SELECT pseudo FROM administratif"

    const verif_pseudo = await db.query({
        text: verif_req_pseudo
    })

    for (i = 0; i < verif_pseudo.rowCount; i++) {

        if (pseudo == verif_pseudo.rows[i].pseudo) {
            validation = false
        }

    }

    if (validation === true) {

        const requete = "INSERT INTO administratif(nom,prénom,pseudo,mdp,poste,emplacement, numpro, numperso) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *"

        const result = await db.query({
            text: requete,
            values: [nom, prenom, pseudo, mdp, poste, lieuDeTravail, numPro, numPerso]
        })

        if (result.rowCount == 0) {
            res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer.' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(400).json({ message: 'Bad request. pseudo deja pris.' })

    }

})

router.post('/add/patient', async (req, res) => {

    const prenom = req.body.prenom
    const nom = req.body.nom
    const nsc = req.body.nsc
    const age = req.body.age
    const sexe = req.body.sexe  //true = homme et false == femme
    const birthDate = req.body.naissance
    const birthPlace = req.body.lieu
    const tel = req.body.tel
    const adresse = req.body.adresse
    const profession = req.body.profession
    const mutuelle = req.body.mutuelle
    const medecin = req.body.medecin
    const antecedant = req.body.antecedant
    const urgence = req.body.urgence
    const sport = req.body.sport
    const enfant = req.body.enfant
    const service = req.body.service

    let validation = true

    const verif_req_pseudo = "SELECT nsc FROM patient"

    const verif_pseudo = await db.query({
        text: verif_req_pseudo
    })

    for (i = 0; i < verif_pseudo.rowCount; i++) {

        if (nsc == verif_pseudo.rows[i].nsc) {
            validation = false
        }

    }

    //Tester cette partie apres avoir fait un service ...

    let serviceId = -1

    const verif_req_service = "SELECT id,nom FROM " + service

    const verif_service = await db.query({
        text: verif_req_service
    })

    for (i = 0; i < verif_service.rowCount; i++) {

        if (service == verif_service.rows[i].nom) {
            serviceId = verif_service.rows[i].id
        }

    }

    if (serviceId == -1) {
        validation = false
    }

    let medecinId = -1

    const verif_req_med = "SELECT id,nom FROM medecin"

    const verif_med = await db.query({
        text: verif_req_med
    })

    for (i = 0; i < verif_med.rowCount; i++) {

        if (medecin == verif_med.rows[i].nom) {
            medecinId = verif_med.rows[i].id
        }

    }

    if (medecinId == -1) {

        validation = false

    }

    if (validation === true) {

        const requete = "INSERT INTO patient(nom,prenom,nsc,age,sexe,lieu,tel,adresse,profession,mutuelle,antecedent,sport,medecin,service,enfant,urgence,naissance) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *"

        //const requete = "INSERT INTO patient(nom,prénom,nsc,age,sexe) VALUES($1,$2,$3,$4,$5)"
        const result = await db.query({
            text: requete,
            values: [nom, prenom, nsc, age, sexe, birthPlace, tel, adresse, profession, mutuelle, antecedant, sport, medecinId, serviceId, enfant, urgence, birthDate]
        })

        if (result.rowCount == 0) {
            res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer.' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(400).json({ message: 'Not found.' })

    }


})

router.post(('/add/service'), async (req, res) => {

    const nom = req.body.nom
    const capacite = req.body.capacite
    const occupation = req.body.occupe
    const chef = req.body.chef

    if (nom !== '') {

        let validation = true

        let medecinId = -1

        const verif_req_med = "SELECT id,pseudo FROM medecin"

        const verif_med = await db.query({
            text: verif_req_med
        })

        for (i = 0; i < verif_med.rowCount; i++) {

            if (chef == verif_med.rows[i].pseudo) {
                medecinId = verif_med.rows[i].id
            }

        }

        if (medecinId == -1) {

            validation = false

        }

        if (validation === true) {

            const requete = "INSERT INTO service(nom,capacite,occupe,chef) values($1,$2,$3,$4) RETURNING *"
    
            const result = await db.query({
                text: requete,
                values: [nom, capacite, occupation, medecinId]
            })
    
            if (result.rowCount == 0) {
                res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer.' })
            } else {
                res.json(result.rows)
            }
    
        } else {
    
            res.status(404).json({ message: 'Not found. Medecin inconnu.' })
    
        }

    }else{
    
        res.status(400).json({ message: 'Bad request' })

    }


})

router.post(('/add/service'), async (req, res) => {



})

router.post(('/add/maladie'), async (req, res) => {



})

router.post(('/add/symptome'), async (req, res) => {



})

router.post(('/add/allergie'), async (req, res) => {



})

router.post(('/add/traitement'), async (req, res) => {



})

router.post(('/add/examen'), async (req, res) => {



})

router.post(('/add/consultation'), async (req, res) => {



})

router.post(('/add/hospitalisation'), async (req, res) => {



})

router.put(('/update/patient/:champ'), async (req, res) => {

    //Fait celle ci

})

router.put(('/update/medecin/:champ'), async (req, res) => {

    //Ensuite celle la
    // a l exclusion de mdp qui demande une protection particuliere 
    //Ne jamais RENVOYER le mdp

})

router.put(('/update/maladie/:champ'), async (req,res) => {



})  

router.put(('/update/symptome/:champ'), async (req,res) => {

    

})  

router.put(('/update/consultation/:champ'), async (req,res) => {

    

})  

router.put(('/update/examen/:champ'), async (req,res) => {

    

})  

router.put(('/update/allergie/:champ'), async (req,res) => {

    

})  

router.put(('/update/administratif/:champ'), async (req,res) => {

    // Sans password qui sera speciale

})  

router.put(('/update/maladie/:champ'), async (req,res) => {

    

})  

router.put(('/update/maladie/:champ'), async (req,res) => {

    

})  

module.exports = router