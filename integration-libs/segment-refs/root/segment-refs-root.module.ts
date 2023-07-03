import {
  NgModule,
} from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultSegmentRefsConfig } from './config/default-segment-refs-config';
import { segmentRefsInterceptors } from './http-interceptors';

// const SEGMENT_REFS_KEY = 'segment-refs';
// export function segmentRefsFactory(winRef: WindowRef): () => void {
//   const isReady = () => {
//     const url = winRef.location.href ?? '';
//     const queryParams = new URLSearchParams(url.substring(url.indexOf('?')));
//     const segmentRef: string = queryParams.get('segmentrefs') ?? '';
//     if (segmentRef !== '') {
//       winRef.localStorage?.setItem(SEGMENT_REFS_KEY, segmentRef);
//     } else {
//       winRef.localStorage?.removeItem(SEGMENT_REFS_KEY);
//     }
//   };
//   return isReady;
// }

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    ...segmentRefsInterceptors,
    provideDefaultConfig(defaultSegmentRefsConfig),
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: segmentRefsFactory,
    //   deps: [WindowRef],
    //   multi: true,
    // },
  ],
})
export class SegmentRefsRootModule {}
