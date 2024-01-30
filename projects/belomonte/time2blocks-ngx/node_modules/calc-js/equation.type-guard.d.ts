import { Operation } from './domain/operation.model';
export declare function equationTypeGuard(operations: Operation[]): operations is [Operation, ...Operation[]];
