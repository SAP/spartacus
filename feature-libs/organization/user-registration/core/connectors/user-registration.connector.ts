import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrgUserRegistration } from '../model';
import { UserRegistrationAdapter } from './user-registration.adapter';

@Injectable()
export class UserRegistrationConnector {
  constructor(protected adapter: UserRegistrationAdapter) {}

  registerUser(userData: OrgUserRegistration): Observable<OrgUserRegistration> {
    return this.adapter.registerUser(userData);
  }
}
