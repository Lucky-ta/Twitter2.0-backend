"use strict";
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tweet extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Tweet.hasMany(models.LikedTweets);
        }
    }
    Tweet.init({
        userId: DataTypes.NUMBER,
        tweet: DataTypes.STRING,
        likes: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Tweet',
    });
    return Tweet;
};
