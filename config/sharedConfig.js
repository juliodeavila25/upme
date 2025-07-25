require("dotenv").config();

const sharedConfig = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: "postgres",
  logging: process.env.NODE_ENV === "production" ? false : console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    useUTC: false,
    dateStrings: true,
    typeCast: function (field, next) {
      if (field.type === "DATETIME") {
        return field.string();
      }
      return next();
    },
  },
  timezone: "-05:00",
};

module.exports = sharedConfig;
