import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdpMyAccountRequestsComponent } from './cdp-my-account-requests.component';

describe('CdpMyAccountComponent', () => {
  let component: CdpMyAccountRequestsComponent;
  let fixture: ComponentFixture<CdpMyAccountRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdpMyAccountRequestsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CdpMyAccountRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
