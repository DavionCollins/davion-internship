import React, { useEffect, useState } from "react";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { authorId } = useParams();
  const [isFollowing, setisFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
        );

        setAuthor(data);
        setFollowerCount(data.followers);
        setLoading(false);
      } catch (error) {
        console.log("Error loading author:", error);
        setLoading(false);
      }
    };

    getAuthor();
  }, [authorId]);

  function alertCopy() {
    alert('Address Copied')
  }

  function changeFollowing() {
    setisFollowing(!isFollowing);
    if (!isFollowing) {
      setFollowerCount(followerCount + 1);
    } else {
      setFollowerCount(followerCount - 1);
    }
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section id="profile_banner">
          <img
            src='/author_banner.jpg'
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
            }}
          />
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      ) : (
                        <img src={author.authorImage} alt="" />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <>
                              <Skeleton width="200px" height="24px" />
                              <span className="profile_username">
                                <Skeleton width="100px" height="16px" />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width="250px" height="16px" />
                              </span>
                            </>
                          ) : (
                            <>
                              {author.authorName}
                              <span className="profile_username">
                                {author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button onClick={alertCopy} id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <>
                          (<Skeleton width="60px" height="24px" />
                          <Skeleton width="100px" height="40px" />){" "}
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {followerCount}
                          </div>
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={changeFollowing}
                          >
                            {isFollowing ? "unfollow" : "Follow"}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  { author && <AuthorItems author={author} loading={loading} />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
