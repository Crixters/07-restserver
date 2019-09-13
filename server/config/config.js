// Puerto

process.env.PORT = process.env.PORT || 3000;

//NODE_ENV ES UNA VARIABLE QUE ESTABLECE HEROKU EN EJECUCIÓN
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/Prueba';
} else {
    urlDB = 'mongodb+srv://Crixters:shushubana21@cluster0-qtkcn.mongodb.net/Prueba';

}

//Definimos una variable en process enviroment nosotros mismos
process.env.URLDB = urlDB;