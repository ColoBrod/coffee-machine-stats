import React, { Component } from 'react';

// Components
import PageHeader from '~/components/PageHeader';
import { Data } from '~/models';
import Table from '~/components/Table';

interface Props {
  data: Data;
  refreshTime: Date | null;
}

class SalesExport extends Component<Props> {
  render() {
    const { data, refreshTime } = this.props;
    return (
      <div className='page'>
        <PageHeader data={data} title="Sales Export" refreshTime={refreshTime} />
        <Table data={data} />
      </div>
    );
  }
}

export default SalesExport