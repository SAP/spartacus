import { Observable } from 'rxjs';

export interface CmsComponent {
  onCmsComponentInit(uuid: string, componentData?: Observable<any>, contextParameters?: any);
}
