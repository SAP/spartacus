import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { ContextToken } from './context.model';
import { RoutingContextService } from './routing-context.service';

/**
 * Generic service for resolving the context for the UI components.
 */
@Injectable({ providedIn: 'root' })
export class ContextService {
  constructor(protected routingContextService: RoutingContextService) {}

  /**
   * Returns the context for the given token.
   */
  get<T>(contextToken: ContextToken): Observable<T | undefined> {
    return this.resolveContext<T>(contextToken).pipe(
      distinctUntilChanged(),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  /**
   * Resolves the context for the given token.
   */
  protected resolveContext<T>(
    contextToken: ContextToken
  ): Observable<T | undefined> {
    return this.routingContextService.get(contextToken);
  }
}
