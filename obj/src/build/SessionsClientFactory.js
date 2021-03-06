"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsClientFactory = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const SessionsNullClientV1_1 = require("../version1/SessionsNullClientV1");
const SessionsMemoryClientV1_1 = require("../version1/SessionsMemoryClientV1");
const SessionsDirectClientV1_1 = require("../version1/SessionsDirectClientV1");
const SessionsHttpClientV1_1 = require("../version1/SessionsHttpClientV1");
const SessionsLambdaClientV1_1 = require("../version1/SessionsLambdaClientV1");
const SessionsCommandableGrpcClientV1_1 = require("../version1/SessionsCommandableGrpcClientV1");
class SessionsClientFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(SessionsClientFactory.NullClientV1Descriptor, SessionsNullClientV1_1.SessionsNullClientV1);
        this.registerAsType(SessionsClientFactory.MemoryClientV1Descriptor, SessionsMemoryClientV1_1.SessionsMemoryClientV1);
        this.registerAsType(SessionsClientFactory.DirectClientV1Descriptor, SessionsDirectClientV1_1.SessionsDirectClientV1);
        this.registerAsType(SessionsClientFactory.HttpClientV1Descriptor, SessionsHttpClientV1_1.SessionsHttpClientV1);
        this.registerAsType(SessionsClientFactory.LambdaClientV1Descriptor, SessionsLambdaClientV1_1.SessionsLambdaClientV1);
        this.registerAsType(SessionsClientFactory.CommandableGrpcClientV1Descriptor, SessionsCommandableGrpcClientV1_1.SessionsCommandableGrpcClientV1);
    }
}
exports.SessionsClientFactory = SessionsClientFactory;
SessionsClientFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-sessions', 'factory', 'default', 'default', '1.0');
SessionsClientFactory.NullClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-sessions', 'client', 'null', 'default', '1.0');
SessionsClientFactory.MemoryClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-sessions', 'client', 'memory', 'default', '1.0');
SessionsClientFactory.DirectClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-sessions', 'client', 'direct', 'default', '1.0');
SessionsClientFactory.HttpClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-sessions', 'client', 'http', 'default', '1.0');
SessionsClientFactory.LambdaClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-sessions', 'client', 'lambda', 'default', '1.0');
SessionsClientFactory.CommandableGrpcClientV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-sessions', 'client', 'commandable-grpc', 'default', '1.0');
//# sourceMappingURL=SessionsClientFactory.js.map