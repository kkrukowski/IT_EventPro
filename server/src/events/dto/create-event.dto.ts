import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Nazwa jest wymagana' })
  @IsString({ message: 'Nazwa musi być tekstem' })
  title: string;

  @IsNotEmpty({ message: 'Opis jest wymagany' })
  description: string;

  @IsNotEmpty({ message: 'Data jest wymagana' })
  date: Date;

  @IsNotEmpty({ message: 'Adres jest wymagany' })
  localization: string;

  createdAt: Date;
}
