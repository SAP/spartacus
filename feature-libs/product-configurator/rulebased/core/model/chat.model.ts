/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export namespace ConfiguratorChat {
  export interface ChatMessage {
    creationDate: Date;
    role: Role;
    content: string;
  }

  export enum Role {
    USER = 'user',
    ASSISTANT = 'assistant',
    SYSTEM = 'system',
  }
}
