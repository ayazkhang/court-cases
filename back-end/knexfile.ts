import { dbParams } from "./config/config";
export default {
    development: {
      client: 'pg',
      connection: {
        host: dbParams.host,
        user: dbParams.user,
        password: dbParams.password,
        database: dbParams.database,
        port:dbParams.port
      }, 
      migrations: {
        directory: './src/database/migrations',
      },
      seeds: {
        directory: './src/database/seeds',
      },
    },
  };
  