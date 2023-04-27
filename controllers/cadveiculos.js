const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  });

exports.register = (req, res) => {
    console.log(req.body);

    const {id, marca, modelo, renavam, placa, dataCompra, dataVencimento} = req.body;

    db.query('SELECT placa FROM veiculo WHERE placa = ?',[placa],async (err,result)=>{
        if(err){
            console.log(err);
        };

        if(result.length>0){
            return res.render('cadveiculos',{
                message:'Veiculo já cadastrado'
            });

        }

        db.query('INSERT INTO veiculo SET ?',{id, marca, modelo, renavam, placa, dataCompra, dataVencimento},(err,result)=>{
            if(err){
                console.log(err);
            }else{
                console.log(result);
                return res.render('cadveiculos',{
                    message:'Veiculo cadastrado'
                });
            };
        });
    });

};
