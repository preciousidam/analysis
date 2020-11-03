import { Paper } from "@material-ui/core";
import { Button } from "antd";
import CustomScroll from "react-custom-scroll";
import MainLayout from "../layouts";
import useAuth from "../provider";
import { ProtectRoute } from "../route";
import '../styles/profile.scss';
import {RoundedButton} from '../components/button';
import { InputWithLabel } from "../components/input";


export function Profile({}){
    const {user} = useAuth();
    return (
        <MainLayout title="Profile">
            <CustomScroll heightRelativeToParent="calc(100% - 70px)">
                <div id="main" className="container">
                    <div className='row'>
                        <div className="col-sm-4">
                            <Paper id="imageContainer">
                                <header>Profile Image</header>
                                <img src='/report.svg' />
                                <p>Jpeg, Jpg, or Png files only</p>
                                <Button onClick={_=> console.log('upload')}>Upload Image</Button>
                            </Paper>
                        </div>
                        <div className="col-sm-8">
                            <Paper id="formContainer">
                                <header>Profile Details</header>
                                
                                <RoundedButton
                                    text="Submit"
                                    id="submit"
                                    onClick={_ => console.log('submit')}
                                />
                            </Paper>
                        </div>
                    </div>
                </div>
            </CustomScroll>
        </MainLayout>
    );
}

export default ProtectRoute(Profile);