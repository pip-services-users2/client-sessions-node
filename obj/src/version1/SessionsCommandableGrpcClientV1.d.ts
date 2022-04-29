import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableGrpcClient } from 'pip-services3-grpc-nodex';
import { SessionV1 } from './SessionV1';
import { ISessionsClientV1 } from './ISessionsClientV1';
export declare class SessionsCommandableGrpcClientV1 extends CommandableGrpcClient implements ISessionsClientV1 {
    constructor(config?: any);
    getSessions(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>>;
    getSessionById(correlationId: string, sessionId: string): Promise<SessionV1>;
    openSession(correlationId: string, userId: string, userName: string, address: string, client: string, user: any, data: any): Promise<SessionV1>;
    storeSessionData(correlationId: string, sessionId: string, data: any): Promise<SessionV1>;
    updateSessionUser(correlationId: string, sessionId: string, user: any): Promise<SessionV1>;
    closeExpiredSessions(correlationId: string): Promise<void>;
    closeSession(correlationId: string, sessionId: string): Promise<SessionV1>;
    deleteSessionById(correlationId: string, sessionId: string): Promise<SessionV1>;
}
