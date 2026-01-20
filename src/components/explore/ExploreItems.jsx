import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Expiration from "../home/Expiration";
import NFTCard from "../UI/NFTCard";
import NFTCardSkeleton from "../UI/NFTCardSkeleton";

const ExploreItems = ({ exploreItems, onFilterChange, loading }) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const visibleItems = exploreItems.slice(0, visibleCount);
  const hasMore = visibleCount < exploreItems.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <div>
        <select
          onChange={(e) => onFilterChange(e.target.value)}
          id="filter-items"
          defaultValue=""
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? Array(8)
            .fill(0)
            .map((_, index) => <NFTCardSkeleton />)
        : visibleItems.map((item, index) => <NFTCard key={index} {...item} />)}
      {hasMore && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={(e) => {
              e.preventDefault();
              loadMore();
            }}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
