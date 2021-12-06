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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _spikeIO_utilsClass_me;
Object.defineProperty(exports, "__esModule", { value: true });
exports.spikeIO_utilsClass = exports._spikeIO_Root = void 0;
/** @module
 *
 *  houseKeeping.Controller
 *
 **/
require("reflect-metadata");
const debug_1 = __importDefault(require("debug"));
const debugLog = (0, debug_1.default)('gSheet.spikeio.Utils');
const type_graphql_1 = require("type-graphql");
let _spikeIO_Root = class _spikeIO_Root {
    constructor(id = '', name = 'Squid') {
        this._magic = 42; // Private field for testing
        this.in_use_count = 0; // # How many OTHER entities in K-scope namespace refers to this
        this.k_root_type = 'Type of entity attached to this K-root'; // # Type of entity attached to this K-root
        this.event_tail = []; // # Type of entity attached to this K-root
    }
};
__decorate([
    (0, type_graphql_1.Field)(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], _spikeIO_Root.prototype, "in_use_count", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => String),
    __metadata("design:type", String)
], _spikeIO_Root.prototype, "k_root_type", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => [String], { nullable: true, description: "TypeScript-generated ID type for SpikeIO_Root" }),
    __metadata("design:type", Array)
], _spikeIO_Root.prototype, "event_tail", void 0);
_spikeIO_Root = __decorate([
    (0, type_graphql_1.ObjectType)({ description: "TypeScript-generated ID type for SpikeIO_Root" }),
    __metadata("design:paramtypes", [String, String])
], _spikeIO_Root);
exports._spikeIO_Root = _spikeIO_Root;
/**
 *
 */
class spikeIO_utilsClass {
    constructor() {
        _spikeIO_utilsClass_me.set(this, 'SpikeIO utils');
        debugLog(`Initializing ${spikeIO_utilsClass.name}`);
    }
}
exports.spikeIO_utilsClass = spikeIO_utilsClass;
_spikeIO_utilsClass_me = new WeakMap();
/** -- EOF mp */
//# sourceMappingURL=spikeio.Controller.js.map