import { Action } from '@ngrx/store';
import { GlobalMessage, GlobalMessageType } from '../../models/global-message.model';
export declare const ADD_MESSAGE = "[Global-message] Add a Message";
export declare const REMOVE_MESSAGE = "[Global-message] Remove a Message";
export declare const REMOVE_MESSAGES_BY_TYPE = "[Global-message] Remove messages by type";
export declare class AddMessage implements Action {
    payload: GlobalMessage;
    readonly type = "[Global-message] Add a Message";
    constructor(payload: GlobalMessage);
}
export declare class RemoveMessage implements Action {
    payload: {
        type: GlobalMessageType;
        index: number;
    };
    readonly type = "[Global-message] Remove a Message";
    constructor(payload: {
        type: GlobalMessageType;
        index: number;
    });
}
export declare class RemoveMessagesByType implements Action {
    payload: GlobalMessageType;
    readonly type = "[Global-message] Remove messages by type";
    constructor(payload: GlobalMessageType);
}
export type GlobalMessageAction = AddMessage | RemoveMessage | RemoveMessagesByType;
