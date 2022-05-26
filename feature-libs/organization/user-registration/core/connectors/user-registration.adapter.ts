import { Observable } from 'rxjs';
import { OrganizationUserRegistration } from '@spartacus/organization/user-registration/root';

export abstract class UserRegistrationAdapter {
  /**
   *
   * Abstract method used to register B2B user
   */
  abstract registerUser(
    userData: OrganizationUserRegistration
  ): Observable<OrganizationUserRegistration>;
}
