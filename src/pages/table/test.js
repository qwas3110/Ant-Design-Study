import React from 'react'
import {Modal,Form,Button} from "antd";
import {CustomModal,EasyModal,ContentModal,TabModal} from "./components/PopConfirm/popConfirm";






class Test extends React.Component {

  state = {
    visible: false,
    waitTime: 10,
  };


  handleSHow = () => {
    this.setState({visible:true})
  };


  handleHide = () => {
    this.setState({
      visible: false
    })
  };









  render() {
    return (
      <div className="App">
        <Button
          onClick={() => this.handleSHow()}
          >
          click
        </Button>

        <TabModal
          title="标题"
          visible={this.state.visible}
          okText="关闭"
          onOk={this.handleHide}


          >

        </TabModal>
      </div>
    );
  }
}




export default Test;
