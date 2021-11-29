require ('graphql-import-node/register'); 
import "reflect-metadata";
import express from 'express';
import { graphqlHTTP } from 'express-graphql';

const pack = require('../package.json');
process.env.AppVersion  = pack.version;
process.env.description = pack.description;
process.env.name        = pack.name;

import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });

import {  printSchema } from "graphql";
import { gql, createModule, Module } from 'graphql-modules';
// import { kRoot } from './src/k-root.TG.typedefs';

// import { buildSchema, buildTypeDefsAndResolvers } from 'type-graphql';
// import { kRootResolver } from './src/k-root.TG.resolvers.ts.save';

import { gSheetModelModule } from '@autograph.run/model.google.sheets';
import { createApplication } from 'graphql-modules';
var root = {
  OYwhoDat: () =>  "Oy. It's me!"
  
};

const testStubModule = createModule({
  id: '.testStub.module',
  dirname: __dirname,
  typeDefs: [ gql` extend type Query { 
      testRoot: String 
      }` ],
  resolvers: [ 
    {
      Query: {
        testRoot: ()=> `From the Stub. This is NOT part of the K-Root module`
      }
    }
  
  ],
});

const application=   createApplication({
    modules: [testStubModule, gSheetModelModule],
  });

  const customExecuteFn = application.createExecution();
  const schema          = application.schema;

  const server = express();
  server.set('json spaces', 4); 

  server.get(`/`, (_: express.Request, res: express.Response) => {
    res.status(200).json({
        Name :         process.env.name,
        AppVersion :  process.env.AppVersion,
        Description:  process.env.description,
        paths : {
            "graphql"       : "/aql",
            "Greetings"     : "/"
            }
        });
    });

  server.use('/aql', 
    graphqlHTTP({
      schema,
      rootValue:    root ,
      customExecuteFn, 
      graphiql: true,
    })
  );

  const port = process.env.PORT || 4141

  server.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/aql ....`);
  });







