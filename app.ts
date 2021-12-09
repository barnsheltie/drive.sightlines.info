require ('graphql-import-node/register'); 
import "reflect-metadata";


const pack = require('../package.json');
process.env.AppVersion  = pack.version;
process.env.description = pack.description;
process.env.name        = pack.name;

import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' });

import { writeFileSync } from "fs";
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { createApplication, gql, createModule, Module } from 'graphql-modules'
import { printSchema } from "graphql";


import { googleDriveModelModule } from '@autograph.run/model.google.drive'
import { googleAuthProviderModule } from '@autograph.run/provider.google.auth'
import { neo4jAuraProviderService, neo4jGraphProviderModule } from '@autograph.run/provider.neo4j.graph'
import { driveSightlinesModelControllerTypeDefs, driveSightlinesModelControllerResolvers } from "src/driveSightlines.Model.Controller";



var root = {
  OYwhoDat: () =>  "Oy. It's me!"
  
};

const testStubModule = createModule({
  id: '.testStub.module',
  dirname: __dirname,
  typeDefs: [ gql` 
    extend type Query { 
      testRoot: String 
      },
    extend type Mutation {
      addNode( name: String): String
    }
      
    ` ],
  resolvers: [ 
    {
      Query: {
        testRoot: ()=> `From the Stub. This is NOT part of the K-Root module`
      },
      Mutation: {
        addNode: (_: any, {name}: any, {injector}: any) : string  => {
          const folders = injector.get()
          return injector.get(neo4jAuraProviderService).addFolder(name);
        }

      },
    }
  
  ],
});

const sightLineModule = createModule ({
  id: 'drive.Sightlines.Module',
  dirname: __dirname,
  typeDefs: [driveSightlinesModelControllerTypeDefs],
  resolvers: [driveSightlinesModelControllerResolvers]
});

const application=   createApplication({
    modules: [testStubModule, sightLineModule, googleAuthProviderModule, 
      googleDriveModelModule, neo4jGraphProviderModule],
  });

  const customExecuteFn = application.createExecution();
  const schema          = application.schema;
  writeFileSync('schema.graphql', printSchema(schema));

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







