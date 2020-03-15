import { Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import React from 'react'
import ShipmentStore from '../Table/store'
import { observer, inject } from 'mobx-react';

interface FilterProps {
    shipmentStore?:ShipmentStore;
}

interface FilterState {
    searchValue: string;
}

@inject("shipmentStore")
@observer
class Filter extends React.Component<FilterProps, FilterState>  {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        }
    }

    handleOnChange = event => {
        const value = event.target.value;
        this.setState({ searchValue: value });
    }
    
    handleSearch = event => {
        const { searchValue } = this.state;
         this.props.shipmentStore.search(searchValue);
    
    }
    render() {
        const { searchValue } = this.state;
        return <div className="filter" >
            <Input
                placeholder={`Search By Id`}
                value={searchValue}
                onChange={this.handleOnChange}
                onPressEnter={this.handleSearch}

            />
            <Button
                type="primary"
                onClick={this.handleSearch}
                icon="search"
                size="small"
                className="button"
            >
                Search
        </Button>
        </div>
    }
}


export default Filter;


