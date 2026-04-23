/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { LoggerService, tryNormalizeHttpError } from '@spartacus/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { A2AResponse, AgentReply } from './agent.model';

export type { AgentReply } from './agent.model';

/**
 * Angular HTTP client for the remote Kyma AI agent.
 *
 * CORS is solved via the Angular dev proxy (proxy.conf.json), which forwards
 * /proxy/agent and /proxy/agent-auth through the dev server to the Kyma endpoints.
 *
 * - `call()` — makes a JSON-RPC request and returns Observable<AgentReply>
 * - `sendToChat()` — calls the agent and injects the response into the widget chat panel
 */
@Injectable({ providedIn: 'root' })
export class AgentService {
  private cachedToken: { accessToken: string; expiresAt: number } | null = null;
  private readonly tokenExpiryBufferMs = 60_000;

  constructor(
    protected http: HttpClient,
    protected logger: LoggerService,
    @Inject(DOCUMENT) protected document: Document
  ) {}

  /**
   * Send a message to the remote agent and receive the reply as an Observable.
   * Use this for programmatic access to the agent from Angular code.
   */
  call(
    message: string,
    contextId: string | null = null,
    skill = 'promotion-assistant'
  ): Observable<AgentReply> {
    return from(this.getToken()).pipe(
      switchMap((token) =>
        this.http.post<A2AResponse>(
          environment.agentServiceUrl,
          {
            jsonrpc: '2.0',
            method: 'message/send',
            id: crypto.randomUUID(),
            params: {
              message: {
                messageId: crypto.randomUUID(),
                role: 'user',
                parts: [{ kind: 'text', text: message }],
                metadata: { skill },
                ...(contextId ? { contextId } : {}),
              },
            },
          },
          { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) }
        ).pipe(
          map((res): AgentReply => ({
            reply: res.result.artifacts?.[0]?.parts?.[0]?.text ?? '',
            contextId: res.result.contextId,
          }))
        )
      ),
      catchError((error) =>
        throwError(() => tryNormalizeHttpError(error, this.logger))
      )
    );
  }

  /**
   * Open the assistant widget panel, call the agent, and inject both the user
   * message and agent reply directly into the chat panel via postMessage.
   */
  sendToChat(
    prompt: string,
    contextId: string | null = null,
    skill = 'promotion-assistant'
  ): void {
    const widgetEl = this.document.getElementById('cx-assistant-widget') as any;
    if (!widgetEl) return;
    widgetEl.show();

    this.call(prompt, contextId, skill).subscribe({
      next: (reply) => {
        const iframe = widgetEl.shadowRoot?.querySelector('iframe') as HTMLIFrameElement | null;
        iframe?.contentWindow?.postMessage(
          {
            type: 'assistant-inject-response',
            userMessage: prompt,
            agentReply: reply.reply,
            contextId: reply.contextId,
          },
          '*'
        );
      },
      error: (err) => this.logger.error('AgentService.sendToChat failed', err),
    });
  }

  // ── Token management ───────────────────────────────────────────────────────

  private async getToken(): Promise<string> {
    const now = Date.now();
    if (this.cachedToken && now < this.cachedToken.expiresAt - this.tokenExpiryBufferMs) {
      return this.cachedToken.accessToken;
    }

    const res = await fetch(environment.agentAuthUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        token_format: 'bearer',
        client_id: environment.agentClientId,
        client_secret: environment.agentClientSecret,
      }),
    });

    if (!res.ok) {
      throw new Error(`Agent token fetch failed: ${res.status}`);
    }

    const data = await res.json();
    this.cachedToken = {
      accessToken: data.access_token,
      expiresAt: now + (data.expires_in ?? 3600) * 1000,
    };
    return this.cachedToken.accessToken;
  }
}
