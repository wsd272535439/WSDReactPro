/**
 * Created by hwh on 16/10/13.
 */
import React, { Component, PropTypes } from 'react'//import { render } from 'react-dom';
import styles from '../css/FindCss.css';
import SlidePage from './SlidePage'

var animate = true
var direction

export class SlideComponent extends Component{

    static propTypes = {
        data: PropTypes.array.isRequired,
        itemClick: PropTypes.func,
        duration:PropTypes.number
    };

    static defaultProps = {
        duration:3
    }

    constructor(props){
        super(props)
        this.state = {
            now_index:1,
            startX:0,
            endX:0,
            data:[],
        }
    }

    componentWillReceiveProps(prevProps){
        if(prevProps.data){
            const {data} = prevProps
            let new_data = data.slice(0)
            new_data.unshift(data[data.length-1])
            new_data.push(data[0])
            this.setState({
                data:new_data
            })
        }
    }

    componentDidMount(){
        this._starPlay()
    }

    handleTouchStart(e){
        this.timer && clearInterval(this.timer)
        this.setState({
            startX: e.changedTouches[0].pageX
        });
    }

    handleTouchMove(e){
        console.log(e.changedTouches[0].pageX);
    }

    handleTouchEnd(e){
        let endX = e.changedTouches[0].pageX
        if (endX){
            if(Math.abs(endX-this.state.startX)>40){
                console.log('into',Math.abs(endX-this.state.startX))
                let s_distance = endX - this.state.startX
                if (s_distance < 0){
                    direction = 'right'
                    this._turn(1)
                }else{
                    direction = 'left'
                    this._turn(-1)
                }
            }

        }
        this._starPlay()
    }

    _containerClassName(){
        const {now_index,data} = this.state
        if(!animate){
            return 'sliderLast'
        }else{
            return "slider"
        }
    }

    _SlideCell(data){
        return(
            <div className={this._containerClassName()} onTouchStart={(e)=>this.handleTouchStart(e)} onTouchMove={(e)=>this.handleTouchMove(e)} onTouchEnd={(e)=>this.handleTouchEnd(e)}>
                <ul style={!animate?{left: -100 * this.state.now_index + "%",width:data.length * 100 + '%'}:{left: -100 * this.state.now_index + "%",transitionDuration:"1s",width:(data.length) * 100 + '%'}}>
                    {this._SlideCellItem(data)}
                </ul>
                <SlidePage data={this.props.data} now_index={this.state.now_index} new_data={data}/>
            </div>
        )
    }

    _SlideCellItem(data){

        return data.map((item,index)=>{
            return(
                <li className="slider-item" style={{width:100/data.length + '%'}} key={index}>
                    <a>
                        <img style={{height:'auto',width:'100%'}} src={item}/>
                    </a>

                </li>
            )
        })
    }

    _turn(index){
        let n = index + this.state.now_index

        if (n == this.state.data.length - 1){
            n = 0
            animate = false
        }else if(n == 0){
            n = this.state.data.length - 1
            animate = false
        }else if(n > this.state.data.length-1){
            n = 1
            animate = false
        }else{
            animate = true
        }
        this.setState({
            now_index:n
        })
    }

    componentDidUpdate(prevProps,prevState){
        console.log('index',this.state.now_index,animate,direction)
        if(!animate){
            this.newTime = setTimeout(()=>{
                if(direction && direction == 'right'){
                    this._turn(1)
                }else if(direction && direction == 'left'){
                    this._turn(-1)
                }else if(!direction){
                    this._turn(1)
                }
            },50)

        }else{
            this.newTime && clearTimeout(this.newTime);
        }
    }

    //定时器开启
    _starPlay(){
        this.timer = setInterval(()=>{
            direction = undefined
            this._turn(1)
        },this.props.duration * 1000)
    }

    render(){
        return(
            <div>
                {this.state.data.length>0 && this._SlideCell(this.state.data)}
            </div>
            )
    }

    componentWillUnmount(){
        this.timer && clearInterval(this.timer);
    }
}