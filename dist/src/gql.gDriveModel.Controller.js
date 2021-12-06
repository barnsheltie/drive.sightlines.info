"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gDriveModelControllerResolvers = exports.gDriveModelControllerTypeDefs = void 0;
const graphql_modules_1 = require("graphql-modules");
require("reflect-metadata");
const graphql_type_json_1 = __importStar(require("graphql-type-json"));
exports.gDriveModelControllerTypeDefs = (0, graphql_modules_1.gql) `
  scalar JSON
  scalar JSONObject

  extend type Query {
   
    whoDatMe: JSON,
    showControllerID: String,

  },
  
  extend type Mutation {
    """ 
    Activates polling of Ledger Q 
    """
    initMe(go: Boolean = true, period: Int = 5): String!
  },
`;
/** @class
 *
 *  These resolvers need to tally up 1:1 with the
 *  1. Schema SDL here - ../k-root.graphql
 *  2. Types generated in the kRootResolver abstract class on this file - ./k-root.TG.typedefs.ts
 */
exports.gDriveModelControllerResolvers = {
    JSON: graphql_type_json_1.default,
    JSONObject: graphql_type_json_1.GraphQLJSONObject,
    Query: {
        whoDatMe: (root) => { return root; },
        /**
         *
         * @param _
         * @param __
         * @param param2
         * @returns current module_ID_version
         */
        showControllerID: (root, __, { injector }) => {
            // console.log(`-- whoDisMan called for ${injector.get(MODULE_ID)}`);
            // const me = injector.get(nestManData).me ;
            return `${injector.get(graphql_modules_1.MODULE_ID)}@${root.version}`;
        }
    },
    Mutation: {}
};
/** --  */ 
//# sourceMappingURL=gql.gDriveModel.Controller.js.map