import { Accordion, List, Pagination, Icon, WhiteSpace, SearchBar } from 'antd-mobile';
import { Link } from 'react-router-dom';
import './assets/style/index.scss';
import RequestURL from 'api/requestAPI';

export default class adminUserManage extends Component {
  state = {
    medicalData: [],
    page: 1,
    totalCount: 0,
  }

  componentDidMount() {
    let { page } = this.state;
    this.loadData(page);
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
    let { medicalData } = this.state;
    RequestURL.requestData('/medical/list', {
      page
    })
      .then((res) => {
        if (res.code == 0) {
          this.setState({
            medicalData: [...res.list],
            totalCount: res.pageDataCount,
          })
        }
      })
  }

  deleteDate = id => {
    let { medicalData } = this.state;
    RequestURL.requestData('/medical/del', {
      id
    })
      .then((res) => {
        if (res.code == 0) {
          medicalData = medicalData.filter((el, index) => {
            return el.id !== id;
          })
          this.setState({
            medicalData
          })
        }
      })
  }
  
  pageCallback =(page) => {
    this.setState({
      page: page
    },()=>{
      this.loadData(page);
    })
    
  }

  findData = (title = '') => {
    RequestURL.requestData('medical/searchByKeyword', {
      keyword: title
    })
      .then((res) => {
        if (res.code == 0) {
          this.setState({
            medicalData: [...res.list],
            totalCount: 1,
            page: 1,
          })
        }
      })
      .catch(error => {
        this.setState({
          doctors: []
        })
      })
  }

  render() {
    let { linkToPath } = this;
    let { totalCount, page, medicalData } = this.state;

    let loadData = medicalData.map((el,index)=>{
      return (
        <Accordion.Panel header={el.username} key={el.id}>
            <List className="my-list">
              <List.Item arrow="horizontal" onClick={() => linkToPath(`/admin/medicine/detail/${el.id}`)} >查看</List.Item>
              <List.Item arrow="horizontal" onClick={() => linkToPath(`/admin/medicine/edit/${el.id}`)}>编辑</List.Item>
              <List.Item arrow="horizontal" onClick={() => this.deleteDate(el.id)}>删除</List.Item>
            </List>
          </Accordion.Panel>
      )
    })
    return (
      <div id="admin-user-main" >
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
            onChange={(e)=>{this.pageCallback(e)}}
            locale={{
              prevText: (<span className="arrow-align"><Icon type="left" />上一页</span>),
              nextText: (<span className="arrow-align">下一页<Icon type="right" /></span>),
            }}
          />
        </div>
        <Link to='/admin/medicine/add' className="add-item-button" > + </Link>

      </div>
    )
  }
}
