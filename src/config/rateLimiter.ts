import { Connection } from 'mongoose';
import { RateLimiterMongo } from 'rate-limiter-flexible';

const POINTS = 10; // Number of requests allowed
const DURATION = 60; // (in seconds) time after which new requests are allowed

export let rateLimiterMongo: null | RateLimiterMongo = null;
export const initRateLimiter = (mongooseConnection: Connection) => {
  rateLimiterMongo = new RateLimiterMongo({
    storeClient: mongooseConnection,
    points: POINTS,
    duration: DURATION
  });
};
