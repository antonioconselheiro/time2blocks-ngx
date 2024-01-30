import { Operator } from './operator.type';
export declare type Operation = {
    value: number;
    type: Operator;
} | ((n: number) => number);
