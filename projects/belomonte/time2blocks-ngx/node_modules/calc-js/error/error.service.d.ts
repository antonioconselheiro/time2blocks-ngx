import { CalcConfig } from '../config/calc-config';
import { CalcError } from './calc-error';
export declare class ErrorService {
    private static instance;
    private errorEventEmitter;
    static getInstance(): ErrorService;
    private constructor();
    onError(calle: (error: CalcError) => void): void;
    emitError(config: CalcConfig, error: string): void;
}
