import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Event as NgRouterEvent, NavigationEnd } from '@angular/router';
import { AnonymousConsent } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ProfileTagInjector } from '../../profiletag/profile-tag.injector';
import { ProfileTagComponent } from './profile-tag.component';

class MockProfileTagInjector {
  track(): Observable<AnonymousConsent | NgRouterEvent> {
    return of(
      { templateCode: 'PROFILE', version: 2, consentState: null },
      new NavigationEnd(1, 'test', 'test.com')
    );
  }
  addScript(): void {
    return undefined;
  }
}

describe('ProfileTagComponent', () => {
  let component: ProfileTagComponent;
  let fixture: ComponentFixture<ProfileTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileTagComponent],
      providers: [
        {
          provide: ProfileTagInjector,
          useClass: MockProfileTagInjector,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should be loaded', () => {
    let result: boolean;
    const subscription = component.profileTagEnabled$.subscribe(
      data => (result = Boolean(data))
    );
    expect(result).toBe(true);
    subscription.unsubscribe();
  });
});
