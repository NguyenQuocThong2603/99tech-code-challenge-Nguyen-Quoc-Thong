import mongoose from 'mongoose'
import App from './app'
import { Config } from './config'
import { Logger } from './utils/Logger'
const {Routes} = require('./api/routes')
const { port } = Config;

(async () => {
  try {
    const server = new App(Routes, port);
    server.listen()
    await mongoose.connect(Config.databaseConnectionString)
    Logger.info('Datasource initialize succeeded')
  } catch (error) {
    Logger.error('Init datasource failed', error)
  }
})()