import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import schema from './schema';
import session from 'express-session';
import passport from 'passport';

// const configPath = path.join(__dirname, './', 'configs', 'passport');

const app = express();

// Setup Request logging
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.set('Secret', process.env.JSON_WEB_TOKEN_SECRET_KEY);
app.use(
  morgan(logFormat, {
    skip: function(_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode < 400;
    },
    stream: process.stderr,
  }),
);

app.use(
  morgan(logFormat, {
    skip: function(_req, res) {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }

      return res.statusCode >= 400;
    },
    stream: process.stdout,
  }),
);

app.disable('x-powered-by');
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Express sessions
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);

// require(configPath);


app.use(
  '/graphql',
  graphQLHTTP({
    schema,
    graphiql: true,
  }),
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../', 'client/build')));
  app.get('/*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../', 'client/build/index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function(
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction,
) {
  next(createError(404));
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// error handler
app.use(function(err: any, req: express.Request, res: express.Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
