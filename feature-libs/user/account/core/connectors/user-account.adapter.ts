import { Observable } from 'rxjs';
import { User } from '@spartacus/user/account/root';

export abstract class UserAccountAdapter {
  abstract load(userId: string): Observable<User>;
}
