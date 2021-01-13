import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {HomeOutlined, HeatMapOutlined, AppstoreOutlined} from '@ant-design/icons';

import { InputWithIconNonElevated } from "../input/index";
import '../../styles/form.scss';
import '../../node_modules/bootstrap/scss/bootstrap.scss';
import {RoundedButton} from '../button';
import useAuth from "../../provider/index";
import { setData } from "../../utility/fetcher";
import {openNotification} from '../notification';




export function PropertyForm({}){
    const formData = {
        name: '', address: '', area: '', state: '', units: '', bedrooms: '',
        floors: '', built: '', serv_charge: '', land_size: '', sale_price: '',
        facilities: '',
    }
    const rentYear = {2016: '', 2017: '', 2018: '', 2019: '', 2020: ''};
    const [form, setForm] = useState({...formData});
    const [rent, setRent] = useState({...rentYear});
    const {token} = useAuth();
    
    const onChange = value => {
        setForm(prev => ({...prev, ...value}));
    }

    const onRentChange = value => {
        setRent(prev => ({...prev, ...value}));
    }

    const onClick = async _ => {
        let body = {...form, rents: rent};
        const {status, msg, data} = await setData('properties/create', body, token);
        openNotification(status, msg);
    }

    return (
        <div id="propFormContainer" className="container">
            <div className="row">
                <div className='col-sm-12'>
                    <InputWithIconNonElevated 
                        icon={<HomeOutlined />} 
                        placeholder="Property name"
                        onChange={e => onChange({name: e.target.value})}
                        value={form.name}
                    />
                </div>
                <div className='col-sm-12'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='map-marker-alt' />} 
                        placeholder='Property address'
                        onChange={e => onChange({address: e.target.value})}
                        value={form.address}
                    />
                </div>
                <div className='col-sm-6'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='map-marked-alt' />} 
                        placeholder='Area'
                        onChange={e => onChange({area: e.target.value})}
                        value={form.area}
                    />
                </div>
                <div className='col-sm-6'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='map-pin' />} 
                        placeholder='State' 
                        onChange={e => onChange({state: e.target.value})}
                        value={form.state}
                    />
                </div>
               
                <div className='col-sm-3'>
                    <InputWithIconNonElevated 
                        icon={<AppstoreOutlined />} 
                        placeholder='Units'
                        type='number'
                        min={1}
                        onChange={e => onChange({units: e.target.value})}
                        value={form.units}
                    />
                </div>
                <div className='col-sm-3'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='bed' />} 
                        placeholder="Beds" 
                        type='number'
                        min={1}
                        onChange={e => onChange({bedrooms: e.target.value})}
                        value={form.bedrooms}
                    />
                </div>
                <div className='col-sm-3'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='building' />} 
                        placeholder="Floors" 
                        type='number'
                        min={1}
                        onChange={e => onChange({floors: e.target.value})}
                        value={form.floors}
                    />
                </div>
                <div className='col-sm-3'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='calendar-alt' />} 
                        placeholder="Built" 
                        type='number'
                        min={1}
                        onChange={e => onChange({built: e.target.value})}
                        value={form.built}
                    />
                </div>
            </div>
            <div className="row">
                <div className='col-sm-6' >
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='money-bill-alt' />} 
                        placeholder='2016 Rent'
                        type='number'
                        min={1000}
                        onChange={e => onRentChange({2016: e.target.value})}
                        value={rent['2016']}
                    />
                </div>
                <div className='col-sm-6'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='money-bill-alt' />} 
                        placeholder='2017 Rent'
                        type='number'
                        min={1000}
                        onChange={e => onRentChange({2017: e.target.value})}
                        value={rent['2017']}
                    />
                </div>
                <div className='col-sm-6'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='money-bill-alt' />} 
                        placeholder='2018 Rent'
                        type='number'
                        min={1000}
                        onChange={e => onRentChange({2018: e.target.value})}
                        value={rent['2018']}
                    />
                </div>
                <div className='col-sm-6' >
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='money-bill-alt' />} 
                        placeholder='2019 Rent'
                        type='number'
                        min={1000}
                        onChange={e => onRentChange({2019: e.target.value})}
                        value={rent['2019']}
                    />
                </div>
                <div className='col-sm-6' >
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='money-bill-alt' />} 
                        placeholder='2020 Rent'
                        type='number'
                        min={1000}
                        onChange={e => onRentChange({2020: e.target.value})}
                        value={rent['2020']}
                    />
                </div>
                
            </div>
            <div className="row">
                <div className='col-sm-6'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='money-bill-alt' />} 
                        placeholder='Service charge'
                        type='number'
                        min={1000}
                        onChange={e => onChange({serv_charge: e.target.value})}
                        value={form.serv_charge}
                    />
                </div>
                <div className='col-sm-6'>
                    <InputWithIconNonElevated 
                        placeholder='Land size'
                        type='number'
                        min={1000}
                        onChange={e => onChange({land_size: e.target.value})}
                        value={form.land_size}
                    />
                </div>
                <div className='col-sm-6'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='money-bill-alt' />} 
                        placeholder='Sale Price'
                        type='number'
                        min={1000}
                        onChange={e => onChange({sale_price: e.target.value})}
                        value={form.sale_price}
                    />
                </div>
                <div className='col-sm-12'>
                    <textarea row={5} col={12} placeholder="Facilities" onChange={e => onChange({name: e.target.value})}>{form.facilities}</textarea>
                </div>
            </div>
            <RoundedButton text="Add Property" onClick={onClick} id="create" />
        </div>
    )
}