import { Renderer2 } from '@angular/core';
export interface Listener {
    nativeElement: any;
    eventName: string;
    endListener: () => void;
}
export declare class EventListenerUtils {
    initialize(renderer: Renderer2): void;
    private renderer;
    private listeners;
    attachEventListener(nativeElement: any, eventName: string, callback: (event: any) => void): void;
    detachEventListeners(nativeElement: any, eventName: string): void;
    detachAllEventListeners(nativeElement: any): void;
    _detachEventListeners(eventListeners: Listener[]): void;
}
