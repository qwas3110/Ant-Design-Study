import React from 'react';
import { Select } from 'antd'
const Option = Select.Option;
export default {
  formateDate(time){
    if(!time)return '';
    let date = new Date(time);
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  },
  pagination(data,callback){
    return {
      onChange:(current)=>{
        callback(current)
      },
      current:data.result.page,
      pageSize:data.result.page_size,
      total: data.result.total_count,
      showTotal:()=>{
        return `共${data.result.total_count}条`
      },
      showQuickJumper:true
    }
  },
  //处理Option方法
  getOptionList(data){
    if(!data){
      return [];
    }
    let options = [] //[<Option value="0" key="all_key">全部</Option>];
    data.map((item)=>{
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options;
  },

  //做一些 table 多选或单选的封装
  updateSelectedItem(selectedRowKeys, selectedItem, selectedIds){
    if (selectedIds){
      this.setState({
        selectedRowKeys,
        selectedItem,
        selectedIds
      })
    }else{
      this.setState({
        selectedRowKeys,
        selectedItem
      })
    }
  }
}
