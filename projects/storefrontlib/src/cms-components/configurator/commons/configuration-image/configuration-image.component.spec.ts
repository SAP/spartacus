import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurationImageComponent } from './configuration-image.component';

describe('ConfigurationImageComponent', () => {
  let component: ConfigurationImageComponent;
  let fixture: ComponentFixture<ConfigurationImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ConfigurationImageComponent],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationImageComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
