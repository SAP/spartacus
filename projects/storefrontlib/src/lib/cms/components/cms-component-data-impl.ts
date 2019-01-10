import { CmsComponentData } from "./cms-component-data";
import { Observable } from "rxjs";

export class CMSComponentDataImpl<T> extends CmsComponentData<T>{
    uid: string;
    contextParameters: any;
    data$: Observable<T>;
}