
import { Accordion, List, Pagination, Icon, WhiteSpace, SearchBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
import './assets/style/index.scss';
import RequestURL from 'api/requestAPI';

export default class adminGuestManage extends Component {
  state = {
    data: [],
    page: 1,
    totalCount: 0,
  }

  componentWillReceiveProps(nP) {
    // 如果切换了路由
    if (nP.location.key !== this.props.location.key) {

    }
  }

  componentDidMount() {
    this.loadData()
  }

  linkToPath = (path) => {
    this.props.history.push(path);
  }
  loadData = (page = 1) => {
    // data{
    //   code: 0
    //   list: [{
    //   id:			数据id,
    //   username:	用药人姓名,
    //   des:	用药说明,
    //   creatime:	添加时间,
    //   updatime:	修改时间,
    //   },
    let { data } = this.state;
    RequestURL.requestData('/follow/list', {
      page
    })
      .then((res) => {
        if (res.code == 0) {
          this.setState({
            data: [...res.list],
            totalCount: res.pageDataCount || 0,
          })
        }
      })
  }

  deleteDate = id => {
    let { data } = this.state;
    RequestURL.requestData('/follow/del', {
      id
    })
      .then((res) => {
        if (res.code == 0) {
          data = data.filter((el, index) => {
            return el.id !== id;
          })
          this.setState({
            data
          })
        }
      })
  }

  pageCallback = (page) => {
    this.setState({
      page: page
    }, () => {
      this.loadData(page);
    })

  }

  findData = (title = '') => {
    RequestURL.requestData('follow/searchByKeyword', {
      keyword: title
    })
      .then((res) => {
        if (res.code == 0) {
          this.setState({
            data: [...res.list],
            totalCount: 1,
            page: 1,
          })
        }
      })
      .catch(error => {
        this.setState({
          data: []
        })
      })
  }


  render() {
    let { linkToPath, deleteDate } = this;
    let { totalCount, page, data } = this.state;

    let loadData = data.map((el, index) => {
      return (
        <Accordion.Panel header={el.username} key={el.id}>
          <List className="my-list">
            <List.Item arrow="horizontal" onClick={() => linkToPath(`/admin/guest/detail/${el.id}`)} >查看</List.Item>
            <List.Item arrow="horizontal" onClick={() => linkToPath(`/admin/guest/edit/${el.id}`)}>编辑</List.Item>
            <List.Item arrow="horizontal" onClick={() => deleteDate(el.id)}>删除</List.Item>
          </List>
        </Accordion.Panel>
      )
    })

    return (
      <div id="admin-guest-main" >
        <Link to='/admin/guest/add' className="add-item-button" > + </Link>
        <SearchBar
          placeholder="查找"
          maxLength={8}
          onSubmit={value => this.findData(value)}
        />
        <Accordion defaultActiveKey="0" className="my-accordion" >
          {
            loadData
          }
        </Accordion>
        <WhiteSpace />
        <div className="pagination-container" >
          <Pagination total={totalCount}
            className="custom-pagination-with-icon"
            current={page}
            onChange={(e) => { this.pageCallback(e) }}
            locale={{
              prevText: (<span className="arrow-align" ><Icon type="left" />上一页</span>),
              nextText: (<span className="arrow-align" >下一页<Icon type="right" /></span>),
            }}
          />
        </div>

      </div>
    )
  }
}

