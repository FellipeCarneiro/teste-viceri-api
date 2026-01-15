const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const User = require('./User');

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM('Alta', 'Média', 'Baixa'),
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

Task.belongsTo(User);
User.hasMany(Task);

module.exports = Task;
