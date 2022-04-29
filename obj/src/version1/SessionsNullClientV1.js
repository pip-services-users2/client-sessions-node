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
exports.SessionsNullClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const SessionV1_1 = require("./SessionV1");
class SessionsNullClientV1 {
    getSessions(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return new pip_services3_commons_nodex_1.DataPage([], 0);
        });
    }
    getSessionById(correlationId, sessionId) {
        return null;
    }
    openSession(correlationId, userId, userName, address, client, user, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = new SessionV1_1.SessionV1(null, userId, userName, address, client);
            session.user = user;
            session.data = data;
            return session;
        });
    }
    storeSessionData(correlationId, sessionId, data) {
        return null;
    }
    updateSessionUser(correlationId, sessionId, user) {
        return null;
    }
    closeSession(correlationId, sessionId) {
        return null;
    }
    closeExpiredSessions(correlationId) {
        return null;
    }
    deleteSessionById(correlationId, sessionId) {
        return null;
    }
}
exports.SessionsNullClientV1 = SessionsNullClientV1;
//# sourceMappingURL=SessionsNullClientV1.js.map