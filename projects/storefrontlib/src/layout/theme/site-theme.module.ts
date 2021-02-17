import { APP_BOOTSTRAP_LISTENER, ComponentRef, NgModule } from '@angular/core';
import { SiteThemeService } from './site-theme.service';

export function initSiteTheme(siteThemeService: SiteThemeService) {
  const result = (component: ComponentRef<any>) =>
    siteThemeService.init(component);
  return result;
}

@NgModule({
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useFactory: initSiteTheme,
      deps: [SiteThemeService],
    },
  ],
})
export class SiteThemeModule {}
