import mongoose from 'mongoose';
import { dbUri } from '../../../config/config';
import logger from './logger';

async function connect() {
  try {
    await mongoose.connect(dbUri);
    logger.info('DB connected');
  } catch (error) {
    logger.error('Could not connect to db');
    process.exit(1);
  }
}

export default connect;
