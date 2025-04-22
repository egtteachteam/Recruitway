import React from 'react'
import Row1 from './Row1'
import Row2 from './Row2'
import Row3 from './Row3'
import Carousel from './Carousel'

const InterviewerDashBoard = () => {
  return (
    <>
      <div className="container-fluid">
        <Carousel/>
        <Row1 />
        <Row2 />
        <Row3 />
      </div>
    </>
  )
}

export default InterviewerDashBoard