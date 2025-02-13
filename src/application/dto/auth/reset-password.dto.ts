import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  old_password: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
