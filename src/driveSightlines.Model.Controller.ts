/**
 * 
 */
import { Injectable } from 'graphql-modules';

import debug from 'debug';
const debugLog: debug.IDebugger = process.env.NODE_ENV === 'debug' ? debug('googleSight.neo4j.provider') : debug('');

import { ID, Arg, Field, Int, 
  ObjectType, InterfaceType, registerEnumType,
  Resolver, Query 
} from 'type-graphql';
import { MODULE_ID, gql } from "graphql-modules";
import { createApplication , createModule, InjectionToken } from 'graphql-modules';
import "reflect-metadata";
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json'
import { gAuthProviders } from '@autograph.run/provider.google.auth';
import { gDriveProviderService, gDriveMimeEnums, gDriveStateEnums, listQvals  } from '@autograph.run/model.google.drive'
import { neo4jAuraProviderService } from '@autograph.run/provider.neo4j.graph';

export const driveSightlinesModelControllerTypeDefs = gql`
  type Mutation {
    addMyFolders(count: Int = 50): [String!],
  }
`;

export const driveSightlinesModelControllerResolvers = {
  Mutation: {

    addMyFolders: async ( _: any, { count } : any, { injector }: GraphQLModules.Context ):  Promise<Array<string>>=> {

      const auth =    injector.get(gAuthProviders).auth;  // Get auth
      const k =  await injector.get(gDriveProviderService).listDrive({ auth, count, q: listQvals.myfolders });  // Get folders from gDrive
      // const add2graph = injector.get(neo4jAuraProviderService).addFolder;

    //  let proms = [];
      try {
        for (const element of k)  {
          // proms.push( add2graph(element) );\
          await injector.get(neo4jAuraProviderService).addFolder(element);
          console.log(`... adding ${element}`)
        }

      //  await Promise.all(proms);
        console.log(`....... promises settled`)
        return k
  
      } catch(e: any) {
        console.error(`addMyFolders:>>- ERROR - <${e.message}>`)
        throw new Error(e)
      }
    },

  },

} 