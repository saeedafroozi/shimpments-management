interface cargoItem {
  type: string;
  description: string,
  volume: number
}
interface serviceItem {
  type: string;
}
interface Shipment {
  id: string;
  name: string;
  cargo: cargoItem[];
  mode: string;
  type: string;
  destination: string;
  origin: string;
  services: serviceItem[];
  total: number;
  status: string;
  userId: string;
}
interface searchParam {
  pageIndex: number;
  sortField: string;
  sortOrder: OrderType;
}
interface ResponseResult {
  value: Shipment[];
  total: number;
}
interface ITransportLayer{
  getServerData(url: string, changePagination: boolean = true):Promise<ResponseResult>;
}

