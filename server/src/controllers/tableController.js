import { getPool, getPoolParam } from '../db/databaseConfig';
import { DBParmeters } from '../db/dbParameters';

export const getTables = (req, res) => {
  getPool().query("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema';", (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}


export const testConnection = (req, res) => {
  const dbParams = Object.create(DBParmeters);
  dbParams.hostAddress = req.query.hostAddress;
  dbParams.database = req.query.database;
  dbParams.port = req.query.port;
  dbParams.userName = req.query.userName;
  dbParams.password = req.query.password;
  getPoolParam(dbParams).query('select now();', (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}