import { Database } from './config/db';

class DBContext extends Database {
  constructor() {
    super();
  }
}

const dbContext = new DBContext();

export { dbContext };
