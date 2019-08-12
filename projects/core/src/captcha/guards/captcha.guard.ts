import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RoutingService } from '../../routing/facade/routing.service';
import { CaptchaService } from '../facade/captcha.service';


@Injectable({
  providedIn: 'root',
})
export class CaptchaGuard implements CanActivate {
  constructor(
    protected routingService: RoutingService,
    protected captchaService: CaptchaService
  ) {}

  canActivate(): boolean {
    return true;
  }
}
