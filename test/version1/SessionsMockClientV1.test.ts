import { SessionsMockClientV1 } from '../../src/version1/SessionsMockClientV1';
import { SessionsClientFixtureV1 } from './SessionsClientFixtureV1';

suite('SessionsMockClientV1', ()=> {
    let client: SessionsMockClientV1;
    let fixture: SessionsClientFixtureV1;

    setup(() => {
        client = new SessionsMockClientV1();

        fixture = new SessionsClientFixtureV1(client);
    });

    test('Open Session', async () => {
        await fixture.testOpenSession();
    });

    test('Close Session', async  () => {
        await fixture.testCloseSession();
    });

});
