import express, { Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import Logger from '@config/logger';
import { Env } from '@config/env';
import { Singleton } from '@decorators/singleton.decorator';
import { dbContext } from 'data-module-db-ctx';
import { User } from 'data-module-db-ctx/build/interfaces/user';
@Singleton
class Server {
  private _app: express.Application;

  constructor() {
    /* Init server */
    this._app = express();
    /* Init environmental variables */
    new Env().init();
    /* Connect DB */
    void dbContext.initDb(process.env.DB_URL as string);
    const test: User = {
      age: 1,
      name: 'sda',
    };
    /* Configure middlewares */
    this._configureMiddlewares();
    /* Set App routes */
    this._setRoutes();
    /* Start server */
    this._startServer();
  }

  private _startServer(): void {
    const PORT = process.env.PORT;
    this._app.listen(PORT, () => {
      Logger.info(`Server listening at port ${PORT}`);
    });
  }

  private _configureMiddlewares(): void {
    /* Allow cors */
    this._app.use(cors());
    /* For security */
    this._app.use(helmet());
    /* For performance */
    this._app.use(
      compression({
        /* filter: Decide if the answer should be compressed or not,
           depending on the 'shouldCompress' function above */
        filter: this._shouldCompress,
        /* threshold: It is the byte threshold for the response
           body size before considering compression, the default is 1 kB */
        threshold: 0,
      }),
    );
    /* Parse incoming requests */
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  }

  private _shouldCompress = (req: Request, res: Response) => {
    if (req.headers['x-no-compression']) {
      // Will not compress responses, if this header is present
      return false;
    }
    // Resort to standard compression
    return compression.filter(req, res);
  };

  private _setRoutes(): void {
    this._app.get('/', (req: Request, res: Response) => {
      res.send('Welcome From Data module api!');
    });
  }
}

new Server();
