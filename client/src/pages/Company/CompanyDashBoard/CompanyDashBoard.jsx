import React from 'react'
import OwlCarousel from './Carousel'
import Row1 from './Row1'
import Row2 from './Row2'
import Row3 from './Row3'
import Carousel from './Carousel'

const CompanyDashBoard = () => {
  return (
    <>
      <div className="container-fluid">
        {/* <OwlCarousel /> */}
        <Carousel/>
        <Row1 />
        <Row2 />
        <Row3 />
      </div>
    </>
  )
}

export default CompanyDashBoard