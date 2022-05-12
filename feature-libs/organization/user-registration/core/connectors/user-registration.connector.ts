import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationUserRegistration } from '../model';
import { UserRegistrationAdapter } from './user-registration.adapter';

@Injectable()
export class UserRegistrationConnector {
  constructor(protected adapter: UserRegistrationAdapter) {}

  registerUser(
    userData: OrganizationUserRegistration
  ): Observable<OrganizationUserRegistration> {
    return this.adapter.registerUser(userData);
  }
}
