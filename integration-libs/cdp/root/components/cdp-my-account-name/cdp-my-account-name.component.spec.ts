import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdpMyAccountSideNavigationComponent } from './cdp-my-account-name.component';

describe('CdpMyAccountSideComponent', () => {
  let component: CdpMyAccountSideNavigationComponent;
  let fixture: ComponentFixture<CdpMyAccountSideNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdpMyAccountSideNavigationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CdpMyAccountSideNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
