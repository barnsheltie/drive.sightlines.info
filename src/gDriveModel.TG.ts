/** @module
 * 
 *  NOTE: This .ts file and results are NOT used for module creation at this time
 * 
 *  Schema cheat sheet: https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png
 **/ 
import "reflect-metadata";
import { v4 as uuidv4 , NIL as NIL_UUID } from 'uuid';
import { ID, Arg, Field, Int, 
    ObjectType, InterfaceType, registerEnumType,
    Resolver, Query, Mutation, buildTypeDefsAndResolversSync } from "type-graphql";

import debug from 'debug';
const debugLog: debug.IDebugger = process.env.NODE_ENV === 'debug' ? debug('gSheetModel.TG') : debug('');
   
import {  createModule, MODULE_ID, gql } from "graphql-modules";

/** Go on to definitions  */
export enum gDriveStateEnums {
  CREATED = "CREATED", NULL = "NuLL", 
  READY   = 'Ready', 
  SEEDED  = 'Seeded from Config', 
  ERROR   = 'ERROR!!',
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  ACTIVE  = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

registerEnumType(gDriveStateEnums, {
  name: "gDriveStateEnums", // this one is mandatory
  description: "Various states for a the gSheet model ", // this one is optional
});

@ObjectType({ description: "Status record related to gSheet" })
export class _gDriveStatusClass  {

  @Field(type => _gDriveStatusClass, { nullable: true })
  op_state!:      _gDriveStatusClass  //    # Operational state           

  @Field(type => _gDriveStatusClass, { nullable: true })
  telemetry_state?: _gDriveStatusClass//     # Telemetry-related state     

  @Field(type => _gDriveStatusClass, { nullable: true })
  provision_state?: _gDriveStatusClass //    # Provisioned                 

  @Field(type => _gDriveStatusClass, { nullable: true })
  event_state?:     _gDriveStatusClass //     # Event handling state        

  @Field(type => _gDriveStatusClass, { nullable: true })
  log_state?:     _gDriveStatusClass //     # Event handling state   
  

  @Field(type => ID)
  statusid:            string = '0';

  @Field(type => gDriveStateEnums,  {description : 'Current state'}) // it's very important
  nowState :     gDriveStateEnums = gDriveStateEnums.CREATED; 

  @Field(type => [gDriveStateEnums], {description : 'Allowable next states for transition'}) // it's very important
  nextState :   gDriveStateEnums[] = [gDriveStateEnums.ERROR, gDriveStateEnums.SEEDED ]; 

  @Field(type => Boolean)
  scheduled:     Boolean = false;   // True == it's scheduled for operation. */

  @Field(type => gDriveStateEnums) // it's very important
  lastState:    gDriveStateEnums = gDriveStateEnums.NULL; 

  @Field(type => Date, { nullable: true }) // it's very important
  lastSynced?:   Date         // # Last time the status was synched upstream    */
}


@InterfaceType()
abstract class IPerson {
  @Field(type => ID)
  person_id: String = '';

  @Field()
  person_name: String = '';

  @Field(type => Int)
  age: Number = 0;
}


@ObjectType({ description: "ID types - root record" })
export class googleUserID extends IPerson {

  @Field(type => Int)
  value: number = 0;

  @Field(type => String, {description : 'What Type of ID This Is - default uuid type'})
  idtype!: string;

  @Field(type => ID)
  id: string = '--Un-attached--';

  @Field(type => String)
  name: string = '--uninitialized--';

  @Field(type => String)
  kuid: String  = NIL_UUID;

  @Field(type => Date )
  created_at:  Date = new Date();   /**  # when this was created */

  @Field(type => Date)
  updated_at:  Date =  new Date();  /** last update */

  constructor ( id: string = 'XXX', name : string = 'Squid') {
    super();
    this.idtype = 'uidstring'
    this.id = id;   // Always passed on
    this.name     = name;
    this.kuid     = uuidv4();
    this.value = 0;
  }


}

@ObjectType( {description: "Google drive properties" })
export class  GoogleDriveProperty  {


}

@ObjectType( {description: "TypeScript-generated ID type for SpikeIO_Root" })
export class  GoogleDrive extends _gDriveStatusClass {

  #name! : String
  #users!:  [googleUserID]
  #owner  = new googleUserID('123', 'mp@altaselva')

  public get owner(): googleUserID { return this.#owner }


  @Field(type =>  GoogleDriveProperty)
  properties!:    GoogleDriveProperty


  constructor(id: String) {
    super();
    debugLog(`Initializing - GoogleDrive`)

  }

}


@Resolver()
export class gDriveModelResolverClass {
  #mySheets : Map<number, GoogleDrive> = new Map()
  #mySheetsKey: number = Math.floor(Math.random() * 100000);  // Get a random number to start keys
  #owner: googleUserID = new googleUserID('IamSo', 'abcd')

  
  @Mutation(returns => Int)
  bindMe(@Arg("id", { nullable: false }) id: string = 'seed'): Number {

    this.#mySheets.set( this.#mySheetsKey++,  new GoogleDrive(id));
    return this.#mySheetsKey
  } 
  

  @Query(returns => String)
  owner () : string {
    return this.#owner.name;
  }

  constructor() {
    debugLog(`Initializing ${gDriveModelResolverClass.name}`);
  }

  // return 
}

/**
 * ------------------------------------------------------------------------------------------
 */
export const module_ID = `gDriveModelModule@${process.env.AppVersion}`;
import { gDriveModelControllerTypeDefs, gDriveModelControllerResolvers } from './gql.gDriveModel.Controller'


const { resolvers, typeDefs } = buildTypeDefsAndResolversSync({
  resolvers:   [gDriveModelResolverClass]
  // orphanedTypes:  <any> gqlTypeArgs.orphanedTypes // [GspreadSheetSheetResource, GoogleSheet, GspreadSheetProperty ],
});

export const gDriveModule = createModule ({ 
  id:         module_ID,
  dirname:    process.cwd(),
  typeDefs:   [gql(typeDefs),   gDriveModelControllerTypeDefs  ],
  resolvers:  [resolvers,       gDriveModelControllerResolvers, ], 
 
}); 

