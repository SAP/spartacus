import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigTitleComponent } from './config-title.component';

describe('ConfigTitleComponent', () => {
  let component: ConfigTitleComponent;
  let fixture: ComponentFixture<ConfigTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [ConfigTitleComponent],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigTitleComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });
});
