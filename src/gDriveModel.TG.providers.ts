/**
 * 
 */
import debug from 'debug';
import { Injectable } from 'graphql-modules';
const debugLog: debug.IDebugger = process.env.NODE_ENV === 'debug' ? debug('gSheetModel.provider') : debug('');

const { google }    = require('googleapis');
const { Datastore}  = require('@google-cloud/datastore');


export const dataStoreEntity = {
   user : 'Users',
   mimetype : { // -- https://developers.google.com/drive/api/v3/mime-types
    doc             : 'application/vnd.google-apps.document',
    file            : 'application/vnd.google-apps.file',
    folder          : 'application/vnd.google-apps.folder',
    photo           : 'application/vnd.google-apps.photo',
    shredderShard   : 'application/gzip',
    sheet           : 'application/vnd.google-apps.spreadsheet',
  }, 
  rgb : {
    AppFolder     : "#32CD32",
    DeviceFolder  : "#0000FF",
    StatFile      : "#FF8000",
  }
 }

import { spikeIO_utilsClass } from './helpers/spikeio.Controller';

@Injectable()
export class gcp_ProvidersClass extends spikeIO_utilsClass {
 
   public userLoader( arg: any, gDatastore: any, dataStoreEntity: any) {
     return  async (arg: { spec: string; id: any; mail: any; }, gDatastore: any) => {
       let entity;
       const errMsgStub = `Providers:userLoader:loadUser:${arg.spec} Datastore retrieval error - `;
       if (arg.spec === 'BYID') {
         [entity] = await gDatastore.get(gDatastore.key( [dataStoreEntity.user, arg.id] ))
                         .catch((err: any) => console.error(`${errMsgStub}${err}`));
       } else {
         debug(`Looking up user- ${JSON.stringify(arg.mail)} user Type ${dataStoreEntity.user}`);  
         let [entities, info] = await gDatastore.createQuery(dataStoreEntity.user)
           .filter('email', '=', arg.mail )
           .limit(1)
           .run()
           .catch((err: any) => console.error(`${errMsgStub}${err}`));      
         if (entities.length >= 1) { entity = entities[0] } else { return null;}
       }
       let { active, id, name, email, sigfolder, logsheets  } = entity;
       return ((active) ? {id, name, email, sigfolder, logsheets } : null );
     }
 
 
   }
 
  /** Google Datastore provider */
   public ProjectDataStore() : any {
       var oauth2Client = new google.auth.OAuth2( process.env.client_id, process.env.client_secret, process.env.redirect_uri ); 
       const gDatastore = new Datastore();
       return {
         debug, /** remove this eventually to a separate provider */
         oauth2Client, gDatastore, dataStoreEntity, 
         initGoogDriveContext :   ( oauth2Client: { setCredentials: (arg0: { access_token: any; refresh_token: any; }) => void; }, access_token: any, refresh_token: any ) => {
           oauth2Client.setCredentials({ access_token, refresh_token });
           return google.drive({ version: 'v3',  auth: oauth2Client   });
          },
         initGoogleSheetContext : (oauth2Client: {
             setCredentials: (arg0: {
               access_token: any;
               /**
                * HTTP Cloud Function.
                *
                * @param {Object} req Cloud Function request context.
                *                     More info: https://expressjs.com/en/api.html#req
                * @param {Object} res Cloud Function response context.
                *                     More info: https://expressjs.com/en/api.html#res
                */
               // require('graphql-import-node/register');
               refresh_token: any;
             }) => void;
           }, access_token: any, refresh_token: any) => {
           oauth2Client.setCredentials({ access_token, refresh_token });
           return google.sheets({ version: 'v4', auth: oauth2Client });
          }
       } /** returns the drive when called  */
     }


  constructor() {
    super();  // Initialize the SpikeIO utils class
    debugLog(`Initializing ${gcp_ProvidersClass.name}`)


  }
}  // -- gcp_ProvidersClass


// ----------------------  EOF LL


