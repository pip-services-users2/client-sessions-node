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
exports.SessionsDirectClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class SessionsDirectClientV1 extends pip_services3_rpc_nodex_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_2.Descriptor("service-sessions", "controller", "*", "*", "*"));
        if (config != null)
            this.configure(pip_services3_commons_nodex_1.ConfigParams.fromValue(config));
    }
    getSessions(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let timing = this.instrument(correlationId, 'sessions.get_sessions');
            try {
                return yield this._controller.getSessions(correlationId, filter, paging);
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
            let timing = this.instrument(correlationId, 'sessions.get_session_by_id');
            try {
                return yield this._controller.getSessionById(correlationId, sessionId);
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
            let timing = this.instrument(correlationId, 'sessions.open_session');
            try {
                return yield this._controller.openSession(correlationId, userId, userName, address, client, user, data);
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
            let timing = this.instrument(correlationId, 'sessions.store_session_data');
            try {
                return yield this._controller.storeSessionData(correlationId, sessionId, data);
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
            let timing = this.instrument(correlationId, 'sessions.update_session_user');
            try {
                return yield this._controller.updateSessionUser(correlationId, sessionId, user);
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
            let timing = this.instrument(correlationId, 'sessions.close_session');
            try {
                return yield this._controller.closeSession(correlationId, sessionId);
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
            let timing = this.instrument(correlationId, 'sessions.close_expired_sessions');
            try {
                return yield this._controller.close_expired_sessions(correlationId);
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
            let timing = this.instrument(correlationId, 'sessions.delete_session_by_id');
            try {
                return yield this._controller.deleteSessionById(correlationId, sessionId);
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
exports.SessionsDirectClientV1 = SessionsDirectClientV1;
//# sourceMappingURL=SessionsDirectClientV1.js.map