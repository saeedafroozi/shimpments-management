import React from 'react'
import { observer, inject } from 'mobx-react';
import ShipmentStore from './store'

interface EditCellProps {
    record: Shipment;
    text: string;
    shipmentStore?: ShipmentStore;
}

interface EditCellState {
    inputValue: string;
}

@inject("shipmentStore")
@observer
class EditCell extends React.Component<EditCellProps, EditCellState> {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: props.text,
        }
    }
    
    onNameChange = (event) => {
        const value = event.currentTarget.value;
        this.setState({ inputValue: value });
    }

    handleFocusOut = (event, id) => {
        this.props.shipmentStore.editRowCell(id, this.state.inputValue);
    }

    render() {
        const { shipmentStore, record, text } = this.props;
        return shipmentStore.editingRowId === record.id ?
            <input
                onBlur={(event) => this.handleFocusOut(event, record.id)}
                value={this.state.inputValue}
                onChange={this.onNameChange}
                autoFocus={true}
            />
            : <p>
                {record.name}
            </p>
    }
}
export default EditCell;