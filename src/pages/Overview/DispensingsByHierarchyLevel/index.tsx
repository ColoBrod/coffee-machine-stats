import React, { Component } from 'react';

import './style.css';
import BarChart from '~/components/BarChart';
import { ChartConfiguration } from 'chart.js/auto';
import { Data } from '~/models';

import { calcPeriod } from '~/services/calc-period';

interface Props {
  data: Data
}

class DispensingsByHierarchyLevel extends Component<Props> {
  private config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: [ "TAT" ],
      datasets: [],
    },
    options: {
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: {
          align: 'start',
          position: 'top',
        },
      },
      responsive: true,
    }
  }
  
  render() {
    const stats = this.getStats();
    const period = calcPeriod(this.props.data.dispensings);
    this.config.data.datasets = [
      {
        label: 'TAT',
        data: [stats.average],
        backgroundColor: '#999999',
      },
    ];
    const chartDisplay = stats.average ? true : false;

    return (
      <div className="info-block with-chart dispensings-by-hierarchy-level">
        <header>Dispensings by Hierarchy Level (Average per Machine)</header>
        <div>
          <div className="chart-wrapper">
            {
              chartDisplay && <BarChart id="dispensings-by-hierarchy-level" config={this.config} />
            }
          </div>
          <aside>
            <div>
              <div className="amount">{stats.max}</div>
              <div className="description">
                Dispensings were served <span>in the highest rank</span>
              </div>
            </div>
            <div>
              <div className="amount">{stats.average.toFixed(2)}</div>
              <div className="description">
                on average per machine within the last <span>{period}</span> days
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  private getStats(): { average: number; max: number; } {
    const { dispensings } = this.props.data;
    
    const countByMachineId = dispensings.reduce((accumulator, disp) => {
      const machineId = disp.machineId;
      // @ts-ignore
      accumulator[machineId] = (accumulator[machineId] || 0) + 1;
      return accumulator;
    }, {});
    const values = Object.values(countByMachineId) as number[];

    const max = Math.max(...values);
    const sum = values.reduce((accumulator, curr) => accumulator + curr, 0);
    const average = sum / values.length;

    return { average, max };
  }
}

export default DispensingsByHierarchyLevel;