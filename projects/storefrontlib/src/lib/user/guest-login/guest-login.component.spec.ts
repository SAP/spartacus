import { GuestLoginComponent } from './guest-login.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('GuestLoginComponent', () => {
  let component: GuestLoginComponent;
  let fixture: ComponentFixture<GuestLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GuestLoginComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestLoginComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
