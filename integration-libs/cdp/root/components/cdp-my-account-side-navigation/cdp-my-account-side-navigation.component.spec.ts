import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdpMyAccountSideComponent } from './cdp-my-account-side-navigation.component';

describe('CdpMyAccountSideComponent', () => {
  let component: CdpMyAccountSideComponent;
  let fixture: ComponentFixture<CdpMyAccountSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdpMyAccountSideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CdpMyAccountSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
