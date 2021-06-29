import { Observable } from 'rxjs';
import { Title, User, UserSignUp } from '../../../model/misc.model';
/**
 * @deprecated since 3.2, use `OccUserAccountAdapter` and `UserProfileAdapter`
 * from the `@spartacus/user` package
 */
export abstract class UserAdapter {
  abstract load(userId: string): Observable<User>;

  abstract register(user: UserSignUp): Observable<User>;

  abstract registerGuest(guid: string, password: string): Observable<User>;

  abstract loadTitles(): Observable<Title[]>;
}
