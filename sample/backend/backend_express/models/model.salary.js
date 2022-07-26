module.exports = (sequelize, Sequelize) => {
    const Salary = sequelize.define('salary', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(20),
            unique: true,
            allowNull: false,
        },
        salary: {
            type: Sequelize.INTEGER,
            default: 0,
            allowNull: false
        },
        bonus: {
            type: Sequelize.INTEGER,
            default: 0,
            allowNull: false
        }
    });

    return Salary
}