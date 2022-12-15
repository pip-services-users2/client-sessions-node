import { Descriptor } from 'pip-services3-commons-nodex';
import { Factory } from 'pip-services3-components-nodex';

import { SessionsNullClientV1 } from '../version1/SessionsNullClientV1';
import { SessionsMemoryClientV1 } from '../version1/SessionsMemoryClientV1';
import { SessionsDirectClientV1 } from '../version1/SessionsDirectClientV1';
import { SessionsCommandableHttpClientV1 } from '../version1/SessionsCommandableHttpClientV1';
import { SessionsCommandableLambdaClientV1 } from '../version1/SessionsCommandableLambdaClientV1';
import { SessionsCommandableGrpcClientV1 } from '../version1/SessionsCommandableGrpcClientV1';

export class SessionsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('service-sessions', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('service-sessions', 'client', 'null', 'default', '1.0');
	public static MemoryClientV1Descriptor = new Descriptor('service-sessions', 'client', 'memory', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('service-sessions', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('service-sessions', 'client', 'commandable-http', 'default', '1.0');
	public static CommandableLambdaClientV1Descriptor = new Descriptor('service-sessions', 'client', 'commandable-lambda', 'default', '1.0');
	public static CommandableGrpcClientV1Descriptor = new Descriptor('service-sessions', 'client', 'commandable-grpc', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(SessionsClientFactory.NullClientV1Descriptor, SessionsNullClientV1);
		this.registerAsType(SessionsClientFactory.MemoryClientV1Descriptor, SessionsMemoryClientV1);
		this.registerAsType(SessionsClientFactory.DirectClientV1Descriptor, SessionsDirectClientV1);
		this.registerAsType(SessionsClientFactory.HttpClientV1Descriptor, SessionsCommandableHttpClientV1);
		this.registerAsType(SessionsClientFactory.CommandableLambdaClientV1Descriptor, SessionsCommandableLambdaClientV1);
		this.registerAsType(SessionsClientFactory.CommandableGrpcClientV1Descriptor, SessionsCommandableGrpcClientV1);
	}
	
}
