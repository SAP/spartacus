import { Observable } from 'rxjs';
import { CmsComponent } from '../../../model/cms.model';
import { PageContext } from '../../../routing/models/page-context.model';
import { CmsConfig } from '../../config/cms-config';
import { CmsStructureConfigService } from '../../services/cms-structure-config.service';
import { CmsComponentAdapter } from './cms-component.adapter';
import * as i0 from "@angular/core";
export declare class CmsComponentConnector {
    protected cmsStructureConfigService: CmsStructureConfigService;
    protected cmsComponentAdapter: CmsComponentAdapter;
    protected config: CmsConfig;
    constructor(cmsStructureConfigService: CmsStructureConfigService, cmsComponentAdapter: CmsComponentAdapter, config: CmsConfig);
    get<T extends CmsComponent>(id: string, pageContext: PageContext): Observable<T>;
    getList(ids: string[], pageContext: PageContext): Observable<CmsComponent[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CmsComponentConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CmsComponentConnector>;
}
