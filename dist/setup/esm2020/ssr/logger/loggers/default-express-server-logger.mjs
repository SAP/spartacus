/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { isDevMode } from '@angular/core';
import { getRequestContext } from '../../optimized-engine/request-context';
/**
 *
 * Default logger used in SSR (ExpressJS) to enhance logs visible e.g. in monitoring tools e.g. Kibana.
 * It outputs a JSON with properties "message" and "context",
 * which contains a "timestamp" and details of the "request" ("url", "uuid", "timeReceived")
 *
 * The output "context" JSON will contain also a property "traceContext"
 * with "traceId", "parentId", "version" and "traceFlags",
 * if only the given request has the special header "traceparent" (specifed in
 * the "W3C TraceContext" document. See https://www.w3.org/TR/trace-context/#traceparent-header ).
 */
export class DefaultExpressServerLogger {
    log(message, context) {
        /* eslint-disable-next-line no-console */
        console.log(this.stringifyWithContext(message, context));
    }
    warn(message, context) {
        /* eslint-disable-next-line no-console */
        console.warn(this.stringifyWithContext(message, context));
    }
    error(message, context) {
        /* eslint-disable-next-line no-console */
        console.error(this.stringifyWithContext(message, context));
    }
    info(message, context) {
        /* eslint-disable-next-line no-console */
        console.info(this.stringifyWithContext(message, context));
    }
    debug(message, context) {
        /* eslint-disable-next-line no-console */
        console.debug(this.stringifyWithContext(message, context));
    }
    /**
     * Converts a message and an ExpressServerLoggerContext object into a single JSON string containing both pieces of information, which can be used for logging purposes.
     *
     * @protected
     * @param message - The message to be included in the log entry.
     * @param context - The context object associated with the log entry.
     * @returns A JSON string containing both the message and context information, suitable for logging.
     */
    stringifyWithContext(message, context) {
        const logObject = { message, context: this.mapContext(context) };
        return isDevMode()
            ? JSON.stringify(logObject, null, 2)
            : JSON.stringify(logObject);
    }
    /**
     * Map the context for the ExpressServerLogger
     *
     * @protected
     * @param context - The logging context object to be mapped
     * @returns - The mapped context with timestamp and request (if available)
     */
    mapContext(context) {
        const timestamp = new Date().toISOString();
        const outputContext = { timestamp, ...context };
        if (context.request) {
            Object.assign(outputContext, {
                request: this.mapRequest(context.request),
            });
        }
        return outputContext;
    }
    /**
     * Maps a Request object into a JavaScript object with specific properties.
     *
     * @protected
     * @param request - An Express Request object.
     * @returns - A mapped request object. By default, it contains only "url", a random "uuid" and "timeReceived" of the request.
     */
    mapRequest(request) {
        return {
            url: request.originalUrl,
            ...getRequestContext(request),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1leHByZXNzLXNlcnZlci1sb2dnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9jb3JlLWxpYnMvc2V0dXAvc3NyL2xvZ2dlci9sb2dnZXJzL2RlZmF1bHQtZXhwcmVzcy1zZXJ2ZXItbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBTTNFOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLEdBQUcsQ0FBQyxPQUFlLEVBQUUsT0FBbUM7UUFDdEQseUNBQXlDO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDRCxJQUFJLENBQUMsT0FBZSxFQUFFLE9BQW1DO1FBQ3ZELHlDQUF5QztRQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBQ0QsS0FBSyxDQUFDLE9BQWUsRUFBRSxPQUFtQztRQUN4RCx5Q0FBeUM7UUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELElBQUksQ0FBQyxPQUFlLEVBQUUsT0FBbUM7UUFDdkQseUNBQXlDO1FBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFDRCxLQUFLLENBQUMsT0FBZSxFQUFFLE9BQW1DO1FBQ3hELHlDQUF5QztRQUN6QyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNPLG9CQUFvQixDQUM1QixPQUFlLEVBQ2YsT0FBbUM7UUFFbkMsTUFBTSxTQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUVqRSxPQUFPLFNBQVMsRUFBRTtZQUNoQixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ08sVUFBVSxDQUNsQixPQUFtQztRQUVuQyxNQUFNLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzNDLE1BQU0sYUFBYSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsT0FBTyxFQUFFLENBQUM7UUFFaEQsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ25CLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO2dCQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2FBQzFDLENBQUMsQ0FBQztTQUNKO1FBRUQsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNPLFVBQVUsQ0FBQyxPQUFnQjtRQUNuQyxPQUFPO1lBQ0wsR0FBRyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ3hCLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1NBQzlCLENBQUM7SUFDSixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBpc0Rldk1vZGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7IGdldFJlcXVlc3RDb250ZXh0IH0gZnJvbSAnLi4vLi4vb3B0aW1pemVkLWVuZ2luZS9yZXF1ZXN0LWNvbnRleHQnO1xuaW1wb3J0IHtcbiAgRXhwcmVzc1NlcnZlckxvZ2dlcixcbiAgRXhwcmVzc1NlcnZlckxvZ2dlckNvbnRleHQsXG59IGZyb20gJy4vZXhwcmVzcy1zZXJ2ZXItbG9nZ2VyJztcblxuLyoqXG4gKlxuICogRGVmYXVsdCBsb2dnZXIgdXNlZCBpbiBTU1IgKEV4cHJlc3NKUykgdG8gZW5oYW5jZSBsb2dzIHZpc2libGUgZS5nLiBpbiBtb25pdG9yaW5nIHRvb2xzIGUuZy4gS2liYW5hLlxuICogSXQgb3V0cHV0cyBhIEpTT04gd2l0aCBwcm9wZXJ0aWVzIFwibWVzc2FnZVwiIGFuZCBcImNvbnRleHRcIixcbiAqIHdoaWNoIGNvbnRhaW5zIGEgXCJ0aW1lc3RhbXBcIiBhbmQgZGV0YWlscyBvZiB0aGUgXCJyZXF1ZXN0XCIgKFwidXJsXCIsIFwidXVpZFwiLCBcInRpbWVSZWNlaXZlZFwiKVxuICpcbiAqIFRoZSBvdXRwdXQgXCJjb250ZXh0XCIgSlNPTiB3aWxsIGNvbnRhaW4gYWxzbyBhIHByb3BlcnR5IFwidHJhY2VDb250ZXh0XCJcbiAqIHdpdGggXCJ0cmFjZUlkXCIsIFwicGFyZW50SWRcIiwgXCJ2ZXJzaW9uXCIgYW5kIFwidHJhY2VGbGFnc1wiLFxuICogaWYgb25seSB0aGUgZ2l2ZW4gcmVxdWVzdCBoYXMgdGhlIHNwZWNpYWwgaGVhZGVyIFwidHJhY2VwYXJlbnRcIiAoc3BlY2lmZWQgaW5cbiAqIHRoZSBcIlczQyBUcmFjZUNvbnRleHRcIiBkb2N1bWVudC4gU2VlIGh0dHBzOi8vd3d3LnczLm9yZy9UUi90cmFjZS1jb250ZXh0LyN0cmFjZXBhcmVudC1oZWFkZXIgKS5cbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRFeHByZXNzU2VydmVyTG9nZ2VyIGltcGxlbWVudHMgRXhwcmVzc1NlcnZlckxvZ2dlciB7XG4gIGxvZyhtZXNzYWdlOiBzdHJpbmcsIGNvbnRleHQ6IEV4cHJlc3NTZXJ2ZXJMb2dnZXJDb250ZXh0KTogdm9pZCB7XG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGUgKi9cbiAgICBjb25zb2xlLmxvZyh0aGlzLnN0cmluZ2lmeVdpdGhDb250ZXh0KG1lc3NhZ2UsIGNvbnRleHQpKTtcbiAgfVxuICB3YXJuKG1lc3NhZ2U6IHN0cmluZywgY29udGV4dDogRXhwcmVzc1NlcnZlckxvZ2dlckNvbnRleHQpOiB2b2lkIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZSAqL1xuICAgIGNvbnNvbGUud2Fybih0aGlzLnN0cmluZ2lmeVdpdGhDb250ZXh0KG1lc3NhZ2UsIGNvbnRleHQpKTtcbiAgfVxuICBlcnJvcihtZXNzYWdlOiBzdHJpbmcsIGNvbnRleHQ6IEV4cHJlc3NTZXJ2ZXJMb2dnZXJDb250ZXh0KTogdm9pZCB7XG4gICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGUgKi9cbiAgICBjb25zb2xlLmVycm9yKHRoaXMuc3RyaW5naWZ5V2l0aENvbnRleHQobWVzc2FnZSwgY29udGV4dCkpO1xuICB9XG4gIGluZm8obWVzc2FnZTogc3RyaW5nLCBjb250ZXh0OiBFeHByZXNzU2VydmVyTG9nZ2VyQ29udGV4dCk6IHZvaWQge1xuICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlICovXG4gICAgY29uc29sZS5pbmZvKHRoaXMuc3RyaW5naWZ5V2l0aENvbnRleHQobWVzc2FnZSwgY29udGV4dCkpO1xuICB9XG4gIGRlYnVnKG1lc3NhZ2U6IHN0cmluZywgY29udGV4dDogRXhwcmVzc1NlcnZlckxvZ2dlckNvbnRleHQpOiB2b2lkIHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZSAqL1xuICAgIGNvbnNvbGUuZGVidWcodGhpcy5zdHJpbmdpZnlXaXRoQ29udGV4dChtZXNzYWdlLCBjb250ZXh0KSk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgYSBtZXNzYWdlIGFuZCBhbiBFeHByZXNzU2VydmVyTG9nZ2VyQ29udGV4dCBvYmplY3QgaW50byBhIHNpbmdsZSBKU09OIHN0cmluZyBjb250YWluaW5nIGJvdGggcGllY2VzIG9mIGluZm9ybWF0aW9uLCB3aGljaCBjYW4gYmUgdXNlZCBmb3IgbG9nZ2luZyBwdXJwb3Nlcy5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKiBAcGFyYW0gbWVzc2FnZSAtIFRoZSBtZXNzYWdlIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBsb2cgZW50cnkuXG4gICAqIEBwYXJhbSBjb250ZXh0IC0gVGhlIGNvbnRleHQgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCB0aGUgbG9nIGVudHJ5LlxuICAgKiBAcmV0dXJucyBBIEpTT04gc3RyaW5nIGNvbnRhaW5pbmcgYm90aCB0aGUgbWVzc2FnZSBhbmQgY29udGV4dCBpbmZvcm1hdGlvbiwgc3VpdGFibGUgZm9yIGxvZ2dpbmcuXG4gICAqL1xuICBwcm90ZWN0ZWQgc3RyaW5naWZ5V2l0aENvbnRleHQoXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGNvbnRleHQ6IEV4cHJlc3NTZXJ2ZXJMb2dnZXJDb250ZXh0XG4gICk6IHN0cmluZyB7XG4gICAgY29uc3QgbG9nT2JqZWN0ID0geyBtZXNzYWdlLCBjb250ZXh0OiB0aGlzLm1hcENvbnRleHQoY29udGV4dCkgfTtcblxuICAgIHJldHVybiBpc0Rldk1vZGUoKVxuICAgICAgPyBKU09OLnN0cmluZ2lmeShsb2dPYmplY3QsIG51bGwsIDIpXG4gICAgICA6IEpTT04uc3RyaW5naWZ5KGxvZ09iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogTWFwIHRoZSBjb250ZXh0IGZvciB0aGUgRXhwcmVzc1NlcnZlckxvZ2dlclxuICAgKlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBwYXJhbSBjb250ZXh0IC0gVGhlIGxvZ2dpbmcgY29udGV4dCBvYmplY3QgdG8gYmUgbWFwcGVkXG4gICAqIEByZXR1cm5zIC0gVGhlIG1hcHBlZCBjb250ZXh0IHdpdGggdGltZXN0YW1wIGFuZCByZXF1ZXN0IChpZiBhdmFpbGFibGUpXG4gICAqL1xuICBwcm90ZWN0ZWQgbWFwQ29udGV4dChcbiAgICBjb250ZXh0OiBFeHByZXNzU2VydmVyTG9nZ2VyQ29udGV4dFxuICApOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG4gICAgY29uc3Qgb3V0cHV0Q29udGV4dCA9IHsgdGltZXN0YW1wLCAuLi5jb250ZXh0IH07XG5cbiAgICBpZiAoY29udGV4dC5yZXF1ZXN0KSB7XG4gICAgICBPYmplY3QuYXNzaWduKG91dHB1dENvbnRleHQsIHtcbiAgICAgICAgcmVxdWVzdDogdGhpcy5tYXBSZXF1ZXN0KGNvbnRleHQucmVxdWVzdCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0cHV0Q29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXBzIGEgUmVxdWVzdCBvYmplY3QgaW50byBhIEphdmFTY3JpcHQgb2JqZWN0IHdpdGggc3BlY2lmaWMgcHJvcGVydGllcy5cbiAgICpcbiAgICogQHByb3RlY3RlZFxuICAgKiBAcGFyYW0gcmVxdWVzdCAtIEFuIEV4cHJlc3MgUmVxdWVzdCBvYmplY3QuXG4gICAqIEByZXR1cm5zIC0gQSBtYXBwZWQgcmVxdWVzdCBvYmplY3QuIEJ5IGRlZmF1bHQsIGl0IGNvbnRhaW5zIG9ubHkgXCJ1cmxcIiwgYSByYW5kb20gXCJ1dWlkXCIgYW5kIFwidGltZVJlY2VpdmVkXCIgb2YgdGhlIHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgbWFwUmVxdWVzdChyZXF1ZXN0OiBSZXF1ZXN0KTogUmVjb3JkPHN0cmluZywgYW55PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVybDogcmVxdWVzdC5vcmlnaW5hbFVybCxcbiAgICAgIC4uLmdldFJlcXVlc3RDb250ZXh0KHJlcXVlc3QpLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==