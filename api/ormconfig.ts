
import { config } from './src/config';
import * as PostgressConnectionStringParser from 'pg-connection-string';

// Get DB connection options from env variable
const connectionOptions = PostgressConnectionStringParser.parse(config.databaseUrl);

module.exports = {
    type: 'postgres',
    host: connectionOptions.host,
    port: connectionOptions.port,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    logging: false,
    entities: config.dbEntitiesPath,
    synchronize: config.typeorm_synchronize,
    extra: {
        ssl: config.dbsslconn, // if not development, will use SSL
    },
    migrationsTableName: 'pg_migrations',
    migrations: ['migrations/*.ts'],
    cli: {
        migrationsDir: 'migrations'
    }
};