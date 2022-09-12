"use strict";
const { Model, } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class likedTweets extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    likedTweets.init({
        userId: DataTypes.INTEGER,
        tweetId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'LikedTweets',
    });
    return likedTweets;
};
