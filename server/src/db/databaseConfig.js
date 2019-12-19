import { Pool } from 'pg';
import { DBParmeters } from './dbParameters';

export const getPool = (req, res) => {
  const pool = new Pool({
    user: 'mirthresults',
    host: '192.168.56.108',
    database: 'mirthresults',
    password: 'mirthresults',
    port: 5432,
  });
  return pool;
}


export const getPoolParam = (dbParameters) => {
  const pool = new Pool({
    user: dbParameters.userName,
    host: dbParameters.hostAddress,
    database: dbParameters.database,
    password: dbParameters.password,
    port: dbParameters.port,
  });
  return pool;
}
