import React from "react";
import StarRatings from "react-star-ratings";

const ListReviews = ({ reviews }) => {
  return (
    <div class="reviews ">
      {reviews?.map((review) => (
        <div key={review?._id} class="review-card my-3">
          <div class="row">
            <div class="p-0">
              <img
                src={
                  review?.user?.avatar
                    ? review?.user?.avatar?.url
                    : "/images/default_avatar.jpg"
                }
                alt="User Name"
                width="50"
                height="50"
                className="rounded-circle w-24 h-24"
              />
            </div>
            <div class="m-0">
              <StarRatings
                rating={review?.rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="24px"
                starSpacing="1px"
              />
              <p class="review_user">by {review.user?.name}</p>
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
