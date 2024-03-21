export interface LLMPromptRequestPayloadType {
    prompt: string;
    temperature: number;
    max_tokens: number;
    n: number;
    deployment_id: string;
};

export interface LLMMessageRequestPayloadType {
    messages: Array<MessageType>;
    temperature: number;
    max_tokens: number;
    n: number;
    deployment_id: string;
};

export interface MessageType {
    role: string;
    content: string;
}


export interface PromptResponsePayloadType {
    choices: [
        {text: string}
    ];
}

export interface MessageResponsePayloadType {
    choices: [
        {
            message: MessageType;
        }
    ];
}
