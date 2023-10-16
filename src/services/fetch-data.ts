import machines from './machines.json';
import dispensings from './dispensings.json';
import machinesModels from './machines-models.json';
import productGroups from './product-groups.json';
import recipes from './recipes.json';
import syrups from './syrups.json';

import { Data } from '~/models';

export async function fetchData(): Promise<Data> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        machines,
        dispensings,
        machinesModels,
        productGroups,
        recipes,
        syrups,
      });
    }, 10);
  })
}