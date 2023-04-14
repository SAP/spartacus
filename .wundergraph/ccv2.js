const fs = require("node:fs/promises");
const graphql = require("graphql");
const { createGraphQLSchema } = require("openapi-to-graphql");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");

async function ccv2(port, filename = "ccv2") {
  // SCHEMA
  const json = await fs.readFile(`./${filename}.json`, "utf-8");
  const oas = JSON.parse(json);

  const { schema } = await createGraphQLSchema(oas);

  const errors = graphql.validateSchema(schema);
  if (errors.length) {
    console.error(errors);
    return;
  }

  await fs.writeFile(`./${filename}.yaml`, graphql.printSchema(schema));

  // HTTP
  const app = express();
  app.all("/graphql", createHandler({ schema }));

  app.listen({ port });
  console.log(`Listening to port ${port}`);
}

ccv2(process.env.PORT || 4091);
