/** @module
 *
 *  Schema cheat sheet: https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png

 **/
import "reflect-metadata";
import * as urql from '@urql/core';
import "isomorphic-fetch";
export declare enum snsTopics {
    NestNews = 0,
    gSheet2Nests = 1
}
export declare class OpsCore {
    signature: string;
    kRoot_ID_claim_token: string;
    configured: boolean;
    name: string | undefined;
    description: string | undefined;
    version: string | undefined;
    port: string | undefined;
    nest_news_topic: string | undefined;
    hasura: urql.Client;
    constructor();
}
/**
 *
 *
 * @export
 * @class authClass
 */
export declare class authClass {
    keyFile: string;
    privateKey: string;
    username: string;
    password: string;
    email: string;
    serveraddress: string;
    sshAgent: any;
    auth: string;
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
    constructor(pkFile?: string | null);
} /** authClass */
export declare const sleep: (ms: number) => Promise<unknown>;
/** -- EOF LL */ 
