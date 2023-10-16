import React, { Component } from 'react';

interface Props {
  header: string;
  order: string;
}

class TH extends Component<Props> {
  render(): React.ReactNode {
    const { header } = this.props;
    return (
      <th>
        <span>{header}</span>
        {/* <span className=''></span> */}
      </th>
    );
  }
}

export default TH;
