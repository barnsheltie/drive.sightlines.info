/** @module
 *
 *  Schema cheat sheet: https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png

 **/
import "reflect-metadata";
import { readFileSync } from 'fs';

import * as urql from '@urql/core';
import "isomorphic-fetch";

import debug from 'debug';
const debugLog: debug.IDebugger = debug('gSheet.taskBot.Definitions');


export enum snsTopics {
  NestNews,
  gSheet2Nests,
}

export class OpsCore {
  signature   =   'unassigned';
  kRoot_ID_claim_token =  'Hash to claim K-root ID';
  configured  =   false;
  name        =   process.env.name;
  description =   process.env.description;
  version     =   process.env.AppVersion;
  port        =   process.env.PORT;
  nest_news_topic = process.env.AWS_NEST_NEWS_ARN;

  hasura =    urql.createClient({
                      url: <string> process.env.HASURA_ENDPOINT,
                      fetchOptions: { headers: {  Authorization: `Bearer ${process.env.HASURA_BEARER}`, "x-hasura-admin-secret" : process.env.HASURA_ADMIN_SECRET }, },
                  }); 
           

  constructor () {
  
  }
  

}
/**
 *
 *
 * @export
 * @class authClass
 */
export class authClass   {
  public keyFile:     string;
  public privateKey:  string;
  public username:    string;
  public password:    string;
  public email:       string;
  public serveraddress: string;
  public sshAgent:    any;
  public auth = '';

  /**
   *Creates an instance of authClass.
   * @memberof authClass
   * 
   * 
   * const auth = {
  username: process.env.GITLAB_USERNAME,
  password: process.env.GITLAB_TOKEN,
  serveraddress: process.env.GITLAB_REGISTRY,
};

   */
  constructor( pkFile: string | null  = null, /** sshAgent: any = null */) {
    this.keyFile    =  <string> ( (pkFile === null) ?  process.env.gSheet_DeployToken_KEYFILE : pkFile );
    this.privateKey =  readFileSync(<string>this.keyFile, 'utf-8');
    this.username  =  <string> process.env.GITLAB_USERNAME; //  gSheet_DeployToken_USERNAME;
    this.password  =  <string> process.env.GITLAB_TOKEN //  gSheet_DeployToken;
    this.email     =  'lutefisk.labs@gmail.com';
    this.serveraddress = <string> process.env.GITLAB_REGISTRY;

  }
}  /** authClass */


export const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));
/** -- EOF LL */