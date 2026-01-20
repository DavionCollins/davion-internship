import React from 'react'
import Skeleton from './Skeleton'
import '../../css/styles/Skeleton.css'

const NFTCardSkeleton = () => {
  return (
    <div
      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <div className="skeleton" style={{ width: "50px", height: "50px", borderRadius: "50%" }}></div>
        </div>
        <div className="de_countdown">
          <div className="skeleton" style={{ width: "100px", height: "20px" }}></div>
        </div>

        <div className="nft__item_wrap">
          <div className="skeleton" style={{ width: "100%", height: "300px" }}></div>
        </div>
        
        <div className="nft__item_info">
          <div className="skeleton" style={{ width: "70%", height: "24px", marginBottom: "8px" }}></div>
          <div className="skeleton" style={{ width: "40%", height: "20px" }}></div>
        </div>
      </div>
    </div>
  )
}

export default NFTCardSkeleton
