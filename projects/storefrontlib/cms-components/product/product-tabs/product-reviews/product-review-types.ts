export interface RequestPayloadType {
    prompt: string;
    temperature: number;
    max_tokens: number;
    n: number;
    deployment_id: string;
};

export interface ResponsePayloadType {
    value: string;
    usage: {
      prompt_tokens: number;
      response_tokens: number;
    };
};

export interface ResponsePayloadType {
    choices: [
        {text: string}
    ];
}
