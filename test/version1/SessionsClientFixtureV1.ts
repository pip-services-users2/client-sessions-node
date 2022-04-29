const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';

import { ISessionsClientV1 } from '../../src/version1/ISessionsClientV1';
import { SessionV1 } from '../../src/version1/SessionV1';

export class SessionsClientFixtureV1 {
    private _client: ISessionsClientV1;
    
    constructor(client: ISessionsClientV1) {
        this._client = client;
    }
        
    public async testOpenSession() {
        let session1;

        // Open new session
        session1 = await this._client.openSession(null, '1', 'User 1', 'localhost', 'test', null, 'abc');

        assert.isObject(session1);
        assert.isNotNull(session1.id);
        assert.isNotNull(session1.request_time);
        assert.equal(session1.address, 'localhost');
        assert.equal(session1.client, 'test');
        assert.equal(session1.data, 'abc');

        // Store session data
        await this._client.storeSessionData(
            null,
            session1.id,
            'xyz',
        );

        // Update session user
        await this._client.updateSessionUser(
            null,
            session1.id,
            'xyz'
        );

        // Load created session
        let session = await this._client.getSessionById(
            null,
            session1.id
        );

        assert.isObject(session);
        assert.equal(session.id, session1.id);
        assert.isNotNull(session.request_time);
        assert.equal(session.address, 'localhost');
        assert.equal(session.client, 'test');
        assert.equal(session.data, 'xyz');

        // Get open sessions
        let page = await this._client.getSessions(
            null,
            FilterParams.fromTuples(
                'user_id', '1',
                'active', true
            ),
            null
        );

        assert.lengthOf(page.data, 1);
        session = page.data[0];

        assert.equal(session.address, 'localhost');
        assert.equal(session.client, 'test');
    }

    public async testCloseSession() {
        let session1: SessionV1;

        // Create a new session
        session1 = await this._client.openSession(null, '1', 'User 1', 'localhost', 'test', null, null);

        assert.isObject(session1);
        assert.isNotNull(session1.request_time);

        // Close created session
        await this._client.closeSession(
            null,
            session1.id
        );

        // Get open sessions
        let page = await this._client.getSessions(
            null,
            FilterParams.fromTuples(
                'user_id', '1',
                'active', true
            ),
            null
        );

        assert.isObject(page);
    }
}
