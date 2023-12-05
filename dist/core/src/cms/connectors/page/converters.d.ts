import { InjectionToken } from '@angular/core';
import { CmsStructureModel } from '../../model/page.model';
import { Converter } from '../../../util/converter.service';
export declare const CMS_PAGE_NORMALIZER: InjectionToken<Converter<any, CmsStructureModel>>;
