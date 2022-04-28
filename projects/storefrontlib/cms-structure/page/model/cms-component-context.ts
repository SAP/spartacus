import { Observable } from 'rxjs';

export abstract class ComponentContextData<T = any> {
  /**
   * Provides component context as an observable
   */
  context$: Observable<T>;
}
