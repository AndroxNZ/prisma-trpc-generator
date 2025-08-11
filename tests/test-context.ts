// Mock context for testing
export interface Context {
  user?: {
    id: number;
    role: string;
  };
  req?: unknown;
  res?: unknown;
}
