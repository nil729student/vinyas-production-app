

import sql from 'mssql';
import configKais from './sqlConfigKais';

async function connKais() { // This name is fine
  try {
    await sql.connect(configKais);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

module.exports = {
  connKais,
};