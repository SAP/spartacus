/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ActiveCartFacade } from '@spartacus/cart/base/root';
// import { Cart } from '@spartacus/cart/base/root';
// import { GiftCardOrderSummaryComponent } from './gift-card-order-summary.component';
// import { GiftCardService } from '../../core/services';
// import { OutletContextData } from '@spartacus/storefront';
// import { of } from 'rxjs';

// describe('GiftCardOrderSummaryComponent', () => {
//   let fixture: ComponentFixture<GiftCardOrderSummaryComponent>;
//   let component: GiftCardOrderSummaryComponent;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [GiftCardOrderSummaryComponent],
//       providers: [
//         { provide: ActiveCartFacade, useValue: {} },
//         { provide: GiftCardService, useValue: {} },
//         { provide: OutletContextData, useValue: undefined },
//       ],
//     }).compileComponents();
//   });

//   it('should create', () => {
//     fixture = TestBed.createComponent(GiftCardOrderSummaryComponent);
//     component = fixture.componentInstance;
//     component.cart = {} as Cart;
//     fixture.detectChanges();

//     expect(component).toBeTruthy();
//   });

//   it('should NOT subscribe if outlet is not provided', () => {
//     fixture = TestBed.createComponent(GiftCardOrderSummaryComponent);
//     component = fixture.componentInstance;

//     spyOn(console, 'log');

//     component.ngOnInit();

//     expect(console.log).not.toHaveBeenCalled();
//   });

//   it('should subscribe to outlet context and set cart', async () => {
//     const mockCart = { code: '12345' } as Cart;

//     // 🔑 Reconfigure TestBed BEFORE creating component
//     await TestBed.resetTestingModule();

//     await TestBed.configureTestingModule({
//       imports: [GiftCardOrderSummaryComponent],
//       providers: [
//         { provide: ActiveCartFacade, useValue: {} },
//         { provide: GiftCardService, useValue: {} },
//         {
//           provide: OutletContextData,
//           useValue: {
//             context$: of(mockCart),
//           },
//         },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(GiftCardOrderSummaryComponent);
//     component = fixture.componentInstance;

//     component.ngOnInit();

//     expect(component.cart).toEqual(mockCart);
//   });
// });
