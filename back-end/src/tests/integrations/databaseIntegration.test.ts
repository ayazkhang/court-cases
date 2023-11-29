import { pool } from '../../database/db';

describe('Database Connection Test', () => {
  it('should connect to the database', async () => {
    try {
      const client = await pool.connect();
      client.release();
    } catch (error) {
      throw error;
    }
  });
});
