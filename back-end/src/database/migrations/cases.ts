export const up = async (knex: any): Promise<void> => {
  return knex.schema.createTable('cases', function (table: any) {
    table.increments('id').primary();
    table.string('customerName').notNullable();
    table.date('startDate').notNullable();
    table.boolean('isFinished').notNullable();
    table.string('fxFileId').notNullable().unique();
  });
};

export const down = async (knex: any): Promise<void> => {
  return knex.schema.dropTableIfExists('cases');
};