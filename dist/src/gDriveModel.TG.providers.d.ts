/**
 *
 */
export declare const dataStoreEntity: {
    user: string;
    mimetype: {
        doc: string;
        file: string;
        folder: string;
        photo: string;
        shredderShard: string;
        sheet: string;
    };
    rgb: {
        AppFolder: string;
        DeviceFolder: string;
        StatFile: string;
    };
};
import { spikeIO_utilsClass } from './helpers/spikeio.Controller';
export declare class gcp_ProvidersClass extends spikeIO_utilsClass {
    userLoader(arg: any, gDatastore: any, dataStoreEntity: any): (arg: {
        spec: string;
        id: any;
        mail: any;
    }, gDatastore: any) => Promise<{
        id: any;
        name: any;
        email: any;
        sigfolder: any;
        logsheets: any;
    } | null>;
    /** Google Datastore provider */
    ProjectDataStore(): any;
    constructor();
}
