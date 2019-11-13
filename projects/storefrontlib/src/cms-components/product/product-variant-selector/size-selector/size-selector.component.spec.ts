import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  OccConfig,
  RoutingService,
  UrlCommands,
} from '@spartacus/core';
import { VariantSizeSelectorComponent } from './size-selector.component';
import { NavigationExtras } from '@angular/router';

class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}

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
        { provide: RoutingService, useClass: MockRoutingService },
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
    spyOn(component, 'changeSize').and.stub();

    component.changeSize('test');

    expect(component.changeSize).toHaveBeenCalledWith('test');
  });
});
