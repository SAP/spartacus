import { Observable } from 'rxjs';
import { OrganizationUserRegistration } from './../model/user-registration.model';

export abstract class UserRegistrationAdapter {
  /**
   *
   * Abstract method used to register B2B user
   */
  abstract registerUser(
    userData: OrganizationUserRegistration
  ): Observable<OrganizationUserRegistration>;
}
