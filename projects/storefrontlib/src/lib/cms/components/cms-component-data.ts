import { Observable } from 'rxjs';
import { CmsComponent } from '@spartacus/core';

export abstract class CmsComponentData<T extends CmsComponent> {
  uid: string;
  contextParameters: any;
  data$: Observable<T>;
}
