import { Observable } from 'rxjs';
import { CmsComponent } from '@spartacus/core';
export declare abstract class CmsComponentData<T extends CmsComponent> {
    uid: string;
    data$: Observable<T>;
}
