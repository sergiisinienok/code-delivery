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

        // get a user repository to perform operations with user
        const heroRepository: Repository<Hero> = getManager().getRepository(Hero);

        // load all users
        const heroes: Hero[] = await heroRepository.find();

        // return OK status code and loaded users array
        ctx.status = 200;
        ctx.body = heroes;
    }

    @request('get', '/heroes/{id}')
    @summary('Find a hero by id')
    @path({
        id: { type: 'string', required: true, description: 'id of a hero' }
    })
    public static async getHero(ctx: BaseContext) {

        // get a user repository to perform operations with user
        const heroRepository: Repository<Hero> = getManager().getRepository(Hero);

        // load user by id
        const hero: Hero = await heroRepository.findOne(+ctx.params.id || '');

        if (hero) {
            // return OK status code and loaded user object
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

        // get a user repository to perform operations with user
        const heroRepository: Repository<Hero> = getManager().getRepository(Hero);

        // build up entity user to be saved
        const heroToBeUpdated: Hero = new Hero();
        heroToBeUpdated.name = ctx.request.body.name;
        heroToBeUpdated.alterEgo = ctx.request.body.alterEgo;
        heroToBeUpdated.likes = ctx.request.body.likes;
        heroToBeUpdated.default = ctx.request.body.default;
        heroToBeUpdated.avatarUrl = ctx.request.body.avatarUrl;
        heroToBeUpdated.avatarBlurredUrl = ctx.request.body.avatarBlurredUrl;
        heroToBeUpdated.avatarThumbnailUrl = ctx.request.body.avatarThumbnailUrl;

        // validate user entity
        const errors: ValidationError[] = await validate(heroToBeUpdated); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        // } else if (await heroRepository.findOne({ email: userToBeSaved.email })) {
        //     // return BAD REQUEST status code and email already exists error
        //     ctx.status = 400;
        //     ctx.body = 'The specified e-mail address already exists';
        } else {
            // save the user contained in the POST body
            const user = await heroRepository.save(heroToBeUpdated);
            // return CREATED status code and updated user
            ctx.status = 201;
            ctx.body = user;
        }
    }

    @request('patch', '/heroes/{id}')
    @summary('Update a Hero')
    @path({
        id: { type: 'string', required: true, description: 'id of a hero' }
    })
    @body(heroSchema)
    public static async updateHero(ctx: BaseContext) {

        // get a user repository to perform operations with user
        const heroRepository: Repository<Hero> = getManager().getRepository(Hero);

        // update the user by specified id
        // build up entity user to be updated
        const heroToBeUpdated: Hero = new Hero();
        heroToBeUpdated.id = ctx.params.id || ''; // will always have a number, this will avoid errors
        heroToBeUpdated.name = ctx.request.body.name;
        heroToBeUpdated.alterEgo = ctx.request.body.alterEgo;
        heroToBeUpdated.likes = ctx.request.body.likes;
        heroToBeUpdated.default = ctx.request.body.default;
        heroToBeUpdated.avatarUrl = ctx.request.body.avatarUrl;
        heroToBeUpdated.avatarBlurredUrl = ctx.request.body.avatarBlurredUrl;
        heroToBeUpdated.avatarThumbnailUrl = ctx.request.body.avatarThumbnailUrl;

        // validate user entity
        const errors: ValidationError[] = await validate(heroToBeUpdated); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        } else if (!await heroRepository.findOne(heroToBeUpdated.id)) {
            // check if a user with the specified id exists
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = 'The Hero you are trying to update doesn\'t exist in the db';
        // } else if (await userRepository.findOne({ id: Not(Equal(userToBeUpdated.id)), email: userToBeUpdated.email })) {
        //     // return BAD REQUEST status code and email already exists error
        //     ctx.status = 400;
        //     ctx.body = 'The specified e-mail address already exists';
        } else {
            // save the user contained in the PUT body
            const user = await heroRepository.save(heroToBeUpdated);
            // return CREATED status code and updated user
            ctx.status = 201;
            ctx.body = user;
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
        } else if (ctx.state.user.id !== heroToRemove.id) {
            // check hero's token id and hero id are the same
            // if not, return a FORBIDDEN status code and error message
            ctx.status = 403;
            ctx.body = 'A Hero can only be deleted by himself';
        } else {
            // the user is there so can be removed
            await heroRepository.remove(heroToRemove);
            // return a NO CONTENT status code
            ctx.status = 204;
        }

    }

    // @request('delete', '/testusers')
    // @summary('Delete users generated by integration and load tests')
    // public static async deleteTestUsers(ctx: BaseContext) {

    //     // get a user repository to perform operations with user
    //     const userRepository = getManager().getRepository(User);

    //     // find test users
    //     const usersToRemove: User[] = await userRepository.find({ where: { email: Like('%@citest.com')} });

    //     // the user is there so can be removed
    //     await userRepository.remove(usersToRemove);

    //     // return a NO CONTENT status code
    //     ctx.status = 204;
    // }

}
