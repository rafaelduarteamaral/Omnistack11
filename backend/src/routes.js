const express = require('express');
const routes = express.Router()
const { celebrate, Segments, Joi} = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(9).max(10),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

routes.post('/incidents', IncidentController.create);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    pag: Joi.number(),
  })
}),IncidentController.index);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

module.exports = routes;
