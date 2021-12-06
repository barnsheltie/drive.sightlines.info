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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.authClass = exports.OpsCore = exports.snsTopics = void 0;
/** @module
 *
 *  Schema cheat sheet: https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png

 **/
require("reflect-metadata");
const fs_1 = require("fs");
const urql = __importStar(require("@urql/core"));
require("isomorphic-fetch");
const debug_1 = __importDefault(require("debug"));
const debugLog = (0, debug_1.default)('gSheet.taskBot.Definitions');
var snsTopics;
(function (snsTopics) {
    snsTopics[snsTopics["NestNews"] = 0] = "NestNews";
    snsTopics[snsTopics["gSheet2Nests"] = 1] = "gSheet2Nests";
})(snsTopics = exports.snsTopics || (exports.snsTopics = {}));
class OpsCore {
    constructor() {
        this.signature = 'unassigned';
        this.kRoot_ID_claim_token = 'Hash to claim K-root ID';
        this.configured = false;
        this.name = process.env.name;
        this.description = process.env.description;
        this.version = process.env.AppVersion;
        this.port = process.env.PORT;
        this.nest_news_topic = process.env.AWS_NEST_NEWS_ARN;
        this.hasura = urql.createClient({
            url: process.env.HASURA_ENDPOINT,
            fetchOptions: { headers: { Authorization: `Bearer ${process.env.HASURA_BEARER}`, "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET }, },
        });
    }
}
exports.OpsCore = OpsCore;
/**
 *
 *
 * @export
 * @class authClass
 */
class authClass {
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
    constructor(pkFile = null) {
        this.auth = '';
        this.keyFile = ((pkFile === null) ? process.env.gSheet_DeployToken_KEYFILE : pkFile);
        this.privateKey = (0, fs_1.readFileSync)(this.keyFile, 'utf-8');
        this.username = process.env.GITLAB_USERNAME; //  gSheet_DeployToken_USERNAME;
        this.password = process.env.GITLAB_TOKEN; //  gSheet_DeployToken;
        this.email = 'lutefisk.labs@gmail.com';
        this.serveraddress = process.env.GITLAB_REGISTRY;
    }
} /** authClass */
exports.authClass = authClass;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
exports.sleep = sleep;
/** -- EOF LL */ 
//# sourceMappingURL=authUtils.Controller.js.map