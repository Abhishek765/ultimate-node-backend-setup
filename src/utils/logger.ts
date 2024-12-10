import { createLogger, transports, format } from 'winston';
import {
  ConsoleTransportInstance,
  FileTransportInstance
} from 'winston/lib/winston/transports';
import util from 'util';
import config from '../config';
import { EApplicationEnvironment } from '../constants/application';
import path from 'path';
import * as sourceMapSupport from 'source-map-support';

// Linking Trace support
sourceMapSupport.install();

const consoleLogFormat = format.printf((info) => {
  const { level, message, timestamp, meta = {} } = info;

  const customLevel = level.toUpperCase();
  const customTimestamp = timestamp;
  const customMeta = util.inspect(meta, {
    depth: null
  });

  const customLog = `${customLevel} [${customTimestamp}] ${message}\n${'META'} ${customMeta}\n`;

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

const logger = createLogger({
  defaultMeta: {
    meta: {}
  },
  transports: [...consoleTransport(), ...fileTransport()]
});

export default logger;
