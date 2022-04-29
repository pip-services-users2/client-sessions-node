import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { SessionV1 } from './SessionV1';
import { ISessionsClientV1 } from './ISessionsClientV1';

export class SessionsMemoryClientV1 implements ISessionsClientV1 {
    private _sessions: SessionV1[] = [];
    private _expireTimeout: number = 24 * 3600000;

    public async getSessions(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>> {

        return new DataPage(this._sessions, this._sessions.length);
    }
    
    public async getSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {

        let session = this._sessions.find((d) => d.id == sessionId);

        return session;
    }

    public async openSession(correlationId: string, userId: string, userName: string,
        address: string, client: string, user: any, data: any): Promise<SessionV1> {

        let session = new SessionV1(null, userId, userName, address, client);
        session.user = user;
        session.data = data;

        this._sessions.push(session);

        return session;
    }
    
    public async storeSessionData(correlationId: string, sessionId: string, data: any): Promise<SessionV1> {

        let session = this._sessions.find((d) => d.id == sessionId);
        if (session)
            session.data = data;

        return session;
    }
    
    public async updateSessionUser(correlationId: string, sessionId: string, user: any): Promise<SessionV1> {

        let session = this._sessions.find((d) => d.id == sessionId);
        if (session)
            session.user = user;

        return session;
    }
    
    public async closeSession(correlationId: string, sessionId: string): Promise<SessionV1> {

        let session = this._sessions.find((d) => d.id == sessionId);
        if (session)
            session.active = false;
    
        return session;
    }

    public async closeExpiredSessions(correlationId: string): Promise<void> {
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
    }

    public async deleteSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {

        let session = this._sessions.find((d) => d.id == sessionId);
        if (session)
            this._sessions = this._sessions.filter((d) => d.id != sessionId);
    
        return session;
    }
}
