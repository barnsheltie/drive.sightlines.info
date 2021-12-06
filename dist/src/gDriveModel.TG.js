"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _GoogleDrive_name, _GoogleDrive_users, _GoogleDrive_owner, _gDriveModelResolverClass_mySheets, _gDriveModelResolverClass_mySheetsKey, _gDriveModelResolverClass_owner;
var _gDriveStatusClass_1, gDriveModelResolverClass_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.gDriveModule = exports.module_ID = exports.gDriveModelResolverClass = exports.GoogleDrive = exports.GoogleDriveProperty = exports.googleUserID = exports._gDriveStatusClass = exports.gDriveStateEnums = void 0;
/** @module
 *
 *  NOTE: This .ts file and results are NOT used for module creation at this time
 *
 *  Schema cheat sheet: https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png
 **/
require("reflect-metadata");
const uuid_1 = require("uuid");
const type_graphql_1 = require("type-graphql");
const debug_1 = __importDefault(require("debug"));
const debugLog = process.env.NODE_ENV === 'debug' ? (0, debug_1.default)('gSheetModel.TG') : (0, debug_1.default)('');
const graphql_modules_1 = require("graphql-modules");
/** Go on to definitions  */
var gDriveStateEnums;
(function (gDriveStateEnums) {
    gDriveStateEnums["CREATED"] = "CREATED";
    gDriveStateEnums["NULL"] = "NuLL";
    gDriveStateEnums["READY"] = "Ready";
    gDriveStateEnums["SEEDED"] = "Seeded from Config";
    gDriveStateEnums["ERROR"] = "ERROR!!";
    gDriveStateEnums["RUNNING"] = "RUNNING";
    gDriveStateEnums["STOPPED"] = "STOPPED";
    gDriveStateEnums["ACTIVE"] = "ACTIVE";
    gDriveStateEnums["INACTIVE"] = "INACTIVE";
})(gDriveStateEnums = exports.gDriveStateEnums || (exports.gDriveStateEnums = {}));
(0, type_graphql_1.registerEnumType)(gDriveStateEnums, {
    name: "gDriveStateEnums",
    description: "Various states for a the gSheet model ", // this one is optional
});
let _gDriveStatusClass = _gDriveStatusClass_1 = class _gDriveStatusClass {
    constructor() {
        this.statusid = '0';
        this.nowState = gDriveStateEnums.CREATED;
        this.nextState = [gDriveStateEnums.ERROR, gDriveStateEnums.SEEDED];
        this.scheduled = false; // True == it's scheduled for operation. */
        this.lastState = gDriveStateEnums.NULL;
    }
};
__decorate([
    (0, type_graphql_1.Field)(type => _gDriveStatusClass_1, { nullable: true }),
    __metadata("design:type", _gDriveStatusClass)
], _gDriveStatusClass.prototype, "op_state", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => _gDriveStatusClass_1, { nullable: true }),
    __metadata("design:type", _gDriveStatusClass)
], _gDriveStatusClass.prototype, "telemetry_state", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => _gDriveStatusClass_1, { nullable: true }),
    __metadata("design:type", _gDriveStatusClass)
], _gDriveStatusClass.prototype, "provision_state", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => _gDriveStatusClass_1, { nullable: true }),
    __metadata("design:type", _gDriveStatusClass)
], _gDriveStatusClass.prototype, "event_state", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => _gDriveStatusClass_1, { nullable: true }),
    __metadata("design:type", _gDriveStatusClass)
], _gDriveStatusClass.prototype, "log_state", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => type_graphql_1.ID),
    __metadata("design:type", String)
], _gDriveStatusClass.prototype, "statusid", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => gDriveStateEnums, { description: 'Current state' }) // it's very important
    ,
    __metadata("design:type", String)
], _gDriveStatusClass.prototype, "nowState", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => [gDriveStateEnums], { description: 'Allowable next states for transition' }) // it's very important
    ,
    __metadata("design:type", Array)
], _gDriveStatusClass.prototype, "nextState", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => Boolean),
    __metadata("design:type", Boolean)
], _gDriveStatusClass.prototype, "scheduled", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => gDriveStateEnums) // it's very important
    ,
    __metadata("design:type", String)
], _gDriveStatusClass.prototype, "lastState", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => Date, { nullable: true }) // it's very important
    ,
    __metadata("design:type", Date)
], _gDriveStatusClass.prototype, "lastSynced", void 0);
_gDriveStatusClass = _gDriveStatusClass_1 = __decorate([
    (0, type_graphql_1.ObjectType)({ description: "Status record related to gSheet" })
], _gDriveStatusClass);
exports._gDriveStatusClass = _gDriveStatusClass;
let IPerson = class IPerson {
    constructor() {
        this.person_id = '';
        this.person_name = '';
        this.age = 0;
    }
};
__decorate([
    (0, type_graphql_1.Field)(type => type_graphql_1.ID),
    __metadata("design:type", String)
], IPerson.prototype, "person_id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], IPerson.prototype, "person_name", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], IPerson.prototype, "age", void 0);
IPerson = __decorate([
    (0, type_graphql_1.InterfaceType)()
], IPerson);
let googleUserID = class googleUserID extends IPerson {
    constructor(id = 'XXX', name = 'Squid') {
        super();
        this.value = 0;
        this.id = '--Un-attached--';
        this.name = '--uninitialized--';
        this.kuid = uuid_1.NIL;
        this.created_at = new Date(); /**  # when this was created */
        this.updated_at = new Date(); /** last update */
        this.idtype = 'uidstring';
        this.id = id; // Always passed on
        this.name = name;
        this.kuid = (0, uuid_1.v4)();
        this.value = 0;
    }
};
__decorate([
    (0, type_graphql_1.Field)(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], googleUserID.prototype, "value", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => String, { description: 'What Type of ID This Is - default uuid type' }),
    __metadata("design:type", String)
], googleUserID.prototype, "idtype", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => type_graphql_1.ID),
    __metadata("design:type", String)
], googleUserID.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => String),
    __metadata("design:type", String)
], googleUserID.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => String),
    __metadata("design:type", String)
], googleUserID.prototype, "kuid", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => Date),
    __metadata("design:type", Date)
], googleUserID.prototype, "created_at", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => Date),
    __metadata("design:type", Date)
], googleUserID.prototype, "updated_at", void 0);
googleUserID = __decorate([
    (0, type_graphql_1.ObjectType)({ description: "ID types - root record" }),
    __metadata("design:paramtypes", [String, String])
], googleUserID);
exports.googleUserID = googleUserID;
let GoogleDriveProperty = class GoogleDriveProperty {
};
GoogleDriveProperty = __decorate([
    (0, type_graphql_1.ObjectType)({ description: "Google drive properties" })
], GoogleDriveProperty);
exports.GoogleDriveProperty = GoogleDriveProperty;
let GoogleDrive = class GoogleDrive extends _gDriveStatusClass {
    constructor(id) {
        super();
        _GoogleDrive_name.set(this, void 0);
        _GoogleDrive_users.set(this, void 0);
        _GoogleDrive_owner.set(this, new googleUserID('123', 'mp@altaselva'));
        debugLog(`Initializing - GoogleDrive`);
    }
    get owner() { return __classPrivateFieldGet(this, _GoogleDrive_owner, "f"); }
};
_GoogleDrive_name = new WeakMap(), _GoogleDrive_users = new WeakMap(), _GoogleDrive_owner = new WeakMap();
__decorate([
    (0, type_graphql_1.Field)(type => GoogleDriveProperty),
    __metadata("design:type", GoogleDriveProperty)
], GoogleDrive.prototype, "properties", void 0);
GoogleDrive = __decorate([
    (0, type_graphql_1.ObjectType)({ description: "TypeScript-generated ID type for SpikeIO_Root" }),
    __metadata("design:paramtypes", [String])
], GoogleDrive);
exports.GoogleDrive = GoogleDrive;
let gDriveModelResolverClass = gDriveModelResolverClass_1 = class gDriveModelResolverClass {
    constructor() {
        _gDriveModelResolverClass_mySheets.set(this, new Map());
        _gDriveModelResolverClass_mySheetsKey.set(this, Math.floor(Math.random() * 100000)); // Get a random number to start keys
        _gDriveModelResolverClass_owner.set(this, new googleUserID('IamSo', 'abcd'));
        debugLog(`Initializing ${gDriveModelResolverClass_1.name}`);
    }
    bindMe(id = 'seed') {
        var _a, _b;
        __classPrivateFieldGet(this, _gDriveModelResolverClass_mySheets, "f").set((__classPrivateFieldSet(this, _gDriveModelResolverClass_mySheetsKey, (_b = __classPrivateFieldGet(this, _gDriveModelResolverClass_mySheetsKey, "f"), _a = _b++, _b), "f"), _a), new GoogleDrive(id));
        return __classPrivateFieldGet(this, _gDriveModelResolverClass_mySheetsKey, "f");
    }
    owner() {
        return __classPrivateFieldGet(this, _gDriveModelResolverClass_owner, "f").name;
    }
};
_gDriveModelResolverClass_mySheets = new WeakMap(), _gDriveModelResolverClass_mySheetsKey = new WeakMap(), _gDriveModelResolverClass_owner = new WeakMap();
__decorate([
    (0, type_graphql_1.Mutation)(returns => type_graphql_1.Int),
    __param(0, (0, type_graphql_1.Arg)("id", { nullable: false })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Number)
], gDriveModelResolverClass.prototype, "bindMe", null);
__decorate([
    (0, type_graphql_1.Query)(returns => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], gDriveModelResolverClass.prototype, "owner", null);
gDriveModelResolverClass = gDriveModelResolverClass_1 = __decorate([
    (0, type_graphql_1.Resolver)(),
    __metadata("design:paramtypes", [])
], gDriveModelResolverClass);
exports.gDriveModelResolverClass = gDriveModelResolverClass;
/**
 * ------------------------------------------------------------------------------------------
 */
exports.module_ID = `gDriveModelModule@${process.env.AppVersion}`;
const gql_gDriveModel_Controller_1 = require("./gql.gDriveModel.Controller");
const { resolvers, typeDefs } = (0, type_graphql_1.buildTypeDefsAndResolversSync)({
    resolvers: [gDriveModelResolverClass]
    // orphanedTypes:  <any> gqlTypeArgs.orphanedTypes // [GspreadSheetSheetResource, GoogleSheet, GspreadSheetProperty ],
});
exports.gDriveModule = (0, graphql_modules_1.createModule)({
    id: exports.module_ID,
    dirname: process.cwd(),
    typeDefs: [(0, graphql_modules_1.gql)(typeDefs), gql_gDriveModel_Controller_1.gDriveModelControllerTypeDefs],
    resolvers: [resolvers, gql_gDriveModel_Controller_1.gDriveModelControllerResolvers,],
});
//# sourceMappingURL=gDriveModel.TG.js.map