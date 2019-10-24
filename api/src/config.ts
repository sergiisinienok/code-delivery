import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export interface IConfig {
    port: number;
    debugLogging: boolean;
    dbsslconn: boolean;
    jwtSecret: string;
    databaseUrl: string;
    dbEntitiesPath: string[];
    cronJobExpression: string;
    typeorm_synchronize: boolean;
}

const isDevMode = process.env.NODE_ENV == 'development';
const typeorm_synchronize = process.env.TYPEORM_SYNCHRONIZE === 'true' || false;

const config: IConfig = {
    port: +process.env.PORT || 3000,
    debugLogging: isDevMode,
    dbsslconn: false,
    jwtSecret: process.env.JWT_SECRET || 'your-secret-whatever',
    databaseUrl: process.env.DATABASE_URL || 'postgres://user:pass@localhost:5432/apidb',
    dbEntitiesPath: [
      'src/entity/**/*.ts'
    ],
    cronJobExpression: '0 * * * *',
    typeorm_synchronize: typeorm_synchronize
};

export { config };