import { Pagination, Icon, WhiteSpace, SearchBar, WingBlank, Card } from 'antd-mobile';
import { Link } from 'react-router-dom';

export default class MorderManage extends Component {
    state = {
        homeData: [],
    }

    componentWillReceiveProps(nP) {
        // 如果切换了路由
        if (nP.location.key !== this.props.location.key) {

        }
    }

    componentDidMount() {

    }

    linkToPath = (path) => {
        this.props.history.replace(path);
    }

    render() {
        let { linkToPath } = this;
        return (
            <div id="user-Morder-main" >

                <Link to='/user/medicine/morder' className="add-item-button" > + </Link>
                <SearchBar
                    placeholder="查找"
                    maxLength={8}
                    onSubmit={value => console.log(value, 'onSubmit')}
                />
                <WingBlank>
                    <WhiteSpace />
                    <Card>
                        <Card.Header
                            title="This is title"
                            extra={<span>this is extra</span>}
                        />
                        <Card.Body>
                            <div>This is content of `Card`</div>
                        </Card.Body>
                        <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                    </Card>
                </WingBlank>
                <WhiteSpace size="lg" />
                <div className="pagination-container" >
                    <Pagination total={5}
                        className="custom-pagination-with-icon"
                        current={1}
                        locale={{
                            prevText: (<span className="arrow-align"><Icon type="left" />上一页</span>),
                            nextText: (<span className="arrow-align">下一页Icon type="right" /></span>),
                        }}
                    />
                </div>
            </div>
        )
    }
}
