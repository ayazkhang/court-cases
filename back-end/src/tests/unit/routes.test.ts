import assert from 'assert';
import axios from 'axios';
import express from "express";
import { getAllCases } from "../../modals/cases";
import { pool } from '../../database/db';

jest.mock('pg');

const app = express();

const apiUrl = 'http://localhost:3000/api';

describe('Cases API', () => {
    it('should get all cases', async () => {
        const response = await axios.get(`${apiUrl}/case`);

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.status, 'success');
        assert.strictEqual(response.data.code, 200);
        assert.strictEqual(response.data.message, 'All cases have been fetched successfully');
        assert.ok(Array.isArray(response.data.data));

        const firstCase = response.data.data[0];
        assert.ok(firstCase.hasOwnProperty('id'));
        assert.ok(firstCase.hasOwnProperty('customerName'));
        assert.ok(firstCase.hasOwnProperty('startDate'));
        assert.ok(firstCase.hasOwnProperty('isFinished'));
        assert.ok(firstCase.hasOwnProperty('fxFileId'));
    });

    it('should create a new case', async () => {
        const response = await axios.post(`${apiUrl}/case`, {
            customerName: 'Test Customer',
            startDate: '2023-01-01',
            isFinished: false,
        });

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.message, 'Case has been created successfully');
    });

    it('should update a case', async () => {
        const response = await axios.put(`${apiUrl}/case/1`, {
            customerName: 'Updated Customer',
            startDate: '2023-02-01',
            isFinished: true,
        });

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.message, 'Case has been updated successfully');
    });

    it('should delete a case', async () => {
        const response = await axios.delete(`${apiUrl}/case/1`);

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data.message, 'Case has been deleted successfully');
    });
});


describe('getCases', () => {
    it('should return a Case structure', async () => {
      const mockRows = [
        {
          id: 1,
          customerName: 'Case 1',
          startDate: new Date('2023-03-01'),
          isFinished: false
        },
        {
          id: 2,
          customerName: 'Case 2',
          startDate: new Date('2023-05-10'),
          isFinished: false
        },
      ];
  
      require('pg').Pool.prototype.query.mockResolvedValueOnce({ rows: mockRows });
      const result = await getAllCases();
      expect(Array.isArray(result)).toBe(true);
  
    });
    
  });
  
  
