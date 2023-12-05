
const sqlConfigKais = {
  user: 'sa',
  password: 'pokemon',
  database: 'gwsv',
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

module.exports = sqlConfigKais