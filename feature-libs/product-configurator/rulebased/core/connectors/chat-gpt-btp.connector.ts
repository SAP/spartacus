/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { Observable, ReplaySubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ChatGPT4 } from '../model/chat-gpt-4.model';
import { LoggerService } from '@spartacus/core';

const CHAT_GPT_URL =
  'https://azure-openai-serv-i057149.cfapps.sap.hana.ondemand.com/api/v1/completions';

const AUTH_URL =
  'https://config-spa-ai-poc-7lw6jhj3.authentication.sap.hana.ondemand.com/oauth/token';
const AUTH_CLIENT_ID =
  'sb-178dee42-fa52-4911-b7d3-38beddd37943!b92460|azure-openai-service-i057149-xs!b16730';
const AUTH_CLIENT_SECRET =
  'ac8f0046-b8d0-4133-ad53-2f3059cbb5f2$VwvHtkWSRGJVyYYpirIoDGClwzoFytlbdVq3Mdi-aZI=';
/**
 * connector for chat-gpt proxy service on BTP
 */
@Injectable({
  providedIn: 'root',
})
export class ChatGptBtpConnector {
  protected logger = inject(LoggerService);

  constructor(protected http: HttpClient) {}

  private _token$: ReplaySubject<ChatGPT4.AccessData>;

  public getAccessToken(): Observable<ChatGPT4.AccessData> {
    if (!this._token$) {
      this._token$ = new ReplaySubject();
      //ToDo: handle token expiration
      this.fetchNextToken();
    }
    return this._token$;
  }

  protected fetchNextToken() {
    const headers = new HttpHeaders({
      ['Content-Type']: 'application/x-www-form-urlencoded',
      Authorization: this.getAuthString(),
    });
    this.http
      .post<ChatGPT4.TokenResponse>(AUTH_URL, '', {
        headers: headers,
        params: { grant_type: 'client_credentials' },
      })
      .pipe(
        map((response) =>
          this._token$.next({
            accessToken: response.access_token,
            tokenType: response.token_type,
            expiryDate: new Date(Date.now() + response.expires_in),
          })
        )
      )
      .subscribe();
  }

  protected getAuthString(): string {
    return (
      'Basic ' +
      Buffer.from(`${AUTH_CLIENT_ID}:${AUTH_CLIENT_SECRET}`).toString('base64')
    );
  }

  public ask(
    questions: ChatGPT4.Message[],
    functions?: any
  ): Observable<ChatGPT4.Response> {
    return this.getAccessToken().pipe(
      take(1),
      switchMap((accessData) => {
        const body: any = {
          deployment_id: 'gpt-4',
          messages: questions,
        };
        if (functions) {
          body.functions = functions;
        }
        this.logger.log('POSTING TO GPT: ', structuredClone(body));
        return this.http
          .post<ChatGPT4.Response>(CHAT_GPT_URL, body, {
            headers: {
              Authorization: this.getTokenString(accessData), // ToDo move to interceptor
            },
          })
          .pipe(
            tap((response) =>
              this.logger.log('RECEIVED FROM GPT: ', structuredClone(response))
            )
          );
      })
    );
  }

  getTokenString(accessData: ChatGPT4.AccessData): string {
    return `${accessData.tokenType
      .charAt(0)
      .toUpperCase()}${accessData.tokenType.slice(1)} ${
      accessData.accessToken
    }`;
  }
}
