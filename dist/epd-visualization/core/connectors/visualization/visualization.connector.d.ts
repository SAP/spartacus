import { UsageId } from '@spartacus/epd-visualization/root';
import { Observable } from 'rxjs';
import { LookupVisualizationsResponse } from './lookup-visualizations-response';
import { VisualizationAdapter } from './visualization.adapter';
import * as i0 from "@angular/core";
export declare class VisualizationConnector {
    protected visualizationAdapter: VisualizationAdapter;
    constructor(visualizationAdapter: VisualizationAdapter);
    /**
     * Used for finding a visualization by Usage ID that has anonymous (unauthenticated) read access enabled.
     * The search is performed in the SAP EPD Visualization service instance associated with the SaaS subscription for the SAP EPD tenant.
     * @param visualizationUsageId The SAP EPD Visualization usage ID value identifying visualizations to match.
     * Only visualizations that have the specified usage ID value will be returned.
     * @param folderUsageId The SAP EPD Visualization usage ID identifying folders to search for visualizations.
     * Only folders that are tagged with the specified usage ID value that have anonymous access enabled will be searched.
     * @returns An Observable producing a LookupVisualizationsResponse which contains an array of objects describing matched visualizations.
     */
    lookupVisualization(visualizationUsageId: UsageId, folderUsageId: UsageId): Observable<LookupVisualizationsResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<VisualizationConnector, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VisualizationConnector>;
}
