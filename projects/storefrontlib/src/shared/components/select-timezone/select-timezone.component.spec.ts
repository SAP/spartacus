import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectTimezoneComponent } from './select-timezone.component';
import { timezones } from './timezones';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';

describe('Select Timezone Component', () => {
  let component: SelectTimezoneComponent;
  let fixture: ComponentFixture<SelectTimezoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgSelectModule, FormsModule, ReactiveFormsModule],
      providers: [],
      declarations: [SelectTimezoneComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTimezoneComponent);
    component = fixture.componentInstance;
  });

  describe('component tests', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should have timezones in select dropdown', () => {
      expect(component.items.length).toEqual(timezones.length);

      component.fg = new FormGroup({
        timezone: new FormControl(''),
      });
      component.controlName = 'timezone';
      fixture.detectChanges();

      const element = fixture.debugElement.nativeElement;
      expect(
        element.querySelector('ng-select').getAttribute('ng-reflect-name')
      ).toEqual('timezone');
    });
  });
});
