
import Divider from 'antd/es/divider';
import React from 'react'
const Action = ({ onShowClick, onEditClick }) => {
    return (<span>
        <a
            href="javascript:;"
            onClick={onShowClick}>ShowInfo
         </a>
        <Divider type="vertical" />
        <a
            href="javascript:;"
            onClick={onEditClick}>Edit
         </a>
    </span>)
}
export default Action;

