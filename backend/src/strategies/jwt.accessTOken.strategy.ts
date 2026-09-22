
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { AuthService } from "../module/auth/service/auth.service";

@Injectable()
export class jwtAccessTokenStrategy extends PassportStrategy(Strategy,'jwt_AT'){
constructor(private authService: AuthService, config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req:Request)=>{return req?.cookies?.['accessToken']?? null}
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_ACCESS_SECRET'),  
    });
}

async validate(payload: { id: number; email: string; role: string }) {

    const user = await this.authService.validateUser(payload.id.toString());
     return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };
}
}