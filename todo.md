# TODO

1. use rxjs' merge in the data-collector impl
2. create an interface
3. improve the events by adding a type to them
4. create a helper function which will map 1on1 payloads from the plain events to the TmsEvent
add static string type = 'EventName' to each of the events

Questions:

1. Where to store the TmsEvent? In the `tms` lib? If so, it would mean that core, storefrontlib, and every other lib should depend on it.
