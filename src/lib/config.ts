const config = {
  user: process.env.DBUser,
  password: process.env.DBPassword,
  server: process.env.DBServer,
  database: "Movies" + (process.env.NODE_ENV === "test" ? "-TEST" : ""),
  options: { encrypt: true, enableArithAbort: true }
};

export default config;
