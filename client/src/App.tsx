import React from 'react';
import logo from './logo.svg';
import '../src/resources/styles/App.scss';
import { ShipmentTable, ShipmentStore } from '../src/componenets/Table/index'
import { Provider } from 'mobx-react'
import  TransportLayer  from './componenets/Table/transportLayer'

const transportLayer=new TransportLayer();

const shipmentStore = new ShipmentStore(transportLayer);
const App: React.FC = () => {
  return (
    <Provider shipmentStore={shipmentStore} >
      <div className="app">
        <ShipmentTable />
      </div>
    </Provider>
  );
}

export default App;
