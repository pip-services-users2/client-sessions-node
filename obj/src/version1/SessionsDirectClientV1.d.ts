import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';
import { ISessionsClientV1 } from './ISessionsClientV1';
import { SessionV1 } from './SessionV1';
export declare class SessionsDirectClientV1 extends DirectClient<any> implements ISessionsClientV1 {
    constructor(config?: any);
    getSessions(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>>;
    getSessionById(correlationId: string, sessionId: string): Promise<SessionV1>;
    openSession(correlationId: string, userId: string, userName: string, address: string, client: string, user: any, data: any): Promise<SessionV1>;
    storeSessionData(correlationId: string, sessionId: string, data: any): Promise<SessionV1>;
    updateSessionUser(correlationId: string, sessionId: string, user: any): Promise<SessionV1>;
    closeSession(correlationId: string, sessionId: string): Promise<SessionV1>;
    closeExpiredSessions(correlationId: string): Promise<void>;
    deleteSessionById(correlationId: string, sessionId: string): Promise<SessionV1>;
}
