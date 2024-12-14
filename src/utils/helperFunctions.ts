import os from 'os';

import config from '../config';

export const getSystemHealth = () => {
  return {
    cpuUsage: os.loadavg(),
    loadMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
    freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`
  };
};

export const getApplicationHealth = () => {
  return {
    environment: config.ENV,
    uptime: `${process.uptime().toFixed(2)} seconds`,
    memoryUsage: {
      heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
    }
  };
};
