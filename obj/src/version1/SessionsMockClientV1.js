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
exports.SessionsMockClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const SessionV1_1 = require("./SessionV1");
class SessionsMockClientV1 {
    constructor() {
        this._sessions = [];
        this._expireTimeout = 24 * 3600000;
    }
    getSessions(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return new pip_services3_commons_nodex_1.DataPage(this._sessions, this._sessions.length);
        });
    }
    getSessionById(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = this._sessions.find((d) => d.id == sessionId);
            return session;
        });
    }
    openSession(correlationId, userId, userName, address, client, user, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = new SessionV1_1.SessionV1(null, userId, userName, address, client);
            session.user = user;
            session.data = data;
            this._sessions.push(session);
            return session;
        });
    }
    storeSessionData(correlationId, sessionId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = this._sessions.find((d) => d.id == sessionId);
            if (session)
                session.data = data;
            return session;
        });
    }
    updateSessionUser(correlationId, sessionId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = this._sessions.find((d) => d.id == sessionId);
            if (session)
                session.user = user;
            return session;
        });
    }
    closeSession(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = this._sessions.find((d) => d.id == sessionId);
            if (session)
                session.active = false;
            return session;
        });
    }
    closeExpiredSessions(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let now = new Date();
            let requestTime = new Date(now.getTime() - this._expireTimeout);
            let time = requestTime.getTime();
            for (let item of this._sessions) {
                if (item.active && item.request_time.getTime() < time) {
                    item.active = false;
                    item.close_time = now;
                    item.request_time = now;
                    item.data = null;
                    item.user = null;
                }
            }
        });
    }
    deleteSessionById(correlationId, sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            let session = this._sessions.find((d) => d.id == sessionId);
            if (session)
                this._sessions = this._sessions.filter((d) => d.id != sessionId);
            return session;
        });
    }
}
exports.SessionsMockClientV1 = SessionsMockClientV1;
//# sourceMappingURL=SessionsMockClientV1.js.map