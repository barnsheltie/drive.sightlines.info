/** @module
 *
 *  NOTE: This .ts file and results are NOT used for module creation at this time
 *
 *  Schema cheat sheet: https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png
 **/
import "reflect-metadata";
/** Go on to definitions  */
export declare enum gDriveStateEnums {
    CREATED = "CREATED",
    NULL = "NuLL",
    READY = "Ready",
    SEEDED = "Seeded from Config",
    ERROR = "ERROR!!",
    RUNNING = "RUNNING",
    STOPPED = "STOPPED",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class _gDriveStatusClass {
    op_state: _gDriveStatusClass;
    telemetry_state?: _gDriveStatusClass;
    provision_state?: _gDriveStatusClass;
    event_state?: _gDriveStatusClass;
    log_state?: _gDriveStatusClass;
    statusid: string;
    nowState: gDriveStateEnums;
    nextState: gDriveStateEnums[];
    scheduled: Boolean;
    lastState: gDriveStateEnums;
    lastSynced?: Date;
}
declare abstract class IPerson {
    person_id: String;
    person_name: String;
    age: Number;
}
export declare class googleUserID extends IPerson {
    value: number;
    idtype: string;
    id: string;
    name: string;
    kuid: String;
    created_at: Date; /**  # when this was created */
    updated_at: Date; /** last update */
    constructor(id?: string, name?: string);
}
export declare class GoogleDriveProperty {
}
export declare class GoogleDrive extends _gDriveStatusClass {
    #private;
    get owner(): googleUserID;
    properties: GoogleDriveProperty;
    constructor(id: String);
}
export declare class gDriveModelResolverClass {
    #private;
    bindMe(id?: string): Number;
    owner(): string;
    constructor();
}
/**
 * ------------------------------------------------------------------------------------------
 */
export declare const module_ID: string;
export declare const gDriveModule: import("graphql-modules").Module;
export {};
