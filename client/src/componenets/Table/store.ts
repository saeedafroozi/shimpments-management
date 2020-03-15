
import { observable, action, transaction } from 'mobx'
import { shipmentApi } from '../../constants/api'
import { throwStatement } from '@babel/types';
import { object } from 'prop-types';
import { PAGE_SIZE } from '../../constants/constant'
import { OrderType } from '../../config/enum'


class ShipmentStore {
	@observable requestData: Shipment[];
	@observable extraInfo: Shipment;
	@observable pageIndex: number;
	@observable editingRowId: string;
	@observable loading: boolean;
	@observable modalVisible: boolean;
	@observable total: number;
	@observable SearchValue:string;

	transportLayer: ITransportLayer;

	constructor(transportLayer) {
		this.pageIndex = 1;
		this.requestData = [];
		this.extraInfo = null;
		this.modalVisible = false;
		this.editingRowId = null;
		this.loading = false;
		this.total = 0;
		this.transportLayer = transportLayer;
		this.SearchValue="";
	}
	
	@action
	init() {
		this.loading = true;
		this.transportLayer.getServerData(`${shipmentApi}?_page=${this.pageIndex}&_limit=${PAGE_SIZE}`)
			.then(({ value, total }:ResponseResult) => {
				action(() => {
					this.loading = false;
					this.requestData = value;
					this.total = total;
				})();
			});
	}
	
	@action
	search(searchText) {
		this.loading = true;
		this.transportLayer.getServerData(`${shipmentApi}?id_like=${searchText}&_page=${1}`)
			.then(({ value, total }:ResponseResult) => {
				action(() => {
					this.total = total;
					this.requestData = value;
					this.loading = false;
					this.SearchValue=searchText;
				})();
			});
	}
	
	@action
	showInfo(id) {
		this.transportLayer.getServerData(`${shipmentApi}?id=${id}`, false).
			then(({ value, total }:ResponseResult) => {
				action(() => {
					this.extraInfo = value[0];
					this.modalVisible = true;
					this.loading = false;
				})();
			});
	}
	
	@action
	setModalVisibility(visibility: boolean) {
		this.modalVisible = visibility;
	}
	
	@action
	setEditingRowId(editingRowId: string) {
		this.editingRowId = editingRowId;
	}

	@action
	sortTable(params: searchParam) {
		const { pageIndex, sortField, sortOrder } = params;
		this.transportLayer.getServerData(`${shipmentApi}?_page=${pageIndex}&_limit=${PAGE_SIZE}&_sort=${sortField}&_order=${OrderType[sortOrder]}${this.SearchValue ? `&id_like=${this.SearchValue}` :""}`)
			.then(({ value, total }:ResponseResult) => {
				action(() => {
					this.requestData = value;
					this.pageIndex = pageIndex;
					this.loading = false;
					this.total=total;
				})();
			});
	}

	@action
	editRowCell(id: string, value: string) {
		const index = this.requestData.findIndex(x => x.id === id);
		fetch(`${shipmentApi}/${id}`, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				id: `${id}`,
				name: value,
				cargo: [...this.requestData[index].cargo],
				mode: this.requestData[index].mode,
				type: this.requestData[index].type,
				destination: this.requestData[index].destination,
				origin: this.requestData[index].origin,
				services: [...this.requestData[index].services],
				total: this.requestData[index].total,
				status: this.requestData[index].status,
				userId: this.requestData[index].userId
			})
		})
			.then(response => response.json())
			.then((responseData) => {
				action(() => {
					this.requestData[index].name = value;
					this.editingRowId = "";
					this.loading = false;
				})();

			})
	}
}
export default ShipmentStore