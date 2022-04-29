import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';
import { ConsoleLogger } from 'pip-services3-components-nodex';

import { SessionsMemoryPersistence } from 'service-sessions-node';
import { SessionsController } from 'service-sessions-node';
import { SessionsCommandableGrpcServiceV1 } from 'service-sessions-node';

import { SessionsCommandableGrpcClientV1 } from '../../src/version1/SessionsCommandableGrpcClientV1';
import { SessionsClientFixtureV1 } from './SessionsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('SessionsCommandableGrpcClientV1', ()=> {
    let service: SessionsCommandableGrpcServiceV1;
    let client: SessionsCommandableGrpcClientV1;
    let fixture: SessionsClientFixtureV1;

    suiteSetup(async () => {
        let logger = new ConsoleLogger();
        let persistence = new SessionsMemoryPersistence();
        let controller = new SessionsController();

        service = new SessionsCommandableGrpcServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('service-sessions', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-sessions', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-sessions', 'service', 'commandable-grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        client = new SessionsCommandableGrpcClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new SessionsClientFixtureV1(client);

        await service.open(null);
        await client.open(null);
    });
    
    suiteTeardown(async () => {
        await client.close(null);
        await service.close(null);
    });

    test('Open Session', async () => {
        await fixture.testOpenSession();
    });

    test('Close Session', async () => {
        await  fixture.testCloseSession();
    });

});
