const cors = require("cors");
const bodyparser = require('body-parser');
var express = require("express")
var router = express.Router()

var connection = require('../backend/lib/db')

const app = express()

app.use(bodyparser.json());


app.listen(3000, () => {
    console.log(`Server is up and running on 3000 ...`);
});
console.log("Empty")

/* create database and table. */
app.get('/dbcon', function (req, res, next) {
    console.log("Create Db function Enter")
    let sql = 'CREATE DATABASE IF NOT EXISTS cusDatabase';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        //console.log(result);
        else {
            console.log(result);
            res.send('Database created...');
            console.log("Database created...")
            // connection.connect()
            let sql = 'CREATE TABLE IF NOT EXISTS customers (id int AUTO_INCREMENT, Name VARCHAR(255), Email VARCHAR(255), PRIMARY KEY(id))';
            connection.query(sql, (err, result) => {
                if (err)
                    throw err;

                else {
                    console.log(result);
                    res.send('table created...');
                    console.log("table created...")
                    // connection.query("SELECT * FROM customers ORDER BY id desc", function (err, result, fields) {
                    //     if (err) throw err;
                    //     console.log(result);
                    // })
                    // connection.query('SELECT * FROM customers ORDER BY id desc', function (err, rows) {
                    //     if (err) {
                    //         req.flash('error', err);
                    //         res.render('routes/viewcustomer', { page_title: "Viewcustomer - Node.js", data: '' });
                    //     } else {
                    //         // render to /routes/viewcustomer.js template file
                    //         res.render('routes/viewcustomer', { page_title: "Viewcustomer - Node.js", data: data });
                    //     }
                    // });
                }
            });
        }
    });

});

/* Read whole Data  . */
app.get('/', (req, res) => {
    let sql = 'SELECT * FROM customers ORDER BY id desc';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log("View Customer Details:", JSON.parse(JSON.stringify(result)));
        res.send(result);
    });
});

/* Read Data  given id. */
app.get('/select/:id', (req, res) => {
    var getId = req.params.id
    let sql = 'SELECT * FROM customers WHERE id= ?';
    connection.query(sql, getId, (err, result) => {
        if (err) throw err;
        console.log("View Customer Details:", JSON.parse(JSON.stringify(result)));
        res.send(result);
    });
});

/* Insert Values Manually*/
app.get('/insert', (req, res) => {
    console.log("Enter Inserted");
    let insertValue = [
        ['3', 'Mani', 'mani@gmail.com'],
        ['4', 'Meena', 'meena@gmail.com'],
        ['5', 'Bama', 'bama@gmail.com']
    ]
    //let form = req.body;
    let sql = "INSERT INTO customers(id,Name, Email) VALUES ?"
    connection.query(sql, [insertValue], (err, result) => {
        if (err) throw err;
        console.log("Successfully added Customer Details. ", JSON.parse(JSON.stringify(result)))
        res.send('Post added...');
    });
});

app.post('/add', (req, res) => {
    console.log("Enter Inserted");

    var insertValue = {
        id: req.body.id,
        name: req.body.Name,
        email: req.body.Email
    }
    let sql = "INSERT INTO customers SET ?"
    connection.query(sql, insertValue, (err, result) => {
        if (err) throw err;
        console.log("Successfully added Customer Details. ", JSON.parse(JSON.stringify(result)))
        res.send('Post added...');
    });

});

// Update an existing user
app.put('/update/:id', (req, res) => {
    const getId = req.params.id;
    var uname = req.body.Name
    var mail = req.body.Email
    connection.query('UPDATE customers SET Name = ?,Email = ? WHERE id = ?', [uname, mail, getId], (err, result) => {
        if (err) throw err;
        console.log("Successfully updated Customer Details. ", JSON.parse(JSON.stringify(result)))
        res.send('User updated successfully.');
    });
});

// Update an existing user
app.put('/update/:id', (req, res) => {
    const getId = req.params.id;
    var uname = req.body.Name
    var mail = req.body.Email
    connection.query('UPDATE customers SET Name = ?,Email = ? WHERE id = ?', [uname, mail, getId], (err, result) => {
        if (err) throw err;
        console.log("Successfully updated Customer Details. ", JSON.parse(JSON.stringify(result)))
        res.send('User updated successfully.');
    });
});

module.exports = app;
