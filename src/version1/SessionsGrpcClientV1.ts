const services = require('../../../src/protos/sessions_v1_grpc_pb');
const messages = require('../../../src/protos/sessions_v1_pb');

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { GrpcClient } from 'pip-services3-grpc-nodex';

import { ISessionsClientV1 } from './ISessionsClientV1';
import { SessionV1 } from './SessionV1';
import { SessionsGrpcConverterV1 } from './SessionsGrpcConverterV1';

export class SessionsGrpcClientV1 extends GrpcClient implements ISessionsClientV1 {
        
    public constructor() {
        super(services.SessionsClient);
    }

    public async getSessions(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<SessionV1>> {

        let request = new messages.SessionPageRequest();

        SessionsGrpcConverterV1.setMap(request.getFilterMap(), filter);
        request.setPaging(SessionsGrpcConverterV1.fromPagingParams(paging));

        let timing = this.instrument(correlationId, 'sessions.get_sessions');

        try {
            let response = await this.call<any>('get_sessions', correlationId, request);
            
            if (response.error != null)
                throw SessionsGrpcConverterV1.toError(response.error);
            
            return response
                ? SessionsGrpcConverterV1.toSessionPage(response.getPage())
                : null;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
        
    }

    public async getSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {

        let request = new messages.SessionIdRequest();
        request.setSessionId(sessionId);

        let timing = this.instrument(correlationId, 'sessions.get_session_by_id');

        try {
            let response = await this.call<any>('get_session_by_id', correlationId, request);

            if (response.error != null)
                throw SessionsGrpcConverterV1.toError(response.error);

            return response
                ? SessionsGrpcConverterV1.toSession(response.getSession())
                : null;

        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async openSession(correlationId: string, userId: string, userName: string,
        address: string, client: string, user: any, data: any): Promise<SessionV1> {

        let request = new messages.SessionOpenRequest();
        request.setUserId(userId);
        request.setUserName(userName);
        request.setAddress(address);
        request.setClient(client);
        request.setUser(SessionsGrpcConverterV1.toJson(user));
        request.setData(SessionsGrpcConverterV1.toJson(data));

        let timing = this.instrument(correlationId, 'sessions.open_session');

        try {
            let response =  await this.call<any>('open_session', correlationId, request);

            if (response.error != null) 
                throw SessionsGrpcConverterV1.toError(response.error);

            return response
                ? SessionsGrpcConverterV1.toSession(response.getSession())
                : null;
            
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async storeSessionData(correlationId: string, sessionId: string, data: any): Promise<SessionV1> {

        let request = new messages.SessionStoreDataRequest();
        request.setSessionId(sessionId);
        request.setData(SessionsGrpcConverterV1.toJson(data));

        let timing = this.instrument(correlationId, 'sessions.store_session_data');

        try {
            let response = await this.call<any>('store_session_data', correlationId, request);

            if (response.error != null)
                throw SessionsGrpcConverterV1.toError(response.error);

            return response
                ? SessionsGrpcConverterV1.toSession(response.getSession())
                : null;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async updateSessionUser(correlationId: string, sessionId: string, user: any): Promise<SessionV1> {

        let request = new messages.SessionUpdateUserRequest();
        request.setSessionId(sessionId);
        request.setUser(SessionsGrpcConverterV1.toJson(user));

        let timing = this.instrument(correlationId, 'sessions.update_session_user');

        try {
            let response = await this.call<any>('update_session_user', correlationId, request);

            if (response.error != null)
                throw SessionsGrpcConverterV1.toError(response.error);

            return response
                ? SessionsGrpcConverterV1.toSession(response.getSession())
                : null;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async closeSession(correlationId: string, sessionId: string): Promise<SessionV1> {

        let request = new messages.SessionIdRequest();
        request.setSessionId(sessionId);

        let timing = this.instrument(correlationId, 'sessions.close_session');

        try {
            let response = await this.call<any>('close_session', correlationId, request);

            if (response.error != null)
                throw SessionsGrpcConverterV1.toError(response.error);

            return response
                ? SessionsGrpcConverterV1.toSession(response.getSession()) : null;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        } 
    }

    public async closeExpiredSessions(correlationId: string): Promise<void> {

        let request = new messages.SessionEmptyRequest();

        let timing = this.instrument(correlationId, 'sessions.close_expired_sessions');

        try {
            let response = await this.call<any>('close_expired_sessions', correlationId, request);

            if (response.error != null)
                throw SessionsGrpcConverterV1.toError(response.error);

            return;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }       
    }
    
    public async deleteSessionById(correlationId: string, sessionId: string): Promise<SessionV1> {

        let request = new messages.SessionIdRequest();
        request.setSessionId(sessionId);

        let timing = this.instrument(correlationId, 'sessions.delete_session_by_id');

        try {
            let response = await this.call<any>('delete_session_by_id', correlationId, request);

            if (response.error != null)
                throw SessionsGrpcConverterV1.toError(response.error);

            return response
                ? SessionsGrpcConverterV1.toSession(response.getSession()) : null;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
  
}
