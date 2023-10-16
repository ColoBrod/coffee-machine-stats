import React, { Component } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';

interface Props {
  id: string;
  config: ChartConfiguration;
}

class BarChart extends Component<Props> {

	private chartRef = React.createRef<HTMLCanvasElement>();

  componentDidMount() {
    const { config } = this.props;
    const node = this.chartRef.current;
		const ctx = node?.getContext("2d");
    if (ctx) new Chart(ctx, config);
	}

  render() {
    const { id } = this.props;
		return (
      <canvas
        id={id}
        ref={this.chartRef}
      />
    )
	}
}

export default BarChart;