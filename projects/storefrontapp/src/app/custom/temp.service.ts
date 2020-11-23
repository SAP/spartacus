// import { Injectable } from '@angular/core';
// import { WindowRef } from '@spartacus/core';
// import { BreakpointService, LayoutConfig } from '@spartacus/storefront';

// @Injectable({ providedIn: 'root' })
// export class ServiceNameService extends BreakpointService {
//   constructor(
//     protected winRef: WindowRef,
//     protected layoutConfig: LayoutConfig
//   ) {
//     super(winRef, layoutConfig);
//   }
// }

// import { Injectable } from '@angular/core';
// import { LaunchDialogService } from '@spartacus/storefront';

// import { Inject, Injectable } from '@angular/core';
// import {
//   LaunchDialogService,
//   LaunchRenderStrategy,
//   LayoutConfig,
// } from '@spartacus/storefront';

// @Injectable({ providedIn: 'root' })
// export class ServiceNameService extends LaunchDialogService {
//   constructor(
//     @Inject(LaunchRenderStrategy) launchRenderStrategy: LaunchRenderStrategy[],
//     protected layoutConfig: LayoutConfig
//   ) {
//     super(launchRenderStrategy, layoutConfig);
//   }
// }

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { BreakpointService, LayoutConfig } from '@spartacus/storefront';

@Injectable({ providedIn: 'root' })
export class ServiceNameService extends BreakpointService {
  constructor(
    protected winRef: WindowRef,
    protected layoutConfig: LayoutConfig,
    @Inject(PLATFORM_ID) platform: any
  ) {
    super(winRef, layoutConfig, platform);
  }
}
