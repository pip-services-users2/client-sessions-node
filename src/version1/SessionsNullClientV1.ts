import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';

import { SessionV1 } from './SessionV1';
import { ISessionsClientV1 } from './ISessionsClientV1';

export class SessionsNullClientV1 implements ISessionsClientV1 {
    
    public async getSessions(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>> {
        return new DataPage([], 0);
    }
    
    public getSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {
        return null;
    }

    public async openSession(correlationId: string, userId: string, userName: string,
        address: string, client: string, user: any, data: any): Promise<SessionV1> {

        let session = new SessionV1(null, userId, userName, address, client);
        session.user = user;
        session.data = data;
        return session;
    }
    
    public storeSessionData(correlationId: string, sessionId: string, data: any): Promise<SessionV1> {
        return null;
    }

    public updateSessionUser(correlationId: string, sessionId: string, user: any): Promise<SessionV1> {
        return null;
    }

    public closeSession(correlationId: string, sessionId: string): Promise<SessionV1> {
        return null;
    }

    public closeExpiredSessions(correlationId: string): Promise<void> {
        return null;
    }

    public deleteSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {
        return null;
    }
}
