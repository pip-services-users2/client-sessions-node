import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { SessionsMemoryPersistence } from 'service-sessions-node';
import { SessionsController } from 'service-sessions-node';
import { SessionsDirectClientV1 } from '../../src/version1/SessionsDirectClientV1';
import { SessionsClientFixtureV1 } from './SessionsClientFixtureV1';

suite('SessionsDirectClientV1', ()=> {
    let client: SessionsDirectClientV1;
    let fixture: SessionsClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new SessionsMemoryPersistence();
        let controller = new SessionsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-sessions', 'controller', 'default', 'default', '1.0'), controller,
        );
        controller.setReferences(references);

        client = new SessionsDirectClientV1();
        client.setReferences(references);

        fixture = new SessionsClientFixtureV1(client);

        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
    });

    test('Open Session', async () => {
        await fixture.testOpenSession();
    });

    test('Close Session', async () => {
        await fixture.testCloseSession();
    });

});
