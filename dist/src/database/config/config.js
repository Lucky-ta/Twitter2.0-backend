"use strict";
require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: 6883,
        dialect: 'mysql',
        define: {
            timestamps: false,
        },
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: process.env.DB_DIALECT || 'mysql',
        storage: './__tests__/database.sqlite',
        define: {
            timestamps: false,
        },
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
};
