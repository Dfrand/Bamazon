var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connection successful!");
    productTable();
})

var productTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name +
                " | " + res[i].price + " | " + res[i].stock_quantity + "\n");
        }
        askCustomer(res);
    })
}

var askCustomer = function (res) {
    inquirer.prompt([{
        type: 'input',
        name: 'choice',
        message: 'What are you interested in buying? [Exist with E]'
    }]).then(function (answer) {
        var correct = false;
        if(answer.choice.toUpperCase()=="E"){
            process.exit();
        }
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt({
                    type: "input",
                    name: "quantity",
                    message: "Quantity you want to purchase?",
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }).then(function (answer) {
                    if ((res[id].stock_quantity - answer.quantity) > 0) {
                        connection.query("UPDATE products SET stock_quantity='" +
                            (res[id].stock_quantity - answer.quantity) +
                            "' WHERE product_name='" + product + "'",
                            function (err, res2) {
                                console.log("Product Bought!");
                                productTable();
                            })
                    } else {
                        console.log("Not a valid selection!");
                        askCustomer(res);
                    }
                })
            }
        }
        if(i==res.length && correct==false){
            console.log("Not a valid selection!");
            askCustomer(res);
        }
    })
}