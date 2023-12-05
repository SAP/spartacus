/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export var NavigationMode;
(function (NavigationMode) {
    /**
     * Left mouse button drag causes turntable rotation.
     */
    NavigationMode[NavigationMode["Turntable"] = 0] = "Turntable";
    /**
     * Left mouse button drag performs panning.
     */
    NavigationMode[NavigationMode["Pan"] = 2] = "Pan";
    /**
     * Left mouse button drag performs zooming.
     */
    NavigationMode[NavigationMode["Zoom"] = 3] = "Zoom";
})(NavigationMode || (NavigationMode = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1tb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vaW50ZWdyYXRpb24tbGlicy9lcGQtdmlzdWFsaXphdGlvbi9jb21wb25lbnRzL3Zpc3VhbC12aWV3ZXIvbW9kZWxzL25hdmlnYXRpb24tbW9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsTUFBTSxDQUFOLElBQVksY0FhWDtBQWJELFdBQVksY0FBYztJQUN4Qjs7T0FFRztJQUNILDZEQUFhLENBQUE7SUFDYjs7T0FFRztJQUNILGlEQUFPLENBQUE7SUFDUDs7T0FFRztJQUNILG1EQUFRLENBQUE7QUFDVixDQUFDLEVBYlcsY0FBYyxLQUFkLGNBQWMsUUFhekIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgZW51bSBOYXZpZ2F0aW9uTW9kZSB7XG4gIC8qKlxuICAgKiBMZWZ0IG1vdXNlIGJ1dHRvbiBkcmFnIGNhdXNlcyB0dXJudGFibGUgcm90YXRpb24uXG4gICAqL1xuICBUdXJudGFibGUgPSAwLFxuICAvKipcbiAgICogTGVmdCBtb3VzZSBidXR0b24gZHJhZyBwZXJmb3JtcyBwYW5uaW5nLlxuICAgKi9cbiAgUGFuID0gMixcbiAgLyoqXG4gICAqIExlZnQgbW91c2UgYnV0dG9uIGRyYWcgcGVyZm9ybXMgem9vbWluZy5cbiAgICovXG4gIFpvb20gPSAzLFxufVxuIl19