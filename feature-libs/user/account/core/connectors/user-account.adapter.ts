import { Observable } from 'rxjs';
import { User } from '../model/user.model';

export abstract class UserAccountAdapter {
  abstract load(userId: string): Observable<User>;
}
