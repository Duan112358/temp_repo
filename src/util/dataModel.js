/*
 *  Data Models
 *
 *  Backend API Doc:
 *  https://www.teambition.com/project/55e54cd43ba0a0ea6eda1f57/posts/post/55f4839db935a57a34b4f574
 */

let reqwest = require('./lib/reqwest');

// document: https://github.com/ded/reqwest

const STORAGE_KEY = '__wsTokenTest__';      // Test Env
//const STORAGE_KEY = '__wsToken__';          // Production Env

/* ---------- API ---------- */
// Online
//var API = "https://?????/";
// Dev
const API = "http://wsdev.m2v.cn/"

// LOADING
const LOADING = {
    show: ()=>{
        if(window.__wsApp__) window.__wsApp__.setState({loading: true})
    },
    dismiss: ()=>{
        if(window.__wsApp__) window.__wsApp__.setState({loading: false})
    }
}

// PROGRESS
const PROGRESS = {
    show: (_value)=>{
        if(window.__wsApp__) window.__wsApp__.setState({progress: _value})
    },
    dismiss: ()=>{
        if(window.__wsApp__) window.__wsApp__.setState({progress: null})
    }
}

// Common Request
function _request(_method, _api, _params, _onSuccess, _onError){
    LOADING.show();
    // todo: use Promise A
    reqwest({
        url: _api,
        type: 'json',
        method: _method,
        contentType: 'application/json',
        headers: {
            //'X-Access-Token': 'b24244038556055acc930b28.57246253'
            'X-Access-Token': UserModel.fetchToken()
        },
        data: (!_params) ? null : (_method == 'get') ? _params : JSON.stringify(_params),
        crossOrigin: true,
        success: (ret) => {
            LOADING.dismiss();
            _onSuccess(ret);
        },
        error: (xhr) => {
            let err = JSON.parse(xhr.response)
            console.log(xhr);
            LOADING.dismiss();

            // Unauthorized, request login.
            if(xhr.status == 401){
                location.hash = "login";
                alert("登录过期，请重新登录！")
                return;
            }

            if(err.message) alert(err.message)  // 暂时全部使用 alert 解决
            //_onError(err);
        }
    })
}

// Upload Image
function _upload(_api, _formdata, _onSuccess, _onError){
    LOADING.show();
    // Manual XHR & FormData
    let oReq = new XMLHttpRequest();
    oReq.open("POST", _api);
    oReq.setRequestHeader("X-Access-Token",UserModel.fetchToken())
    oReq.onload = (e) => {
        LOADING.dismiss();
        let ret = JSON.parse(oReq.responseText)
        if (oReq.status == 200) {
            _onSuccess(ret);
        } else {
            let err = ret;
            console.log(err);
            if(err.message) alert(err.message)
            //_onError(err);
        }
    };
    oReq.upload.onprogress = updateProgress;
    oReq.send(_formdata);
}

// Upload Image
function _upload_qiniu(_api, _formdata, _onSuccess, _onError){
    PROGRESS.show(1);
    // Manual XHR & FormData
    let oReq = new XMLHttpRequest();
    oReq.open("POST", _api);
    // TODO：需要增加一次登录验证！（不能保证 GET 后会不会有 TOKEN 过期情况）
    //oReq.setRequestHeader("X-Access-Token",'b24244038556055acc930b28.57246253')
    oReq.onload = (e) => {
        let ret = JSON.parse(oReq.responseText)
        PROGRESS.dismiss();
        if (oReq.status == 200) {
            _onSuccess(ret);

        } else {
            let err = ret;
            console.log(err);
            if(err.message) alert(err.message)
            //_onError(err);
        }
    };
    oReq.upload.onprogress = updateProgress;
    oReq.send(_formdata);
}

function updateProgress(evt) {
    console.log('updateProgress');
    if (evt.lengthComputable) {
            let percentComplete = evt.loaded / evt.total;
            let percent = (percentComplete * 100).toFixed(2)
            PROGRESS.show(percent);
            console.log(percent + "%");
    } else {
            // Unable to compute progress information since the total size is unknown
            console.log('unable to complete');
    }
}

/* --------------- DataCenter Singleton ---------------- */

// 新鲜事
let FeedsModel = {
    // 获取 Feeds 流
    get:  (_success, _error) => {
        _request('get',  `${API}feeds/`, null, _success, _error)
    },
    // 推送节点
    postNode: (_params, _success, _error) => {
        _request('post',  `${API}feeds/`, _params, _success, _error )
    },
    // 推送视频
    postVideo: (_params, _success, _error) => {
        _request('post',  `${API}feeds/`, _params, _success, _error )
    }
}

// 节点列表
let NodesModel = {
    // 获取节点列表
    get:  (_params, _success, _error) => {
        _request('get',  `${API}nodes/`, _params, _success, _error)
    },
    // 新建节点
    post: (_params, _success, _error) => {
        _request('post', `${API}nodes/`, _params, _success, _error)
    }
}

// 单个节点
let NodeModel = {
    // 获取单个节点
    get:  (_id, _success, _error) => {
        _request('get',  `${API}nodes/${_id}`, null, _success, _error)
    },
    // 删除节点
    delete: (_id, _success, _error) => {
        _request('delete',  `${API}nodes/${_id}`, null, _success, _error)
    },
    // 更新单个节点
    post: (_id, _params, _success, _error) => {
        _request('post', `${API}nodes/${_id}`, _params, _success, _error)
    },
    // 更新视频
    postVideo: (_id, _params, _success, _error) => {
        _request('post', `${API}nodes/${_id}/videos`, _params, _success, _error)
    },
    // DELETE /nodes/:node_id/videos/:video_id
    deleteVideo: (_node_id, _video_id, _success, _error) => {
        _request('delete',  `${API}nodes/${_node_id}/videos/${_video_id}`, null, _success, _error)
    },
    // 更新图片
    postImg: (_id, _file, _success, _error) => {
        _upload(`${API}nodes/${_id}/image`, _file, _success, _error)
    }
}

// 视频列表
let VideosModel = {
    // 获取节点列表
    get:  (_params, _success, _error) => {
        _request('get',  `${API}videos/`, _params, _success, _error)
    },
    // 新建节点
    post: (_params, _success, _error) => {
        _request('post', `${API}videos/`, _params, _success, _error)
    }
}

// 单个视频
let VideoModel = {
    // 获取视频
    get:  (_id, _success, _error) => {
        _request('get',  `${API}videos/${_id}`, null, _success, _error)
    },
    // 删除视频
    delete: (_id, _success, _error) => {
        _request('delete',  `${API}videos/${_id}`, null, _success, _error)
    },
    // 更新视频
    post: (_id, _params, _success, _error) => {
        _request('post', `${API}videos/${_id}`, _params, _success, _error)
    },
    // 更新图片
    postImg: (_id, _file, _success, _error) => {
        _upload(`${API}videos/${_id}/image`, _file, _success, _error)
    }
}

// 媒体
let MediaModel = {
    // 请求 token
    newMediaToken: (_success, _error) => {
        _request('post', `${API}media/`, null, _success, _error)
    },
    // 根据 media_token 拿 uptoken
    getUpTokenByMediaToken: (_token, _success, _error) => {
        _request('post', `${API}media/${_token}`, {}, _success, _error)
    },
    // 上传到七牛
    uploadToQiniu: (_formdata, _success, _error) => {
        _upload_qiniu('http://upload.qiniu.com', _formdata, _success, _error)
    }
}

// 用户
let UserModel = {
    // 登陆
    // account: wsadmin
    // password: 66668888
    login: (_params, _success, _error) => {
        console.log(_params);
        _request('post', `${API}login/`, _params, _success, _error)
    },
    // 注册、创建
    signUp:  (_params, _success, _error) => {
        console.log(_params);
        _request('post', `${API}users/`, _params, _success, _error)
    },
    //store token
    storeToken: (token) => {
        localStorage.setItem(STORAGE_KEY, token);
    },
    //fetch token
    fetchToken: () => {
        return (localStorage.getItem(STORAGE_KEY) || '');
    },
    // get current user
    getMe:  (_success, _error) => {
        _request('get',  `${API}/users/me`, null, _success, _error)
    },
}
// /* ---------------------- TEST ------------------------- */


//DataCenter.BOModel.getData(BOTEST);
//DataCenter.SCModel.getData(SCTEST);
// DataCenter.MDBOModel.getData(MDBOTEST, function(res){
//     console.log(res);
// });
//DataCenter.MDSCModel.getData(MDSCTEST);

//NodesModel.post({},()=>{},()=>{})


module.exports = {
    FeedsModel,
    NodesModel,
    NodeModel,
    VideosModel,
    VideoModel,
    MediaModel,
    UserModel
};
