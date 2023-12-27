import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Sign the message
  async signMessage() {
    // Your Ethereum private key
    const privateKey = ''; //private key

    // Initialize a provider (in this case, using Infura)
    const provider = new ethers.InfuraProvider(
      'goerli',
      '', //wallet Address
    );

    // Create a wallet instance from the private key and provider
    const wallet = new ethers.Wallet(privateKey, provider);

    // Message to sign
    const message = 'Hello';
    try {
      const signature = await wallet.signMessage(message);
      console.log('Signature:', signature);

      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
    }
  }

  getChallengeMessage(): { message: string } {
    return { message: 'SIGN_IN_TO_XTATUZ' };
  }

  async login(signature: string) {
    const { message } = this.getChallengeMessage();
    console.log(message, signature);

    try {
      const decodedAddress = ethers
        .verifyMessage(message, signature)
        .toLowerCase();
      let user = await this.userService.findOneByAddress(decodedAddress);
      if (!user) {
        user = await this.userService.createUser({
          walletAddress: decodedAddress,
        });
      }
      const payload = { walletAddress: decodedAddress, _id: user.id };
      const token = await this.generateToken(payload);

      return { data: token };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  private async generateToken(payload: any) {
    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.SECRET_EXPIRES_IN,
    });

    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH,
      expiresIn: process.env.REFRESH_EXPIRES_IN,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
