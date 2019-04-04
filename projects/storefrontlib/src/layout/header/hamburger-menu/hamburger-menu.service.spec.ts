import { TestBed } from '@angular/core/testing';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HamburgerMenuService } from './hamburger-menu.service';

class MockRouter {
  events(): Observable<RouterEvent> {
    return of({ id: 1, url: '' } as NavigationStart);
  }
}

describe('HamburgerMenuService', () => {
  let service: HamburgerMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useClass: MockRouter }],
    });

    service = TestBed.get(HamburgerMenuService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle the expand state', () => {
    let expanded: boolean;

    service.toggle();
    service.isExpanded.subscribe(result => (expanded = result));

    expect(expanded).toBeTruthy();
  });
});
