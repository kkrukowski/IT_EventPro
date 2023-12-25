import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Nazwa jest wymagana' })
  @IsString({ message: 'Nazwa musi być tekstem' })
  name: string;

  @IsNotEmpty({ message: 'Opis jest wymagany' })
  description: string;

  @IsNotEmpty({ message: 'Data jest wymagana' })
  when: Date;

  @IsNotEmpty({ message: 'Adres jest wymagany' })
  address: string;
}
