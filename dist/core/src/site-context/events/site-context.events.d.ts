import { CxEvent } from '../../event/cx-event';
/**
 * Indicates that the language has changed.
 */
export declare class LanguageSetEvent extends CxEvent {
    /**
     * Event's type
     */
    static readonly type = "LanguageSetEvent";
    activeLanguage: string;
}
/**
 * Indicates that the Currency has changed.
 */
export declare class CurrencySetEvent extends CxEvent {
    /**
     * Event's type
     */
    static readonly type = "CurrencySetEvent";
    activeCurrency: string;
}
