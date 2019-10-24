import Router from 'koa-router';
import controller = require('./controller');

const unprotectedRouter = new Router();

// Hello World route
unprotectedRouter.get('/', controller.general.helloWorld);

unprotectedRouter.get('/status', controller.infra.status);
unprotectedRouter.get('/info', controller.infra.info);

export { unprotectedRouter };