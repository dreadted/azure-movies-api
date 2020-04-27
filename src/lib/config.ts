const config = {
  user: process.env.DBUser,
  password: process.env.DBPassword,
  server: process.env.DBServer,
  database: "Movies",
  options: { encrypt: true }
};

export default config;
