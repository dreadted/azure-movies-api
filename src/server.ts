import app from "./app";

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Running on port ${port} in ${process.env.NODE_ENV} mode.`)
);