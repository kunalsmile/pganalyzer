import { getIndexes, getIndexesParam } from '../controllers/indexController';

const indexRoutes = (app) =>  {
app.route('/indexp')
  .get((req, res, next) => {
    next();
  }, getIndexes);

  app.route('/index')
  .get((req, res, next) => {
    next();
  }, getIndexesParam);
};

export default indexRoutes;