import { Observable } from 'rxjs';
import { ContextToken } from './context.model';
import { RoutingContextService } from './routing-context.service';
import * as i0 from "@angular/core";
/**
 * Generic service for resolving the context for the UI components.
 */
export declare class ContextService {
    protected routingContextService: RoutingContextService;
    constructor(routingContextService: RoutingContextService);
    /**
     * Returns the context for the given token.
     */
    get<T>(contextToken: ContextToken): Observable<T | undefined>;
    /**
     * Resolves the context for the given token.
     */
    protected resolveContext<T>(contextToken: ContextToken): Observable<T | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ContextService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ContextService>;
}
