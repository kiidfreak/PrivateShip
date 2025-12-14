export interface ISmsProvider {
    send(to: string, message: string): Promise<void>;
}

export class MockSmsProvider implements ISmsProvider {
    async send(to: string, message: string): Promise<void> {
        console.log(`[SMS MOCK] To: ${to}, Message: ${message}`);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

export class AfricasTalkingProvider implements ISmsProvider {
    async send(to: string, message: string): Promise<void> {
        // TODO: Implement actual AT integration
        throw new Error("Not implemented");
    }
}
