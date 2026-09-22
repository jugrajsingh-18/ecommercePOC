import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { AuthService } from "../module/auth/service/auth.service";

@Injectable()
export class jwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt_RT') {
    constructor(private authService: AuthService,config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req?.cookies?.['refreshToken'] ?? null,
            ]),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_REFRESH_SECRET'), 
            passReqToCallback: true,
        })

    }
async validate(req: Request, payload: { id: number; email: string; role: string  }) {
    const user = await this.authService.validateUser(payload.id.toString());
     return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
  }
}