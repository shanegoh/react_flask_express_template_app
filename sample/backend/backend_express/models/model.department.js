module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define('department', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        dept_code: {
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
        },
        name: {
            type: Sequelize.STRING(20),
            unique: true,
            allowNull: false
        }
    });

    return Department
}