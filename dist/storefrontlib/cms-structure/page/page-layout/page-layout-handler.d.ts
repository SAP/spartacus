import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { BREAKPOINT } from '../../../layout/config/layout-config';
export declare const PAGE_LAYOUT_HANDLER: InjectionToken<PageLayoutHandler>;
export interface PageLayoutHandler {
    handle(slots: Observable<string[]>, pageTemplate?: string, section?: string, breakpoint?: BREAKPOINT): Observable<string[]>;
}
