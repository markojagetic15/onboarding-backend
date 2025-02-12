import { Injectable } from '@nestjs/common';
import { PasswordResetToken } from '@domain/auth/PasswordResetToken.entity';

@Injectable()
export class AuthRepository {
  async save(token: PasswordResetToken): Promise<PasswordResetToken> {
    try {
      // TODO: Add save logic
      return token;
    } catch (e) {
      console.error(e);
      throw new Error('Error saving token');
    }
  }

  async findByToken(token: string): Promise<PasswordResetToken | null> {
    try {
      console.log(token);
      // TODO: Add find logic
      return null;
    } catch (e) {
      console.error(e);
      throw new Error('Error finding token');
    }
  }
}
