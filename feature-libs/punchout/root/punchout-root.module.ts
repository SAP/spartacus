import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterStateSerializer } from '@ngrx/router-store';
import { PunchoutRouterStateSerializer } from './services/punchout-router-state.serializer';
import { PunchoutSessionService } from './services/punchout-session.service';

export function punchoutFactory(
  punchoutSessionService: PunchoutSessionService
): () => Promise<any> {
  return () => punchoutSessionService.start().toPromise();
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: punchoutFactory,
      deps: [PunchoutSessionService],
      multi: true,
    },
    {
      provide: RouterStateSerializer,
      useClass: PunchoutRouterStateSerializer,
    },
  ],
})
export class PunchoutRootModule {}
