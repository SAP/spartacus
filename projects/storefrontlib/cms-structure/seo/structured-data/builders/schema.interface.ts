import { Observable } from 'rxjs';

export interface SchemaBuilder {
  build(): Observable<{}>;
}

export interface JsonLdBuilder<T> {
  build(data: T): Observable<{}>;
}
