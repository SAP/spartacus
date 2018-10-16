import { Observable } from 'rxjs';

export abstract class CmsComponentData {
  uid: string;
  contextParameters: any;
  data$: Observable<any>;
}
