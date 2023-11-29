import { pool } from '../database/db';
import { Case } from '../utility/interfaces';

export const getAllCases = async (): Promise<Case[]> => {
  try {
    const query = 'SELECT * FROM cases order by id';
    const response = await pool.query(query);

    return response.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createOne = async (customerName: string, startDate: Date, isFinished: boolean, fxFileId: string): Promise<Case | null> => {
  try {
    const insertQuery = {
      text: 'INSERT INTO cases ("customerName", "startDate", "isFinished", "fxFileId") VALUES ($1, $2, $3, $4) RETURNING *',
      values: [customerName, startDate, isFinished, fxFileId],
    };

    const response = await pool.query(insertQuery);

    if (response.rows?.length) {
      const insertedRecord = response.rows[0];

      return insertedRecord;
    }

    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateCase = async (caseId: number, customerName: string, startDate: Date, isFinished: boolean, fxFileId: string): Promise<Case | null> => {
  try {
    const updateQuery = {
      text: 'UPDATE cases SET "customerName" = $2, "startDate" = $3, "isFinished" = $4 , "fxFileId" = $5 WHERE id = $1 RETURNING *',
      values: [caseId, customerName, startDate, isFinished, fxFileId],
    };

    const response = await pool.query(updateQuery);

    if (response.rows.length > 0) {
      const updatedRecord = response.rows[0];
      return updatedRecord;
    }

    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCase = async (caseId: number): Promise<boolean> => {
  try {
    const deleteQuery = 'DELETE FROM cases WHERE id = $1';
    await pool.query(deleteQuery, [caseId]);
    
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
