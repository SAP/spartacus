/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./merchandising-strategy.adapter";
export class MerchandisingStrategyConnector {
    constructor(strategyAdapter) {
        this.strategyAdapter = strategyAdapter;
    }
    loadProductsForStrategy(strategyId, strategyRequest) {
        return this.strategyAdapter.loadProductsForStrategy(strategyId, strategyRequest);
    }
}
MerchandisingStrategyConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingStrategyConnector, deps: [{ token: i1.MerchandisingStrategyAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
MerchandisingStrategyConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingStrategyConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingStrategyConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.MerchandisingStrategyAdapter }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyY2hhbmRpc2luZy1zdHJhdGVneS5jb25uZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9pbnRlZ3JhdGlvbi1saWJzL2Nkcy9zcmMvbWVyY2hhbmRpc2luZy9jb25uZWN0b3JzL3N0cmF0ZWd5L21lcmNoYW5kaXNpbmctc3RyYXRlZ3kuY29ubmVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFTM0MsTUFBTSxPQUFPLDhCQUE4QjtJQUN6QyxZQUFzQixlQUE2QztRQUE3QyxvQkFBZSxHQUFmLGVBQWUsQ0FBOEI7SUFBRyxDQUFDO0lBRXZFLHVCQUF1QixDQUNyQixVQUFrQixFQUNsQixlQUFpQztRQUVqQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCLENBQ2pELFVBQVUsRUFDVixlQUFlLENBQ2hCLENBQUM7SUFDSixDQUFDOzsySEFYVSw4QkFBOEI7K0hBQTlCLDhCQUE4QixjQUY3QixNQUFNOzJGQUVQLDhCQUE4QjtrQkFIMUMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdHJhdGVneVByb2R1Y3RzIH0gZnJvbSAnLi4vLi4vbW9kZWwvc3RyYXRlZ3ktcHJvZHVjdHMubW9kZWwnO1xuaW1wb3J0IHsgU3RyYXRlZ3lSZXF1ZXN0IH0gZnJvbSAnLi8uLi8uLi8uLi9jZHMtbW9kZWxzL2Nkcy1zdHJhdGVneS1yZXF1ZXN0Lm1vZGVsJztcbmltcG9ydCB7IE1lcmNoYW5kaXNpbmdTdHJhdGVneUFkYXB0ZXIgfSBmcm9tICcuL21lcmNoYW5kaXNpbmctc3RyYXRlZ3kuYWRhcHRlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBNZXJjaGFuZGlzaW5nU3RyYXRlZ3lDb25uZWN0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgc3RyYXRlZ3lBZGFwdGVyOiBNZXJjaGFuZGlzaW5nU3RyYXRlZ3lBZGFwdGVyKSB7fVxuXG4gIGxvYWRQcm9kdWN0c0ZvclN0cmF0ZWd5KFxuICAgIHN0cmF0ZWd5SWQ6IHN0cmluZyxcbiAgICBzdHJhdGVneVJlcXVlc3Q/OiBTdHJhdGVneVJlcXVlc3RcbiAgKTogT2JzZXJ2YWJsZTxTdHJhdGVneVByb2R1Y3RzPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RyYXRlZ3lBZGFwdGVyLmxvYWRQcm9kdWN0c0ZvclN0cmF0ZWd5KFxuICAgICAgc3RyYXRlZ3lJZCxcbiAgICAgIHN0cmF0ZWd5UmVxdWVzdFxuICAgICk7XG4gIH1cbn1cbiJdfQ==