import { PageMeta, PageMetaService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { SchemaBuilder } from '../schema.interface';
import * as i0 from "@angular/core";
export declare class BreadcrumbSchemaBuilder implements SchemaBuilder {
    protected pageMetaService: PageMetaService;
    constructor(pageMetaService: PageMetaService);
    build(): Observable<any>;
    protected collect(pageMeta: PageMeta | null): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbSchemaBuilder, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BreadcrumbSchemaBuilder>;
}
