import React, { Component } from 'react'
import { connect } from 'react-redux'


class PageNotFound extends Component {


  render() {
    return (
      <div>
        <h3 className='center'>404 PAGE</h3>
        </div>
    )
  }
}



export default connect()(PageNotFound)