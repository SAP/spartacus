import { EpdVisualizationConfig, VisualizationInfo } from '@spartacus/epd-visualization/root';
import { Observable } from 'rxjs';
import { VisualizationConnector } from '../../connectors/visualization/visualization.connector';
import * as i0 from "@angular/core";
export declare class VisualizationLookupService {
    protected epdVisualizationConfig: EpdVisualizationConfig;
    protected visualizationConnector: VisualizationConnector;
    constructor(epdVisualizationConfig: EpdVisualizationConfig, visualizationConnector: VisualizationConnector);
    /**
     * Finds visualizations by usage id containing product code values.
     * The search space is limited to folders with a configured usage id value.
     * @param productCode The product code value to search for.
     * @returns An Observable producing an VisualizationInfo array containing the set of matching visualizations.
     */
    findMatchingVisualizations(productCode: String): Observable<VisualizationInfo[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<VisualizationLookupService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<VisualizationLookupService>;
}
