import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, OccConfig } from '@spartacus/core';
import { VariantSizeSelectorComponent } from './size-selector.component';

describe('VariantSizeSelectorComponent', () => {
  let component: VariantSizeSelectorComponent;
  let fixture: ComponentFixture<VariantSizeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VariantSizeSelectorComponent],
      imports: [RouterTestingModule, I18nTestingModule],
      providers: [
        {
          provide: OccConfig,
          useValue: { backend: { occ: { baseUrl: 'abc' } } },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantSizeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set up baseUrl variable', () => {
    expect(component.baseUrl).toEqual('abc');
  });

  it('should send emit', () => {
    spyOn(component.changeSizeEvent, 'emit').and.stub();

    component.changeSize('test');

    expect(component.changeSizeEvent.emit).toHaveBeenCalledWith('test');
  });
});
