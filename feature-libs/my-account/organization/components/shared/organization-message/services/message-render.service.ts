import {
  ComponentFactory,
  ComponentFactoryResolver,
  Injectable,
  Injector,
} from '@angular/core';
import { Message, MessageComponentData } from '../message.model';
import { NotificationMessageComponent } from '../notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationRenderService {
  constructor(protected componentFactoryResolver: ComponentFactoryResolver) {}

  getComponent(msg: Message): ComponentFactory<any> {
    return this.componentFactoryResolver.resolveComponentFactory(
      msg.component || NotificationMessageComponent
    );
  }

  getInjector(
    componentData: MessageComponentData,
    parent?: Injector
  ): Injector {
    return Injector.create({
      providers: [
        {
          provide: MessageComponentData,
          useValue: componentData,
        },
      ],
      parent,
    });
  }
}
