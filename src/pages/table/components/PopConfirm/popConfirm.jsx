import React, { Component } from "react";
import { Button, Icon } from "antd";
import { confirm, info } from "./confirm.jsx";
import "./popConfirm.css";
import "./animate.css";

function setBodyStyle(style) {
  let body = document.getElementsByTagName("body")[0];
  for(let name in style){
    body.setAttribute(name,style[name]);
  }
}

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStyle: "zoomIn",
      modalVisible: false,
      animateTimer: null
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.visible === nextProps.visible) return;
    if (nextProps.visible) {
      setBodyStyle({
        "overflow-y": "hidden"
      });
      this.setState({
        modalStyle: "zoomIn",
        modalVisible: nextProps.visible
      });
    } else {
      setBodyStyle({
        "overflow-y": "auto"
      });
      this.setState({
        modalStyle: "zoomOut"
      });
      this.setState({
        modalVisible: nextProps.visible
      });
    }
  }

  onHandleModalCancelClick(e) {
    // console.log("关闭弹窗==========", e.currentTarget, e.target);
    if (e.currentTarget == e.target) {
      this.props.onCancel && this.props.onCancel(e);
    }
  }

  onHandleActionBtnClick() {
    this.props.onOperate && this.props.onOperate();
  }

  render() {
    let { modalStyle, modalVisible } = this.state;

    const { actionText, onOperate, style } = this.props;

    const footer = actionText ? (
      <div className="custom-modal-footer">
        <Button
          className="modal-operate-btn"
          type="primary"
          onClick={e => this.onHandleActionBtnClick(e)}
        >
          {actionText}
        </Button>
      </div>
    ) : null;

    return (
      <div>
        <div
          className="custom-modal-mask"
          style={{ display: modalVisible ? "block" : "none" }}
        />
        <div
          className="custom-modal-wrapper"
          style={{ display: modalVisible ? "block" : "none" }}
          onClick={e => this.onHandleModalCancelClick(e)}
        >
          <div className={"custom-modal " + modalStyle} style={style}>
            <div className="custom-modal-content">
              <div className="custom-modal-header">
                <div className="custom-modal-title">{this.props.title}</div>
                <div
                  className="custom-modal-close"
                  onClick={e => this.onHandleModalCancelClick(e)}
                >
                  关闭
                </div>
              </div>
              <div className="custom-modal-body">{this.props.children}</div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class EasyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStyle: "zoomIn",
      modalVisible: false,
      lastTime: 0,
      currentTime: 0
    };
  }

  componentWillMount() { }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.visible === nextProps.visible) return;
    if (nextProps.visible) {
      setBodyStyle({
        "overflow-y": "hidden"
      });
      clearTimeout(this.timer);//先清除定时器，否则定时器未清除到时间又会设为false
      this.setState({
        modalStyle: "zoomIn",
        modalVisible: nextProps.visible
      });
    } else {
      setBodyStyle({
        "overflow-y": "auto"
      });
      this.setState({
        modalStyle: "zoomOut"
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          modalVisible: nextProps.visible
        });
      }, 350);
    }
  }
  componentWillUnmount() {
    setBodyStyle({
      "overflow-y": "auto"
    });
    // 组件卸载时清空componentWillReceiveProps中的setTimeout
    // 以免报无法在卸载函数中调用this.setState函数
    clearTimeout(this.timer);
  }
  onHandleModalCancelClick(e) {
    // console.log("关闭弹窗==========", e.currentTarget, e.target);
    if (e.currentTarget == e.target) {
      this.props.onCancel && this.props.onCancel(e);
    }
  }

  onHandleModalOkClick(e) {
    // console.log("======执行一下------");
    let { lastTime, currentTime } = this.state;
    currentTime = new Date();
    let timeInterval = currentTime - lastTime;
    if (timeInterval > 1000) {
      this.props.onOk && this.props.onOk(e);
    }
    this.setState({
      lastTime: currentTime
    });
  }


  onHandleEditModal() {
    this.props.onHandleEdit && this.props.onHandleEdit();
  }

  render() {
    let { modalStyle, modalVisible } = this.state;

    const {
      cancelText = "",
      okText = "保存",
      editText = "编辑",
      onHandleEdit,
      style = {},
      maskclosable = true,
      okStyle = {},
      zIndex,
      className
    } = this.props;
    return (
      <div className={className}>
        <div
          className="custom-modal-mask"
          style={{ display: modalVisible ? "block" : "none" , zIndex}}
        />
        <div
          className="custom-modal-wrapper"
          style={{ display: modalVisible ? "block" : "none", zIndex }}
          onClick={maskclosable ? e => this.onHandleModalCancelClick(e) : null}
        >
          <div className={"custom-modal " + modalStyle} style={style}>
            <div className="custom-modal-content">
              <div className="custom-modal-header">
                  {
                      (()=>{
                        // if(this.props.title === "房源详情模板"){
                        //   return <div
                        //       className="easy-modal-close">  </div>
                        // }
                        if(onHandleEdit){
                          return <div
                              className="easy-modal-close"
                              onClick={() => this.onHandleEditModal()}
                          >
                              {editText}
                          </div>
                        }else{
                          return <div
                              className="easy-modal-close"
                              onClick={e => this.onHandleModalCancelClick(e)}
                          >
                              {cancelText}
                          </div>
                        }
                      })()
                  }

                <div className="easy-modal-title">{this.props.title}</div>
                <div
                  className="easy-modal-ok"
                  style={okStyle}
                  onClick={e => this.onHandleModalOkClick(e)}
                >
                  {okText}
                </div>
              </div>
              <div className="custom-modal-body">{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ContentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStyle: "zoomIn",
      modalVisible: false
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.visible === nextProps.visible) return;
    if (nextProps.visible) {
      setBodyStyle({
        "overflow-y": "hidden"
      });
      clearTimeout(this.timer);
      this.setState({
        modalStyle: "zoomIn",
        modalVisible: nextProps.visible
      });
    } else {
      setBodyStyle({
        "overflow-y": "auto"
      });
      this.setState({
        modalStyle: "zoomOut"
      });
      if (this.isMount) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.setState({
            modalVisible: nextProps.visible
          });
        }, 350);
      }
    }
  }

  //fix写法
  componentDidMount() {
    this.isMount = true;
  }

  componentWillUnmount() {
    setBodyStyle({
      "overflow-y": "auto"
    });
    this.isMount = false;
    clearTimeout(this.timer);
  }

  onHandleModalCancelClick(e) {
    // console.log("关闭弹窗==========", e.currentTarget, e.target);
    if (e.currentTarget == e.target) {
      this.props.onCancel && this.props.onCancel(e);
    }
  }

  render() {
    const { maskClosable = false, style = {} } = this.props;
    let { modalStyle, modalVisible } = this.state;
    return (
      <div>
        <div
          className="custom-modal-mask"
          style={{ display: modalVisible ? "block" : "none" }}
        />
        <div
          className="custom-modal-wrapper"
          style={{ display: modalVisible ? "block" : "none" }}
          onClick={maskClosable ? e => this.onHandleModalCancelClick(e) : null}
        >
          <div className={"custom-modal " + modalStyle} style={style}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

class TabModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStyle: "zoomIn",
      modalVisible: false,
      lastTime: 0,
      currentTime: 0,
      isLoading: false
    };
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.modalVisible === nextProps.visible) return;
    if (nextProps.visible) {
      setBodyStyle({
        "overflow-y": "hidden"
      });
      clearTimeout(this.timer);
      this.setState({
        modalStyle: "zoomIn",
        modalVisible: nextProps.visible
      });
    } else {
      setBodyStyle({
        "overflow-y": "auto"
      });
      this.setState({
        modalStyle: "zoomOut"
      });
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.setState({
          modalVisible: nextProps.visible
        });
      }, 350);
    }
    this.setState({ isLoading: nextProps.isLoading });
  }
  componentWillUnmount() {
    setBodyStyle({
      "overflow-y": "auto"
    });
    clearTimeout(this.timer);
  }
  onHandleModalCancelClick(e) {
    // console.log("关闭弹窗==========", e.currentTarget, e.target);
    if (e.currentTarget == e.target) {
      this.props.onCancel && this.props.onCancel(e);
    }
  }

  onHandleModalOkClick(e) {
    // console.log("======执行一下------");
    let { lastTime, currentTime, isLoading } = this.state;
    if (isLoading) {
      return;
    }
    currentTime = new Date();
    let timeInterval = currentTime - lastTime;
    if (timeInterval > 1000) {
      this.props.onOk && this.props.onOk(e);
    }
    this.setState({
      lastTime: currentTime
    });
  }


  onHandleEditModal() {
    this.props.onHandleEdit && this.props.onHandleEdit();
  }

  render() {
    let { modalStyle, modalVisible, isLoading } = this.state;

    const {
      cancelText = "",
      okText = "保存",
      editText = "编辑",
      onHandleEdit,
      style = {},
      maskclosable = true,
      tab,
      title,
      message,
      className,
      name
    } = this.props;

    return (
      <div className={className} style={{ display: modalVisible ? "block" : "none" }}>
        <div> <div className="custom-modal-mask" /> </div>

        <div
          className="custom-modal-wrapper"
          onClick={maskclosable ? e => this.onHandleModalCancelClick(e) : null}
          >
          <div className={"custom-modal " + modalStyle} style={style}>
            {name && <div className="custom-modal-name">{name}</div>}
            <div className="custom-modal-content">
              <div className="custom-modal-tab-header">
                <div
                  className="custom-modal-header-center"
                  style={{
                    alignItems: "center",
                    border: "none",
                    paddingBottom: 0
                  }}
                >
                  {onHandleEdit ? (
                    <div
                      className="tab-modal-close"
                      onClick={() => this.onHandleEditModal()}
                    >
                      {editText}
                    </div>
                  ) : (
                      <div
                        className="tab-modal-close"
                        onClick={e => this.onHandleModalCancelClick(e)}

                      >
                        {cancelText}
                      </div>
                    )}
                  {tab ? tab : <div className="easy-modal-title">{title}</div>}
                  <div
                    className="tab-modal-ok"
                    onClick={e => this.onHandleModalOkClick(e)}
                    style={{
                      color: isLoading && "#666"
                    }}
                  >
                    {okText}
                    {isLoading && (
                      <Icon type="loading" style={{ marginLeft: 5 }} />
                    )}
                  </div>
                </div>
                <div>{message}</div>
              </div>
              <div className="custom-modal-body">{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


CustomModal.confirm = function (config) {
  return confirm(config);
};

CustomModal.info = function (config) {
  return info(config);
};

export { CustomModal, EasyModal, ContentModal, TabModal};
