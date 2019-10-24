import React from 'react';
import Utils from './../../utils/utils'
import { Table } from 'antd';

export default class ETable extends React.Component{

    onRowClick = (record,index)=>{
        //判断是够单选或复选，你不传认为你是单选，传值的实话认为你是复选
        let rowSelection = this.props.rowSelection;
        if (rowSelection=='checkbox'){
            let selectedRowKeys = this.props.selectedRowKeys;
            let selectedItem = this.props.selectedItem;
            let selectedIds = this.props.selectedIds;
            if (selectedIds){
                const i = selectedIds.indexOf(record.id);
                if(i == -1){
                    selectedIds.push(record.id);
                    selectedRowKeys.push(index);
                    selectedItem.push(record);
                }else{
                    selectedIds.splice(i,1);
                    selectedRowKeys.splice(i, 1);
                    selectedItem.splice(i, 1);
                }
            }else{
                selectedIds = [record.id];
                selectedRowKeys = [index];
                selectedItem = [record];
            }
            this.props.updateSelectedItem(selectedRowKeys, selectedItem, selectedIds)
        }else{
            let selectedRowKeys = [index];
            let selectedItem = record;
            this.props.updateSelectedItem(selectedRowKeys, selectedItem)
        }
    }

    // table 初始化
    tableInit = ()=>{
        let row_selection = this.props.rowSelection;
        // 你当前点的哪一行
        let selectedRowKeys = this.props.selectedRowKeys;
        const rowSelection = {
            type:'radio',
            selectedRowKeys
        }
        // 判断是否不需要单选或者复选
        if (row_selection === false || row_selection === null){
            row_selection = false;
        //  判断是否需要多选
        } else if (row_selection == 'checkbox'){
            rowSelection.type = 'checkbox';
          // 默认输出单选
        } else {
            row_selection = 'radio';
        }
        //{...this.props} 外面传入的参数进行结构，剩下为公共机制需要判断的
        return <Table
            bordered
            {...this.props}
            rowSelection={row_selection ? rowSelection:null}
            onRow={(record, index) => {
                return {
                    onClick: () => {
                        if (!row_selection){
                            return;
                        }
                        this.onRowClick(record, index);
                    }
                };
            }}
        />
    }

    render(){
        return (<div>
            {/*使用*/}
            { this.tableInit()}
        </div>);
    }
}
