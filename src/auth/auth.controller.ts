import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(AuthGuard('local')) // local-strategyのvalidateが呼ばれ、userがreturnされる
  async login(@Request() request) { // UseGuardsによりrequest.userが取得できる
    return {
      userId: request.user.id,
      token: 'the token will go here'
    }
  }
}