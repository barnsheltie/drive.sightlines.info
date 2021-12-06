/** @module
 * 
 *  houseKeeping.Controller
 *
 **/
import "reflect-metadata";

import debug from 'debug';
const debugLog: debug.IDebugger = debug('gSheet.spikeio.Utils');

import { ID, Arg, Field, Int, 
    ObjectType, InterfaceType, registerEnumType,
    Resolver, Query, Mutation
   } from 'type-graphql';


@ObjectType( {description: "TypeScript-generated ID type for SpikeIO_Root" })
export class _spikeIO_Root   {

  _magic: number  = 42 // Private field for testing


  @Field(type => Int)
  in_use_count: number = 0; // # How many OTHER entities in K-scope namespace refers to this
  
  @Field(type => String)
  k_root_type: string = 'Type of entity attached to this K-root'; // # Type of entity attached to this K-root

  @Field(type => [String], {nullable: true, description: "TypeScript-generated ID type for SpikeIO_Root" })
  event_tail: string[] = []; // # Type of entity attached to this K-root

  constructor ( id: string = '', name : string = 'Squid') {
   
  } 
}
/**
 * 
 */
export class spikeIO_utilsClass {
    #me =    'SpikeIO utils';  
  
    constructor() {
      debugLog(`Initializing ${spikeIO_utilsClass.name}`)
    }
}


 
/** -- EOF mp */
