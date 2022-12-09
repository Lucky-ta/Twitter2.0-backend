"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => Promise.all([
        queryInterface.addColumn('Tweets', 'likes', {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        }),
    ]),
    down: (queryInterface) => Promise.all([queryInterface.removeColumn('Tweets', 'likes')]),
};
