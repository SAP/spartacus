/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Injector, Type } from '@angular/core';
import { MessageData } from '../message.model';
import { NotificationMessageComponent } from '../notification/notification-message.component';

@Injectable({
  providedIn: 'root',
})
export class MessageRenderService {
  getComponent(msg: MessageData): Type<any> {
    return msg.component ?? NotificationMessageComponent;
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
