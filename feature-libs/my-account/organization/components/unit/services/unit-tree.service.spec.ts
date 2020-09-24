import { TestBed } from '@angular/core/testing';
import { UnitTreeService } from './unit-tree.service';

// function verifyExpandedAll({ data }) {
//   expect(data.length).toBe(7);
//   expect(data[0].uid).toEqual('Rustic');
//   expect(data[1].uid).toEqual('Rustic Services');
//   expect(data[2].uid).toEqual('Services West');
//   expect(data[3].uid).toEqual('Services East');
//   expect(data[4].uid).toEqual('Rustic Retail');
//   expect(data[5].uid).toEqual('Custom Retail');
//   expect(data[6].uid).toEqual('Test');
// }
//
// function verifyCollapsed({ data }) {
//   expect(data.length).toBe(3);
//   expect(data[0].uid).toEqual('Rustic');
//   expect(data[1].uid).toEqual('Rustic Services');
//   expect(data[2].uid).toEqual('Rustic Retail');
// }
//
// function verifyExpandedOne({ data }) {
//   expect(data.length).toBe(5);
//   expect(data[0].uid).toEqual('Rustic');
//   expect(data[1].uid).toEqual('Rustic Services');
//   expect(data[2].uid).toEqual('Services West');
//   expect(data[3].uid).toEqual('Services East');
//   expect(data[4].uid).toEqual('Rustic Retail');
// }
//
// const toggledUnit = {
//   uid: 'Rustic Services',
//   id: 'Rustic Services',
//   name: 'Rustic Services',
//   parent: 'Rustic',
//   active: true,
//   depthLevel: 1,
//   count: 2,
// };
//
// const mockedTree = {
//   id: 'Rustic',
//   name: 'Rustic',
//   active: true,
//   children: [
//     {
//       id: 'Rustic Services',
//       name: 'Rustic Services',
//       parent: 'Rustic',
//       active: true,
//       children: [
//         {
//           active: true,
//           children: [],
//           id: 'Services West',
//           name: 'Services West',
//           parent: 'Rustic Services',
//         },
//         {
//           active: true,
//           children: [],
//           id: 'Services East',
//           name: 'Services East',
//           parent: 'Rustic Services',
//         },
//       ],
//     },
//     {
//       id: 'Rustic Retail',
//       name: 'Rustic Retail',
//       parent: 'Rustic',
//       active: true,
//       children: [
//         {
//           active: true,
//           id: 'Custom Retail',
//           name: 'Custom Retail',
//           parent: 'Rustic Retail',
//           children: [
//             {
//               active: true,
//               children: [],
//               id: 'Test',
//               name: 'TestUnit',
//               parent: 'Custom Retail',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

describe('UnitTreeService', () => {
  let service: UnitTreeService;

  describe('with table config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [UnitTreeService],
      });
      service = TestBed.inject(UnitTreeService);
    });

    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    // it('should populate tree object to list', () => {
    //   let result;
    //   service.initialize(mockedTree, 'rustic');
    //   service.treeToggle$.subscribe((table) => (result = table));
    //   console.log(result);
    //   // verifyCollapsed(result);
    // });

    // it('should toggle item', () => {
    //   let result;
    //   service.getTable().subscribe((table) => (result = table));
    //   service.toggle({ ...toggledUnit, expanded: false });
    //   verifyExpandedOne(result);
    //   service.toggle({ ...toggledUnit, expanded: true });
    //   verifyCollapsed(result);
    // });
    //
    // it('should expandAll and collapseAll', () => {
    //   let result;
    //   service.getTable().subscribe((table) => (result = table));
    //   service.expandAll();
    //   verifyExpandedAll(result);
    //   service.collapseAll();
    //   verifyCollapsed(result);
    // });
  });
});
