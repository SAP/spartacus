import { HelpPageLayoutComponent } from './help-page-layout.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';

describe('HelpPageLayoutComponent', () => {
  let component: HelpPageLayoutComponent;
  let fixture: ComponentFixture<HelpPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelpPageLayoutComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPageLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
