import { Injectable } from '@angular/core';
import { OccConfig } from '../config/occ-config';

@Injectable({
  providedIn: 'root',
})
export class LoadingScopesService {
  constructor(protected config: OccConfig) {}

  /**
   * Aims to expand scopes based on loading scopes config.
   *
   * I.e. if 'details' scope includes 'list' scope by configuration, it'll return ['details', 'list']
   *
   * @param model
   * @param scopes
   */
  expand(model: string, scopes: string[]): string[] {
    const scopesConfig =
      this.config &&
      this.config.backend &&
      this.config.backend.loadingScopes &&
      this.config.backend.loadingScopes[model];

    if (scopesConfig) {
      let i = 0;

      const completeScopes = [...scopes].reverse(); // to ensure proper scopes merging order

      while (i < completeScopes.length) {
        const includedScopes =
          scopesConfig[completeScopes[i]] &&
          scopesConfig[completeScopes[i]].include;
        if (includedScopes) {
          for (const includedScope of includedScopes) {
            if (!completeScopes.includes(includedScope)) {
              completeScopes.push(includedScope);
            }
          }
        }
        i++;
      }

      return completeScopes.reverse();
    }

    return scopes;
  }
}
