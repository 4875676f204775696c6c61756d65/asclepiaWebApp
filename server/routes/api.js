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

        } else if (table == 'administratif') {

            requete = "SELECT id,nom,pseudo,poste,numpro,numperso,emplacement,prénom FROM " + table

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

router.get('/get/:table', async (req, res) => {

    const table = req.params.table
    const champ = req.body.champ
    const id = req.body.id

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

    if(champ == 'mdp' || champ == '*'){
        res.status(401).json({ message: 'C\'est mal de chercher à hacker les api.'})
    }

    if (exist === true) {

        const requete = "SELECT id," + champ + " FROM " + table + " WHERE id=$1"

        const result = await db.query({
            text: requete,
            values: [id]
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

router.get('/getAll/:table', async (req, res) => {

    const table = req.params.table
    const id = req.body.id

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

            requete = "SELECT id,nom,prenom,specialite,emplacement,numpro,numperso,service,pseudo FROM " + table + " WHERE id=$1"

        } else if (table == 'administratif') {

            requete = "SELECT id,nom,pseudo,poste,numpro,numperso,emplacement,prénom FROM " + table + " WHERE id=$1"

        } else {

            requete = "SELECT * FROM " + table + " WHERE id=$1"

        }

        const result = await db.query({
            text: requete,
            values: [id]
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

    } else {

        res.status(400).json({ message: 'Bad request' })

    }


})


router.post(('/add/maladie'), async (req, res) => {

    const nom = req.body.nom
    const cause = req.body.cause
    const diagnostic = req.body.diagnostic
    const patient = req.body.patient
    const actuel = req.body.actuel
    const hospitalisation = req.body.hospitalisation

    let validation = true

    if (validation === true) {

        const requete = "INSERT INTO maladie(nom,cause,diagnostic,patient,actuel,hospitalisation) values($1,$2,$3,$4,$5,$6) RETURNING *"

        const result = await db.query({
            text: requete,
            values: [nom, cause, diagnostic, patient, actuel, hospitalisation]
        })

        if (result.rowCount == 0) {
            res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer. Redemmarer la base de données.' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(40).json({ message: 'Bad request.' })

    }



})

router.post(('/add/symptome'), async (req, res) => {

    const nom = req.body.nom
    const intensite = req.body.intensite
    const description = req.body.descritption
    const maladie = req.body.maladie

    let validation = true

    if (validation === true) {

        const requete = "INSERT INTO symptome(nom,intensite,description,maladie) values($1,$2,$3,$4) RETURNING *"

        const result = await db.query({
            text: requete,
            values: [nom, intensite, description, maladie]
        })

        if (result.rowCount == 0) {
            res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer. Redemmarer la base de données.' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(400).json({ message: 'Bad request.' })

    }

})

router.post(('/add/allergie'), async (req, res) => {

    const nom = req.body.nom
    const examen = req.body.examen
    const patient = req.body.patient

    let validation = true

    if (validation === true) {

        const requete = "INSERT INTO allergie(nom,examen,patient) values($1,$2,$3) RETURNING *"

        const result = await db.query({
            text: requete,
            values: [nom, examen, patient]
        })

        if (result.rowCount == 0) {
            res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer. Redemmarer la base de données.' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(400).json({ message: 'Bad request.' })

    }

})

router.post(('/add/traitement'), async (req, res) => {

    // Faire les traitements

    const nom = req.body.nom
    const posologie = req.body.posologie
    const duree = req.body.duree
    const maladie = req.body.maladie
    const allergie = req.body.allergie

    let validation = true

    if (validation === true) {

        const requete = "INSERT INTO traitement(nom,posologie,duree,maladie,allergie) values($1,$2,$3,$4,$5) RETURNING *"

        const result = await db.query({
            text: requete,
            values: [nom, posologie, duree, maladie, allergie]
        })

        if (result.rowCount == 0) {
            res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer. Redemmarer la base de données.' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(400).json({ message: 'Bad request.' })

    }

})

router.post(('/add/examen'), async (req, res) => {

    const nom = req.body.nom
    const resulat = req.body.resulat
    const date = req.body.date
    const consultation = req.body.consultation
    const patient = req.body.patient
    const hospitalisation = req.body.hospitalisation
    const maladie = req.body.maladie

    let validation = true

    if (validation === true) {

        const requete = "INSERT INTO examen(nom,resultat,date,consultation,maladie,patient,hospitalisation) values($1,$2,$3,$4,$5,$6,$7) RETURNING *"

        const result = await db.query({
            text: requete,
            values: [nom, resulat, date, consultation, maladie, patient, hospitalisation]
        })

        if (result.rowCount == 0) {
            res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer. Redemmarer la base de données.' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(400).json({ message: 'Bad request.' })

    }

})

router.post(('/add/consultation'), async (req, res) => {

    const nom = req.body.nom
    const date = req.body.date
    const patient = req.body.patient
    const medecin = req.body.medecin
    const commentaire = req.body.commentaire


    let validation = true

    if (validation === true) {

        const requete = "INSERT INTO consultation(nom,date,patient,medecin,commentaire) values($1,$2,$3,$4,$5) RETURNING *"

        const result = await db.query({
            text: requete,
            values: [nom, date, patient, medecin, commentaire]
        })

        if (result.rowCount == 0) {
            res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer. Redemmarer la base de données.' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(400).json({ message: 'Bad request.' })

    }

})

router.post(('/add/hospitalisation'), async (req, res) => {

    const debut = req.body.debut
    const fin = req.body.fin
    const resume = req.body.resume
    const patient = req.body.patient
    const medecin = req.body.medecin


    let validation = true

    if (validation === true) {

        const requete = "INSERT INTO hospitalisation(debut,fin,resume,patient,medecin) values($1,$2,$3,$4,$5) RETURNING *"

        const result = await db.query({
            text: requete,
            values: [debut, fin, resume, patient, medecin]
        })

        if (result.rowCount == 0) {
            res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer. Redemmarer la base de données.' })
        } else {
            res.json(result.rows)
        }

    } else {

        res.status(400).json({ message: 'Bad request.' })

    }


})

router.put(('/update/:table'), async (req, res) => {

    const table = req.params.table
    const champ = req.body.champ
    const id = req.body.id
    const valeur = req.body.valeur

    let validation = false

    if (table == 'index') {
        validation = true
    }

    if (validation === false) {

        const verif_req = "SELECT * FROM index"

        const verif = await db.query({
            text: verif_req
        })

        for (i = 0; i < verif.rowCount; i++) {

            if (table == verif.rows[i].nom) {
                validation = true
            }

        }

    }

    if (validation === true) {

        const verif_req = "SELECT " + champ + " FROM " + table

        const verif = await db.query({
            text: verif_req
        })

        if (verif_req.rowCount == 0) {
            validation = false
        }

        if (champ == 'mdp' || champ == 'id') {
            validation = false
        }

        if (validation === true) {

            const requete = "UPDATE " + table + " SET " + champ + "=$1 WHERE id=$2 RETURNING *"

            const result = await db.query({
                text: requete,
                values: [valeur, id]
            })

            if (result.rowCount == 0) {
                res.status(400).json({ message: 'Erreur lors de la mise a jour de la base de donnes.' })
            } else {
                res.json(result.rows)
            }

        } else {

            res.status(400).json({ message: 'Bad request.' })
    
        }

    } else {

        res.status(400).json({ message: 'Bad request.' })

    }


})

router.delete(('/delete/:table'), async (req,res) => {

    const table = req.params.table
    const id = req.body.id

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

        requete = "DELETE FROM " + table + " WHERE id=$1"

       const result = await db.query({
            text: requete,
            values: [id]
        })

        if(result.rowCount == 1){
            res.json({ message: ' Element ' + id + ' de la table '  + table + ' supprimé.'})
        }else{
            res.status(400).json({ message: 'Erreur lors de la suppression.'})
        }

    } else {

        res.status(404).json({ message: 'Table not found' })

    }


})

module.exports = router