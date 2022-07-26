const { Sequelize, Op } = require("sequelize");
const dbConfig = require("../db.config.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});

const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize
db.op = Op
db.employee = require("./model.employee.js")(sequelize, Sequelize)
db.department = require("./model.department.js")(sequelize, Sequelize)
db.salary = require("./model.salary.js")(sequelize, Sequelize)
db.image = require("./model.image.js")(sequelize, Sequelize)
// https://sequelize.org/docs/v6/core-concepts/model-basics/

// https://sequelize.org/docs/v6/core-concepts/assocs/


db.employee.belongsTo(db.department, {
    foreignKey: "dept_code",
    sourceKey: "dept_code",
    constraints: false,
});

db.department.hasMany(db.employee, {
    foreignKey: "dept_code",
    sourceKey: "dept_code",
    constraints: false,
});

db.salary.hasOne(db.employee, {
    foreignKey: "username",
    sourceKey: "username",
    constraints: false,
});

db.employee.hasOne(db.salary, {
    foreignKey: "username",
    sourceKey: "username",
    constraints: false,
});

module.exports = db;