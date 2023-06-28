import { APP_INITIALIZER, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { WindowRef } from '@spartacus/core';
import { defaultSegmentRefsConfig } from './config/default-segment-refs-config';
import { interceptors } from './http-interceptors';

export function segmentRefsFactory(winRef: WindowRef): () => Promise<string> {
  return () => {
    return new Promise((resolve) => {
      const url = winRef.location.href ?? '';
      const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
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
    ...interceptors,
    provideDefaultConfig(defaultSegmentRefsConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: segmentRefsFactory,
      deps: [WindowRef],
      multi: true,
    },
  ],
})
export class SegmentRefsRootModule {}
