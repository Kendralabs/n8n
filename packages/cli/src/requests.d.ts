/* eslint-disable import/no-cycle */
import express = require('express');
import { IConnections, INode, IWorkflowSettings } from '../../workflow/dist/src';
import { User } from './databases/entities/User';

export type AuthenticatedRequest<
	RouteParams = {},
	ResponseBody = {},
	RequestBody = {},
	RequestQuery = {},
> = express.Request<RouteParams, ResponseBody, RequestBody, RequestQuery> & { user: User };

export declare namespace WorkflowRequest {
	type Payload = Partial<{
		id: string; // delete if sent in body
		name: string;
		nodes: INode[];
		connections: IConnections;
		settings: IWorkflowSettings;
		active: boolean;
		tags: string[];
	}>;

	type Create = AuthenticatedRequest<{}, {}, Payload>;

	type Get = AuthenticatedRequest<{ id: string }>;

	type Delete = Get;

	type Update = AuthenticatedRequest<{ id: string }, {}, Payload>;

	type NewName = express.Request<{}, {}, {}, { name?: string }>;

	type GetAll = AuthenticatedRequest<{}, {}, {}, { filter: string }>;

	type GetAllActive = AuthenticatedRequest;

	type GetAllActivationErrors = Get;
}
