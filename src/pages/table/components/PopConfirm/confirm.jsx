import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './confirm.css';

const ConfirmDialog = (props) =>{

    //visible,
    // cancelText="取消",
    // okText="确定",
    // close,
    // onCancel,
    // onOk,
    // type="confirm",
    // okBtnDisable=false,
    // isRedBtnText=false,
    // styles={}
    // title
    // content
    // style
    // classnames
    const {visible, cancelText="取消", okText="确定", close, onCancel, onOk,type="confirm",okBtnDisable=false,isRedBtnText=false,styles={}} = props;

    const title = props.title || ""; // 标题

    const content = props.content || ""; // 文本

    const style = props.style || {}; //样式

    const classnames = props.classnames || "zoomIn"; // 合并className



    function sure(isFromOk){
        // 如果 有传入onOk and okBtnDisable 是false，运行 onOK() --> 外部传入的函数
        if(onOk && okBtnDisable===false){
            onOk();
        }
      // 如果 isFromOk 是false 或者 okBtnDisable 是false，运行 close() --> 外部传入的函数
      if(isFromOk===false || okBtnDisable=== false){
            close();
        }
    }

    let inlineStyle = {};

    //如果传入参数 isRedBtnText 则设置颜色 为红
    if(isRedBtnText){
        inlineStyle.color="#FF3B30";
    }
    console.log(styles,"styles")
    return (
        <div>
            {/*判断 传入参数 visible ture 则 显示 false 则隐藏*/}
            <div className="custom-modal-mask" style={{display:visible?"block":"none"}} ></div>
            {/* 同上一样判断 */}
            <div className="custom-modal-wrapper" style={{...styles,display:visible?"block":"none"}}>
                {/* 如果外部有设置className 添加到后面 */}
                <div className={"confirm-modal " + classnames} style={style}>
                    {/* 前面有做一个判断，生效则将图标渲染红色 */}
                    <div className="confirm-modal-title" style={inlineStyle}>{title}</div>
                    {/*w 文本放置 */}
                    <div className="confirm-modal-content">{content}</div>
                        {/* 判断传入是否为confirm */}
                        {
                            type=="confirm"?
                                <div className="confirm-modal-action-btn-box">
                                    {/* 引入外部传入 close 绑定this， */}
                                    {/*triggerCancel 为true 触发取消？*/}
                                    <div className="confirm-cancel-btn" onClick={close.bind(this, { triggerCancel: true })}>{cancelText}</div>
                                    <div className={okBtnDisable?"confirm-sure-btn confirm-sure-btn-disable":"confirm-sure-btn"} style={inlineStyle} onClick={sure.bind(null,true)}>{okText}</div>
                                </div>
                                :
                                <div className="confirm-modal-action-btn-box" onClick={sure.bind(null,false)}>
                                    {/*如果不为confirm 则渲染渲染 okText 文本*/}
                                    <div style={inlineStyle} className={okBtnDisable?"confirm-sure-btn confirm-sure-btn-middle confirm-sure-btn-disable":"confirm-sure-btn confirm-sure-btn-middle"}>{okText}</div>
                                </div>
                        }
                </div>
            </div>
        </div>
    );
}


export const confirm = (config) => {
    return confirmType(config,"confirm")
}
export const info = (config) => {
    return confirmType(config,"info");
}

function confirmType(config, type) {
    // 创建一个 div
    let div = document.createElement('div');
    // 添加到页面
    document.body.appendChild(div);

    // 该方法渲染ConfirmDialog 组件 传入 type  参数 ...props
    function render(props) {
        ReactDOM.render(<ConfirmDialog type={type} {...props} />, div);
    }


    function close(...args) {
        //渲染组件
        render({...config, close, visible:true, classnames: "zoomOut"});
        // 设置 setTimeout
        setTimeout(() => {
            destroy(...args);
        }, 350);
    }

    function destroy(...args) {
        //unmountComponentAtNode
        //从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。
        // 如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，
        // 如果没有组件可被移除将会返回 false。
        const unmountResult = ReactDOM.unmountComponentAtNode(div);

        // paretNode 返回指定的节点在DOM树中的父节点.
        if (unmountResult && div.parentNode) {
            //removeChild 方法从DOM中删除一个子节点。返回删除的节点
            div.parentNode.removeChild(div);
        }
        //卸载计时间器
        clearInterval(interval);
        // some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。
        // 它返回的是一个Boolean类型的值。
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
