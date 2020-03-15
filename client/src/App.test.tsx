import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ShipmentStore from '../src/componenets/Table/store'
import TransportLayer  from '../src/componenets/__mock__/transportLayer'
import {OrderType} from '../src/config/enum'

import { observable, useStrict } from 'mobx';

let store: ShipmentStore = null;
const transportLayer=new TransportLayer();

describe("ShipmentStore", () => {
  beforeEach(() => {

    store = new ShipmentStore(transportLayer);
    store.init();
  });
  

  it("makes sure init is Correct", async () => {
     
    expect(store.pageIndex).toBe(1);
    expect(store.editingRowId).toBe(null);
    expect(store.extraInfo).toBe(null);
    expect(store.loading).toBe(false);
    expect(store.modalVisible).toBe(false);
    expect(store.total).toBe(1);
  });


  it("makes sure setModalVisibility work  as expected", async () => {
    await store.setModalVisibility(true);
    expect(store.modalVisible).toBe(true);
  });

  it("makes sure setEditingRowId work  as expected", async () => {
    await store.setEditingRowId("S123");
    expect(store.editingRowId).toBe("S123");
  });
  
  it('test search result', async () => { 
    await store.search('ABC');

    expect(store.total).toBe(1);
    expect(store.loading).toBe(false);
    expect(store.requestData.length).toBe(1);
  });

  it('test showInfo', async () => {
    
    await store.showInfo('s1');

    expect(store.total).toBe(1);
    expect(store.loading).toBe(false);
    expect(store.requestData.length).toBe(1);
  });

  it('test sortTable', async () => {
    
    await store.sortTable({pageIndex:1, sortField:"name", sortOrder:OrderType.asc });
    expect(store.loading).toBe(false);
    expect(store.requestData.length).toBe(1);
    expect(store.pageIndex).toBe(1);
  });

})