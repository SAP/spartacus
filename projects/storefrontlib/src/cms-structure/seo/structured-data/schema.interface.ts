import { Observable } from 'rxjs';

export interface JsonLdBuilder<T> {
  build(data: T): Observable<{}>;
}
