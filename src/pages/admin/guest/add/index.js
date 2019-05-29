
import { List, InputItem, WhiteSpace, Button, WingBlank } from 'antd-mobile';
import { Link } from 'react-router-dom';

export default class adminGuestAdd extends Component {

    componentWillReceiveProps(nP) {

    }

    componentDidMount() {

    }

    saveUserMsg = (path) => {
        this.props.history.replace(path);
    }

    render() {

        return (
            <WingBlank size="lg">
                <List style={{ margin: '5x 0' }} renderHeader={() => '添加随访记录'} className="my-list">
                    <InputItem
                        clear
                        placeholder="请输入随访用户"
                    >随访用户名</InputItem>
                    <InputItem
                        clear
                        placeholder=""
                    >随访时间</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入备注信息"
                    >备注</InputItem>
                </List>
                <WhiteSpace />
                <Button type="primary" onClick={()=>this.saveUserMsg('/admin/user')}>保存</Button>
            </WingBlank>
        )
    }
}