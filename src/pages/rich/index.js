import React from 'react'
import { Card,Button,Modal } from 'antd'
// 导入富文本
import { Editor } from 'react-draft-wysiwyg';
// 富文本样式
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// 将富文本转化成html文本
import draftjs from 'draftjs-to-html';




export default class RichText extends React.Component {

  state = {
    showRichText:false,
    editorState:''
  }


  // 清空内容
  handleClearContent = ()=>{
    this.setState({
      editorState:''
    });
  }

  // 获取
  handleGetText = () => {
    this.setState({
      showRichText:true
    });
  }

  //我们输入的任何内容都转换成 对象形式表达出来，
  // 然后draftjs-to-html 在将这个对象转换成html
  onEditorChange = (contentState)=>{
    this.setState({
      contentState
    });
  }

  onEditorStateChange = (editorState)=>{
    this.setState({
      editorState,
    });
  }


  render() {
    const { editorState } = this.state;

    return (
      <div>

        <Card>
          <Button type="primary" onClick={this.handleClearContent} style={{marginRight:10}}>清空内容</Button>
          <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
        </Card>

        <Card title="富文本编辑器">
          <Editor
            editorState={editorState} // 编辑状态
            onContentStateChange={this.onEditorChange} // 我们输入的文本
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>


        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={()=>{
            this.setState({
              showRichText:false
            })
          }}
          footer={null}
        >
          {draftjs(this.state.contentState)}
        </Modal>
      </div>
    );
  }
}


