import {Router} from 'express' // Rotas
import multer from 'multer' // Biblioteca usada para o upload de imagens

import OrphanagesControllers from './controllers/OrphanagesControllers'; //Controllers da api
import uploadConfig from './config/upload'; //Configuração do upload de imagens

const upload = multer(uploadConfig)

const routes = Router();

//Rotas da API
routes.get('/orphanages', OrphanagesControllers.index);
routes.get('/orphanages/:id', OrphanagesControllers.show);
routes.post('/orphanages', upload.array('images'), OrphanagesControllers.create);

export default routes;
