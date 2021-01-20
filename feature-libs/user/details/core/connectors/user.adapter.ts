import { Observable } from 'rxjs';
import { User } from '../model/user.model';

export abstract class UserAdapter {
  abstract load(userId: string): Observable<User>;
}
