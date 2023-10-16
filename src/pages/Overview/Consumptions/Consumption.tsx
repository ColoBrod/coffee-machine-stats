import React, { Component, ReactNode } from 'react';

export interface Props {
  imgPath: string;
  amount: number;
  description: string | ReactNode;
}

class Consumption extends Component<Props> {
  render(): ReactNode {
    const { amount, imgPath, description } = this.props;
    return (
      <div className="consumption">
        <img src={imgPath} /> 
        <div className="inner">
          <div className="amount">
            { amount.toFixed(2) }
          </div>
          <div className="description">
            { description }
          </div>
        </div>
      </div>
    );
  }
}

export default Consumption;
