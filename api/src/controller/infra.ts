import { BaseContext } from 'koa';
import { description, request, summary, tagsAll } from 'koa-swagger-decorator';
import moment = require('moment');
import { getConnection } from 'typeorm';

@tagsAll(['Infra'])
export default class InfraController {

    @request('get', '/info')
    @summary('Service info route')
    @description('The route is intended to return an information about the state of the service and publicly available environment details')
    public static async info(ctx: BaseContext) {
        const dbStats = getConnection().isConnected;
        const statusCode = dbStats ? 1 : 1000;
        const statusMessage = dbStats ? 'healthy' : 'error - no database connection';

        const resp = {
            appCode: 'CDAPI',
            appName: 'Code Delivery API',
            appVersion: process.env.IMAGE_TAG,
            url: ctx.request.origin,
            statusCode,
            statusMessage,
            info: '',
            serverTimestamp: moment().format(),
            serverTimestampUTC: moment().utc().format(),
        };

        ctx.status = 200;
        ctx.body = resp;
    }

    @request('get', '/status')
    @summary('Service healthcheck endpoint')
    @description('Will be used asService healthcheck endpoint for hosting env. The route is intended to do all the necessary service helth checks and return the result')
    public static async status(ctx: BaseContext) {
        ctx.status = 200;
        ctx.body = {
            status: 'App is up and running',
        };
    }

}