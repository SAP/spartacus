import { APP_BOOTSTRAP_LISTENER, ComponentRef, NgModule } from '@angular/core';
import { SiteThemeService } from './site-theme.service';
@NgModule({
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useFactory: (siteThemeService: SiteThemeService) => {
        return (component: ComponentRef<any>) =>
          siteThemeService.init(component);
      },
      deps: [SiteThemeService],
    },
  ],
})
export class SiteThemeModule {}
