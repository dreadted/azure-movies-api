const sql = require("mssql");
import config from "../src/lib/config";

const resetDB = async () => {
  const pool = await sql.connect(config);
  const request = pool.request();
  const result = await request.execute("dbo.usp_RESET_Tables");
  return result;
};

resetDB();
