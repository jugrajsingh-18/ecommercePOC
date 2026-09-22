import { AuthService } from '../service/auth.service';
import { LoginDto, RegisterDto } from '../dto/register.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { JwtAccessTokenGuard } from '../../../guards/jwt.accessToken.guard';
import { JwtRefreshTokenGuard } from '../../../guards/jwt.refreshToken.guard';
import { CurrentUser } from '../decorator/auth.decorator';
import { UserEntity } from '../../user/infrastructure/entity/user.entity';
import { AuthMapper } from '../mapper/auth.mapper';

const isProduction = process.env.NODE_ENV === 'production';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private getCookieOptions(maxAge?: number, path?: string) {
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: (isProduction ? 'none' : 'lax') as 'none' | 'lax',
      ...(maxAge ? { maxAge } : {}),
      ...(path ? { path } : {}),
    };
  }

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const domain = AuthMapper.fromDto(dto);
    const tokens = await this.authService.register(domain);
    res.cookie(
      'accessToken',
      tokens.accessToken,
      this.getCookieOptions(15 * 60 * 1000),
    );
    res.cookie(
      'refreshToken',
      tokens.refreshToken,
      this.getCookieOptions(7 * 24 * 60 * 60 * 1000, '/'),
    );

    return tokens;
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(dto);
    res.cookie(
      'accessToken',
      tokens.accessToken,
      this.getCookieOptions(15 * 60 * 1000),
    );
    res.cookie(
      'refreshToken',
      tokens.refreshToken,
      this.getCookieOptions(7 * 24 * 60 * 60 * 1000, '/'),
    );

    return tokens;
  }

  @Get('me')
  @UseGuards(JwtAccessTokenGuard)
  getMe(@CurrentUser() user: UserEntity) {
    return user;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', this.getCookieOptions());
    res.clearCookie('refreshToken', this.getCookieOptions(undefined, '/'));
    return { message: 'Logged out successfully' };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshTokenGuard)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshTokens(
      req.user,
      req.cookies.refreshToken,
    );

    res.cookie(
      'accessToken',
      tokens.accessToken,
      this.getCookieOptions(15 * 60 * 1000),
    );
    res.cookie(
      'refreshToken',
      tokens.refreshToken,
      this.getCookieOptions(7 * 24 * 60 * 60 * 1000, '/'),
    );
    return tokens;
  }
}
