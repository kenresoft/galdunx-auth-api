export const extractErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === 'string') {
        return error;
    } else {
        return 'Unknown error: ' + JSON.stringify(error);
    }
};

export const logErrorWithTimestamp = (action: string, error: string) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ${action} failed: ${error}`);
};
