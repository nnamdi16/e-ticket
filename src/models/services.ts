import mongoose from 'mongoose';
import crypto from 'crypto';
import uuid4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import { serviceInterface } from '../typings/services';

export interface ServiceSchema extends serviceInterface, mongoose.Document {}

const Service = new mongoose.Schema(
  {
    serviceId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    hash: {
      type: String,
    },
    token: {
      type: String,
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
  },
  {
    id: false,
    timestamps: true,
  },
);

Service.methods.setPassword = function(password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');
  return (this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex'));
};

Service.methods.comparePassword = function(
  password: string,
  salt: string,
  hashedPassword: string,
) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
  return hashedPassword === hash;
};

Service.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return (this.token = jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt((expirationDate.getTime() / 1000).toString(), 10),
    },
    'secret',
  ));
};

Service.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    salt: this.salt,
    token: this.generateJWT(),
    password: this.setPassword(this.password),
  };
};

Service.pre<ServiceSchema>('save', function() {
  if (this.isNew) {
    this.serviceId = uuid4();
  }
});

Service.methods.gravatar = function(size: number = 200) {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto
    .createHash('md5')
    .update(this.email)
    .digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};
export default mongoose.model<ServiceSchema>('Service', Service);
