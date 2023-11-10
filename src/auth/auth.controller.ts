import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up-auth.dto';
import { SignInDto } from './dto/sign-in-auth.dto';


@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) { }

  @Post("sign-up")
  async signUp(@Body() signUp: SignUpDto) {
    return this.authService.signUp(signUp);
  }

  @Post("sign-in")
  async signIn(@Body() signIn: SignInDto) {
    return this.authService.signIn(signIn);
  }

}
