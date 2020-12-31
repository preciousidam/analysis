import React, {useEffect, useState} from 'react';
import { Typography, Avatar } from 'antd';
import { useRouter } from 'next/router';
import { Paper } from '@material-ui/core';
import {HomeOutlined} from '@material-ui/icons';

import MainLayout from '../layouts';
import { SelectInputWithLabel } from '../components/input';
import '../styles/index.scss';
import { PropertyList } from '../components/table/table';
import { PriceChart } from '../components/charts';
import { ProtectRoute } from '../route';
import { getViewData } from '../libs/hooks';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CommaFormatted} from '../utility/converter';
import { FilePdfOutlined } from "@ant-design/icons";



const {Title} = Typography;
const areaCode = {'vi':"Victoria Island", 'ikoyi':"Ikoyi",'lekki':"Lekki",'oniru': "Oniru"}


export function Home({}){

    const router = useRouter();
    const [bed, setBed] = useState(3);
    const [averages, setAverage] = useState([]);
    const {isBedLoading, data: beds} = getViewData('bedroom');
    const {data: years} = getViewData('years');
    const {isAreaLoading, data: areas} = getViewData('areas');
    const {isReportLoading, data: reports} = getViewData('reports/?q=');
    const {isLoading, data} = getViewData('stats/all-average/'+bed);

    const [search, setSearch] = useState({type: 'property', apt: 'flat'});

    const onChange = e =>{
        let name = e.target.name;
        let value = e.target.value;

        setSearch(prev => ({...prev, [name]: value}))
    }
    

    useEffect(() => {
        if(!data) return;
        let ave = []
        for(let key in data){
            let avv = data[key];
            ave.push({area: areaCode[key], average: avv[avv.length - 1]});
        }
        setAverage(ave);
    },[data])

    const onAreaClick = area => router.push(`/properties/${area}`);

    const searchOnClick = _ => {
        let query = {};

        if (search.type === 'reports'){
            query['q'] = search.q;
            router.push({pathname: '/report', query});
        }
        else{
            query = search;
            router.push({pathname: '/properties/search', query: {apt: search.apt, q: search.q}});
        }
    }

    function onReportClick(file) {
        let openPDF = window.open(file, '_blank');
        openPDF.location;
    }

    
    return (
        <MainLayout title='Dashboard' BreadIcon={<HomeOutlined fontSize='large' />}>
            <div id="home">
                <div id="banner">
                    <div id="overlay"></div>
                    <div id="content">
                        <input 
                            type="search" 
                            id="index-search"
                            placeholder="Enter an area, property name or report"
                            name="q"
                            onChange={onChange}
                        />
                        <div id="options">
                            <SelectInputWithLabel
                                id="dropdowninput"
                                className="option"
                                label="Search For"
                                name="type"
                                options={[
                                    {text: 'Properties', value:'properties'},
                                    {text: 'Reports', value:'reports'},
                                ]} 
                                onChange={onChange}
                            />
                            <SelectInputWithLabel
                                id="dropdowninput" 
                                className="option"
                                label="Type"
                                name="apt"
                                options={[
                                    {text: 'Flat', value:'flat'},
                                    {text: 'Duplex', value:'duplex'},
                                    {text: 'Pent House', value:'pent house'},
                                    {text: 'Maisonette', value:'maisonette'},
                                ]} 
                                onChange={onChange}
                            />
                            <button onClick={searchOnClick} className="button search-btn"> Search</button>
                        </div>
                    </div>
                </div>
                <div className="container" id="areaCont">
                    <div className="row">
                        {!isAreaLoading && areas?.map(area =>
                            <div className={`col-md-${12/areas.length}`}>
                                <div id={area} className="areas" onClick={e => onAreaClick(area)}>
                                    <h5>{areaCode[area]}</h5>
                                    <hr />
                                    <span>View Properties <FontAwesomeIcon icon="angle-right" color="#fff" size={10} /></span>
                                </div>
                            </div>)}
                    </div>
                    
                </div>
                <div className="container">
                    <div id="chart-area" className="row">
                        <div className="col-md-12 contrllCont">
                            <div className="controller">
                                {!isBedLoading && beds?.map(x => 
                                    <div onClick={_ => setBed(x)} className={`button ${bed == x? 'active': ''}`}>{x} Bedroom</div>)
                                }
                            </div>
                        </div>
                        <div className="col-md-12">
                            {!isLoading? <div className="row">
                                <div className="col-md-4">

                                    <h6>Overview</h6>
                                    <p>Rent Average For 2020</p>
                                    <div>
                                        {averages.map(({area,average}) => (
                                            <div className="average">
                                                <h5>&#8358; {CommaFormatted(parseFloat(average).toFixed(2))}</h5>
                                                <span>Average rent for {area}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button 
                                        className="button view"
                                        onClick={e => router.push('/statistics')}
                                    >
                                        View Historical Data
                                    </button>
                                </div>
                                <div className="col-md-8">
                                    <PriceChart data={data} years={years} />
                                </div>
                               
                            </div>: <Loading />}
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className='row'>
                        <div className="col-md-5">
                            <div className="pap">
                                <header id="reportHeader">
                                    <h6>Reports</h6>
                                </header>
                                {reports?.slice(0,6).map(({title, date, file},ind) => 
                                    <Report title={title} date={date} id={ind} onClick={e => onReportClick(file)} />)}
                            </div>
                            
                        </div>
                        <div className="col-md-7">
                            <div className="pap">
                                <header>
                                    <h6>Properties</h6>
                                    <span>Recently Added</span>
                                </header>
                                <PropertyList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export const Loading = _ => (<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <FontAwesomeIcon icon="circle-notch" color='#E22D45' size="3x" spin />
</div>)

const styles = [
    {
        backgroundColor: '#ec4887',

    },
    {
        backgroundColor: '#b954a4'
    },
    {
        backgroundColor: '#875fc0'
    },{
        backgroundColor: '#5648ba'
    },
    {
        backgroundColor: '#46c5f2'
    },
    {
        backgroundColor: '#6692d9'
    },{
        backgroundColor: '#ffb82c'
    },
    {
        backgroundColor: '#f57f59'
    },
]

export const Report = ({title, date, id, onClick}) => (
    <div className="report" onClick={onClick}>
        <Avatar style={styles[id % styles.length]} ><FilePdfOutlined style={{fontSize: 12, color: '#fff', margin: 'auto'}} /></Avatar>
        <div className="title">
            <p>{title}</p>
            <span>{date}</span>
        </div>
        <span className="download">
            <FontAwesomeIcon icon="file-download" size="lg" color="#787878" />
        </span>
    </div>
);

export default ProtectRoute(Home);

export const CountCard = ({area}) => {
    const {data, isLoading} = getViewData(`properties/${area.code}`);

    return(
        !isLoading && <div className="card">
            <span>{area.text}</span>
            <Title level={3}>{data.length}</Title>
        </div>
    )
}