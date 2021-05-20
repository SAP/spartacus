#!/bin/bash
for i in {1..100}
do
   echo "Running e2e test to generate traffic in dynatrace"
   yarn e2e:run --spec cypress/integration/performance/checkout/**
   echo "Sleeping 1 minute..."
   sleep 60s
done