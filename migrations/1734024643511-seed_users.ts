// eslint-disable-next-line no-
import dbService from '../src/service/dbService';
import UserModel from '../src/models/user.model';
const seedUsers = [
  {
    email: 'john@email.com',
    name: 'John',
    password: 'gfQwjDOw6KuNzmTymeMhjWQmG4JyxXwEdNCI1z+tlB0='
  },
  {
    email: 'jane@email.com',
    name: 'Jane',
    password: 'RZ5uqSTjc0tcJ3qBEVq3stt7LZP2igW9owMmLOZ0Y5I='
  }
];

export async function up(): Promise<void> {
  // Write migration here
  await dbService.connectToMongoDB();
  await UserModel.create(seedUsers);
}

export async function down(): Promise<void> {
  // Write migration here
  await dbService.connectToMongoDB();
  await UserModel.deleteMany({
    email: {
      $in: seedUsers.map((userInfo) => userInfo.email)
    }
  });
}
