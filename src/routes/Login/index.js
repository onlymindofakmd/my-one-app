import React from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Loading2 from '../../component/Loading2'
import {hasLoad, switchBox} from './action'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import BGParticle from '../../utils/BGParticle'
import { notification } from 'antd'
import './style.css'

const url = 'https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg1.jpg?raw=true'

class Login extends React.Component {

    componentDidMount(){
        const isLogin = this.props.isLogin
        if(isLogin){
            console.log('islogin')
            this.props.history.go(1)
        }else{
            console.log('not login')
            this.initPage()
        }
    }

    componentWillUnmount () {
        this.particle && this.particle.destory()
        notification.destroy()
      }

    initPage = () => {
        console.log('initPage')
        this.props.load(false)
        this.loadImageAsync(url).then(url=>{
            this.props.load(false)
            }).then(()=>{
            //为什么写在then里？id为backgroundBox的DOM元素是在loading为false时才有，而上面的setState可能是异步的，必须等到setState执行完成后才去获取dom
            this.particle = new BGParticle('backgroundBox')
            this.particle.init()
            notification.open({
                message:<ul><li>初始账号：admin</li><li>初始密码：admin</li></ul>,
                duration:0,
                className:'login-notification'
            })
        })
    }

    //登录的背景图太大，等载入完后再显示，实际上是图片预加载，
    loadImageAsync (url) {
        return new Promise(function(resolve, reject) {
        const image = new Image();
        image.onload = function() {
            resolve(url);
        };
        image.onerror = function() {
            console.log('图片载入错误')
        };
        image.src = url;
        });
    }


    render(){
        const {loading, showBox} = this.props
        return (
            <div id='login-page'>
                {
                    loading?
                    <div>
                        <h3 style={styles.loadingTitle} className='animated bounceInLeft'>载入中...</h3>
                        <Loading2/>
                    </div>:
                    <div>
                        <div id='backgroundBox' style={styles.backgroundBox}/>
                        <div className='container'>
                            <LoginForm className={showBox === 'login' ? 'box showBox' : 'box hiddenBox'} 
                            switchShowBox={this.props.switchShowBox}/>
                            <RegisterForm className={showBox === 'register' ? 'box showBox' : 'box hiddenBox'}
                            switchShowBox={this.props.switchShowBox}/>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return ({
        loading : state.login.loading,
        showBox : state.login.showBox,
        msg : state.login.msg,
        isLogin : state.islogin
    })
}

const mapDispatchToProps = (dispatch,ownProps) => ({
    switchShowBox : (box) => dispatch(switchBox(box)),
    load : (load) => dispatch(hasLoad(load))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login))

const styles = {
    backgroundBox: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      // backgroundImage: 'url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg5.jpg?raw=true)',
      backgroundImage: 'url(https://github.com/zhangZhiHao1996/image-store/blob/master/react-admin-master/bg1.jpg?raw=true)',
      backgroundSize: '100% 100%',
      transition:'all .5s'
    },
    focus: {
      // transform: 'scale(0.7)',
      width: '20px',
      opacity: 1
    },
    loadingBox:{
      position:'fixed',
      top:'50%',
      left:'50%',
      transform:'translate(-50%,-50%)'
    },
    loadingTitle:{
      position:'fixed',
      top:'50%',
      left:'50%',
      marginLeft: -45,
      marginTop: -18,
      color:'#000',
      fontWeight:500,
      fontSize:24
    },
  }