import express from "express";
import morgan from "morgan";
import { createConnection } from "typeorm";
import { corsMiddleware } from "./middlewares/cors";
import { routers } from "./routes";
import logger from "./utils/logger";
async function createApp() {    
    const app = express();
    await createConnection();
    logger.info("database connection created");
    // Express configuration
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(corsMiddleware);
    
   
    app.use(morgan("combined", {
        stream: {
          write: (message: string) => {
            logger.info(message);
          },
        },
      }));
    for (const router of routers) {
        app.use(router.path, router.router);
    }

    // create server
    app.listen(process.env.PORT, () => {
        logger.info(`Server running at http://localhost:${process.env.PORT}`);
    });
}

(async () => {
    try {
        await createApp();

    } catch (e) {
        console.log(e.message);
    }
})();