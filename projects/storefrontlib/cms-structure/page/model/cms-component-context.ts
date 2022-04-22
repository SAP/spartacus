import { Observable } from 'rxjs';

export abstract class CmsComponentContextData<T = any> {
  /**
   * Provides cms component context as an observable
   */
  context$: Observable<T>;
}
