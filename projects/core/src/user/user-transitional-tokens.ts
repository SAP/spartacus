import { Observable } from 'rxjs';
import { Title, User } from '../model/misc.model';

export abstract class UserAccountFacadeTransitionalToken {
  abstract get(): Observable<User | undefined>;
}

export abstract class UserProfileFacadeTransitionalToken {
  abstract getTitles(): Observable<Title[]>;
}

export abstract class UserRegisterFacadeTransitionalToken {
  abstract registerGuest(guid: string, password: string): Observable<User>;
}
