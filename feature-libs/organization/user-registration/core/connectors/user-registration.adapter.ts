import { Observable } from 'rxjs';
import { OrgUserRegistration } from './../model/user-registration.model';

export abstract class UserRegistrationAdapter {
  /**
   *
   * Abstract method used to register B2B user
   */
  abstract registerUser(
    userData: OrgUserRegistration
  ): Observable<OrgUserRegistration>;
}
