import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdpBannerComponent } from './cdp-banner.component';

describe('CdpMyAccountComponent', () => {
  let component: CdpBannerComponent;
  let fixture: ComponentFixture<CdpBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CdpBannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CdpBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
