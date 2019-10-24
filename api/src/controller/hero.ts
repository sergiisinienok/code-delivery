import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal, Like } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { request, summary, path, body, responsesAll, tagsAll } from 'koa-swagger-decorator';
import { Hero, heroSchema } from '../entity/hero';

@responsesAll({ 200: { description: 'success'}, 400: { description: 'bad request'}, 401: { description: 'unauthorized, missing/wrong jwt token'}})
@tagsAll(['Hero'])
export default class HeroController {

    @request('get', '/heroes')
    @summary('Find all heroes')
    public static async getHeroes(ctx: BaseContext) {

        // get a hero repository to perform operations with hero
        const heroRepository: Repository<Hero> = getManager().getRepository(Hero);

        // load all heros
        const heroes: Hero[] = await heroRepository.find();

        // return OK status code and loaded heros array
        ctx.status = 200;
        ctx.body = heroes;
    }

    @request('get', '/heroes/{id}')
    @summary('Find a hero by id')
    @path({
        id: { type: 'string', required: true, description: 'id of a hero' }
    })
    public static async getHero(ctx: BaseContext) {

        // get a hero repository to perform operations with hero
        const heroRepository: Repository<Hero> = getManager().getRepository(Hero);

        // load hero by id
        const hero: Hero = await heroRepository.findOne(+ctx.params.id || '');

        if (hero) {
            // return OK status code and loaded hero object
            ctx.status = 200;
            ctx.body = hero;
        } else {
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = 'The Hero you are trying to retrieve doesn\'t exist in the db';
        }

    }

    @request('post', '/heroes')
    @summary('Create a Hero')
    @body(heroSchema)
    public static async createHero(ctx: BaseContext) {

        // get a hero repository to perform operations with hero
        const heroRepository: Repository<Hero> = getManager().getRepository(Hero);

        // build up entity hero to be saved
        const heroToBeUpdated: Hero = new Hero();
        heroToBeUpdated.name = ctx.request.body.name;
        heroToBeUpdated.alterEgo = ctx.request.body.alterEgo;
        heroToBeUpdated.likes = ctx.request.body.likes;
        heroToBeUpdated.default = ctx.request.body.default;
        heroToBeUpdated.avatarUrl = ctx.request.body.avatarUrl;
        heroToBeUpdated.avatarBlurredUrl = ctx.request.body.avatarBlurredUrl;
        heroToBeUpdated.avatarThumbnailUrl = ctx.request.body.avatarThumbnailUrl;

        // validate hero entity
        const errors: ValidationError[] = await validate(heroToBeUpdated); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        // } else if (await heroRepository.findOne({ email: heroToBeSaved.email })) {
        //     // return BAD REQUEST status code and email already exists error
        //     ctx.status = 400;
        //     ctx.body = 'The specified e-mail address already exists';
        } else {
            // save the hero contained in the POST body
            const hero = await heroRepository.save(heroToBeUpdated);
            // return CREATED status code and updated hero
            ctx.status = 201;
            ctx.body = hero;
        }
    }

    @request('patch', '/heroes/{id}')
    @summary('Update a Hero')
    @path({
        id: { type: 'string', required: true, description: 'id of a hero' }
    })
    @body(heroSchema)
    public static async updateHero(ctx: BaseContext) {

        // get a hero repository to perform operations with hero
        const heroRepository: Repository<Hero> = getManager().getRepository(Hero);
        const heroToBeUpdated: Hero = await heroRepository.findOne(+ctx.params.id || '');

        if (!heroToBeUpdated) {
            // check if a hero with the specified id exists
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = 'The Hero you are trying to update doesn\'t exist in the db';
        }

        // update the hero by specified id
        // build up entity hero to be updated
        heroToBeUpdated.name = ctx.request.body.name;
        heroToBeUpdated.alterEgo = ctx.request.body.alterEgo;
        heroToBeUpdated.likes = ctx.request.body.likes;
        heroToBeUpdated.default = ctx.request.body.default;
        heroToBeUpdated.avatarUrl = ctx.request.body.avatarUrl;
        heroToBeUpdated.avatarBlurredUrl = ctx.request.body.avatarBlurredUrl;
        heroToBeUpdated.avatarThumbnailUrl = ctx.request.body.avatarThumbnailUrl;

        // validate hero entity
        const errors: ValidationError[] = await validate(heroToBeUpdated); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        // } else if (await heroRepository.findOne({ id: Not(Equal(heroToBeUpdated.id)), email: heroToBeUpdated.email })) {
        //     // return BAD REQUEST status code and email already exists error
        //     ctx.status = 400;
        //     ctx.body = 'The specified e-mail address already exists';
        } else {
            // save the hero contained in the PATCH body
            const hero = await heroRepository.save(heroToBeUpdated);
            // return CREATED status code and updated hero
            ctx.status = 201;
            ctx.body = heroToBeUpdated;
        }

    }

    @request('delete', '/heroes/{id}')
    @summary('Delete the Hero by id')
    @path({
        id: { type: 'string', required: true, description: 'id of the Hero' }
    })
    public static async deleteHero(ctx: BaseContext) {

        // get a hero repository to perform operations with hero
        const heroRepository = getManager().getRepository(Hero);

        // find the hero by specified id
        const heroToRemove: Hero = await heroRepository.findOne(ctx.params.id || '');
        if (!heroToRemove) {
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = 'The Hero you are trying to delete doesn\'t exist in the db';
        // } else if (ctx.state.hero.id !== heroToRemove.id) {
        //     // check hero's token id and hero id are the same
        //     // if not, return a FORBIDDEN status code and error message
        //     ctx.status = 403;
        //     ctx.body = 'A Hero can only be deleted by himself';
        } else {
            // the hero is there so can be removed
            await heroRepository.remove(heroToRemove);
            // return a NO CONTENT status code
            ctx.status = 204;
        }

    }

    @request('delete', '/cleanup')
    @summary('Delete all heroes from db')
    public static async deleteTestheros(ctx: BaseContext) {

        // get a hero repository to perform operations with hero
        const heroRepository = getManager().getRepository(Hero);

        // find test heros
        const herosToRemove: Hero[] = await heroRepository.find();

        // the hero is there so can be removed
        await heroRepository.remove(herosToRemove);

        // return a NO CONTENT status code
        ctx.status = 204;
    }

}
