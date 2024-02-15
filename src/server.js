const http = require("http");
const app = require("./app");
const connectDb = require("./utils/dbConnect");
const httpServer = http.createServer(app);
const envVariables = require("./constants/index");

const { PORT } = envVariables;
 
const startServer = async () => {
  await connectDb();

  httpServer.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
};

startServer();
