import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/getChallengeMessage')
  getChallengeMessage() {
    return this.authService.getChallengeMessage();
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.signatures);
  }

  @Get('verifyToken')
  @UseGuards(AuthGuard)
  async verifyToken() {
    return { message: 'success' };
  }
}
