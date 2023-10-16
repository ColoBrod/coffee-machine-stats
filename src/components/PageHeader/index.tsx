import React, { Component, ReactNode } from 'react';

import './style.css';
import { Data } from '~/models';

import imgCoffeeMachine from './img/coffee-machine.png';
import imgDispensing from './img/dispensing.png';
import imgRefresh from './img/refresh.png';
import { calcPeriod } from '~/services/calc-period';

interface Props {
  title: string;
  data?: Data;
  refreshTime?: Date | null;
}

class PageHeader extends Component<Props> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { title, data } = this.props;

    return (
      <header className="page-header">
        <h1>{title}</h1>
        { data && this.renderStats() }
      </header>
    );
  }

  private renderStats(): ReactNode {
    const { data, refreshTime } = this.props;
    const dispensingsTotal = data?.dispensings
      ? data.dispensings.length
      : 0;
    const period = data?.dispensings
      ? calcPeriod(data?.dispensings)
      : -1;
    const machinesTotal = data?.machines
      ? data.machines.length
      : 0;
    if (!data) return null;
    return (
      <>
        <div className="stats coffee-consumption">
          <img src={imgCoffeeMachine} alt="Coffee Machine" />
          <div className='stats-inner'>
            {machinesTotal}
          </div>
        </div>
        <div className="divider" />
        <div className="stats dispensings">
          <img src={imgDispensing} alt="Dispensings Total" />
          <div className='stats-inner'>
            {dispensingsTotal}
            <span>within the last {period} days</span>
          </div>
        </div>
        <div className="divider" />
        <div className="stats refresh-time">
          <img src={imgRefresh} onClick={this.handleClick} alt="Refresh Data" />
          <div className='stats-inner'>
            { 
              refreshTime && 
              refreshTime.toLocaleString('ru', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })
            }
          </div>
        </div>
      </>
    )
  }

  handleClick() {
    const event = new Event('refresh-data');
    document.dispatchEvent(event);
  }

}

export default PageHeader;