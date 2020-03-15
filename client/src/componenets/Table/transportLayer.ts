import { ITEM_SIZE } from '../../constants/constant'
export default class TransportLayer implements ITransportLayer {
    getServerData(url: string, changePagination: boolean = true): Promise<ResponseResult> {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    response.json()
                        .then((data) => {
                            resolve({
                                value: data,
                                total: changePagination ? Number(response.headers.get('X-Total-Count')) : ITEM_SIZE
                            })
                        })
                })
        });
    }
}