export default class CustomError extends Error{
    customMessage: string;
    status: number;
    details?: object;

    constructor(msg?: string, status?: number, details?: object) {
        const _msg = msg ?? "Something went wrong";
        super(_msg);
        this.customMessage = _msg;
        this.status = status ?? 500;
        this.details = details;
    }
}
