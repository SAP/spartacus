import { Observable, ReplaySubject, Subject } from 'rxjs';
import { MessageData, MessageEventData } from '../message.model';
import * as i0 from "@angular/core";
export declare class MessageService<O extends MessageEventData = MessageEventData, T extends MessageData<O> = MessageData<O>> {
    protected data$: ReplaySubject<T>;
    get(): Observable<T>;
    add(message: T): Subject<O>;
    close(message: Subject<MessageEventData> | null): void;
    /**
     * Sets the message type to INFO, and adds a default timeout
     * for info messages.
     */
    protected getDefaultMessage(message: T): MessageData;
    clear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageService<any, any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MessageService<any, any>>;
}
