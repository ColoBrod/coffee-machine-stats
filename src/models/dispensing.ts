export interface Dispensing {
  id: number;
  machineId: number;
  recipeId: number;
  localDate: string;
  cupSize: string;
  status: string;
}