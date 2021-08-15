import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @UseGuards(AuthGuard('local')) // local-strategyのvalidateが呼ばれ、userがreturnされる
  async login(@Request() request) { // UseGuardsによりrequest.userが取得できる
    return {
      userId: request.user.id,
      token: this.authService.getTokenForUser(request.user)
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() request) {
    return request.user
  }
}