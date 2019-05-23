import { bindActionCreators } from 'redux';
import { actions } from './homeRedux';
import { connect } from 'react-redux';
import { Accordion, List, Pagination, Icon, WhiteSpace, SearchBar, WingBlank, Button } from 'antd-mobile';
import { Link } from 'react-router-dom';
import './assets/style/index.scss';
let {
  getHomeDataAction
} = actions;

@connect(
  state => {
    let {
      homeData
    } = state;
    return {
      homeData: [...homeData],
    }
  },
  dispatch => bindActionCreators({
    getHomeDataAction
  }, dispatch)
)
export default class AppPhysical extends Component {
  state = {
    homeData: [],
  }

  componentWillReceiveProps(nP) {
    // 如果切换了路由
    if (nP.location.key !== this.props.location.key) {

    }
  }

  componentDidMount() {
    // 请求商品详情数据
    // console.log(this.props);
  }

  linkToPath = (path) => {
    this.props.history.replace(path);
  } 

  render() {
    let { linkToPath } = this;

    return (
      <div id="main" >
        <SearchBar
          placeholder="查找"
          maxLength={8}
          onSubmit={value => console.log(value, 'onSubmit')}
        />

        <Accordion defaultActiveKey="0" className="my-accordion" onChange={this.onChange}>
          <Accordion.Panel header="Title 1">
            <List className="my-list">
              <List.Item arrow="horizontal" onClick={()=>linkToPath('/admin/physical/detail/1')} >查看</List.Item>
              <List.Item arrow="horizontal" onClick={()=>linkToPath('/admin/physical/edit/1')} >编辑</List.Item>
              <List.Item arrow="horizontal">删除</List.Item>
            </List>
          </Accordion.Panel>
        </Accordion>
        <WhiteSpace />
        <div className="pagination-container" >
          <Pagination total={5}
            className="custom-pagination-with-icon"
            current={1}
            locale={{
              prevText: (<span className="arrow-align"><Icon type="left" />上一步</span>),
              nextText: (<span className="arrow-align">下一步<Icon type="right" /></span>),
            }}
          />
        </div>
        <Link to='/admin/physical/add' className="add-item-button" > + </Link>
      </div>
    )
  }
}
