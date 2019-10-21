import { Observable } from 'rxjs';

export interface ScopedModelData<T> {
  id: string;
  scope: string;
  data$?: Observable<T>;
}
