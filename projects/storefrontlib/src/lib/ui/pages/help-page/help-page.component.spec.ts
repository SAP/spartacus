import { HelpPageComponent } from './help-page.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { HelpPageLayoutModule } from '../../layout/help-page-layout/help-page-layout.module';

describe('HelpPageLayoutComponent', () => {
  let component: HelpPageComponent;
  let fixture: ComponentFixture<HelpPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HelpPageLayoutModule],
      declarations: [HelpPageComponent]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPageComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
