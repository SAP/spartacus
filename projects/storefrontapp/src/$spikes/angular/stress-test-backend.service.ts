// stress test caller service

import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoggerService } from '@spartacus/core';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StressTestBackendService {
  httpClient = inject(HttpClient);
  location = inject(Location);
  logger = inject(LoggerService);

  /**
   * makes N calls to a backend API in parallel
   */
  callBackend(url: string, numberOfCalls: number): Observable<any> {
    this.logger.debug({ url, numberOfCalls });
    // use Angular http client and RxJS:
    return forkJoin(
      Array.from({ length: numberOfCalls }).map((_val, index) =>
        this.httpClient.get(`${url}?index=${index}`)
      )
    );
  }
}
