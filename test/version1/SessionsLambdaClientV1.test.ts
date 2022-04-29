import { ConfigParams } from 'pip-services3-commons-nodex';

import { SessionsClientFixtureV1 } from './SessionsClientFixtureV1';
import { SessionsLambdaClientV1 } from '../../src/version1/SessionsLambdaClientV1';

suite('SessionsLambdaClient', ()=> {
    let AWS_LAMDBA_ARN = process.env["AWS_LAMDBA_ARN"] || "";
    let AWS_ACCESS_ID = process.env["AWS_ACCESS_ID"] || "";
    let AWS_ACCESS_KEY = process.env["AWS_ACCESS_KEY"] || "";

    if (!AWS_LAMDBA_ARN || !AWS_ACCESS_ID || !AWS_ACCESS_KEY)
        return;

    let config = ConfigParams.fromTuples(
        "lambda.connection.protocol", "aws",
        "lambda.connection.arn", AWS_LAMDBA_ARN,
        "lambda.credential.access_id", AWS_ACCESS_ID,
        "lambda.credential.access_key", AWS_ACCESS_KEY,
        "lambda.options.connection_timeout", 30000
    );
    let lambdaConfig = config.getSection('lambda');

    // Skip if connection is not configured
    if (lambdaConfig.getAsNullableString("connection.protocol") != "aws")
        return;

    let client: SessionsLambdaClientV1;
    let fixture: SessionsClientFixtureV1;

    setup(async () => {
        client = new SessionsLambdaClientV1();
        client.configure(lambdaConfig);

        fixture = new SessionsClientFixtureV1(client);

        await client.open(null);
    });

    teardown(async () => {
        await client.close(null);
    });

    test('Open Session', async () => {
        await fixture.testOpenSession();
    });

    test('Close Session', async () => {
        await fixture.testCloseSession();
    });
    
});