import React from "react";
import StarRatings from "react-star-ratings";
import Verified from "../layout/verify.png";

const ListReviews = ({ reviews }) => {
  return (
    <div class="reviews ">
      {reviews?.map((review) => (
        <div key={review?._id} class="review-card my-3">
          <div class="row">
            <div class="m-0">
              <div className="flex">
                <img
                  src={
                    review?.user?.avatar
                      ? review?.user?.avatar?.url
                      : "/images/default_avatar.jpg"
                  }
                  alt="User Name"
                  width="10"
                  height="10"
                  className="rounded-circle w-10 h-10"
                />
                <p className=" ml-2 mt-2">by {review.user?.name}</p>
                <img src={Verified} className="h-5 ml-1 mt-2.5" alt="" />
                <p className="text-gray-400 text-xs ml-2 mt-2.5">
                  Verified User
                </p>
              </div>
              <StarRatings
                rating={review?.rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="24px"
                starSpacing="1px"
              />

              <p class="">{review?.comment}</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ListReviews;
