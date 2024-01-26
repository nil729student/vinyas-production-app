

import sql from 'mssql';
import configKais from './config/sqlConfigKais';
import sqlConfigKaisEscorxa from './config/sqlConfigKaisEscorxa';

async function connKais() { 
  try {
    await sql.connect(configKais);
    console.log('Connected to the database Kais gwsv');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

async function connKaisEscorxa() { 
  try {
    await sql.connect(sqlConfigKaisEscorxa);
    console.log('Connected to the database Kais escorxa');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

module.exports = {
  connKais,
  connKaisEscorxa
};