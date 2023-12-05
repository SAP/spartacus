import { Observable } from 'rxjs';
import { BaseSiteService } from '../../../site-context/facade/base-site.service';
import * as i0 from "@angular/core";
export declare class AuthMultisiteIsolationService {
    protected baseSiteService: BaseSiteService;
    protected readonly MULTISITE_SEPARATOR = "|";
    constructor(baseSiteService: BaseSiteService);
    /**
     * When isolation is turned on, a customer who registers for baseSiteA
     * can only log into baseSiteA, not baseSiteB.
     * To login into baseSiteB customer have to use the same e-mail and register an account
     * on baseSiteB.
     *
     * The strategy how to handle isolation is to use an additional decorator
     * passed as a suffix to the uid field.
     *
     * Example uid value for baseSiteA will be email@example.com|baseSiteA
     */
    getBaseSiteDecorator(): Observable<string>;
    /**
     * Method returns concatenated `userId` with the decorator suffix.
     *
     * @param userId The `userId` for given user
     */
    decorateUserId(userId: string): Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthMultisiteIsolationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthMultisiteIsolationService>;
}
