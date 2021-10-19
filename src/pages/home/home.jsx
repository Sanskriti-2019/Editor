import FeaturedInfo from '../../components/featuredInfo/featuredInfo';
import Chart from '../../components/chart/Chart';
import './home.css'
import {userData} from "../../dummyData";
import WidgetSm from '../../components/WidgetSm/WidgetSm';
import WidgetLg from '../../components/WidgetLg/WidgetLg';

export default function home(){
    return(
        <div className="home">
            <FeaturedInfo />
            <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    )
};