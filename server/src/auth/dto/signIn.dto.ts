import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty({ message: 'Email jest wymagany' })
  @IsEmail({}, { message: 'Email jest niepoprawny' })
  email: string;

  @IsNotEmpty({ message: 'Hasło jest wymagane' })
  @IsString({ message: 'Hasło musi być tekstem' })
  password: string;
}
