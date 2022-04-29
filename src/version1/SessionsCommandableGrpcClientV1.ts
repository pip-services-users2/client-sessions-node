import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { CommandableGrpcClient } from 'pip-services3-grpc-nodex';

import { SessionV1 } from './SessionV1';
import { ISessionsClientV1 } from './ISessionsClientV1';

export class SessionsCommandableGrpcClientV1 extends CommandableGrpcClient implements ISessionsClientV1 {

    constructor(config?: any) {
        super('v1/sessions');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
        
    public async getSessions(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>> {
        let timing = this.instrument(correlationId, 'sessions.get_sessions');

        try {
            return await this.callCommand(
                'get_sessions',
                correlationId,
                {
                    filter: filter,
                    paging: paging
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
    
    public async getSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {
        let timing = this.instrument(correlationId, 'sessions.get_session_by_id');

        try {
            return await this.callCommand(
                'get_session_by_id',
                correlationId,
                {
                    session_id: sessionId
                },
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async openSession(correlationId: string, userId: string, userName: string,
        address: string, client: string, user: any, data: any): Promise<SessionV1> {

        let timing = this.instrument(correlationId, 'sessions.open_session');

        try {
            return await this.callCommand(
                'open_session',
                correlationId,
                {
                    user_id: userId,
                    user_name: userName,
                    address: address,
                    client: client,
                    user: user,
                    data: data
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
    
    public async storeSessionData(correlationId: string, sessionId: string, data: any): Promise<SessionV1> {
        let timing = this.instrument(correlationId, 'sessions.store_session_data');

        try {
            return await this.callCommand(
                'store_session_data',
                correlationId,
                {
                    session_id: sessionId,
                    data: data
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async updateSessionUser(correlationId: string, sessionId: string, user: any): Promise<SessionV1> {
        let timing = this.instrument(correlationId, 'sessions.update_session_user');

        try {
            return await this.callCommand(
                'update_session_user',
                correlationId,
                {
                    session_id: sessionId,
                    user: user
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
        
    }

    public async closeExpiredSessions(correlationId: string): Promise<void> {
        let timing = this.instrument(correlationId, 'sessions.close_expired_sessions');

        try {
            return await this.callCommand('close_expired_sessions', null, {});
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
    
    public async closeSession(correlationId: string, sessionId: string): Promise<SessionV1> {
        let timing = this.instrument(correlationId, 'sessions.close_session');

        try {
            return await this.callCommand(
                'close_session',
                correlationId,
                {
                    session_id: sessionId
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
        
    }

    public async deleteSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {
        let timing = this.instrument(correlationId, 'sessions.delete_session_by_id');

        try {
            return await this.callCommand(
                'delete_session_by_id',
                correlationId,
                {
                    session_id: sessionId
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

}
