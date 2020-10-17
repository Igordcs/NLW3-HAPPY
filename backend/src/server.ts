import Express from 'express'; //Instância do servidor Express
import path from 'path'; // Path
import 'express-async-errors'; //Tratativa de erros do async 
import './database/connection.ts'; // Conexão com o banco de dados
import cors from 'cors'; // poder que outro "site" utilize a api

import routes from './routes'; //Rotas - blocos de códigos que serão executados ao acessar através de um método
import Handler from './errors/handler' //tratativa de erros

const app = Express();

app.use(cors()); // Uso oo Cors
app.use(Express.json()); //Json encode
app.use(routes);
app.use('/uploads', Express.static(path.join(__dirname, '..', 'uploads')))//Utilização do método Static para poder visualizar as imagens no navegador
app.use(Handler);// Tratativa de erros

app.listen(3333); //instância do servidor