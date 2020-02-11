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
   * If scope data overlaps with each other, the data should be merged in the order of scopes provided,
   * i.e. the last scope is merged last, overwriting parts of the data already provided by preceding scope.
   * It should apply also to implicit scopes (that are included by configuration).
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
      const expandedScopes = [...scopes];
      let i = expandedScopes.length;

      while (i > 0) {
        i--;
        const includedScopes =
          scopesConfig[expandedScopes[i]] &&
          scopesConfig[expandedScopes[i]].include;
        if (includedScopes) {
          for (const includedScope of includedScopes) {
            if (!expandedScopes.includes(includedScope)) {
              expandedScopes.splice(i, 0, includedScope);
              i++;
            }
          }
        }
      }

      return expandedScopes;
    }

    return scopes;
  }

  /**
   * Return maxAge for product scope in milliseconds
   *
   * @param model
   * @param scope
   */
  getMaxAge(model: string, scope: string): number {
    const scopesConfig =
      this.config &&
      this.config.backend &&
      this.config.backend.loadingScopes &&
      this.config.backend.loadingScopes[model];
    return (scopesConfig[scope] && scopesConfig[scope].maxAge) * 1000 || 0;
  }
}
