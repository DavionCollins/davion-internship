import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";

import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getItemDetails() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=17914494",
    );
    setItemDetails(data);
    setLoading(false);
  }

  useEffect(() => {
    getItemDetails();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <>
                    <Skeleton width="500px" height="400px" />
                  </>
                ) : (
                  <>
                    <img
                      src={itemDetails.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </>
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <>
                      <Skeleton
                        width=""
                        height="50px"
                        marginTop="20px"
                        marginBottom="20px"
                      />
                    </>
                  ) : (
                    <>
                      <h2>{itemDetails.title}</h2>
                    </>
                  )}

                  <div className="item_info_counts">
                    {loading ? (
                      <>
                        <Skeleton width="" height="" />{" "}
                      </>
                    ) : (
                      <>
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>

                          {itemDetails.views}
                        </div>
                      </>
                    )}
                    {loading ? (
                      <>
                        {" "}
                        <Skeleton width="" />
                      </>
                    ) : (
                      <>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>

                          {itemDetails.likes}
                        </div>
                      </>
                    )}
                  </div>

                  {loading ? (
                    <>
                      <Skeleton />
                    </>
                  ) : (
                    <>
                      <p>{itemDetails.description}</p>
                    </>
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      {loading ? (
                        <>
                          <Skeleton
                            width="100px"
                            marginTop="12px"
                            marginBottom="12px"
                          />
                        </>
                      ) : (
                        <>
                          <h6>Owner</h6>
                        </>
                      )}

                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <>
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                            </>
                          ) : (
                            <>
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <>
                              <Skeleton width="60px" />
                            </>
                          ) : (
                            <>
                              <Link to={`/author/${itemDetails.ownerId}`}>
                                {itemDetails.ownerName}
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      {loading ? (
                        <>
                          <Skeleton width="100px" />
                        </>
                      ) : (
                        <>
                          <h6>Creator</h6>
                        </>
                      )}

                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <>
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                                marginTop="20px"
                                marginBottom=""
                              />
                            </>
                          ) : (
                            <>
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={itemDetails.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <>
                              <Skeleton width="50px" marginTop="20px" />{" "}
                            </>
                          ) : (
                            <>
                              <Link to={`/author/${itemDetails.creatorId}`}>
                                {itemDetails.creatorName}
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    {loading ? (
                      <>
                        <Skeleton width="50px" marginBottom="20px" />
                      </>
                    ) : (
                      <>
                        <h6>Price</h6>
                      </>
                    )}

                    <div className="nft-item-price">
                      {loading ? (
                        <>
                          <Skeleton width="100px" marginBottom="10px" />
                        </>
                      ) : (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{itemDetails.price}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
