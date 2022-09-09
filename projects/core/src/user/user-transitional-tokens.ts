import { Observable } from 'rxjs';
import { Title } from '../model/misc.model';

export abstract class UserProfileFacadeTransitionalToken {
  abstract getTitles(): Observable<Title[]>;
}
