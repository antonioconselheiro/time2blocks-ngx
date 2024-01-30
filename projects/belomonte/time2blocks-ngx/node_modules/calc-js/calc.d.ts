import { CalcConfig } from './config/calc-config';
import { CalcError } from './error/calc-error';
export declare class Calc {
    private readonly baseNumber;
    private readonly calcBuild;
    private readonly configService;
    private operations;
    private customConfig;
    /**
     * It will throw (or console it) if this isn't a valid number.
     * @returns if is valid return true, if is invalid return false.
     *
     * @param value
     * Number to be verified
     *
     * @param complementaryErrorMessage
     * Aditional information to add to the error object (this will come first)
     *
     * @param config
     * Some overriden configuration
     */
    static checkNumber(value: number, complementaryErrorMessage?: string, config?: CalcConfig): boolean;
    static onError(calle: (error: CalcError) => void): void;
    static configure(config: CalcConfig): void;
    static sum(x: number, y: number, config?: CalcConfig): number;
    static minus(x: number, y: number, config?: CalcConfig): number;
    static divide(x: number, y: number, config?: CalcConfig): number;
    static multiply(x: number, y: number, config?: CalcConfig): number;
    constructor(baseNumber: number, customConfig?: CalcConfig);
    sum(value: number): Calc;
    minus(value: number): Calc;
    divide(value: number): Calc;
    multiply(value: number): Calc;
    pipe(lambda: (n: number) => number): Calc;
    finish(): number;
}
