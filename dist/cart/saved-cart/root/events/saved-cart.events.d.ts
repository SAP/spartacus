import { CartEvent } from '@spartacus/cart/base/root';
/**
 * Base saved cart event. Most cart events should have these properties.
 */
export declare abstract class SavedCartEvent extends CartEvent {
}
export declare class SaveCartEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "SaveCartEvent";
    saveCartName?: string;
    saveCartDescription?: string;
}
export declare class SaveCartSuccessEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "SaveCartSuccessEvent";
    saveCartName?: string;
    saveCartDescription?: string;
    saveTime: string;
}
export declare class SaveCartFailEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "SaveCartEvent";
    saveCartName?: string;
    saveCartDescription?: string;
}
export declare class RestoreSavedCartEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "RestoreSavedCartEvent";
    saveCartName?: string;
    saveCartDescription?: string;
    saveTime: string;
}
export declare class RestoreSavedCartSuccessEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "RestoreSavedCartSuccessEvent";
    saveCartName?: string;
    saveCartDescription?: string;
}
export declare class RestoreSavedCartFailEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "RestoreSavedCartFailEvent";
    saveCartName?: string;
    saveCartDescription?: string;
    saveTime: string;
}
export declare class EditSavedCartEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "EditSavedCartEvent";
    saveCartName?: string;
    saveCartDescription?: string;
}
export declare class EditSavedCartSuccessEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "EditSavedCartSuccessEvent";
    saveCartName?: string;
    saveCartDescription?: string;
    saveTime: string;
}
export declare class EditSavedCartFailEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "EditSavedCartFailEvent";
    saveCartName?: string;
    saveCartDescription?: string;
}
export declare class CloneSavedCartEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "CloneSavedCartEvent";
    saveCartName?: string;
    saveCartDescription?: string;
    saveTime: string;
}
export declare class CloneSavedCartSuccessEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "CloneSavedCartSuccessEvent";
    saveCartName?: string;
    saveCartDescription?: string;
}
export declare class CloneSavedCartFailEvent extends SavedCartEvent {
    /**
     * Event's type
     */
    static readonly type = "CloneSavedCartFailEvent";
    saveCartName?: string;
    saveCartDescription?: string;
    saveTime: string;
}
