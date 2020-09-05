//https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook_request

export interface IParameter {
  [key: string]: string | number;
}

export interface IOutputContext {
  name: string;
  lifespanCount: number;
  parameters: IParameter;
}

export interface IWebhookRequest {
  queryResult: {
    queryText: string;
    parameters: IParameter;
    outputContexts: IOutputContext[];
  };
}
