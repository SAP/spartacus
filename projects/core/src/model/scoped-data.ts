import { Observable } from 'rxjs';

/**
 * Used to envelope data observable together with specified scope
 */
export interface ScopedData<T> {
  scope: string;
  data$?: Observable<T>;
}
