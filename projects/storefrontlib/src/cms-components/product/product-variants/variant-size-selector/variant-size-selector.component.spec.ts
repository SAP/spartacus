import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  RoutingService,
  UrlCommands,
} from '@spartacus/core';
import { VariantSizeSelectorComponent } from './variant-size-selector.component';
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
      providers: [{ provide: RoutingService, useClass: MockRoutingService }],
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

  it('should send emit', () => {
    spyOn(component, 'changeSize').and.stub();

    component.changeSize('test');

    expect(component.changeSize).toHaveBeenCalledWith('test');
  });
});
