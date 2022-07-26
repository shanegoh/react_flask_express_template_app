module.exports = (sequelize, Sequelize) => {
    const Image = sequelize.define('image', {
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
        path: {
            type: Sequelize.STRING(60),
            allowNull: true
        }
    });

    return Image
}