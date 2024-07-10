const { Sequelize, DataTypes } = require('sequelize');
const postgressDbConnection = require("../utils/connection");
const User = require("./user-model");
const Reward = require("./rewards-model");
const sequelize = postgressDbConnection


const UserReward = sequelize.define('user_reward', {
});



module.exports = UserReward;


