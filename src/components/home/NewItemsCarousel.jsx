import React, { useEffect, useRef, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../../css/styles/Carousel.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Expiration from "./Expiration";

const NewItemsCarousel = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const abortControllerRef = useRef(null);
  useEffect(() => {
    const getNewItems = async () => {
      abortControllerRef.current = new AbortController();

      try {
        const { data } = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
          { signal: abortControllerRef.current.signal },
        );
        setNewItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading NFTs:", error);
        setLoading(false);
      }
    };

    getNewItems();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    touchDrag: true,
    mouseDrag: true,
    pullDrag: true,
    responsive: {
      0: {
        items: 1,
        dots: true,
      },
      500: {
        items: 1,
        nav: true,
      },
      600: {
        items: 2,
        nav: true,
      },
      800: {
        items: 3,
        nav: true,
      },
      1240: {
        items: 4,
        nav: true,
      },
    },
  };

 

  if (loading) {
    return (
      <div className="skeleton__carousel">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="skelton__item">
            <div className="nft_coll skeleton">
              <div className="nft_wrap skeleton__image"></div>
              <div className="nft_coll_pp skeleton__avatar"></div>
              <div className="nft_coll_info skeleton">
                <div className="skeleton__title"></div>
                <div className="skeleton__text"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {!loading && newItems.length > 0 && (
      <OwlCarousel className="owl-theme" {...options}>
        {newItems.map((newItem, index) => (
          <div key={`${newItem.nftId}-${index}`}>
            <div className="nft__item">
              <div className="author_list_pp">
                <Link
                  to={`/author/${newItem.authorId}`}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Creator: Monica Lucas"
                >
                  <img className="lazy" src={newItem.authorImage} alt="" />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="de_countdown">
                <Expiration expiryDate={newItem.expiryDate} />
              </div>

              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <button target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </button>
                      <button target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </button>
                      <button>
                        <i className="fa fa-envelope fa-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <Link to={`/item-details/${newItem.nftId}`}>
                  <img
                    src={newItem.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
              <div className="nft__item_info">
                <Link to={`/item-details/${newItem.nftId}`}>
                  <h4>{newItem.title}</h4>
                </Link>
                <div className="nft__item_price">{newItem.price} ETH</div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>{newItem.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
      )}
    </div>
  );
};

export default NewItemsCarousel;
