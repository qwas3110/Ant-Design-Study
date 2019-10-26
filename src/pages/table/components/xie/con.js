import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './confirm.css';


const ConfirmDialog = (props) => {
  const {
    visible,
    cancelText="取消",
    okText="确定",
    close,
    onCancel,
    onOk,
    type="confirm",
    okBtnDisable=false,
    isRedBtnText=false,
    styles={}
  } = props;
  const title = props.title || "";

  const content = props.content || "";

  const style = props.style || {};

  const classnames = props.classnames || "zoomIn";

  function sure(isFromOk) {
    if(onOk && okBtnDisable===false){
      onOk();
    }
    if(isFromOk===false || okBtnDisable=== false){
      close();
    }
  }

  let inlineStyle = {};

  if(isRedBtnText){
    inlineStyle.color="#FF3B30";
  }
  console.log(styles,"styles")

  return (
    <div>
      <div className="custom-modal-mask" style={{display:visible?"block":"none"}} ></div>
      <div className="custom-modal-wrapper" style={{...styles,display:visible?"block":"none"}}>
        <div className={"confirm-modal " + classnames} style={style}>
          <div className="confirm-modal-title" style={inlineStyle}>{title}</div>
          <div className="confirm-modal-content">{content}</div>
          {
            type=="confirm"?
              <div className="confirm-modal-action-btn-box">
                <div className="confirm-cancel-btn" onClick={close.bind(this, { triggerCancel: true })}>{cancelText}</div>
                <div className={okBtnDisable?"confirm-sure-btn confirm-sure-btn-disable":"confirm-sure-btn"} style={inlineStyle} onClick={sure.bind(null,true)}>{okText}</div>
              </div>
              :
              <div className="confirm-modal-action-btn-box" onClick={sure.bind(null,false)}>
                <div style={inlineStyle} className={okBtnDisable?"confirm-sure-btn confirm-sure-btn-middle confirm-sure-btn-disable":"confirm-sure-btn confirm-sure-btn-middle"}>{okText}</div>
              </div>
          }
        </div>
      </div>
    </div>
  )
};


function confirmType (config, type) {
  let div = document.createElement('div');
  document.body.appendChild(div);

  function render(props) {
    ReactDOM.render(<ConfirmDialog type={type} {...props} />, div);
  }

  function close(...args) {
    render({...config, close, visible:true, classnames: "zoomOut"});
    setTimeout(() => {
      destroy(...args);
    }, 350);
  }

  function destroy(...args) {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);

    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    clearInterval(interval);
    const triggerCancel = args && args.length &&
      args.some(param => param && param.triggerCancel);

    if (config.onCancel && triggerCancel) {
      config.onCancel(...args);
    }
  }

  let timeoutClick = config.timeoutClick/1000 || "0";

  config.okText = config.okText || "确认";
  let original = config.okText;

  let interval = null;
  if(timeoutClick>0){
    config.okBtnDisable = true;
    config.okText = `${original}(${timeoutClick}s)`

    interval = setInterval(()=>{
      timeoutClick--;
      if(timeoutClick<=0){
        config.okBtnDisable = false;
        config.okText = original;
        clearInterval(interval);
      }else{
        config.okBtnDisable = true;
        config.okText = `${original}(${timeoutClick}s)`
      }
      render({ ...config, visible: true, close});
    },1000);
  }


  render({ ...config, visible: true, close});

  return {
    destroy: close,
  };

}


export const confirm = (config) => {
  return confirmType(config,"confirm")
}
export const info = (config) => {
  return confirmType(config,"info");
}
