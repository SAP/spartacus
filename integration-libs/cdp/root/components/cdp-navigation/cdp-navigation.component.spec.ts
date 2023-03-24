import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdpNavigationComponent } from './cdp-navigation.component';

describe('CdpNavigationComponent', () => {
  let component: CdpNavigationComponent;
  let fixture: ComponentFixture<CdpNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdpNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdpNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
