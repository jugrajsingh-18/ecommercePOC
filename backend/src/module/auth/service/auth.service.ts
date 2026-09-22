import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../../user/infrastructure/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto, RegisterDto } from '../dto/register.dto';
import bcrypt from "bcrypt"
import { UserRepository } from '../../user/infrastructure/repository/user.repository';
import { UserDomain } from '../domain/user.domain';
import { AuthMapper } from '../mapper/auth.mapper';
@Injectable()
export class AuthService {
    saltOrRounds: number = 10;
     constructor(
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly userRepository: UserRepository,
    ) { }

    async register(dto: UserDomain) {
        const exist = await this.userRepository.findOne(dto.email)

        if (exist) throw new ConflictException('Email already registered')
            const entity = AuthMapper.toEntity(dto)
const hashPass = await bcrypt.hash(dto.password, this.saltOrRounds)
        const user = await this.userRepository.create(entity.username,entity.email,entity.role,hashPass)


        const savedUser = await this.userRepository.save(user)
        const payload = {
            id:savedUser.id,
            username:savedUser.username,
            email:savedUser.email,
            role:savedUser.role
        } 
        return this.generateToken(payload)
    }

    async login(dto: LoginDto) {
        const user = await this.userRepository.findOne(dto.email.toLowerCase())

        if (!user) throw new UnauthorizedException('Invalid credentials');
        const isMatch = await bcrypt.compare(dto.password, user?.password);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');
        const payload = {
            id:user.id,
            username:user.username,
            email:user.email,
            role:user.role
        } 
        return this.generateToken(payload);
    }

    private generateToken(user: Partial<UserEntity>) {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            username: user.username,
        };
        
        const accessToken = this.jwtService.sign(payload, {
            secret: this.config.get('JWT_ACCESS_SECRET'),
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: this.config.get('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
        });
        return {
            accessToken, refreshToken
        }
    }

    async refreshTokens(user, refreshToken: string) {
        
        const checkUser = await this.validateUser(user.id)

        if (!checkUser) throw new ForbiddenException('User not found please login again');
        if (!refreshToken) throw new ForbiddenException('Access denied');
        const tokens = await this.generateToken(user);
        return tokens
    }
    async validateUser(id: string): Promise<UserEntity> {
        const user = await this.userRepository.findOneById(id);

        if (!user) throw new UnauthorizedException('User not found');
        return user;
    }
}
