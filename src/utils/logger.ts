import { blue, green, magenta, red, yellow } from 'colorette';
import path from 'path';
import * as sourceMapSupport from 'source-map-support';
import util from 'util';
import { createLogger, format, transports } from 'winston';
import {
  ConsoleTransportInstance,
  FileTransportInstance
} from 'winston/lib/winston/transports';
import { MongoDBTransportInstance } from 'winston-mongodb';
import 'winston-mongodb';

import config from '../config';
import { EApplicationEnvironment } from '../constants/application';
// Linking Trace support
sourceMapSupport.install();

const colorizeLevel = (level: string) => {
  switch (level) {
    case 'ERROR':
      return red(level);
    case 'INFO':
      return blue(level);
    case 'WARN':
      return yellow(level);
    default:
      return level;
  }
};

const consoleLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;

  const customLevel = colorizeLevel(level.toUpperCase());
  const customTimestamp = green(timestamp as string);
  const customMeta = util.inspect(meta, {
    depth: null,
    colors: true
  });

  const customLog = `${customLevel} [${customTimestamp}] ${message}\n${magenta('META')} ${customMeta}\n`;

  return customLog;
});
const consoleTransport = (): ConsoleTransportInstance[] => {
  if (config.ENV === EApplicationEnvironment.DEVELOPMENT) {
    return [
      new transports.Console({
        level: 'info',
        format: format.combine(format.timestamp(), consoleLogFormat)
      })
    ];
  }

  return [];
};

const fileLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;

  const logMeta: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(meta as Record<string, unknown>)) {
    if (value instanceof Error) {
      logMeta[key] = {
        name: value.name,
        message: value.message,
        trace: value.stack || ''
      };
    } else {
      logMeta[key] = value;
    }
  }

  const logData = {
    level: level.toUpperCase(),
    message,
    timestamp,
    meta: logMeta
  };

  return JSON.stringify(logData, null, 4);
});

const fileTransport = (): FileTransportInstance[] => {
  return [
    new transports.File({
      filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
      level: 'info',
      format: format.combine(format.timestamp(), fileLogFormat)
    })
  ];
};

const mongoDBTransport = (): MongoDBTransportInstance[] => {
  return [
    new transports.MongoDB({
      level: 'info',
      db: config.MONGO_DB_URL,
      metaKey: 'meta',
      expireAfterSeconds: 3600 * 24 * 30, // 30 days
      collection: 'application-logs'
    })
  ];
};

const logger = createLogger({
  defaultMeta: {
    meta: {}
  },
  transports: [...consoleTransport(), ...fileTransport(), ...mongoDBTransport()]
});

export default logger;
