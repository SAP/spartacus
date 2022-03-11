import { APP_BOOTSTRAP_LISTENER, ComponentRef, NgModule } from '@angular/core';
import { ThemeService } from './theme.service';

export function initTheme(themeService: ThemeService) {
  const result = (component: ComponentRef<any>) => themeService.init(component);
  return result;
}

@NgModule({
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useFactory: initTheme,
      deps: [ThemeService],
    },
  ],
})
export class ThemeModule {}
