import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { OutletContextData } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { of } from 'rxjs';
import { OrganizationItemService } from '../organization-item.service';
import { OrganizationListService } from '../organization-list/organization-list.service';
import { MessageService } from '../organization-message/services/message.service';
import { AssignCellComponent } from './assign-cell.component';
import { OrganizationSubListService } from './organization-sub-list.service';

class MockOrganizationItemService {
  key$ = of('code1');
}

class MockMessageService {
  add() {}
}

class MockOrganizationListService {
  assign() {}
  unassign() {}
}
describe('AssignCellComponent', () => {
  let component: AssignCellComponent<any>;
  let fixture: ComponentFixture<AssignCellComponent<any>>;
  let organizationListService: OrganizationListService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignCellComponent],
      imports: [RouterTestingModule, UrlTestingModule, I18nTestingModule],
      providers: [
        {
          provide: OutletContextData,
          useValue: {
            context: {
              selected: true,
            },
          },
        },
        {
          provide: OrganizationItemService,
          useClass: MockOrganizationItemService,
        },
        {
          provide: MessageService,
          useClass: MockMessageService,
        },
        {
          provide: OrganizationListService,
          useClass: MockOrganizationListService,
        },
      ],
    }).compileComponents();

    organizationListService = TestBed.inject(OrganizationListService);
  });

  describe('without item data', () => {
    beforeEach(() => {
      const data = TestBed.inject(OutletContextData);
      data.context = undefined;
      fixture = TestBed.createComponent(AssignCellComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not have an item', () => {
      expect(component.hasItem).toBeFalsy();
    });

    it('should not be assigned', () => {
      expect(component.isAssigned).toBeFalsy();
    });
  });

  describe('with assigned item', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AssignCellComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have item', () => {
      expect(component.hasItem).toBeTruthy();
    });

    it('should be assigned', () => {
      expect(component.isAssigned).toBeTruthy();
    });

    it('should unassign', () => {
      spyOn(
        organizationListService as OrganizationSubListService<any>,
        'unassign'
      );
      component.toggleAssign();
      expect(
        (organizationListService as OrganizationSubListService<any>).unassign
      ).toHaveBeenCalled();
    });
  });

  describe('with unassigned item', () => {
    beforeEach(() => {
      const data = TestBed.inject(OutletContextData);
      data.context.selected = false;
      fixture = TestBed.createComponent(AssignCellComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have item', () => {
      expect(component.hasItem).toBeTruthy();
    });

    it('should be unassigned', () => {
      expect(component.isAssigned).toBeFalsy();
    });

    it('should assign', () => {
      spyOn(
        organizationListService as OrganizationSubListService<any>,
        'assign'
      );
      component.toggleAssign();
      expect(
        (organizationListService as OrganizationSubListService<any>).assign
      ).toHaveBeenCalled();
    });
  });
});
