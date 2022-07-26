module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define('employee', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(60),
            allowNull: false,
        },
        role: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0,
        },
        dept_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0,
        },
        deleteFlag: {
            type: Sequelize.INTEGER,
            allowNull: false,
            default: 0,
        }
    });

    return Employee
}

// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/