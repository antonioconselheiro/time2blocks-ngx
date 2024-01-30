import { CalcConfig } from './calc-config';
export declare class ConfigService {
    private static instance;
    static defaultConfig: CalcConfig;
    static getInstance(): ConfigService;
    private constructor();
    static configure(config: CalcConfig): void;
    private mergeConfigs;
    createConfigs(customConfig?: CalcConfig): CalcConfig;
}
