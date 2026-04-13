import { UserRepository } from './userRepository';
import User, { IUser } from '../models/User';
import { connectTestDB, disconnectTestDB, clearTestDB, connectMongooseToTestDB } from '../test/setup';
import mongoose from 'mongoose';

let userRepository: UserRepository;
let mongoUri: string;

describe('UserRepository', () => {
  beforeAll(async () => {
    mongoUri = await connectTestDB();
    await connectMongooseToTestDB(mongoUri);
    userRepository = new UserRepository();
  });

  afterEach(async () => {
    await clearTestDB();
  });

  afterAll(async () => {
    await disconnectTestDB();
  });

  it('should create a new user', async () => {
    const userData: Partial<IUser> = { username: 'testuser', email: 'test@example.com' };
    const newUser = await userRepository.create(userData as IUser);

    expect(newUser).toBeDefined();
    expect(newUser.username).toBe('testuser');
    expect(newUser.email).toBe('test@example.com');
    expect(newUser._id).toBeDefined();
  });

  it('should find a user by ID', async () => {
    const userData: Partial<IUser> = { username: 'findbyid', email: 'findbyid@example.com' };
    const createdUser = await userRepository.create(userData as IUser);

    const foundUser = await userRepository.findById(createdUser._id.toString());

    expect(foundUser).toBeDefined();
    expect(foundUser?.username).toBe('findbyid');
    expect(foundUser?.email).toBe('findbyid@example.com');
  });

  it('should return null if user by ID is not found', async () => {
    const foundUser = await userRepository.findById(new mongoose.Types.ObjectId().toString());
    expect(foundUser).toBeNull();
  });

  it('should find all users', async () => {
    const user1Data: Partial<IUser> = { username: 'user1', email: 'user1@example.com' };
    const user2Data: Partial<IUser> = { username: 'user2', email: 'user2@example.com' };
    await userRepository.create(user1Data as IUser);
    await userRepository.create(user2Data as IUser);

    const users = await userRepository.findAll();

    expect(users).toBeDefined();
    expect(users.length).toBe(2);
    expect(users.some(u => u.username === 'user1')).toBeTruthy();
    expect(users.some(u => u.username === 'user2')).toBeTruthy();
  });

  it('should update a user', async () => {
    const userData: Partial<IUser> = { username: 'oldname', email: 'old@example.com' };
    const createdUser = await userRepository.create(userData as IUser);

    const updatedUser = await userRepository.update(createdUser._id.toString(), { username: 'newname' });

    expect(updatedUser).toBeDefined();
    expect(updatedUser?.username).toBe('newname');
    expect(updatedUser?.email).toBe('old@example.com');
  });

  it('should return null if user to update is not found', async () => {
    const updatedUser = await userRepository.update(new mongoose.Types.ObjectId().toString(), { username: 'nonexistent' });
    expect(updatedUser).toBeNull();
  });

  it('should delete a user', async () => {
    const userData: Partial<IUser> = { username: 'todelete', email: 'todelete@example.com' };
    const createdUser = await userRepository.create(userData as IUser);

    const isDeleted = await userRepository.delete(createdUser._id.toString());

    expect(isDeleted).toBeTruthy();

    const foundUser = await userRepository.findById(createdUser._id.toString());
    expect(foundUser).toBeNull();
  });

  it('should return false if user to delete is not found', async () => {
    const isDeleted = await userRepository.delete(new mongoose.Types.ObjectId().toString());
    expect(isDeleted).toBeFalsy();
  });

  it('should find a user by email', async () => {
    const userData: Partial<IUser> = { username: 'emailsearch', email: 'emailsearch@example.com' };
    await userRepository.create(userData as IUser);

    const foundUser = await userRepository.findByEmail('emailsearch@example.com');

    expect(foundUser).toBeDefined();
    expect(foundUser?.username).toBe('emailsearch');
  });

  it('should return null if user by email is not found', async () => {
    const foundUser = await userRepository.findByEmail('nonexistent@example.com');
    expect(foundUser).toBeNull();
  });

  it('should handle duplicate email error when creating user', async () => {
    const userData: Partial<IUser> = { username: 'duplicate', email: 'duplicate@example.com' };
    await userRepository.create(userData as IUser);

    await expect(userRepository.create(userData as IUser)).rejects.toThrow();
  });

  it('should handle duplicate username error when creating user', async () => {
    const userData1: Partial<IUser> = { username: 'dupusername', email: 'dupuser1@example.com' };
    const userData2: Partial<IUser> = { username: 'dupusername', email: 'dupuser2@example.com' };
    await userRepository.create(userData1 as IUser);

    await expect(userRepository.create(userData2 as IUser)).rejects.toThrow();
  });
});
