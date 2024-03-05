/**
 * 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';

import { HierarchyNodeTitleComponent } from './hierarchy-node-title.component';

@Pipe({ name: 'cxTranslate' })
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

describe('HierarchyNodeTitleComponent', () => {
  let component: HierarchyNodeTitleComponent<void>;
  let fixture: ComponentFixture<HierarchyNodeTitleComponent<void>>;

  beforeEach(
    waitForAsync(() => {
      TestBed.overrideComponent(HierarchyNodeTitleComponent, {
        set: {
          providers: [],
        },
      })
        .configureTestingModule({
          declarations: [HierarchyNodeTitleComponent, MockTranslatePipe],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent<HierarchyNodeTitleComponent<void>>(
      HierarchyNodeTitleComponent
    );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
