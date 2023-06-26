import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { WindowRef } from '@spartacus/core';

export function segmentFactory(
  router: Router,
  winRef: WindowRef
): () => Promise<string> {
  return () => {
    return new Promise((resolve) => {
      const queryParams = new URLSearchParams(
        router.url.substring(router.url.indexOf('?'))
      );
      const segmentRef: string = queryParams.get('segmentrefs') ?? '';
      if (segmentRef) {
        winRef.localStorage?.setItem('segmentRefs', segmentRef);
      }
      console.log(segmentRef);
      resolve(segmentRef);
    });
  };
}

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: segmentFactory,
      deps: [Router, WindowRef],
      multi: true,
    },
  ],
})
export class SegmentRootModule {}
