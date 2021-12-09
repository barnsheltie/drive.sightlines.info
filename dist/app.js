"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('graphql-import-node/register');
require("reflect-metadata");
const pack = require('../package.json');
process.env.AppVersion = pack.version;
process.env.description = pack.description;
process.env.name = pack.name;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config/.env' });
const fs_1 = require("fs");
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const graphql_modules_1 = require("graphql-modules");
const graphql_1 = require("graphql");
const model_google_drive_1 = require("@autograph.run/model.google.drive");
const provider_google_auth_1 = require("@autograph.run/provider.google.auth");
const provider_neo4j_graph_1 = require("@autograph.run/provider.neo4j.graph");
const driveSightlines_Model_Controller_1 = require("src/driveSightlines.Model.Controller");
var root = {
    OYwhoDat: () => "Oy. It's me!"
};
const testStubModule = (0, graphql_modules_1.createModule)({
    id: '.testStub.module',
    dirname: __dirname,
    typeDefs: [(0, graphql_modules_1.gql) ` 
    extend type Query { 
      testRoot: String 
      },
    extend type Mutation {
      addNode( name: String): String
    }
      
    `],
    resolvers: [
        {
            Query: {
                testRoot: () => `From the Stub. This is NOT part of the K-Root module`
            },
            Mutation: {
                addNode: (_, { name }, { injector }) => {
                    const folders = injector.get();
                    return injector.get(provider_neo4j_graph_1.neo4jAuraProviderService).addFolder(name);
                }
            },
        }
    ],
});
const sightLineModule = (0, graphql_modules_1.createModule)({
    id: 'drive.Sightlines.Module',
    dirname: __dirname,
    typeDefs: [driveSightlines_Model_Controller_1.driveSightlinesModelControllerTypeDefs],
    resolvers: [driveSightlines_Model_Controller_1.driveSightlinesModelControllerResolvers]
});
const application = (0, graphql_modules_1.createApplication)({
    modules: [testStubModule, sightLineModule, provider_google_auth_1.googleAuthProviderModule,
        model_google_drive_1.googleDriveModelModule, provider_neo4j_graph_1.neo4jGraphProviderModule],
});
const customExecuteFn = application.createExecution();
const schema = application.schema;
(0, fs_1.writeFileSync)('schema.graphql', (0, graphql_1.printSchema)(schema));
const server = (0, express_1.default)();
server.set('json spaces', 4);
server.get(`/`, (_, res) => {
    res.status(200).json({
        Name: process.env.name,
        AppVersion: process.env.AppVersion,
        Description: process.env.description,
        paths: {
            "graphql": "/aql",
            "Greetings": "/"
        }
    });
});
server.use('/aql', (0, express_graphql_1.graphqlHTTP)({
    schema,
    rootValue: root,
    customExecuteFn,
    graphiql: true,
}));
const port = process.env.PORT || 4141;
server.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/aql ....`);
});
//# sourceMappingURL=app.js.map