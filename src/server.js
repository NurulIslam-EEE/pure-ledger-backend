const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = require("./app");

// database connection
// server

process.on("uncaughtException", (error) => {
  process.exit(1);
});
const port = process.env.PORT || 8080;

let server;

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL).then(() => {
      console.log("Database connection is successful");
    });

    server = app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  } catch {}

  process.on("unhandledRejection", (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on("SIGTERM", () => {
  logger.info("SIGTERM is received");

  if (server) {
    server.close();
  }
});
