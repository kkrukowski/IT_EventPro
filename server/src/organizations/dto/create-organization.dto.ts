import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateOrganizationDto {
  @IsNotEmpty({ message: 'Nazwa jest wymagana' })
  @IsString({ message: 'Nazwa musi być tekstem' })
  name: string;
}
