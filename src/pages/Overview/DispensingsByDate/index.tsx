import React, { Component, ReactNode } from 'react';
import { Data, Dispensing } from "~/models";

import './style.css';
import BarChart from '~/components/BarChart';
import { ChartConfiguration } from 'chart.js/auto';

interface Props {
  data: Data;
  refreshTime: Date | null;
}

class DispensingsByDate extends Component<Props> {
  private config: ChartConfiguration = {
    type: 'bar',
    data: {
      labels: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
      datasets: [],
    },
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

  render(): ReactNode {
    const currentWeek = this.getWeekData('current');
    const previousWeek = this.getWeekData('previous');
    this.config.data.datasets = [
      {
        label: 'Current Week',
        data: currentWeek,
        backgroundColor: '#3F3E43',
      },
      {
        label: 'Previous Week',
        data: previousWeek,
        backgroundColor: '#999999',
      },
    ];
    const chartDisplay = currentWeek.length || previousWeek.length
    const currentWeekTotal = currentWeek.length
      ? currentWeek.reduce((acc, value) => acc + value)
      : 0;
    const previousWeekTotal = previousWeek.length
      ? previousWeek.reduce((acc, value) => acc + value)
      : 0;
    return(
      <div className="info-block with-chart dispensings-by-date">
        <header>Dispensings by Date</header>
        <div>
          <div className="chart-wrapper">
            {
              chartDisplay && <BarChart id="dispensings-by-date" config={this.config} />
            }
          </div>
          <div className="dispensings-total">
            <div className="dispensings-total__current-week">
              <div className="amount">{currentWeekTotal}</div>
              <div className="description">
                Dispensings were served within the <span>current</span> week
              </div>
            </div>
            <div className="dispensings-total__previous-week">
              <div className="amount">{previousWeekTotal}</div>
              <div className="description">
                Dispensings were served within the <span>previous</span> week
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private getWeekData(week: 'current' | 'previous'): number[] {
    const { data, refreshTime } = this.props;
    if (!refreshTime) return [];
    const date = new Date(refreshTime)
    week === 'previous' && date.setDate(date.getDate() - 7);

    // Вычисляем день недели (0 - воскресенье, 1 - понедельник, и так далее)
    const currentDayOfWeek = date.getDay();

    // Вычисляем разницу между текущим днем и понедельником (первым днем недели)
    const daysUntilMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

    // Вычисляем первый день недели (понедельник)
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - daysUntilMonday);
    firstDayOfWeek.setHours(0);
    firstDayOfWeek.setMinutes(0);
    firstDayOfWeek.setSeconds(0);

    // Вычисляем последний день недели (воскресенье)
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    lastDayOfWeek.setHours(23);
    lastDayOfWeek.setMinutes(59);
    lastDayOfWeek.setSeconds(59);

    // Выводим результат
    const dispensings: Dispensing[] = data.dispensings.filter(disp => {
      const dispDate = new Date(disp.localDate);
      return dispDate >= firstDayOfWeek && dispDate <= lastDayOfWeek;
    });
    const dates: Date[] = dispensings.map(disp => new Date(disp.localDate))

    dates.sort((a, b) => {
      if (a < b) return -1;
      else if (a > b) return 1;
      return 0;
    });

    const values = [0, 0, 0, 0, 0, 0, 0];
    let i = 0;
    const date1 = new Date(firstDayOfWeek);
    for (let k = 0; k < dates.length; k++) {
      const date2 = dates[k];
      while (date1.getDate() != date2.getDate()) {
        date1.setDate(date1.getDate() + 1);
        i++;
      };
      values[i] = values[i] + 1;
    }

    return values;
  }

}

export default DispensingsByDate;

