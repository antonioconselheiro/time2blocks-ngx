import { CalcConfig } from '../config/calc-config';
import { Equation } from './../domain/equation.model';
export declare class CalcBuild {
    private static instance;
    private static readonly calcMap;
    private readonly numberValidator;
    private readonly errorService;
    static getInstance(): CalcBuild;
    static configure(config: CalcConfig): void;
    private constructor();
    calculate(equation: Equation, config: CalcConfig): number;
    private createExecutedEquation;
    private validate;
    private validateEquation;
}
