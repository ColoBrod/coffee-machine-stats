// Libraries
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Styles
import './style/normalize.css';
import './style/index.css';
import './style/adaptiveness.css'
import './style/adaptiveness-debug.css'

// Services
import { fetchData } from "~/services";

// Pages
import SalesExport from "~/pages/SalesExport";
import Overview from "~/pages/Overview";
import NotFound from "~/pages/NotFound";

// Components
import Tabs from "~/components/Tabs";

// Interfaces
import { Data } from '~/models';

interface State {
  data: Data;
  refreshTime: Date | null;
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: {
        machines: [],
        dispensings: [],
        machinesModels: [],
        productGroups: [],
        recipes: [],
        syrups: [],
      },
      refreshTime: null,
    };
    this.refreshData = this.refreshData.bind(this);
  }

  render() {
    const basename = window.location.hostname === 'colobrod.github.io'
      ? '/coffee-machine-stats'
      : '/';
    console.log("%cDomain name:", "color: dodgerblue; font-size: 18px; font-weight: bold");
    console.log(window.location.hostname)
    console.log("%cBasename:", "color: dodgerblue; font-size: 18px; font-weight: bold");
    console.log(basename)

    return (
      <BrowserRouter basename={basename}>
        <div id="app" className="container">
          <Routes>
            <Route 
              path="/" 
              element={<Overview data={this.state.data} refreshTime={this.state.refreshTime} />} 
            />
            <Route 
              path="/sales-export" 
              element={<SalesExport data={this.state.data} refreshTime={this.state.refreshTime} />} 
            />
            <Route 
              path="*" 
              element={<NotFound />} 
            />
          </Routes>
        </div>
        <Tabs />  
      </BrowserRouter>
    );
  }

  async componentDidMount(): Promise<void> {
    this.refreshData();
    document.addEventListener('refresh-data', this.refreshData);
  }

  componentWillUnmount(): void {
    document.removeEventListener('refresh-data', this.refreshData);
  }

  private async refreshData() {
    const data = await fetchData();
    const refreshTime = new Date();
    this.setState({ data, refreshTime });
  }

};


export default App;