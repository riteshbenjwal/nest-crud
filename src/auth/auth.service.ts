import { AuthCredentialsDto } from './dto/auth_credentials.dto';
import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,
  ){}


  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
    return this.userRepository.createUser(authCredentialsDto);
  }
}
