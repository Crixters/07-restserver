// Puerto
process.env.PORT = process.env.PORT || 3000;

//NODE_ENV ES UNA VARIABLE QUE ESTABLECE HEROKU EN EJECUCIÓN
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//if (process.env.NODE_ENV === 'dev') {
//  process.env.urlDB = 'mongodb://localhost:27017/Prueba';
//} else {
//   urlDB = 'mongodb+srv://Crixters:shushubana21@cluster0-qtkcn.mongodb.net/Prueba';

//}

process.env.urlDB = process.env.urlDB || 'mongodb://localhost:27017/Prueba';


//Definimos una variable en process enviroment nosotros mismos
//process.env.URLDB = urlDB;


//VENCIMIENTO DE TOKEN
//60 SEG 60 MIN 24 HORAS 30 DIAS
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//SEED O KEY DEL TOKEN
process.env.SEED = process.env.SEED || 'tokenseed';