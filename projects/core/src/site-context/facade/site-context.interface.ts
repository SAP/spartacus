import { Observable } from 'rxjs';

export interface SiteContext<T> {
  getAll(): Observable<T[]>;
  getActive(): Observable<string>;
  setActive(isocode: string);
}
