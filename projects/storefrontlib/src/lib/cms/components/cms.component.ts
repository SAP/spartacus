import { Observable } from 'rxjs';

export interface CmsComponent {
  OnCmsComponentInit(uuid: string, componentData?: Observable<any>, contextParameters?: any);
}
