import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { Button } from 'antd';
import { List, Typography } from 'antd';
import store from './store'
import {CHNAGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from './store/actionTypes'

class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = store.getState()
    store.subscribe(this.handleStoreChange)
    // 只要store里面的内容改变，subscribe里面有一个函数就会自动执行
    // store 一旦接收到新的newState数据，就会把当前store数据替换成reducer返回的数据
    // 一旦store中数据发生变化，handleStoreChange这个方法就会被执行，这时候就会去store中重新取一次数据，去替换掉当前组件里的数据
  }
  handleInputChange = (e) => {
    const value = e.target.value
    const action = {
      type: CHNAGE_INPUT_VALUE,
      value: value
    }
    store.dispatch(action)
    
    this.setState({
      inputValueJudge: value
    })
  }

  handleStoreChange = () => {
    // console.log("store change")
    this.setState(store.getState())
  }

  handleBtnClick = () => {
    if (this.state.inputValueJudge == undefined || this.state.inputValueJudge.trim() === '') {
      alert('填写值不能为空')
      return
    }
    const action = {
      type: ADD_TODO_ITEM
    }
    store.dispatch(action)
  }

  handleDeleteClick = (index) => {
    const action = {
      type: DELETE_TODO_ITEM, 
      index
    }
    store.dispatch(action)
  }

  render() {
    const style={
      width: "250px",
      marginLeft: "15px",
      marginRight: "15px"
    }
    return (
      <div style={{marginTop: "20px"}}> 
        <div>
          <Input 
            value={this.state.inputValue} 
            placeholder="Basic usage" 
            style={style} 
            onChange={this.handleInputChange}
          />
          <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
        </div>
        <List
          style={{marginLeft: "15px", marginTop: "20px",width: "250px"}}
          bordered
          dataSource={this.state.list}
          renderItem={
           (item, index) => (
              <List.Item onClick={this.handleDeleteClick.bind(this, index)}>
                <Typography.Text mark></Typography.Text> 
                {item}
              </List.Item>
            )}
        />
      </div>
    );
  }
}

export default TodoList;