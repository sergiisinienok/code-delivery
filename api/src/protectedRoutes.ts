import { SwaggerRouter } from 'koa-swagger-decorator';
import controller = require('./controller');

const protectedRouter = new SwaggerRouter();

// Hero routes
protectedRouter.get('/heroes', controller.hero.getHeroes);
protectedRouter.get('/heroes/:id', controller.hero.getHero);
protectedRouter.post('/heroes', controller.hero.createHero);
protectedRouter.patch('/heroes/:id', controller.hero.updateHero);
protectedRouter.delete('/heroes/:id', controller.hero.deleteHero);
// protectedRouter.delete('/testusers', controller.user.deleteTestUsers);

// Swagger endpoint
protectedRouter.swagger({
    title: 'node-typescript-koa-rest',
    description: 'API REST using NodeJS and KOA framework, typescript. TypeORM for SQL with class-validators. Middlewares JWT, CORS, Winston Logger.',
    version: '1.5.0'
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
protectedRouter.mapDir(__dirname);

export { protectedRouter };