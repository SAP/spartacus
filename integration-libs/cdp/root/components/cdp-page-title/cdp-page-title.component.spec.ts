import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdpPageTitleComponent } from './cdp-page-title.component';

describe('CdpPageTitleComponent', () => {
  let component: CdpPageTitleComponent;
  let fixture: ComponentFixture<CdpPageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CdpPageTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CdpPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
