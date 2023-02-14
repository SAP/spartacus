import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdpMyAccountComponent } from "./CdpMyAccountComponent";

describe('CdpMyAccountComponent', () => {
  let component: CdpMyAccountComponent;
  let fixture: ComponentFixture<CdpMyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdpMyAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdpMyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
