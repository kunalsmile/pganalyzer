import { getTables, testConnection } from "../controllers/tableController";

const tableRoutes = (app) => {
  app.route('/tables')
  .get((req, res, next) => {
    next();
  }, getTables);

  app.route('/test')
  .get((req, res, next) => {
    next();
  }, testConnection);
}

export default tableRoutes;