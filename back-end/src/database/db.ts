import { Pool, PoolConfig } from 'pg';
import { dbParams } from '../../config/config';

const poolConfig: PoolConfig = dbParams;
export const pool = new Pool(poolConfig);
