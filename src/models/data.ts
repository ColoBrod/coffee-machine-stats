import { Dispensing, Machine, MachineModel, ProductGroup, Recipe, Syrup } from "~/models";

export interface Data {
  machines: Machine[];
  dispensings: Dispensing[];
  machinesModels: MachineModel[];
  productGroups: ProductGroup[];
  recipes: Recipe[];
  syrups: Syrup[];
}