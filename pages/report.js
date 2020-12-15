import { Paper } from "@material-ui/core";
import MainLayout from "../layouts";
import { ProtectRoute } from "../route";
import {PictureAsPdfOutlined} from '@material-ui/icons';
import '../styles/report.scss';
import { FilePdfOutlined } from "@ant-design/icons";

const report = [
    {name: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {name: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {name: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {name: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {name: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {name: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {name: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {name: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {name: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
]

export const Report = ({}) => {
    return (
        <MainLayout title="Report" BreadIcon={<PictureAsPdfOutlined fontSize="large" />} links={['Report']}>
            <div id="main" className="container">
                <div className="row">
                    {report.map(({name, date, description, file}) => (
                        <div className="col-sm-4">
                            <div className="reportCard">
                                <p className="title">{name}</p>
                                <span className="date">{date}</span>
                                <p className="desc">{description}</p>
                                <span className="icon"><FilePdfOutlined style={{fontSize: 20, color: 'red'}} /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Report);