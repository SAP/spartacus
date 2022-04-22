import { Injectable } from '@angular/core';
import { createFrom, EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavigationEvent } from '../navigation/navigation.event';
import { HomePageEvent } from './home-page.events';

@Injectable({
  providedIn: 'root',
})
export class HomePageEventBuilder {
  constructor(protected eventService: EventService) {
    this.register();
  }

  protected register(): void {
    this.eventService.register(HomePageEvent, this.buildHomePageEvent());
  }

  protected buildHomePageEvent(): Observable<HomePageEvent> {
    return this.eventService.get(NavigationEvent).pipe(
      filter((navigationEvent) => navigationEvent.semanticRoute === 'home'),
      map((navigationEvent) =>
        createFrom(HomePageEvent, {
          navigation: navigationEvent,
        })
      )
    );
  }
}
