import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

/**
 * The configuration of the site theme
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class SiteThemeConfig {
  /**
   * Site theme
   */
  theme: string;
}
