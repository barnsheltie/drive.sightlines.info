import "reflect-metadata";
export declare const gDriveModelControllerTypeDefs: import("graphql").DocumentNode;
/** @class
 *
 *  These resolvers need to tally up 1:1 with the
 *  1. Schema SDL here - ../k-root.graphql
 *  2. Types generated in the kRootResolver abstract class on this file - ./k-root.TG.typedefs.ts
 */
export declare const gDriveModelControllerResolvers: {
    JSON: import("graphql").GraphQLScalarType;
    JSONObject: import("graphql").GraphQLScalarType;
    Query: {
        whoDatMe: (root: JSON) => JSON;
        /**
         *
         * @param _
         * @param __
         * @param param2
         * @returns current module_ID_version
         */
        showControllerID: (root: any, __: any, { injector }: GraphQLModules.Context) => String;
    };
    Mutation: {};
};
/** --  */ 
