import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ProfileTagInjector } from '../../profiletag/services/profile-tag.injector';
import { ProfileTagComponent } from './profile-tag.component';

class MockProfileTagInjector {
  track(): Observable<boolean> {
    return of(true, true);
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
