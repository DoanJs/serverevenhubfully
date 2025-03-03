import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RegisterAuthGuard extends AuthGuard('register.local') {}
