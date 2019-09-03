import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationTitleComponent } from './configuration-title.component';

describe('ConfigurationTitleComponent', () => {
  let component: ConfigurationTitleComponent;
  let fixture: ComponentFixture<ConfigurationTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ConfigurationTitleComponent],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationTitleComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
