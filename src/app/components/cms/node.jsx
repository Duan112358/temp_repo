// 单个节点
let React = require('react');
let { FeedsModel, NodeModel, VideosModel } = require('../../dataModel')
let { Link } = require('react-router')

let {
    Paper,
    RaisedButton,
    FlatButton,
    TextField,
    Card,
    Avatar,
    CardTitle,
    CardHeader,
    CardMedia,
    CardText,
    CardActions,
    List,
    ListItem,
    ListDivider,
    Styles,
    Dialog,
    FloatingActionButton
} = require('material-ui');

let { Colors, Spacing, Typography } = Styles;

let wsCSS = require('../../styles/wscss')

let styles = {
    cardContainer: {
        //display: 'flex',
        alignItems: 'flex-start',
        WebkitAlignItems: 'flex-start',
        maxWidth:'1200',
        margin:'0 auto'
    },
    card: Object.assign({
        verticalAlign: 'top',
        marginRight: 20,
        marginBottom: 20,
        display: 'block',
        position:'relative',
        flex:'1',
        WebkitFlex:'1',
    }, wsCSS.lightShadow),
    cardMedia: {
        position:'absolute',
        right: 0,
        top: 0,
        padding: 20,
        boxSizing:'border-box',
        width: '50%'
    },
    videoCard: {
        display: 'inline-block',
        position: 'relative',
        boxSizing: 'border-box',
        width: '20%',
        paddingRight: 10,
        boxShadow: 'none',
        marginBottom: 10,
        cursor: 'pointer'
    },
    videoTitle: {
        marginTop: 4,
        fontSize: 13,
        color: '#757575',
        height: 40
    },
    textCenter: {
        textAlign: "center"
    },
    tag:{
        border: '1px solid',
        borderRadius: '4px',
        lineHeight: '28px',
        margin: 7,
        minWidth: 50,
        fontWeight: '300'
    },
    tagDelete: {
        transform: 'scale(0.6)' ,
        transformOrigin: 'top right',
        position: 'absolute',
        right: '-3',
        top: '-5',
        boxShadow:'none'
    },
    videoDelete: {
        transform: 'scale(0.8)' ,
        transformOrigin: 'top right',
        position: 'absolute',
        right: '15px',
        top: '5px'
    },
    svgContainer: {
        boxSizing:'border-box',
        padding: '7'
    },
    insetText: {
        display:'block',
        marginLeft:16,
        fontSize: 16
    },
    icon:{
        display: 'inline-block',
        width: '1em',
        height: '1em',
        fill: 'currentColor'
    },
    _cardContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        WebkitAlignItems: 'flex-start',
        flexWrap:'wrap',
        maxWidth:'1200',
        margin:'0 auto'
    },
    _card: Object.assign({
        verticalAlign: 'top',
        cursor:'pointer',
        display: 'block',
        marginBottom:20,
        flex:'0 0 32%'
    }, wsCSS.lightShadow),
}


let Node = React.createClass({


    getInitialState(){
        return {
            model: null,
            rawModel: null,
            mediaReady: false,
            searchModel: null,
        }
    },
    componentDidMount(){
        this.fetchData(this.props.params.id);
    },

    componentWillReceiveProps(nextProps) {
        let old = this.props.params.id;
        let next = nextProps.params.id;

        if(next && next !== old){
            this.fetchData(next);
        }
    },

    fetchData(id){
        // 0.13.0 API
        NodeModel.get(id,
            (res)=>{
                console.log("GET Node:" );
                console.log(res);

                this.setState({
                    model: res,
                    rawModel: res
                })

                if(res.node_image){
                    this.setState({
                        mediaReady: true
                    })
                }
            },(err)=>{
                console.log(err);
        });
    },

    // 处理图片上传
    _handleFileChange(e){
        let _file = e.target.files[0];
        let _data = new FormData();
        _data.append('img', _file)

        NodeModel.postImg(
            this.state.model.node_id,
            _data,
            (res)=>{
                this.fetchData(res.node_id)
                console.log("POST Node Img:" );
                console.log(res);
            },(err)=>{
                console.log(err);
        });

        // read as DataURL
        // let reader = new FileReader();
        // reader.onload = (upload) => {
        //     this.setState({
        //         img_uri: upload.target.result
        //     })
        // }
        // reader.readAsDataURL(file);
    },

    _handleImgClick(e){
        let $el = React.findDOMNode(this.refs.uploadImg);
        console.log($el)
        $el.click();
    },

    _handleNameChange(e){
        let _new = Object.assign(
            {},
            this.state.model,
            {node_name: e.target.value}
        )
        this.setState({
            model: _new
        })
    },

    _handleDesChange(e){
        let _new = Object.assign(
            {},
            this.state.model,
            {node_description: e.target.value}
        )
        this.setState({
            model: _new
        })
    },

    _isModified(){
        let _now = this.state.model;
        let _raw = this.state.rawModel;
        if(
            _now.node_name == _raw.node_name &&
            _now.node_description == _raw.node_description
        ){
            return false;
        }
        return true;
    },

    _handleSave(){
        if(!confirm("确定要保存吗？")) return;

        let _update = {
            node_name: this.state.model.node_name,
            node_description: this.state.model.node_description,
            node_parent: this.state.model.node_parent
        }

        NodeModel.post(
            this.state.model.node_id,
            _update,
            (res)=>{
                console.log("POST Node:" );
                console.log(res);
                this.fetchData(res.node_id)
            },(err)=>{
                console.log(err);
        });
    },

    _handleFeedPush(){
        if(!confirm("Are you sure?")) return;

        FeedsModel.postNode(
            {node_id: this.state.model.node_id},
            (res)=>{
                console.log("POST to FEED:" );
                console.log(res);
            },(err)=>{
                console.log(err);
        });
    },

    _handleNodeDelete(){
        if(!confirm("确定要删除吗？")) return;

        NodeModel.delete(
            this.state.model.node_id,
            (res)=>{
                console.log("DELETE Node:" );
                console.log(res);
                // Jump back to index
                this.context.router.transitionTo('nodelist');
            },(err)=>{
                console.log(err);
                alert(err.message);
        });
    },

    // ADD VIDEO
    _handleVideoAdd(){
        this.refs.addVideoDialog.show();
    },

    _handleDialogCancel(){
        this.refs.addVideoDialog.dismiss();
    },

    _handleVideoSearch(e){
        e.preventDefault();
        let _search = e.target[0].value;

        console.log("search "+_search+" .....");

        VideosModel.get(
            {
                keyword:_search,
                limit: 90
            },
            (res)=>{
                console.log("GET Searched Videos:" );
                console.log(res);

                this.setState({searchModel: res})
            },(err)=>{
                console.log(err);
        });
    },

    _handleSearchVideoAdd(id){
        console.log(id);
        if(!confirm('确定要在节点中添加该视频吗')) return;

        NodeModel.postVideo(
            this.state.model.node_id,
            {video_id: id},
            (res)=>{
                alert('添加成功！')
                console.log("POST Video to Node:" );
                console.log(res);
                this.fetchData(res.node_id)
            },(err)=>{
                alert('添加失败……')
                console.log(err);
        });
    },

    // Video delete
    _handleVideoDelete(video_id){
        console.log(video_id);
        if(!confirm('确定要从节点中删除该视频吗')) return;

        NodeModel.deleteVideo(
            this.state.model.node_id,
            video_id,
            (res)=>{
                alert('删除成功！')
                console.log("DELETE Video from Node:" );
                console.log(res);
                this.fetchData(res.node_id)
            },(err)=>{
                alert('删除失败……')
                console.log(err);
        });
    },

    render() {
        let _node = this.state.model;
        let _raw = this.state.rawModel;
        if(!_node) return <div/>;

        // 父标签
        let _parent = (_node.node_parent)?(
            <div style={{display:'inline-block', position:'relative'}}>
                <Link
                    key={_node.node_parent.node_id}
                    to="node" params={{id: _node.node_parent.node_id}} >
                    <FlatButton
                        style={styles.tag}
                        secondary={true}
                        label={_node.node_parent.node_name} />
                </Link>
                <FloatingActionButton mini={true} style={styles.tagDelete} iconStyle={styles.svgContainer}>
                    <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                </FloatingActionButton>
            </div>
        ):(
            <FlatButton style={styles.tag} primary={true} label="设置"/>
        )

        // 子标签
        let _children = (_node.node_parent) && _node.node_children.map((node, key) => {
            return (
                <div style={{display:'inline-block', position:'relative'}} key={"child-tag" + node.node_id} >
                    <Link
                        to="node" params={{id: node.node_id}} >
                        <FlatButton
                            style={styles.tag}
                            secondary={true}
                            label={node.node_name} />
                    </Link>
                    <FloatingActionButton mini={true} style={styles.tagDelete} iconStyle={styles.svgContainer}>
                        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                    </FloatingActionButton>
                </div>
            )
        })

        // 视频列表（目前最多 5 条）
        let _videos = (_node.node_videos) && _node.node_videos.map((video, key) => {
            return (
                <Card style={styles.videoCard}>
                    <Link to="video" params={{id: video.video_id}} key={"video" + video.video_id} >
                        <CardMedia >
                            <img src={video.video_media.media_image} />
                        </CardMedia>
                        <p style={styles.videoTitle}>
                            {video.video_title}
                        </p>
                    </Link>
                    <FloatingActionButton
                        mini={true}
                        style={styles.videoDelete}
                        iconStyle={styles.svgContainer}
                        onTouchTap={this._handleVideoDelete.bind(null, video.video_id)}>
                        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                    </FloatingActionButton>
                </Card>
            )
        })

        // 图片上传
        let _image_module = ()=>{
            // 已经有视频
            if(this.state.mediaReady){
                return (
                    <FlatButton
                        onClick={this._handleImgClick}
                        style={styles.cardMedia}>
                        <input
                            onChange={this._handleFileChange}
                            ref="uploadImg"
                            type="file"
                            hidden />
                        <img style={{width:'100%'}} src={_node.node_image} />
                    </FlatButton>
                )
            }else{
                return (
                    <div style={styles.cardMedia}>
                        <p>上传新图片：</p>
                        <input
                            onChange={this._handleFileChange}
                            type="file"
                        />
                    </div>
                )
            }
        }();

        let _search_videos = (this.state.searchModel) && this.state.searchModel.list.map((video, key)=>{
            return (
                <Card
                    onClick={this._handleSearchVideoAdd.bind(null, video.video_id)}
                    style={styles._card}
                    key={'searchvideo' + video.video_id} >
                    <CardMedia
                        overlay = {<CardTitle title={video.video_title} subtitle={video.video_description} />}>
                        <img src={video.video_media.media_image}/>
                    </CardMedia>
                </Card>
            )
        })

        // 添加视频对话框
        let _dialog_addVideo = (
            <Dialog
                ref="addVideoDialog"
                title="视频列表"
                actions={[<FlatButton
                    label="Cancel"
                    secondary={true}
                    onTouchTap={this._handleDialogCancel} />]
                }
                autoDetectWindowHeight={true}
                autoScrollBodyContent={true} >
                    <div>
                        <form onSubmit={this._handleVideoSearch}>
                            <TextField hintText="搜索视频" />
                        </form>
                        <div style={styles._cardContainer} >
                            {_search_videos}
                        </div>
                    </div>
            </Dialog>
        )

        // 渲染
        return (
            <div style={styles.cardContainer}>
                {_dialog_addVideo}
                <Card style={styles.card}>
                    {_image_module}
                    <CardTitle
                        style={{width:'50%'}}
                        title={"节点 - " + _raw.node_name } />
                    <TextField
                        onChange = {this._handleNameChange}
                        floatingLabelText="节点名称"
                        style={styles.insetText}
                        value={_node.node_name} />
                    <TextField
                        multiLine
                        onChange = {this._handleDesChange}
                        floatingLabelText="节点描述"
                        style={styles.insetText}
                        value={_node.node_description} />
                    <List subheader="父标签" >
                        <div style={{padding:'0 12px'}} >
                            {_parent}
                        </div>
                    </List>
                    <List subheader="子标签" >
                        <div style={{padding:'0 12px'}} >
                            <FlatButton
                                style={styles.tag}
                                primary={true}
                                label="添加" />
                            {_children}
                        </div>
                    </List>
                    <ListDivider />
                    <CardActions style={{marginTop:0, textAlign:'left'}}>
                        <FlatButton
                            label="保存"
                            onClick = {this._handleSave}
                            disabled = {!this._isModified()} />
                        <FlatButton
                            secondary={true}
                            onClick = {this._handleFeedPush}
                            label="推送上首页" />
                        <FlatButton
                            onClick = {this._handleNodeDelete}
                            primary={true}
                            label="删除" />
                    </CardActions>
                </Card>

                <Card style={styles.card} >
                    <CardTitle subtitle="该标签下的视频"/>
                    <TextField style={{marginLeft:'16'}} hintText="搜索该标签下的视频" disabled />
                    <RaisedButton
                        onClick={this._handleVideoAdd}
                        style={{marginLeft:16}}
                        primary={true}
                        label="添加视频到该节点" />
                    <List style={{paddingBottom:'0 !important'}} >
                        <ListDivider />
                        <div style={{paddingLeft:16,paddingRight: 6,paddingTop: 16}}>
                            {_videos}
                        </div>
                        <ListDivider />
                        <ListItem style={styles.textCenter}
                            primaryText="查看更多" />
                    </List>
                </Card>
            </div>
        );
    }
})

// pass down router in context
Node.contextTypes = {
  router: React.PropTypes.func
};

module.exports = Node;
