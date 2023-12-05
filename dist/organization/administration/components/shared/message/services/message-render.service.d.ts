import { ComponentFactory, ComponentFactoryResolver, Injector } from '@angular/core';
import { MessageData } from '../message.model';
import * as i0 from "@angular/core";
export declare class MessageRenderService {
    protected componentFactoryResolver: ComponentFactoryResolver;
    constructor(componentFactoryResolver: ComponentFactoryResolver);
    getComponent(msg: MessageData): ComponentFactory<any>;
    getInjector(componentData: MessageData, parent?: Injector): Injector;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageRenderService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MessageRenderService>;
}
