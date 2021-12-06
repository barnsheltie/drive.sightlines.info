/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * 
 *  Author: Lutefisk Labs
 *  Module: gcphelpers.js 
 *  
 *  API ref - https://googleapis.dev/nodejs/googleapis/latest/index.html
 * https://github.com/googleapis/google-api-nodejs-client#google-apis-nodejs-client
 * 
 * 
 * 
 * @package googleapis
 */
 var debug = require('debug')('KISS::-');
 const { google } = require('googleapis');
// const { gSheet } = require('google-spreadsheet');
// Imports the Google Cloud client library
// const {PubSub} = require('@google-cloud/pubsub');
 

var oauth2, drive;
var oauth2Client; //  = new google.auth.OAuth2( ); // Base is initialized with Oauth Client ID from the GCP project

var gdrive; // = google.drive({  version: 'v3' }); // -- Application default credentials
 
 // Imports the Google Cloud client library
 // Imports the Google Cloud client library
 const {Datastore} = require('@google-cloud/datastore');
const { token } = require('morgan');

 // import  cloud_data_store from '@google-cloud/datastore';
 const gcpDatastore = new Datastore();
 const dataStoreEntity = {
   user : 'Users',
 }

 const mimetype = { // -- https://developers.google.com/drive/api/v3/mime-types
     doc             : 'application/vnd.google-apps.document',
     file            : 'application/vnd.google-apps.file',
     folder          : 'application/vnd.google-apps.folder',
     photo           : 'application/vnd.google-apps.photo',
     shredderShard   : 'application/gzip',
     sheet           : 'application/vnd.google-apps.spreadsheet',
 }
 
 const rgb = {
   AppFolder     : "#32CD32",
   DeviceFolder  : "#0000FF",
   StatFile      : "#FF8000",
 }
 
 
  //---------------------------------------------------------------

 
 
 /** 
  * 
  *
  * @function
  * @param {*} tokenball - may contain the auth object
  * @returns
  */
 async function initGoogle( tokenball ) {
  oauth2Client = new google.auth.OAuth2( process.env.client_id, process.env.client_secret, process.env.redirect_uri ); // Base is initialized with Oauth Client ID from the GCP project
  oauth2Client.setCredentials({
      access_token: tokenball.access_token, 
      refresh_token: tokenball.refresh_token,
    });
   
  oauth2 =  google.oauth2({
    auth: oauth2Client,
    version: 'v2'
  });

  //  - Specific drive API key - https://console.developers.google.com/apis/credentials/key/5e4dfc07-a046-4767-bf54-57770ed87fd2?authuser=5&project=drizzleloader
  drive =   google.drive({
    version: 'v3',
    auth: oauth2Client,
    // api_key : me.appconfig.botapikey  // 'AIzaSyDGN3pFkvXHEj14z_YABNyaEMwnW8i5jFE' // oauth2Client, // 'AIzaSyDGN3pFkvXHEj14z_YABNyaEMwnW8i5jFE' 
  });
 
  console.log(`Initialized google clients with tokenball - ${JSON.stringify(tokenball)}`);
  return oauth2
 }
 

 const addUser = function ( user ) {
  // TODO(developer): uncomment the following line, and add a description
  const userKey = gcpDatastore.key('Users');
  const entity = {
    key: userKey,
    data: user
  };

  gcpDatastore.save(entity)
    .then(() =>  {
       console.log(`Added user ${userKey.id} created successfully.`)
       return userKey.id
      
       })
    .catch(e  => {
       const errormessage = `Datastore access error - ${e}`;
       console.log( errormessage )
     });
  
} // -- addUser

/**
 * Assures that a file folder exists. Creates one if it does not exist.
 *
 * @function
 * @param { name, parent, mime, color } fileParams
 * @returns
 */
 async function assureFileFolderName ( fileParams) { 
  qp = fileParams.parent.length > 0 ? " and '" + `${fileParams.parent}` + "' in parents" : '';
  q =  `name = '${fileParams.name}' and trashed = false` + qp;
  debug(`Query string is ${q}`);
  return drive.files.list({
  //  spaces: 'appDataFolder', //'appDataFolder',
        corpora: 'user',
        q : q,
        fields: 'nextPageToken, files(id, name)',
        pageSize: 20 }
  ).then( async res => {
    const x = res.data.files;
    if (x.length === 0) { // Signature not found
        const sigid_p =  await createFile( fileParams.name /* 'artistickBytheLeftBank.Appdata' */  , fileParams.parent , fileParams.mime, fileParams.color); // createSig();
        return await sigid_p;
      } else {
        // debug(`>>-- In checkAppSig: found file${fileParams.name}, ID - ${JSON.stringify(x[0].id)}`   );
        return x[0].id;
    } 
  })
  .then(id => id)
  .catch(err=> {
    debug(`::------ERROR In AssuredFolderName::: ${err}`)
  })

} // ---  AssuredFolderName

/** @function
 *  Create a file/folder
 */
function createFile ( fileParams, gDrive = drive ) {

  // debug(`>>-- In  createFile - starting creation: ${name} --- parents >- ${JSON.stringify(parents)}, mike -${mime}` );
  const {name, parents, mime, color} = fileParams;
  let fileMetadata = {
    name: name,
    parents: parents,
    mimeType : mime,
    folderColorRgb : color,
    
  };
  debug(`In CreateFile:: FileMetadata is - ${JSON.stringify(fileMetadata)}`);

  return gDrive.files.create({
      resource: fileMetadata,
      fields: 'id'
  }).then( res => {
      debug(`>>-- In  createFile - Received Id: ${JSON.stringify(res.data.id)} --- parents >- ${JSON.stringify(parents)}` );
      return res.data.id;
  }).catch(error => {
      console.log(`DEBUG------------:: In CreateFile in gcp-helpers - <${error}>`);
});

}   // -- createFile



 module.exports = {
  google, initGoogle, gcpDatastore, dataStoreEntity, 
  assureFileFolderName, createFile,
  rgb, mimetype, 
 }

  // ----------------------------------------------------------- EOF LL
  