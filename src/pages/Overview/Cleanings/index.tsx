import React, { Component } from 'react';

import './style.css';
import BarChart from '~/components/BarChart';
import { ChartConfiguration } from 'chart.js/auto';

const data = {
  labels: [ "Number of cleanings" ],
  datasets: [
    {
      label: 'Current Week',
      data: [1.05],
      backgroundColor: '#3F3E43',
    },
    {
      label: 'Previous Week',
      data: [0.89],
      backgroundColor: '#999999',
    },
  ]
};

class Cleanings extends Component {
  private config: ChartConfiguration = {
    type: 'bar',
    data,
    options: {
      maintainAspectRatio: false,
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
    return (
      <div className="info-block with-chart cleanings">
        <header>Cleanings</header>
        <div>
          <div className="chart-wrapper">
            <BarChart id="cleanings" config={this.config} />
          </div>
          <aside>
            <div>
              <div className="amount">1.05</div>
              <div className="description">
                times on average was each machine cleaned per day within the <span>current</span> week
              </div>
            </div>
            <div>
              <div className="amount">0.89</div>
              <div className="description">
              times on average was each machine cleaned per day within the <span>previous</span> week
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }
}

export default Cleanings;