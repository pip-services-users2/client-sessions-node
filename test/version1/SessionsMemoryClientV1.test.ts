import { SessionsMemoryClientV1 } from '../../src/version1/SessionsMemoryClientV1';
import { SessionsClientFixtureV1 } from './SessionsClientFixtureV1';

suite('SessionsMemoryClientV1', ()=> {
    let client: SessionsMemoryClientV1;
    let fixture: SessionsClientFixtureV1;

    setup(() => {
        client = new SessionsMemoryClientV1();

        fixture = new SessionsClientFixtureV1(client);
    });

    test('Open Session', async () => {
        await fixture.testOpenSession();
    });

    test('Close Session', async  () => {
        await fixture.testCloseSession();
    });

});
