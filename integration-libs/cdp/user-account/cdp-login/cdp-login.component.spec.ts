import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdpLoginComponent } from './cdp-login.component';

describe('CdpLoginComponent', () => {
  let component: CdpLoginComponent;
  let fixture: ComponentFixture<CdpLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdpLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdpLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
