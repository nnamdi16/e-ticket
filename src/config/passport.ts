import passport from 'passport';
import passportLocal from 'passport-local';
import Services from '../models/services';
import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser<any, any>(function(service, done) {
  done(undefined, service.id);
});

passport.deserializeUser(function(id, done) {
  Services.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * Sign in with email and password
 */

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      Services.findOne({ email: email.toLowerCase() }, (err, service: any) => {
        if (err) {
          return done(err);
        }
        if (!service) {
          return done(undefined, false, {
            message: `Email ${email} not found`,
          });
        }
        service.comparePassword(password, (err: Error, isMatch: boolean) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(undefined, service);
          }
          return done(undefined, false, {
            message: 'Invalid email or password',
          });
        });
      });
    },
  ),
);

/**
 * Login Required middleware
 */

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

/***
 * Authorization Required middleware
 */

export const isAuthorized = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const provider = req.path.split('/').slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
