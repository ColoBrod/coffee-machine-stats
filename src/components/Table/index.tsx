import React, { Component, ReactNode } from 'react';

import './style.css'
import { Data } from '~/models';

import imgCheckmark from './img/checkmark.png';

interface Props {
  data: Data;
}

interface Row {
  customMachineName: string;
  path: string;
  productGroup: string;
  machineNumber: string;
  sku: number;
  recipeName: string;
  localDate: Date;
  cupSize: string;
  status: string;
}

interface State {
  orderBy: {
    column: string;
    desc: boolean;
  } | null;
}

const ths = [
  { key: "customMachineName", value: "CustomMachineName" },
  { key: "path", value: "Path" },
  { key: "productGroup", value: "ProductGroup" },
  { key: "machineNumber", value: "MachineNumber" },
  { key: "localDate", value: "LocalDate" },
  { key: "sku", value: "SKU" },
  { key: "recipeName", value: "Recipe" },
  { key: "status", value: "Status" },
  { key: "summedDispensings", value: "SummedDispensings" },
];

class Table extends Component<Props, State> {
  state: State = {
    orderBy: null,
  }

  render() {
    const { orderBy } = this.state;
    const content = this.joinData();
    orderBy && this.sort(content, orderBy.column, orderBy.desc);
    return (
      <>
        <div className="table-export">
          <div>
            To export data click on the '...' symbol on the top right corner of the table and select 'Export data'. 
          </div>
          <div>
            <img src={imgCheckmark} alt="" />
            <div>
              <div>
                Export file has {this.rowNumber} rows
              </div>
              <div>
                small file size (no export restriction)
              </div>
            </div>
          </div>
        </div>
        <div className="info-block info-block__table">
          <table>
            <thead>
              <tr>
                {
                  ths.map(h => (
                    <th 
                      key={h.key}
                      onClick={() => this.handleClick(h.key)} 
                      className={
                        orderBy?.column === h.key
                          ? orderBy.desc 
                            ? "down" 
                            : "up"
                          : "default"
                      }
                    >{h.value}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                content.map((row, i) => this.renderRow(row, i))
              }
            </tbody>
          </table>
        </div>
      </>
    );
  }

  private get rowNumber(): number {
    return this.props.data.dispensings.length;
  }

  private renderRow(row: Row, key: number): ReactNode {
    return (
      <tr key={key}>
        <td>{row.customMachineName}</td>
        <td>{row.path}</td>
        <td>{row.productGroup}</td>
        <td>{row.machineNumber}</td>
        <td>{row.localDate.toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
        <td>{row.sku}</td>
        <td>{row.recipeName}</td>
        <td>{row.status}</td>
        <td></td>
      </tr>
    );
  }

  private joinData(): Row[] {
    const { data } = this.props;
    const { 
      dispensings, 
      machines, 
      machinesModels, 
      productGroups, 
      recipes
    } = data
    const content = dispensings.map(disp => {
      const { localDate: localDateStr, cupSize, status } = disp;
      const machine = machines
        .find(machine => machine.id === disp.machineId);
      const machineModel = machine 
        ? machinesModels.find(model => machine.modelId === model.id)
        : null;
      const customMachineName = machineModel ? machineModel.name : "";
      const path = machine ? machine.path : "";
      const group = productGroups.find(group => machineModel?.groupId === group.id);
      const productGroup = group ? group.name : "";
      const recipe = recipes
        .find(recipe => recipe.id === disp.recipeId);
      const recipeName = recipe ? recipe.name : "";
      const machineNumber = machine ? machine.number : "";
      const sku = machineModel ? machineModel.sku : 0;
      const localDate = new Date(localDateStr);

      return {
        customMachineName,
        path,
        productGroup, 
        machineNumber,
        sku,
        localDate,
        recipeName,
        cupSize,
        status,
      };
    }); 
    // const contentDistinct = [...new Map(content.map(item =>
    //   [item[key], item])).values()];
    return content;
  }

  private handleClick(column: string) {
    let desc: boolean;
    if (column === this.state.orderBy?.column) desc = !this.state.orderBy.desc;
    else desc = true;
    const orderBy = { column, desc };
    this.setState({ orderBy });
  }

  private sort(content: Row[], orderBy: string, desc: boolean) {
    content.sort((a, b) => {
      // @ts-ignore
      if (a[orderBy] < b[orderBy]) return desc ? -1 : 1;
      // @ts-ignore
      else if (a[orderBy] > b[orderBy]) return desc ? 1 : -1;
      return 0;
    })
  }

}

export default Table;