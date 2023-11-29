npm run build
npx knex migrate:latest --env development
npx knex seed:run --env development
npm run test
npm start