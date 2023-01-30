import mongoose from 'mongoose';

export class Database {
  // private _db: typeof mongoose;
  // public async initDb(url: string): Promise<void> {
  //   if (!url) {
  //     throw new Error('provide db connection string');
  //   }
  //   if (this._db) {
  //     console.error('Database is already initialised!');
  //     return;
  //   }
  //
  //   mongoose.set('strictQuery', true);
  //   await mongoose
  //     .connect(url)
  //     .then((client) => {
  //       this._db = client;
  //       console.info('Database is connected');
  //     })
  //     .catch((err: Error) => {
  //       console.error('Error while connecting db', err);
  //     });
  // }
  // get db(): typeof mongoose {
  //   if (!this._db) {
  //     throw Error('Database not initialised');
  //   }
  //   return this._db;
  // }
}
