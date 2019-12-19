import {getPool, getPoolParam} from '../db/databaseConfig';
import { DBParmeters } from '../db/dbParameters';

export const getIndexes = (req, res) => {
  getPool().query(`SELECT
  t.tablename,
  indexname,
  c.reltuples AS num_rows,
  pg_size_pretty(pg_relation_size(quote_ident(t.schemaname)::text || '.' || quote_ident(t.tablename)::text)) AS table_size,
  pg_size_pretty(pg_relation_size(quote_ident(t.schemaname)::text || '.' || quote_ident(indexrelname)::text)) AS index_size,
  number_of_scans
  
FROM pg_tables t
LEFT OUTER JOIN pg_class c ON t.tablename = c.relname
LEFT OUTER JOIN (
  SELECT
      c.relname AS ctablename,
      ipg.relname AS indexname,
      x.indnatts AS number_of_columns,
      idx_scan AS number_of_scans,
      idx_tup_read AS tuples_read,
      idx_tup_fetch AS tuples_fetched,
      indexrelname,
      indisunique,
      schemaname
  FROM pg_index x
  JOIN pg_class c ON c.oid = x.indrelid
  JOIN pg_class ipg ON ipg.oid = x.indexrelid
  JOIN pg_stat_all_indexes psai ON x.indexrelid = psai.indexrelid
) AS foo ON t.tablename = foo.ctablename AND t.schemaname = foo.schemaname
WHERE t.schemaname NOT IN ('pg_catalog', 'information_schema')`, (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}

export const getIndexesParam = (req, res) => {
  const dbParams = Object.create(DBParmeters);
  dbParams.hostAddress = req.query.hostAddress;
  dbParams.database = req.query.database;
  dbParams.port = req.query.port;
  dbParams.userName = req.query.userName;
  dbParams.password = req.query.password;
  const orderBy = req.query.orderby;
  const sortOrder = req.query.sortorder;

  let query = `select schemaname, relname as tablename, indexrelname as indexname, idx_scan, 
  pg_size_pretty(pg_relation_size(indexrelname::varchar)) as indexsize, pg_size_pretty(pg_relation_size(relname::varchar)) as tablesize 
  from pg_stat_user_indexes 
  where schemaname='public' and indexrelname::varchar not like '%_pk%' `;
  if(req.query.indexSearch != '') {
    query += ` and indexrelname like '%` + req.query.indexSearch + `%'`;
    console.log(query);
  }

  if(req.query.tableSearch != '') {
    query += ` and relname like '%` + req.query.tableSearch + `%'`;
    console.log(query);
  }

  if(req.query.showScannedIndex == 'true') {
    query += ` and idx_scan >= 0`;
  } else {
    query += ` and idx_scan = 0`;
  }

  if(orderBy != '' && orderBy != 'None' && orderBy != 'undefined') {
    query += ` order by ` + orderBy;
    if(sortOrder === 'true') {
      query += ` desc`
    }
  }

  getPoolParam(dbParams).query(query, (error, results) => {
    if(error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
}