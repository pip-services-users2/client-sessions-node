"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsGrpcClientV1 = void 0;
const services = require('../../../src/protos/sessions_v1_grpc_pb');
const messages = require('../../../src/protos/sessions_v1_pb');
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const SessionsGrpcConverterV1_1 = require("./SessionsGrpcConverterV1");
class SessionsGrpcClientV1 extends pip_services3_grpc_nodex_1.GrpcClient {
    constructor() {
        super(services.SessionsClient);
    }
    getSessions(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = new messages.SessionPageRequest();
            SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.setMap(request.getFilterMap(), filter);
            request.setPaging(SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.fromPagingParams(paging));
            let timing = this.instrument(correlationId, 'sessions.get_sessions');
            try {
                let response = yield this.call('get_sessions', correlationId, request);
                if (response.error != null)
                    throw SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
                return response
                    ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSessionPage(response.getPage())
                    : null;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    getSessionById(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = new messages.SessionIdRequest();
            request.setSessionId(sessionId);
            let timing = this.instrument(correlationId, 'sessions.get_session_by_id');
            try {
                let response = yield this.call('get_session_by_id', correlationId, request);
                if (response.error != null)
                    throw SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
                return response
                    ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession())
                    : null;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    openSession(correlationId, userId, userName, address, client, user, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = new messages.SessionOpenRequest();
            request.setUserId(userId);
            request.setUserName(userName);
            request.setAddress(address);
            request.setClient(client);
            request.setUser(SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toJson(user));
            request.setData(SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toJson(data));
            let timing = this.instrument(correlationId, 'sessions.open_session');
            try {
                let response = yield this.call('open_session', correlationId, request);
                if (response.error != null)
                    throw SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
                return response
                    ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession())
                    : null;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    storeSessionData(correlationId, sessionId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = new messages.SessionStoreDataRequest();
            request.setSessionId(sessionId);
            request.setData(SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toJson(data));
            let timing = this.instrument(correlationId, 'sessions.store_session_data');
            try {
                let response = yield this.call('store_session_data', correlationId, request);
                if (response.error != null)
                    throw SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
                return response
                    ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession())
                    : null;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    updateSessionUser(correlationId, sessionId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = new messages.SessionUpdateUserRequest();
            request.setSessionId(sessionId);
            request.setUser(SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toJson(user));
            let timing = this.instrument(correlationId, 'sessions.update_session_user');
            try {
                let response = yield this.call('update_session_user', correlationId, request);
                if (response.error != null)
                    throw SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
                return response
                    ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession())
                    : null;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    closeSession(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = new messages.SessionIdRequest();
            request.setSessionId(sessionId);
            let timing = this.instrument(correlationId, 'sessions.close_session');
            try {
                let response = yield this.call('close_session', correlationId, request);
                if (response.error != null)
                    throw SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
                return response
                    ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession()) : null;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    closeExpiredSessions(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = new messages.SessionEmptyRequest();
            let timing = this.instrument(correlationId, 'sessions.close_expired_sessions');
            try {
                let response = yield this.call('close_expired_sessions', correlationId, request);
                if (response.error != null)
                    throw SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
                return;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
    deleteSessionById(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = new messages.SessionIdRequest();
            request.setSessionId(sessionId);
            let timing = this.instrument(correlationId, 'sessions.delete_session_by_id');
            try {
                let response = yield this.call('delete_session_by_id', correlationId, request);
                if (response.error != null)
                    throw SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toError(response.error);
                return response
                    ? SessionsGrpcConverterV1_1.SessionsGrpcConverterV1.toSession(response.getSession()) : null;
            }
            catch (err) {
                timing.endFailure(err);
                throw err;
            }
            finally {
                timing.endTiming();
            }
        });
    }
}
exports.SessionsGrpcClientV1 = SessionsGrpcClientV1;
//# sourceMappingURL=SessionsGrpcClientV1.js.map