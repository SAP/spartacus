import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdpComponent } from './cdp.component';

describe('CdpComponent', () => {
  let component: CdpComponent;
  let fixture: ComponentFixture<CdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
