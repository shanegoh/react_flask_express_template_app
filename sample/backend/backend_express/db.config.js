module.exports = {
    HOST: "dbshack.comzufct38hz.ap-southeast-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "8!2MatsWeT14NtL%wiPb",
    DB: "test_production",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };