const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na app
server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.htm", { title: "Seu marketplace de coleta de resíduos" })
})

server.get("/create-point", (req, res) => {
    //console.log(req.query)

    return res.render("create-point.htm")
})

server.post("/savepoint", (req, res) => {
    //console.log(req.body)
    const querry = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.htm", { saved: true })
    }

    db.run(querry, values, afterInsertData)


})

server.get("/search", (req, res) => {
    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)

        const total = rows.length

        return res.render("search-results.htm", { places: rows, total })
    })
})

server.listen(3000)