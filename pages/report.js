import { Paper } from "@material-ui/core";
import MainLayout from "../layouts";
import { ProtectRoute } from "../route";
import {PictureAsPdfOutlined} from '@material-ui/icons';
import '../styles/report.scss';
import { FilePdfOutlined } from "@ant-design/icons";

export const report = [
    {title: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {title: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {title: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {title: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {title: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {title: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {title: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {title: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
    {title: 'Some report', date: "08 Jan, 2020", description: 'Sometext that is a text', file: ''},
]

export const Report = ({}) => {

    const onClick = file => {
        let openPDF = window.open(file, '_blank');
        openPDF.location;
    }
    return (
        <MainLayout title="Report" BreadIcon={<PictureAsPdfOutlined fontSize="large" />} links={['Report']}>
            <div id="main" className="container">
                <div id="overlay"></div>
                <div className="row">
                    {report.map(({title, date, description, file}) => (
                        <div className="col-sm-4">
                            <div className="reportCard" onClick={e => onClick(file)}>
                                <p className="title">{title}</p>
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