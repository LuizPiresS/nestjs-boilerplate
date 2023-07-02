export interface ILoggerService {
  set idempotencyKey(idempotencyKey: string);
  get idempotencyKey(): string;
  set contextName(contextName: string);
  get contextName(): string;
  error(message: string, stackTrace?: any): void;
  warn(message: string): void;
  info(message: string): void;
}
