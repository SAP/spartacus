import { Injectable } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  DeleteSavedCartEvent,
  DeleteSavedCartFailEvent,
  DeleteSavedCartSuccessEvent,
  RestoreSavedCartEvent,
  RestoreSavedCartFailEvent,
  RestoreSavedCartSuccessEvent,
  SaveCartEvent,
  SaveCartFailEvent,
  SaveCartSuccessEvent,
} from '../events/saved-cart.events';

@Injectable({
  providedIn: 'root',
})
export class SavedCartEventsService {
  constructor(protected eventService: EventService) {}

  getDeleteSavedCartEvent(): Observable<DeleteSavedCartEvent> {
    return this.eventService.get(DeleteSavedCartEvent);
  }

  getDeleteSavedCartSuccessEvent(): Observable<DeleteSavedCartSuccessEvent> {
    return this.eventService.get(DeleteSavedCartSuccessEvent);
  }

  getDeleteSavedCartFailEvent(): Observable<DeleteSavedCartFailEvent> {
    return this.eventService.get(DeleteSavedCartFailEvent);
  }

  getSaveCartEvent(): Observable<SaveCartEvent> {
    return this.eventService.get(SaveCartEvent);
  }

  getSaveCartSuccessEvent(): Observable<SaveCartSuccessEvent> {
    return this.eventService.get(SaveCartSuccessEvent);
  }

  getSaveCartFailEvent(): Observable<SaveCartFailEvent> {
    return this.eventService.get(SaveCartFailEvent);
  }

  getRestoreSavedCartEvent(): Observable<RestoreSavedCartEvent> {
    return this.eventService.get(RestoreSavedCartEvent);
  }

  getRestoreSavedCartSuccessEvent(): Observable<RestoreSavedCartSuccessEvent> {
    return this.eventService.get(RestoreSavedCartSuccessEvent);
  }

  getRestoreSavedCartFailEvent(): Observable<RestoreSavedCartFailEvent> {
    return this.eventService.get(RestoreSavedCartFailEvent);
  }
}
