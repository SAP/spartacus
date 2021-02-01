import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CxEvent, EventService, WindowRef } from '@spartacus/core';
import { AdobeLaunchService } from '@spartacus/tms/adobe-launch';
import { TmsConfig } from '@spartacus/tms/core';

interface CustomAdobeLaunchWindow extends Window {
  _trackData?: (data: any, linkObject?: any, eventObject?: any) => void;
}

@Injectable({ providedIn: 'root' })
export class CustomAdobeLaunchService extends AdobeLaunchService {
  constructor(
    protected eventsService: EventService,
    protected windowRef: WindowRef,
    protected tmsConfig: TmsConfig,
    @Inject(PLATFORM_ID) protected platformId: any
  ) {
    super(eventsService, windowRef, tmsConfig, platformId);
  }

  protected prepareDataLayer(): void {
    if (this.window) {
      this.window._trackData =
        this.window._trackData ??
        function (_data: any, _linkObject?: any, _eventObject?: any): void {};
    }
  }

  protected push<T extends CxEvent>(event: T): void {
    if (this.window) {
      console.log(
        `🎭  CUSTOM Adobe Launch received data: ${JSON.stringify(event)}`
      );
      this.window._trackData(event);
    }
  }

  get window(): CustomAdobeLaunchWindow | undefined {
    return this.windowRef.nativeWindow;
  }
}
