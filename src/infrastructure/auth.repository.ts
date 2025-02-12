import { Injectable } from '@nestjs/common';
import { PasswordResetToken } from '@domain/auth/PasswordResetToken.entity';
import fs from 'fs';

@Injectable()
export class AuthRepository {
  async save(token: PasswordResetToken): Promise<PasswordResetToken> {
    try {
      const tokens = JSON.parse(
        fs.readFileSync('src/data/tokens.json', 'utf-8'),
      );

      tokens.push(token);

      fs.writeFileSync('src/data/tokens.json', JSON.stringify(tokens, null, 2));

      return token;
    } catch (e) {
      console.error(e);
      throw new Error('Error saving token');
    }
  }

  async findByToken(token: string): Promise<PasswordResetToken | null> {
    try {
      const tokens = JSON.parse(
        fs.readFileSync('src/data/tokens.json', 'utf-8'),
      );

      const foundToken = tokens.find(
        (t: PasswordResetToken) => t.token === token,
      );

      return foundToken || null;
    } catch (e) {
      console.error(e);
      throw new Error('Error finding token');
    }
  }
}
