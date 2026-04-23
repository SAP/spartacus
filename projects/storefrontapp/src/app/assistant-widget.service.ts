/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { WindowRef } from '@spartacus/core';
import { AgentService } from './agent.service';
import { environment } from '../environments/environment';

export interface BubbleAction {
  actionType: 'sendMessage' | 'cancel';
  variant?: 'primary' | 'secondary';
  content: string;
  value?: string;
}

export interface ComplexBubbleOptions {
  alert?: string;
  alertColor?: string;
  title?: string;
  content: string;
  actions?: BubbleAction[];
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class AssistantWidgetService implements OnDestroy {
  private readonly abandonmentListener = () =>
    this.alert(
      "I see you haven't checked out yet — do you need help?",
      { onClickPrompt: "I left some items in my cart. Can you help me complete my purchase?" }
    );

  private readonly agentSendListener = (e: Event) => {
    const { message, contextId } = (e as CustomEvent).detail;
    const widgetEl = this.document.getElementById('cx-assistant-widget') as any;
    this.agentService.call(message, contextId ?? null).subscribe({
      next: (reply) => {
        widgetEl?.relayToFrame({
          type: 'assistant-inject-response',
          agentReply: reply.reply,
          contextId: reply.contextId,
        });
      },
      error: () => {
        widgetEl?.relayToFrame({
          type: 'assistant-inject-response',
          agentReply: 'Sorry, something went wrong. Please try again.',
          contextId: null,
        });
      },
    });
  };

  constructor(
    @Inject(DOCUMENT) protected document: Document,
    protected windowRef: WindowRef,
    protected agentService: AgentService
  ) {}

  initialize(): void {
    if (!this.windowRef.isBrowser()) {
      return;
    }
    const el = this.document.getElementById('cx-assistant-widget');
    if (el) {
      el.setAttribute('api-url', environment.assistantApiUrl);
      el.addEventListener('assistant-send', this.agentSendListener);
    }
    this.windowRef.nativeWindow?.addEventListener('cart:abandoned', this.abandonmentListener);
  }

  alert(message: string, options?: { onClickPrompt?: string; duration?: number }): void;
  alert(complexOptions: ComplexBubbleOptions): void;
  alert(
    messageOrOptions: string | ComplexBubbleOptions,
    options?: { onClickPrompt?: string; duration?: number }
  ): void {
    const el = this.document.getElementById('cx-assistant-widget') as any;
    el?.alert(messageOrOptions, options);
  }

  ngOnDestroy(): void {
    this.windowRef.nativeWindow?.removeEventListener('cart:abandoned', this.abandonmentListener);
    const el = this.document.getElementById('cx-assistant-widget');
    el?.removeEventListener('assistant-send', this.agentSendListener);
  }
}
