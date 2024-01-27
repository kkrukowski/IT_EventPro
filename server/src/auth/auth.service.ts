import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignInUserDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (bcrypt.compareSync(signInDto.password, user.password) === false) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const userInfo = {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userInfo,
    };
  }

  async signUp(signUpDto: any): Promise<any> {
    const user = await this.usersService.create(signUpDto);
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const userInfo = {
      id: user.id,
      email: user.email,
      name: user.name,
      surname: user.surname,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userInfo,
    };
  }
}
