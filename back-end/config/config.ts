export const config = {
  lang: "eng",
  oem: 1,
  psm: 3,
};

export const dbParams = {
  host: 'postgresdb',
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
  port: 5432,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
