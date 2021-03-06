
import { List } from 'antd-mobile';
import { Link } from 'react-router-dom';
import './assets/style/index.scss';

export default class doctorPersonPage extends Component {

  componentWillReceiveProps(nP) {
    
  }

  componentDidMount() {
    
  }

  loginOut = () => {
    this.props.history.push('/login');
  }


  render() {

    return (
      <List renderHeader={() => '个人中心'} className="my-list">
        <List.Item arrow="horizontal">
          <Link to="/doctor/persion/edit">修改个人信息</Link>
        </List.Item>
        <List.Item arrow="horizontal" onClick={this.loginOut} >注销登录</List.Item>
      </List>
    )
  }
}
