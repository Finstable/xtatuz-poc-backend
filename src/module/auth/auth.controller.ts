import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/signMessage')
  signMessage() {
    //for test API login
    return this.authService.signMessage();
  }

  @Get('/login')
  login(@Body('') loginDto: LoginDto) {
    return this.authService.login(loginDto.signatures);
  }
}
