
const sqlConfigKaisEscorxa = {
    user: process.env.USER_KAIS,
    password: process.env.PASSWORD_KAIS,
    database: 'escorxa_carnissers',
    server: 'KAIS-SERVER\\KAIS',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true, 
      trustServerCertificate: true // change to true for local dev / self-signed certs
  
    }
  }
  
  
  
  module.exports = sqlConfigKaisEscorxa