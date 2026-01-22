import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../css/styles/TopSellers.css";

const TopSellers = () => {
  const [topSellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getTopSellers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    );
    setSellers(data);
    setLoading(false)
  }

  useEffect(() => {
    getTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div  data-aos="fade-up" className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div  className="col-md-12">
            <ol className="author_list">
              {loading
                ? Array(12)
                    .fill(0)
                    .map((_, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <div className="skeleton__avatar"></div>
                        </div>
                        <div className="author_list_info">
                          <div className="skeleton__name"></div>
                          <div className="skeleton__price"></div>
                        </div>
                      </li>
                    ))
                : topSellers.map((topSeller, index) => (
                    <li key={index}>
                      <div  className="author_list_pp">
                        <Link
                          key={topSeller.id}
                          to={`/author/${topSeller.authorId}`}
                        >
                          <img
                            className="lazy pp-author"
                            src={topSeller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{topSeller.authorName}</Link>
                        <span>{topSeller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
