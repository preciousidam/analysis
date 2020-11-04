import React, {useState, useEffect} from 'react';
import { Paper } from '@material-ui/core';
import { Button, Typography } from 'antd';
import { useRouter } from 'next/router';

import CustomScroll from 'react-custom-scroll';
import MainLayout from '../../../layouts';
import { ProtectRoute } from '../../../route';
import '../../../styles/propdetail.scss';
import { getViewData } from '../../../libs/hooks';
import Loader from '../../../components/loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PriceTrendChart } from '../../../components/charts/priceTrend';


const {Title} = Typography;
export function Id({}){
    const router = useRouter();
    const {id} = router.query;
    const {data, isLoading, isError} = getViewData(`properties/${id}`);
    const [years, setYears] = useState([]);
    const [amounts, setAmounts] = useState([]);

    useEffect(() => {
        if (data){
            let years = [];
            let amt = [];
            data?.rents.forEach(({year, amount}) => {
                console.log({year, amount})
                years.push(year);
                amt.push(amount);
            });
            
            setAmounts(amt);
            setYears(years);
        }
    },[data])


    return (
        <MainLayout title={data?.name}>
            {!isLoading ? <CustomScroll heightRelativeToParent="calc(100% - 135px)">
                <div id='main' className="container">
                    <Paper id="contentContainer" className="row">
                        <div id="left" className="col-sm-6">
                            <header>
                                <Title level={3}>{data?.name}</Title>
                                <p>
                                    <FontAwesomeIcon icon="map-marker-alt" color="#2B734E" />
                                    {` ${data?.address}, ${data?.area}, ${data?.state}`}
                                </p>
                            </header>
                            <div className="row">
                                <div className="col-4">
                                    <p>
                                        <FontAwesomeIcon icon="bed" />
                                        {data?.bedrooms} bedroom
                                    </p>
                                </div>
                                <div className="col-4">
                                    <p>
                                        <FontAwesomeIcon icon="calendar-alt" />
                                        {data?.built}
                                    </p>
                                </div>
                                <div className="col-4">
                                    <p>
                                        <FontAwesomeIcon icon="th" />
                                        {data?.units} units
                                    </p>
                                </div>
                                <div className="col-4">
                                    <p>
                                        <FontAwesomeIcon icon="building" />
                                        {data?.floors} Floors
                                    </p>
                                </div>
                                <div className="col-4">
                                    <p>
                                        <FontAwesomeIcon icon="map" />
                                        {data?.land_size} SQM
                                    </p>
                                </div>
                            </div>
                            <div id="facilities">
                                <header>
                                    <FontAwesomeIcon icon="list-alt" />
                                    Facilities
                                </header>
                                <div className="row">
                                    <div className="col-6">
                                        <p><FontAwesomeIcon icon="check" />
                                        Swimming Pool</p>
                                    </div>
                                    <div className="col-6">
                                        <p><FontAwesomeIcon icon="check" />
                                        24hrs Power supply</p>
                                    </div>
                                    <div className="col-6">
                                        <p><FontAwesomeIcon icon="check" />
                                        CCTV </p>
                                    </div>
                                    <div className="col-6">
                                        <p><FontAwesomeIcon icon="check" />
                                        Gym</p>
                                    </div>
                                    <div className="col-6">
                                        <p><FontAwesomeIcon icon="check" />
                                        Tennis Court</p>
                                    </div>
                                    <div className="col-6">
                                        <p><FontAwesomeIcon icon="check" />
                                        Ensuite</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="right" className="col-sm-6">
                            <header>
                                <FontAwesomeIcon icon="chart-bar" color="#fff" style={{marginRight: 10}} />
                                Rent Trend By Year
                            </header>
                            <PriceTrendChart 
                                years={years} 
                                prices={amounts} 
                                title="Rent"
                            />
                            <div id="servCharge">
                                <Title className='serv' level={5}>Service Charge: {data?.serv_charge}</Title>
                            </div>
                        </div>
                        <footer>
                            <Button type='primary'>Compare</Button>
                        </footer>
                    </Paper>
                </div>
            </CustomScroll>: isError? <p>Error something happened, please check you internet</p>: <Loader />}
        </MainLayout>
    )
}

export default ProtectRoute(Id);