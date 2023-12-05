import { Observable } from 'rxjs';
import { Title } from '../model/misc.model';
export declare abstract class UserProfileFacadeTransitionalToken {
    abstract getTitles(): Observable<Title[]>;
}
