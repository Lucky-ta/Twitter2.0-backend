"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
        queryInterface.addColumn('tweets', 'likes', {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        }),
    ]),
    down: (queryInterface) => Promise.all([queryInterface.removeColumn('tweets', 'likes')]),
};
