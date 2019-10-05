"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const services_1 = __importDefault(require("../models/services"));
const lodash_1 = __importDefault(require("lodash"));
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser(function (service, done) {
    done(undefined, service.id);
});
passport_1.default.deserializeUser(function (id, done) {
    services_1.default.findById(id, function (err, user) {
        done(err, user);
    });
});
/**
 * Sign in with email and password
 */
passport_1.default.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    services_1.default.findOne({ email: email.toLowerCase() }, (err, service) => {
        if (err) {
            return done(err);
        }
        if (!service) {
            return done(undefined, false, {
                message: `Email ${email} not found`,
            });
        }
        service.comparePassword(password, (err, isMatch) => {
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
}));
/**
 * Login Required middleware
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};
/***
 * Authorization Required middleware
 */
exports.isAuthorized = (req, res, next) => {
    const provider = req.path.split('/').slice(-1)[0];
    if (lodash_1.default.find(req.user.tokens, { kind: provider })) {
        next();
    }
    else {
        res.redirect(`/auth/${provider}`);
    }
};
//# sourceMappingURL=passport.js.map