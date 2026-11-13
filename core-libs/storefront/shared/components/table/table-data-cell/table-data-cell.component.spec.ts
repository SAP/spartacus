import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { of, Subject } from 'rxjs';
import { TableDataOutletContext } from '../table.model';
import { TableDataCellComponent } from './table-data-cell.component';

describe('TableDataCellComponent', () => {
  let component: TableDataCellComponent;
  let fixture: ComponentFixture<TableDataCellComponent>;

  it('should render an outlet context that arrives after creation', async () => {
    const context$ = new Subject<TableDataOutletContext>();
    await TestBed.configureTestingModule({
      imports: [I18nTestingModule, TableDataCellComponent],
      providers: [{ provide: OutletContextData, useValue: { context$ } }],
    }).compileComponents();
    fixture = TestBed.createComponent(TableDataCellComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.value).toBe('');
    expect(fixture.nativeElement.textContent.trim()).toBe('');

    context$.next({ _type: 'table', _field: 'name', name: 'the name' });
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent.trim()).toBe('the name');
    expect(fixture.nativeElement.getAttribute('title')).toBe('the name');
  });

  describe('static field', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, TableDataCellComponent],
        providers: [
          {
            provide: OutletContextData,
            useValue: {
              context$: of({
                _type: 'table',
                _field: 'name',
                name: 'the name',
                code: 'the code',
              }),
            },
          },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TableDataCellComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should resolve static header', () => {
      expect(component.value).toEqual('the name');
    });
  });
});
