import { User } from './user.entity';
import { JwtPayload } from './jwt-payload.interface';
import { UsersRepository } from './users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51'
        });
    }

    async validate(payload: JwtPayload): Promise<User>{
        const {username} = payload;
        const user: User= await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }
        return user;

    }

  
}
