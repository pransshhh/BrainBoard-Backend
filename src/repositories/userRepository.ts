import { BaseRepository } from './baseRepository';
import User, { IUser } from '../models/User';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  // Add any user-specific repository methods here
  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email });
  }
}
