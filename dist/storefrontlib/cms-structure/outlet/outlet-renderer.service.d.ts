import { Observable } from 'rxjs';
import { OutletDirective } from './outlet.directive';
import * as i0 from "@angular/core";
export declare class OutletRendererService {
    private outletRefs;
    /**
     * Dynamically render the templates in the specified array
     *
     * @param outlet
     */
    render(outlet: string): void;
    /**
     * Register outlet to be available to render dynamically
     *
     * @param cxOutlet
     * @param context
     */
    register(cxOutlet: string, context: OutletDirective): void;
    /**
     * Returns map of outlets
     *
     */
    getOutletRef(outlet: string): Observable<OutletDirective>;
    static ɵfac: i0.ɵɵFactoryDeclaration<OutletRendererService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OutletRendererService>;
}
