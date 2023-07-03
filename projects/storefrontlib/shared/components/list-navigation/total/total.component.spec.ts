import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { TotalComponent } from './total.component';

describe('TotalComponent', () => {
  let component: TotalComponent;
  let fixture: ComponentFixture<TotalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [TotalComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return proper total results for page in the middle', () => {
    component.pagination = {
      currentPage: 1,
      pageSize: 10,
      totalPages: 4,
      totalResults: 36,
    };

    expect(component.currentPage).toBe(1);
    expect(component.pageSize).toBe(10);
    expect(component.totalResults).toBe(36);
    expect(component.fromItem).toBe(11);
    expect(component.toItem).toBe(20);
  });

  it('should return proper total results for the last page', () => {
    component.pagination = {
      currentPage: 3,
      pageSize: 10,
      totalPages: 4,
      totalResults: 36,
    };

    expect(component.currentPage).toBe(3);
    expect(component.pageSize).toBe(10);
    expect(component.totalResults).toBe(36);
    expect(component.fromItem).toBe(31);
    expect(component.toItem).toBe(36);
  });

  it('should return proper total results for the first page', () => {
    component.pagination = {
      currentPage: 0,
      pageSize: 10,
      totalPages: 4,
      totalResults: 36,
    };

    expect(component.currentPage).toBe(0);
    expect(component.pageSize).toBe(10);
    expect(component.totalResults).toBe(36);
    expect(component.fromItem).toBe(1);
    expect(component.toItem).toBe(10);
  });

  describe('UI', () => {
    it('should display total result data', () => {
      component.pagination = {
        currentPage: 1,
        pageSize: 10,
        totalPages: 4,
        totalResults: 36,
      };
      fixture.detectChanges();

      const nodes = fixture.debugElement.queryAll(() => true);
      expect(nodes).toBeTruthy();
      expect(nodes.length).toBe(3);
      expect(nodes[0].nativeElement.textContent.trim()).toMatch('36');
      expect(nodes[1].classes).toEqual({ 'cx-vertical-line-separator': true });
      expect(nodes[2].nativeElement.textContent.trim()).toMatch('11-20');
    });

    it('should not display total result data when no pagination provided', () => {
      component.pagination = undefined;
      fixture.detectChanges();
      const nodes = fixture.debugElement.queryAll(() => true);
      expect(nodes).toBeTruthy();
      expect(nodes.length).toBe(0);
    });

    it('should not display total result data when empty result', () => {
      component.pagination = {
        currentPage: 0,
        pageSize: 10,
        totalPages: 1,
        totalResults: 0,
      };
      fixture.detectChanges();
      const nodes = fixture.debugElement.queryAll(() => true);
      expect(nodes).toBeTruthy();
      expect(nodes.length).toBe(0);
    });
  });
});
