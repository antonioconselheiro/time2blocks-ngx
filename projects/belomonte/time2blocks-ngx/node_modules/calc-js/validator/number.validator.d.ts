import { CalcConfig } from '../config/calc-config';
import { Equation } from '../domain/equation.model';
export declare class NumberValidator {
    private static instance;
    static getInstance(): NumberValidator;
    private constructor();
    validate(value: number, executedEquation: Equation | null, completeEquation: Equation, calcConfig: CalcConfig): string | null;
    validateSingleNumber(value: number, complementaryErrorMessage?: string, customConfig?: CalcConfig): string | null;
    private joinMessages;
    private generateErrorMessage;
    private checkNaN;
    private checkInfinite;
    private checkUnsafeNumber;
}
