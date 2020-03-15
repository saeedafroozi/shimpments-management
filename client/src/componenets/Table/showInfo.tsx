import Modal from 'antd/es/modal';
import React from 'react'
import { observer, inject } from 'mobx-react';
import ShipmentStore from './store'
import { uuid } from 'uuid'

interface ShowInfoProps {
    shipmentStore?: ShipmentStore;
}

@inject("shipmentStore")
@observer
class ShowInfo extends React.Component<ShowInfoProps, {}>  {
    constructor(props) {
        super(props);
    }

    render() {
        const { extraInfo } = this.props.shipmentStore;

        return (
            <div className="showInfo">
                <p key={uuid}>
                    <span>ID:
                </span> {extraInfo.id}
                </p>
                <p key={uuid}>
                    <span>Name:
                </span>{extraInfo.name}</p>
                <p key={uuid}>
                    <span>Mode:
                </span>{extraInfo.mode}</p>
                <p key={uuid}>
                    <span>Destination:
                </span>{extraInfo.destination}
                </p>
                <p key={uuid}>
                    <span>Origin:
                </span>{extraInfo.origin}
                </p>
                <p key={uuid}>
                    <span>Status:
                </span>{extraInfo.status}
                </p>
                <p key={uuid}>
                    <span>Type:
                </span>{extraInfo.type}
                </p>
                <p key={uuid}>
                    <span>Total:
                </span> {extraInfo.total}
                </p>
                <p key={uuid}>
                    <span>UserId:
                </span>{extraInfo.userId}
                </p>
                <span>Cargo:
            </span> {extraInfo.cargo.map((item, index) => {
                    return <ul key={uuid}>
                        <li key={uuid}>
                            <span>Description:
                        </span> {item.description}
                        </li>
                        <li key={uuid}>
                            <span>Type:
                        </span>{item.type}
                        </li>
                        <li key={uuid}>
                            <span>Volume:
                        </span>{item.volume}
                        </li>
                    </ul>
                })}
                <span>
                    Services:
                </span >{extraInfo.services.map((item, index) =>
                    <ul>
                        <li key={uuid}>
                            <span >Type:
                    </span> {item.type}
                        </li>
                    </ul>

                )}
            </div>
        )
    }
}
export default ShowInfo;
