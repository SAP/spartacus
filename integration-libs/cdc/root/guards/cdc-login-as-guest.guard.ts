import { Injectable } from '@angular/core';
import { LoginAsGuestGuard } from '@spartacus/user/account/components';

@Injectable({
  providedIn: 'root',
})
export class CdcLoginAsGuestGuard extends LoginAsGuestGuard {
  routeName: string = 'login'; //overriding the route
}
