import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpUserDto {
  @IsNotEmpty({ message: 'Imię jest wymagane' })
  @IsString({ message: 'Imię musi być tekstem' })
  name: string;

  @IsNotEmpty({ message: 'Nazwisko jest wymagane' })
  @IsString({ message: 'Nazwisko musi być tekstem' })
  surname: string;

  @IsNotEmpty({ message: 'Email jest wymagany' })
  email: string;

  @IsNotEmpty({ message: 'Hasło jest wymagane' })
  password: string;

  @IsNotEmpty({ message: 'Rola jest wymagana' })
  role: 'USER' | 'ADMIN';

  @IsNotEmpty({ message: 'Data utworzenia jest wymagana' })
  createdAt: Date;
}
