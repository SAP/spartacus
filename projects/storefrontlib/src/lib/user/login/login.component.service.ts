import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginComponentService {
  private _isLogin = false;

  get isLogin(): boolean {
    return this._isLogin;
  }

  set isLogin(login: boolean) {
    this._isLogin = login;
  }
}
