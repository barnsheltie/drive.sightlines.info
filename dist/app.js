"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('graphql-import-node/register');
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const pack = require('../package.json');
process.env.AppVersion = pack.version;
process.env.description = pack.description;
process.env.name = pack.name;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config/.env' });
const graphql_modules_1 = require("graphql-modules");
// import { kRoot } from './src/k-root.TG.typedefs';
// import { buildSchema, buildTypeDefsAndResolvers } from 'type-graphql';
// import { kRootResolver } from './src/k-root.TG.resolvers.ts.save';
const model_google_sheets_1 = require("@autograph.run/model.google.sheets");
const graphql_modules_2 = require("graphql-modules");
var root = {
    OYwhoDat: () => "Oy. It's me!"
};
const testStubModule = (0, graphql_modules_1.createModule)({
    id: '.testStub.module',
    dirname: __dirname,
    typeDefs: [(0, graphql_modules_1.gql) ` extend type Query { 
      testRoot: String 
      }`],
    resolvers: [
        {
            Query: {
                testRoot: () => `From the Stub. This is NOT part of the K-Root module`
            }
        }
    ],
});
const application = (0, graphql_modules_2.createApplication)({
    modules: [testStubModule, model_google_sheets_1.gSheetModelModule],
});
const customExecuteFn = application.createExecution();
const schema = application.schema;
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