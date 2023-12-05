/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const visualViewer = {
    contentType: {
        drawing2D: '2D',
        model3D: '3D',
    },
    toolbar: {
        homeButton: { label: 'Home' },
        zoomButton: { label: 'Zoom' },
        panButton: { label: 'Pan' },
        rotateButton: { label: 'Rotate' },
        isolateButton: { label: 'Isolate' },
        playButton: { label: 'Play' },
        pauseButton: { label: 'Pause' },
        hotspotsButton: { label: 'Hotspots', show: 'Show', hide: 'Hide' },
        visualViewerAnimationSlider: {
            label: 'Animation Slider',
            role: 'Slider',
        },
    },
};
const visualPicking = {
    visualPickingTab: {
        noProductReferences: 'No spare parts are available for this product.',
    },
    visualPickingProductList: {
        description: 'Description',
        itemPrice: 'Price',
        outOfStock: 'Out of stock',
        id: 'ID',
    },
    visualPickingProductFilter: {
        input: {
            placeholder: 'Filter by name or id',
        },
        searchButton: {
            label: 'search',
        },
        resetButton: {
            label: 'reset',
        },
    },
};
const errors = {
    visualLoad: {
        noMatchingVisualFound: 'No matching visualization found',
        multipleMatchingVisualsFound: 'Multiple matching visualizations found',
        unexpectedLoadError: 'Error occurred while loading visualization',
    },
};
export const epdVisualization = {
    epdVisualization: {
        visualViewer,
        visualPicking,
        errors,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXBkVmlzdWFsaXphdGlvbi5pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9hc3NldHMvdHJhbnNsYXRpb25zL2VuL2VwZFZpc3VhbGl6YXRpb24uaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxZQUFZLEdBQUc7SUFDbkIsV0FBVyxFQUFFO1FBQ1gsU0FBUyxFQUFFLElBQUk7UUFDZixPQUFPLEVBQUUsSUFBSTtLQUNkO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtRQUM3QixVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO1FBQzdCLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7UUFDM0IsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUNqQyxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1FBQ25DLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7UUFDN0IsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtRQUMvQixjQUFjLEVBQUUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtRQUNqRSwyQkFBMkIsRUFBRTtZQUMzQixLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLElBQUksRUFBRSxRQUFRO1NBQ2Y7S0FDRjtDQUNGLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRztJQUNwQixnQkFBZ0IsRUFBRTtRQUNoQixtQkFBbUIsRUFBRSxnREFBZ0Q7S0FDdEU7SUFDRCx3QkFBd0IsRUFBRTtRQUN4QixXQUFXLEVBQUUsYUFBYTtRQUMxQixTQUFTLEVBQUUsT0FBTztRQUNsQixVQUFVLEVBQUUsY0FBYztRQUMxQixFQUFFLEVBQUUsSUFBSTtLQUNUO0lBQ0QsMEJBQTBCLEVBQUU7UUFDMUIsS0FBSyxFQUFFO1lBQ0wsV0FBVyxFQUFFLHNCQUFzQjtTQUNwQztRQUNELFlBQVksRUFBRTtZQUNaLEtBQUssRUFBRSxRQUFRO1NBQ2hCO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsS0FBSyxFQUFFLE9BQU87U0FDZjtLQUNGO0NBQ0YsQ0FBQztBQUVGLE1BQU0sTUFBTSxHQUFHO0lBQ2IsVUFBVSxFQUFFO1FBQ1YscUJBQXFCLEVBQUUsaUNBQWlDO1FBQ3hELDRCQUE0QixFQUFFLHdDQUF3QztRQUN0RSxtQkFBbUIsRUFBRSw0Q0FBNEM7S0FDbEU7Q0FDRixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLEdBQUc7SUFDOUIsZ0JBQWdCLEVBQUU7UUFDaEIsWUFBWTtRQUNaLGFBQWE7UUFDYixNQUFNO0tBQ1A7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuY29uc3QgdmlzdWFsVmlld2VyID0ge1xuICBjb250ZW50VHlwZToge1xuICAgIGRyYXdpbmcyRDogJzJEJyxcbiAgICBtb2RlbDNEOiAnM0QnLFxuICB9LFxuICB0b29sYmFyOiB7XG4gICAgaG9tZUJ1dHRvbjogeyBsYWJlbDogJ0hvbWUnIH0sXG4gICAgem9vbUJ1dHRvbjogeyBsYWJlbDogJ1pvb20nIH0sXG4gICAgcGFuQnV0dG9uOiB7IGxhYmVsOiAnUGFuJyB9LFxuICAgIHJvdGF0ZUJ1dHRvbjogeyBsYWJlbDogJ1JvdGF0ZScgfSxcbiAgICBpc29sYXRlQnV0dG9uOiB7IGxhYmVsOiAnSXNvbGF0ZScgfSxcbiAgICBwbGF5QnV0dG9uOiB7IGxhYmVsOiAnUGxheScgfSxcbiAgICBwYXVzZUJ1dHRvbjogeyBsYWJlbDogJ1BhdXNlJyB9LFxuICAgIGhvdHNwb3RzQnV0dG9uOiB7IGxhYmVsOiAnSG90c3BvdHMnLCBzaG93OiAnU2hvdycsIGhpZGU6ICdIaWRlJyB9LFxuICAgIHZpc3VhbFZpZXdlckFuaW1hdGlvblNsaWRlcjoge1xuICAgICAgbGFiZWw6ICdBbmltYXRpb24gU2xpZGVyJyxcbiAgICAgIHJvbGU6ICdTbGlkZXInLFxuICAgIH0sXG4gIH0sXG59O1xuXG5jb25zdCB2aXN1YWxQaWNraW5nID0ge1xuICB2aXN1YWxQaWNraW5nVGFiOiB7XG4gICAgbm9Qcm9kdWN0UmVmZXJlbmNlczogJ05vIHNwYXJlIHBhcnRzIGFyZSBhdmFpbGFibGUgZm9yIHRoaXMgcHJvZHVjdC4nLFxuICB9LFxuICB2aXN1YWxQaWNraW5nUHJvZHVjdExpc3Q6IHtcbiAgICBkZXNjcmlwdGlvbjogJ0Rlc2NyaXB0aW9uJyxcbiAgICBpdGVtUHJpY2U6ICdQcmljZScsXG4gICAgb3V0T2ZTdG9jazogJ091dCBvZiBzdG9jaycsXG4gICAgaWQ6ICdJRCcsXG4gIH0sXG4gIHZpc3VhbFBpY2tpbmdQcm9kdWN0RmlsdGVyOiB7XG4gICAgaW5wdXQ6IHtcbiAgICAgIHBsYWNlaG9sZGVyOiAnRmlsdGVyIGJ5IG5hbWUgb3IgaWQnLFxuICAgIH0sXG4gICAgc2VhcmNoQnV0dG9uOiB7XG4gICAgICBsYWJlbDogJ3NlYXJjaCcsXG4gICAgfSxcbiAgICByZXNldEJ1dHRvbjoge1xuICAgICAgbGFiZWw6ICdyZXNldCcsXG4gICAgfSxcbiAgfSxcbn07XG5cbmNvbnN0IGVycm9ycyA9IHtcbiAgdmlzdWFsTG9hZDoge1xuICAgIG5vTWF0Y2hpbmdWaXN1YWxGb3VuZDogJ05vIG1hdGNoaW5nIHZpc3VhbGl6YXRpb24gZm91bmQnLFxuICAgIG11bHRpcGxlTWF0Y2hpbmdWaXN1YWxzRm91bmQ6ICdNdWx0aXBsZSBtYXRjaGluZyB2aXN1YWxpemF0aW9ucyBmb3VuZCcsXG4gICAgdW5leHBlY3RlZExvYWRFcnJvcjogJ0Vycm9yIG9jY3VycmVkIHdoaWxlIGxvYWRpbmcgdmlzdWFsaXphdGlvbicsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgZXBkVmlzdWFsaXphdGlvbiA9IHtcbiAgZXBkVmlzdWFsaXphdGlvbjoge1xuICAgIHZpc3VhbFZpZXdlcixcbiAgICB2aXN1YWxQaWNraW5nLFxuICAgIGVycm9ycyxcbiAgfSxcbn07XG4iXX0=