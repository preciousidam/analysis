import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {HomeOutlined, HeatMapOutlined, AppstoreOutlined} from '@ant-design/icons';

import { InputWithIconNonElevated } from "../input";
import '../../styles/form.scss';
import '../../node_modules/bootstrap/scss/bootstrap.scss';
import { Button } from "antd";



export function PropertyForm({}){

    return (
        <div id="propFormContainer" className="container">
            <div className="row">
                <div className='col-sm-12'>
                    <InputWithIconNonElevated 
                        icon={<HomeOutlined />} 
                        placeholder="Property name" 
                    />
                </div>
                <div className='col-sm-12'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='map-marker-alt' />} 
                        placeholder='Property address' 
                    />
                </div>
                <div className='col-sm-6'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='map-marked-alt' />} 
                        placeholder='Area' 
                    />
                </div>
                <div className='col-sm-6'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='map-pin' />} 
                        placeholder='State' 
                    />
                </div>
               
                <div className='col-sm-3'>
                    <InputWithIconNonElevated 
                        icon={<AppstoreOutlined />} 
                        placeholder='Units'
                        type='number'
                        min={1}
                    />
                </div>
                <div className='col-sm-3'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='bed' />} 
                        placeholder="Beds" 
                        type='number'
                        min={1}
                    />
                </div>
                <div className='col-sm-3'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='building' />} 
                        placeholder="Floors" 
                        type='number'
                        min={1}
                    />
                </div>
                <div className='col-sm-3'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='calendar-alt' />} 
                        placeholder="Built" 
                        type='number'
                        min={1}
                    />
                </div>
                
                <div className='col-sm-6'>
                    <InputWithIconNonElevated 
                        icon={<FontAwesomeIcon icon='money-bill-alt' />} 
                        placeholder='Service charge'
                        type='number'
                        min={1000}
                    />
                </div>
                <div className='col-sm-6'>
                    <InputWithIconNonElevated 
                        placeholder='Land size' 
                    />
                </div>    
                
            </div>
            <Button type="primary">Add Property</Button>
        </div>
    )
}