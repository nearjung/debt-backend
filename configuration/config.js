const config = {
    app: {
        version: '1.0.0',
        port: 9001,
        ssl: false,
        tblAllColumn: 'Tables_in_debt',
        passwordSalt: 'DebtMD5PasswordHash@@password0012Bna@ocz',
        hashSecret: '$$SggaBB@@apz!psxzAballAb2outClinic@ssHassh',
        checkAuth: true
    },

    db: {
        cfg_db_type: "mysql",
        cfg_db_host: "119.59.115.132",
        cfg_db_user: "root",
        cfg_db_pwd: "P@ssw0rd",
        cfg_MAX_POOL: 10,
        cfg_MIN_POOL: 0,
        cfg_IDLE: 10000,
        port: 3306,
        cfg_db_name: "debt",
        logging: false,
    },

    log: {
        fileName: 'log/Log.log',
        level: 'debug'
    }
}

module.exports = config;