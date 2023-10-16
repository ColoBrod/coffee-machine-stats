import React, { Component } from 'react';

// Components
import PageHeader from '~/components/PageHeader';
import { Data } from '~/models';
import DispensingsByDate from './DispensingsByDate';
import Consumptions from './Consumptions';
import Cleanings from './Cleanings';
import DispensingsByHierarchyLevel from './DispensingsByHierarchyLevel';

import './style.css';

interface Props {
  data: Data;
  refreshTime: Date | null;
}

class Overview extends Component<Props> {
  render() {
    const { data, refreshTime } = this.props;
    return (
      <div className='page'>
        <PageHeader data={data} title="Overview" refreshTime={refreshTime} />
        <div className="page__overview">
          <DispensingsByDate data={data} refreshTime={refreshTime} />
          <Consumptions data={data} />
          <Cleanings />
          <DispensingsByHierarchyLevel data={data} />
        </div>
      </div>
    );
  }
}

export default Overview