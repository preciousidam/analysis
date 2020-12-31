import { Paper } from "@material-ui/core";
import MainLayout from "../../layouts";
import { ProtectRoute } from "../../route";
import {PictureAsPdfOutlined} from '@material-ui/icons';
import '../../styles/report.scss';
import { FilePdfOutlined } from "@ant-design/icons";
import { getViewData } from "../../libs/hooks";
import Loader from "../../components/loader";
import { useRouter } from "next/router";


export const Report = ({}) => {
    const router = useRouter()
    const {q} = router.query;
    const {data, isLoading} = getViewData(`reports/?q=${q || ''}`);

    function onClick(file) {
        let openPDF = window.open(file, '_blank');
        openPDF.location;
    }
    return (
        <MainLayout title="Report" BreadIcon={<PictureAsPdfOutlined fontSize="large" />} links={['Report']}>
            <div id="main" className="container">
                <div id="overlay"></div>
                {!isLoading ? <div className="row">
                    {data?.map(({title, date, description, file}) => (
                        <div className="col-sm-4">
                            <div className="reportCard" onClick={e => onClick(file)}>
                                <p className="title">{title}</p>
                                <span className="date">{date}</span>
                                <p className="desc">{description}</p>
                                <span className="icon"><FilePdfOutlined style={{fontSize: 20, color: 'red'}} /></span>
                            </div>
                        </div>
                    ))}
                </div>: <Loader />}
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Report);