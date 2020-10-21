import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  Injector,
} from '@angular/core';
import { MessageData } from '../message.model';
import { NotificationMessageComponent } from '../notification/notification-message.component';

@Injectable({
  providedIn: 'root',
})
export class MessageRenderService {
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {}

  getComponent(msg: MessageData): ComponentFactory<any> {
    return this.componentFactoryResolver.resolveComponentFactory(
      msg.component || NotificationMessageComponent
    );
  }

  getInjector(componentData: MessageData, parent?: Injector): Injector {
    return Injector.create({
      providers: [
        {
          provide: MessageData,
          useValue: componentData,
        },
      ],
      parent,
    });
  }
}
