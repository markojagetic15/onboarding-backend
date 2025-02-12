import { User } from '@domain/user/User.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import fs from 'fs';

@Injectable()
export class UserRepository {
  async findById(id: string): Promise<User | null> {
    try {
      const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));

      const user = users.find((user: User) => user.id === id);

      return user || null;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Error finding user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));

      const user = users.find((user: User) => user.email === email);

      if (!user) {
        return null;
      }

      return user;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Error finding user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async save(user: User): Promise<User> {
    try {
      const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));

      users.push(user);

      fs.writeFileSync('src/data/users.json', JSON.stringify(users, null, 2));

      return user;
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Error saving user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(user: User): Promise<void> {
    try {
      const users = JSON.parse(fs.readFileSync('src/data/users.json', 'utf-8'));

      const updatedUsers = users.filter((u: User) => u.id !== user.id);

      fs.writeFileSync(
        'src/data/users.json',
        JSON.stringify(updatedUsers, null, 2),
      );
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'Error removing user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
