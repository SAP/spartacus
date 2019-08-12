import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CaptchaService } from '../facade/captcha.service';

@Injectable({
  providedIn: 'root',
})
export class CaptchaGuard implements CanActivate {
  constructor(protected captchaService: CaptchaService) {}

  canActivate(): boolean {
    return true;
  }
}
