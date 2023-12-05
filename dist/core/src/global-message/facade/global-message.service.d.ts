import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Translatable } from '../../i18n/translatable';
import { GlobalMessageType } from '../models/global-message.model';
import { GlobalMessageEntities, StateWithGlobalMessage } from '../store/global-message-state';
import * as i0 from "@angular/core";
export declare class GlobalMessageService {
    protected store: Store<StateWithGlobalMessage>;
    constructor(store: Store<StateWithGlobalMessage>);
    /**
     * Get all global messages
     */
    get(): Observable<GlobalMessageEntities>;
    /**
     * Add one message into store
     * @param text: string | Translatable
     * @param type: GlobalMessageType object
     * @param timeout: number
     */
    add(text: string | Translatable, type: GlobalMessageType, timeout?: number): void;
    /**
     * Remove message(s) from store
     * @param type: GlobalMessageType
     * @param index:optional. Without it, messages will be removed by type; otherwise,
     * message will be removed from list by index.
     */
    remove(type: GlobalMessageType, index?: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<GlobalMessageService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GlobalMessageService>;
}
