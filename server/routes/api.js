const express = require('express')
const router = express.Router()

//  Load dependencies for database connect and manage

const bcrypt = require('bcrypt')
const { Client } = require('pg')
const { json, query } = require('express')

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

        if(table == 'medecin'){

            requete = "SELECT id,nom,prenom,specialite,emplacement,numpro,numperso,service,pseudo FROM " + table

        }else{

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

router.post('/register/:role', async (req, res) => {

    const role = req.params.role

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

    if(role == "medecin"){

        const verif_req_pseudo = "SELECT pseudo FROM " + role

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

        if(serviceId == -1){
            validation = false
        }
        

        if (validation === true) {

            const requete = "INSERT INTO medecin(nom,mdp,prenom,specialite,emplacement,numpro,numperso,service,pseudo) values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *"

            const result = await db.query({
                text: requete,
                values: [nom,mdp,prenom,specialite,lieuDeTravail,numPro,numPerso,service,pseudo]
            })

            if (result.rowCount == 0) {
                res.status(400).json({ message: 'Erreur lors de la creation du compte. Reessayer.' })
            } else {
                res.json(result.rows)
            }

        } else {

            res.status(400).json({ message: 'Not found.' })

        }

    }else{

        res.json({ message: 'inscription pour le statut medecin uniquement'})

    }


})



module.exports = router