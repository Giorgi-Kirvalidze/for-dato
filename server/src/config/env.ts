import dotenv from 'dotenv';
import path from 'path';
import { Singleton } from '@decorators/singleton.decorator';

@Singleton
export class Env {
  public init(): void {
    dotenv.config({
      path: path.resolve(process.cwd() + '/src/environment', `${process.env.NODE_ENV}.env`),
    });
  }
}
