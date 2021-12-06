"use strict";
/**
 *
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var gcp_ProvidersClass_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.gcp_ProvidersClass = exports.dataStoreEntity = void 0;
const graphql_modules_1 = require("graphql-modules");
const pack = require('../package.json');
process.env.AppVersion = pack.version;
process.env.description = pack.description;
process.env.name = pack.name;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config/.env' });
const debug_1 = __importDefault(require("debug"));
const debugLog = process.env.NODE_ENV === 'debug' ? (0, debug_1.default)('gSheetModel.provider') : (0, debug_1.default)('');
const { google } = require('googleapis');
const { Datastore } = require('@google-cloud/datastore');
exports.dataStoreEntity = {
    user: 'Users',
    mimetype: {
        doc: 'application/vnd.google-apps.document',
        file: 'application/vnd.google-apps.file',
        folder: 'application/vnd.google-apps.folder',
        photo: 'application/vnd.google-apps.photo',
        shredderShard: 'application/gzip',
        sheet: 'application/vnd.google-apps.spreadsheet',
    },
    rgb: {
        AppFolder: "#32CD32",
        DeviceFolder: "#0000FF",
        StatFile: "#FF8000",
    }
};
const spikeio_Controller_1 = require("./helpers/spikeio.Controller");
let gcp_ProvidersClass = gcp_ProvidersClass_1 = class gcp_ProvidersClass extends spikeio_Controller_1.spikeIO_utilsClass {
    userLoader(arg, gDatastore, dataStoreEntity) {
        return (arg, gDatastore) => __awaiter(this, void 0, void 0, function* () {
            let entity;
            const errMsgStub = `Providers:userLoader:loadUser:${arg.spec} Datastore retrieval error - `;
            if (arg.spec === 'BYID') {
                [entity] = yield gDatastore.get(gDatastore.key([dataStoreEntity.user, arg.id]))
                    .catch((err) => console.error(`${errMsgStub}${err}`));
            }
            else {
                (0, debug_1.default)(`Looking up user- ${JSON.stringify(arg.mail)} user Type ${dataStoreEntity.user}`);
                let [entities, info] = yield gDatastore.createQuery(dataStoreEntity.user)
                    .filter('email', '=', arg.mail)
                    .limit(1)
                    .run()
                    .catch((err) => console.error(`${errMsgStub}${err}`));
                if (entities.length >= 1) {
                    entity = entities[0];
                }
                else {
                    return null;
                }
            }
            let { active, id, name, email, sigfolder, logsheets } = entity;
            return ((active) ? { id, name, email, sigfolder, logsheets } : null);
        });
    }
    /** Google Datastore provider */
    ProjectDataStore() {
        var oauth2Client = new google.auth.OAuth2(process.env.client_id, process.env.client_secret, process.env.redirect_uri);
        const gDatastore = new Datastore();
        return {
            debug: debug_1.default,
            oauth2Client, gDatastore, dataStoreEntity: exports.dataStoreEntity,
            initGoogDriveContext: (oauth2Client, access_token, refresh_token) => {
                oauth2Client.setCredentials({ access_token, refresh_token });
                return google.drive({ version: 'v3', auth: oauth2Client });
            },
            initGoogleSheetContext: (oauth2Client, access_token, refresh_token) => {
                oauth2Client.setCredentials({ access_token, refresh_token });
                return google.sheets({ version: 'v4', auth: oauth2Client });
            }
        }; /** returns the drive when called  */
    }
    constructor() {
        super(); // Initialize the SpikeIO utils class
        debugLog(`Initializing ${gcp_ProvidersClass_1.name}`);
    }
}; // -- gcp_ProvidersClass
gcp_ProvidersClass = gcp_ProvidersClass_1 = __decorate([
    (0, graphql_modules_1.Injectable)(),
    __metadata("design:paramtypes", [])
], gcp_ProvidersClass);
exports.gcp_ProvidersClass = gcp_ProvidersClass;
// ----------------------  EOF LL
//# sourceMappingURL=gDriveModel.TG.providers.js.map