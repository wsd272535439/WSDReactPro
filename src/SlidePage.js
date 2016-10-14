/**
 * Created by hwh on 16/9/5.
 */
import React, { Component, PropTypes } from 'react'//import { render } from 'react-dom';
import {connect} from 'react-redux'
import {fetchData,Receive_data} from '../../actions/Actions'
import styles from '../../../css/FindCss.css';

export default class SlidePage extends Component{
    _pageStyle(index){

    }

    _dotClassName(now_index,index,data){
        if(now_index == 0){
            if(index == 4){
                return "slider-dot-selected"
            }
        }else if(now_index == data.length + 1){
            if(index == 0){
                return "slider-dot-selected"
            }
        }else{
            if(now_index - 1 == index){
                return "slider-dot-selected"
            }
        }
        return "slider-dot"
    }
    _SlideItems(data){
        return data.map((item,index)=>{
            return (
                <span key={index} className={this._dotClassName(this.props.now_index,index,data)}>

                </span>
            )
        })
    }
    render(){
        return(
            <div className="slider-dots-wrap">
                {this._SlideItems(this.props.data)}
            </div>
        )
    }
}