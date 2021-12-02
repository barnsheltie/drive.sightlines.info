/** @module
 *
 *  Schema cheat sheet: https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png

 **/
import { ID, Arg, Field, Int, 
    ObjectType, InterfaceType, registerEnumType,
    Resolver, Query 
  } from 'type-graphql';
import { MODULE_ID, gql } from "graphql-modules";
import { createApplication , createModule, InjectionToken } from 'graphql-modules';
import "reflect-metadata";
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'



export const gDriveModelControllerTypeDefs = gql`
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
export const gDriveModelControllerResolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  
  Query: {
    whoDatMe: (root: JSON) : JSON => { return root },
    /**
     * 
     * @param _ 
     * @param __ 
     * @param param2 
     * @returns current module_ID_version 
     */
     showControllerID: ( root: any, __: any, { injector }: GraphQLModules.Context ): String  => {
      // console.log(`-- whoDisMan called for ${injector.get(MODULE_ID)}`);
      // const me = injector.get(nestManData).me ;
      return `${injector.get(MODULE_ID)}@${root.version}`;
    }
  },
  Mutation: {

  }
}

/** --  */