import { Inject, Injectable } from '@angular/core';
import {
  EventSourceMapping,
  EVENT_SOURCE_MAPPINGS,
} from './event-source-mapping';
import { EventService } from './event.service';

/**
 * Registers all event sources provided via `EVENT_SOURCE_MAPPINGS` injection token
 */
@Injectable({
  providedIn: 'root',
})
export class EventSourceMappingService {
  constructor(
    @Inject(EVENT_SOURCE_MAPPINGS) mappingChunks: EventSourceMapping<any>[][],
    protected eventService: EventService
  ) {
    this.register(mappingChunks);
  }

  /**
   * Registers all event sources from given mappings
   * @param mappingChunks event source mapping chunks
   */
  protected register(mappingChunks: EventSourceMapping<any>[][]) {
    mappingChunks.forEach(mappings => {
      mappings.forEach(({ type, source$ }) => {
        this.eventService.register(type, source$);
      });
    });
  }
}
