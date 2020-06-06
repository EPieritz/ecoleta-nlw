const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./src/database/database.db")
module.exports = db

//exemplo
/*db.serialize(() => {

    //Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //Inserir dados
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
        "https://images.unsplash.com/photo-1536700626482-f7d798222061?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80",
        "Comunity Farm",
        "Guilherme Gemballa, Jardim América",
        "Nº260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos orgânicos"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)
    }

    db.run(querry, values, afterInsertData)

    //Consultar dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    // Deletar um dado da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [6], function(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso")
    })
})*/