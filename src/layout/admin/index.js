import { Link, Switch } from 'react-router-dom';
import { Card, WingBlank, WhiteSpace, List, InputItem, Radio, Flex, Button } from 'antd-mobile';
import RequestURL from 'api/requestAPI';
import MainSubscription from '../../components/menu';

class AdminLayoutPage extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {


    }

    render() {
        let { router } = this.props;

        let childrenRoute = [];
        let routes = router.map((el, index) => {
            if (!el.show) return false;
            let cRoute = el.routes;
            if (cRoute.length > 0) {
                childrenRoute = [...childrenRoute, ...cRoute];
            }
            return <Route path={el.path} key={index} exact={el.exact} component={el.component} />
        });

        childrenRoute = childrenRoute.map((el, index) => {
            if (!el.show) return false;
            return <Route path={el.path} key={index} exact={el.exact} component={el.component} />
        })

        console.error(childrenRoute);


        return (

            <div className="admin-main-content">

                <Switch>
                    {
                        routes
                    }
                    {
                        childrenRoute
                    }
                </Switch>
            </div>
        )
    }
}

// export default AdminLayoutPage;
export default MainSubscription(AdminLayoutPage, 'admin');