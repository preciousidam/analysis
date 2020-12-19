import { Paper } from "@material-ui/core";
import { SupportForm } from "../components/form/support";
import MainLayout from "../layouts";
import { ProtectRoute } from "../route";
import '../styles/support.scss';


export const Support = ({}) => {

    return (
        <MainLayout title="Support" links={['Support']}>
            <div id="banner">
                <div id="overlay"></div>
                <div id="content">
                    <h1 className="bannerH1">Get In Touch</h1>
                </div>
            </div>
            <div id="support">
                <Paper id="supportFormCont" className="container supportCont">
                    <header>
                        <h3>We are delighted to have you here</h3>
                        <p>Leave us a message about your enquiries and we will get back to you</p>
                    </header>
                    <SupportForm />
                </Paper>
            </div>
        </MainLayout>
    )
}

export default ProtectRoute(Support);