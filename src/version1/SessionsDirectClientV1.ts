import { ConfigParams } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams} from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { DirectClient } from 'pip-services3-rpc-nodex';

import { ISessionsClientV1 } from './ISessionsClientV1';
import { SessionV1 } from './SessionV1';

export class SessionsDirectClientV1 extends DirectClient<any> implements ISessionsClientV1 {
            
    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor("service-sessions", "controller", "*", "*", "*"))

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }
    

    public async getSessions(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>> {
        let timing = this.instrument(correlationId, 'sessions.get_sessions');

        try {
            return await this._controller.getSessions(correlationId, filter, paging);
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
            return await this._controller.getSessionById(correlationId, sessionId);
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
            return await this._controller.openSession(correlationId, userId, userName, address, client, user, data,);
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
            return await this._controller.storeSessionData(correlationId, sessionId, data);
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
            return await this._controller.updateSessionUser(correlationId, sessionId, user);
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
            return await this._controller.closeSession(correlationId, sessionId);
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
            return await this._controller.close_expired_sessions(correlationId);
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
            return await this._controller.deleteSessionById(correlationId, sessionId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
}