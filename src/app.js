import express from 'express';
import path from 'path';
import logger from 'morgan';
import routes from 'routes';
import config from 'config';
import * as Sentry from '@sentry/node';

const { API_V, sentry_dsn } = config;

const app = express();
Sentry.init({ dsn: sentry_dsn });
app.use(Sentry.Handlers.requestHandler());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(API_V, routes);
app.use(Sentry.Handlers.errorHandler());

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.end(`${res.sentry}\n`);
});

module.exports = app;
export default app;
