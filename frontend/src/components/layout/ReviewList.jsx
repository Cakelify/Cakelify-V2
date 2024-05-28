import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

function ReviewList() {
  const data = [
    {
      name: "Rajesh Sharma",
      review:
        "Yeh cake bilkul mithaas ki dukaan hai! Chocolaty flavor ne dil jeet liya!",
    },
    {
      name: "Priya Patel",
      review:
        "Vanilla cake ka maza hi kuch aur hai! Bilkul mast texture aur aroma hai!",
    },
    {
      name: "Anil Gupta",
      review:
        "Red velvet cake ki moistness aur creaminess ekdum perfect hai! Wah wah!",
    },
    {
      name: "Sunita Singh",
      review:
        "Fruit cake ka taste bilkul fresh fruits jaisa hai! Refreshing aur delicious!",
    },
    {
      name: "Amit Desai",
      review:
        "Coffee cake ka flavor bilkul energizing hai! Khaate hi freshness aati hai!",
    },
    {
      name: "Pooja Shah",
      review:
        "Nut cake mein kaafi crunchiness hai! Dry fruits ki masti hi kuch aur hai!",
    },
    {
      name: "Ravi Kumar",
      review:
        "Caramel cake ka texture aur sweetness bilkul balanced hai! Ekdum mast hai!",
    },
    {
      name: "Neha Jain",
      review:
        "Lemon cake ka tangy flavor ekdum refreshing hai! Zest ka maza hi kuch aur hai!",
    },
    {
      name: "Deepak Patel",
      review:
        "Strawberry cake ki sweetness aur fragrance bilkul yummy hai! Top-notch hai!",
    },
    {
      name: "Sarita Sharma",
      review:
        "Pineapple cake ka juicy flavor ekdum divine hai! Wah wah, ekdum mast!",
    },
    {
      name: "Vikas Gupta",
      review:
        "Mango cake ka flavor bilkul fresh mango jaisa hai! Wah wah, kya maza hai!",
    },
    {
      name: "Anita Singh",
      review:
        "Blueberry cake ka color aur flavor ekdum vibrant hai! Bilkul blast hai!",
    },
    {
      name: "Sanjay Joshi",
      review:
        "Coconut cake ka aroma aur texture bilkul tropical vibes deta hai! Wah wah!",
    },
    {
      name: "Shweta Patel",
      review:
        "Oreo cake ka creamy aur chocolaty flavor bilkul addictive hai! Mast hai!",
    },
    {
      name: "Rajeev Kumar",
      review:
        "Raspberry cake ka tangy aur sweet combo ekdum perfect hai! Wah, kya maza hai!",
    },
    {
      name: "Preeti Sharma",
      review:
        "Black forest cake ka rich chocolate aur cherry flavor ekdum delightful hai!",
    },
    {
      name: "Aakash Singh",
      review:
        "Custard cake ka creamy aur smooth texture bilkul melt-in-the-mouth hai!",
    },
    {
      name: "Kavita Gupta",
      review:
        "Hazelnut cake ka nutty aur chocolaty flavor ekdum heavenly hai! Mast hai!",
    },
    {
      name: "Rahul Mishra",
      review:
        "Butterscotch cake ka crunchy aur buttery taste bilkul yummy hai! Wah wah!",
    },
    {
      name: "Divya Sharma",
      review:
        "Cheesecake ka creamy aur cheesy texture ekdum luxurious hai! Top-notch!",
    },

    {
      name: "Meera Gupta",
      review:
        "Mango mastani cake ka tropical aur mango flavor ekdum refreshing hai!",
    },
    {
      name: "Sanjay Singh",
      review:
        "Rabri cake ka desi swaad bilkul authentic hai! Wah wah, ekdum mast!",
    },
    {
      name: "Sneha Patel",
      review:
        "Peanut butter cake ka nutty aur creamy flavor ekdum indulgent hai!",
    },
    {
      name: "Amita Sharma",
      review:
        "Chocolate orange cake ka citrusy aur chocolaty combo ekdum unique hai!",
    },
    {
      name: "Vikram Gupta",
      review:
        "Pineapple upside-down cake ka fruity aur caramelized flavor ekdum delicious hai!",
    },
    {
      name: "Juhi Mishra",
      review:
        "Tiramisu cake ka coffee aur creamy texture bilkul luxurious hai! Top-notch!",
    },
    {
      name: "Kunal Patel",
      review:
        "Cinnamon swirl cake ka warm aur spicy flavor ekdum comforting hai!",
    },
    {
      name: "Shilpa Singh",
      review:
        "Cranberry bliss cake ka tangy aur sweet flavor bilkul blissful hai!",
    },
    {
      name: "Rajesh Gupta",
      review:
        "Coconut cream cake ka tropical aur creamy flavor ekdum divine hai!",
    },
    {
      name: "Suman Sharma",
      review:
        "Saffron pistachio cake ka royal aur nutty flavor ekdum luxurious hai!",
    },
  ];

  const data2 = [
    {
      name: "Aruna Patel",
      review:
        "Kitkat cake ka crunchy aur chocolaty flavor bilkul mast hai! Wah wah!",
    },
    {
      name: "Rajat Gupta",
      review:
        "Pista cake ka nutty aur pistachio flavor ekdum delicious hai! Top-notch!",
    },
    {
      name: "Nisha Singh",
      review:
        "Rasmalai cake ka desi twist ekdum hatke hai! Mithaas ki bauchaar!",
    },
    {
      name: "Vinod Sharma",
      review:
        "Gulab jamun cake ka fusion ekdum unique hai! Wah, kya taste hai!",
    },
    {
      name: "Manisha Gupta",
      review:
        "Kaju katli cake ka rich aur nutty flavor ekdum royal hai! Mast hai!",
    },
    {
      name: "Sachin Mishra",
      review:
        "Chocofudge cake ka chocolaty aur fudgy texture bilkul irresistible hai!",
    },
    {
      name: "Ananya Patel",
      review:
        "Mint chocolate cake ka refreshing aur chocolaty combo ekdum refreshing hai!",
    },
    {
      name: "Vivek Singh",
      review:
        "Mawa cake ka desi swaad ekdum authentic hai! Wah, kya nostalgia hai!",
    },
    {
      name: "Anjali Sharma",
      review:
        "Butter cake ka creamy aur buttery texture bilkul melt-in-the-mouth hai!",
    },
    {
      name: "Rahul Patel",
      review:
        "Cherry delight cake ka fruity aur tangy flavor bilkul delightful hai!",
    },
    {
      name: "Neha Kapoor",
      review:
        "Mocha madness cake ka coffee aur chocolate flavor ekdum addictive hai! Wah!",
    },
    {
      name: "Rakesh Verma",
      review:
        "Caramel crunch cake ka caramelized aur nutty flavor ekdum delightful hai!",
    },
    {
      name: "Shivani Reddy",
      review:
        "Cherry blossom cake ka fruity aur floral flavor bilkul refreshing hai!",
    },
    {
      name: "Rajendra Yadav",
      review:
        "Tropical paradise cake ka exotic aur fruity flavor ekdum refreshing hai!",
    },
    {
      name: "Anjali Mehta",
      review:
        "Lavender love cake ka floral aur soothing flavor bilkul delightful hai!",
    },
    {
      name: "Ashish Gupta",
      review:
        "Peanut paradise cake ka nutty aur creamy flavor bilkul indulgent hai!",
    },
    {
      name: "Ritu Shah",
      review:
        "Orange zest cake ka citrusy aur refreshing flavor ekdum delightful hai!",
    },
    {
      name: "Karthik Patel",
      review:
        "Pumpkin spice cake ka warm aur spicy flavor bilkul comforting hai!",
    },
    {
      name: "Preeti Kapoor",
      review:
        "Almond amour cake ka nutty aur creamy flavor ekdum luxurious hai!",
    },
    {
      name: "Vishal Reddy",
      review:
        "Hazelnut heaven cake ka nutty aur chocolaty flavor bilkul divine hai!",
    },
    {
      name: "Sarika Singh",
      review:
        "Passion fruit punch cake ka tangy aur fruity flavor ekdum refreshing hai!",
    },
    {
      name: "Anil Mehta",
      review:
        "Pistachio paradise cake ka nutty aur pistachio flavor ekdum delightful hai!",
    },
    {
      name: "Divya Patel",
      review:
        "Gingerbread delight cake ka spicy aur comforting flavor bilkul mast hai!",
    },
    {
      name: "Rahul Gupta",
      review:
        "Marble marvel cake ka swirls aur flavors ekdum fascinating hai! Wah!",
    },
    {
      name: "Shreya Sharma",
      review:
        "Raspberry rhapsody cake ka tangy aur sweet flavor ekdum delightful hai!",
    },
    {
      name: "Amita Reddy",
      review:
        "Coconut caramel cake ka tropical aur caramelized flavor bilkul divine hai!",
    },
    {
      name: "Vikas Kumar",
      review:
        "Lemon lavender cake ka citrusy aur floral flavor ekdum refreshing hai!",
    },
    {
      name: "Ananya Gupta",
      review:
        "Rose petal passion cake ka floral aur sweet flavor bilkul romantic hai!",
    },
    {
      name: "Sanjay Verma",
      review:
        "Cinnamon swirl cake ka warm aur spicy flavor ekdum comforting hai!",
    },
    {
      name: "Nisha Reddy",
      review:
        "Maple madness cake ka sweet aur nutty flavor ekdum indulgent hai!",
    },
  ];
  return (
    <div className="flex flex-col justify-center mb-20">
      <div className="flex flex-col justify-center">
        <div className="w-11/12 h-100 ml-auto mr-auto ">
          <div className="mt-2">
            <p className="text-center mt-3 mb-4 fontStyle1 text-xl ">Reviews</p>
            <div className="flex gap-2">
              <div>
                {" "}
                {data.map((d) => (
                  <div>
                    <div className="bg-white max-h-max text-black rounded-3xl w-44 border-1 border-black">
                      <div className="flex flex-col justify-center items-center gap-4 p-7 ">
                        <p className="text-black font-semibold">{d.review}</p>
                      </div>
                    </div>

                    <p className="flex flex-col justify-center items-center gap-4 p-6 fontStyle w-44">
                      {d.name}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                {data2.map((d) => (
                  <div>
                    <div className="bg-white max-h-max text-black border-1 border-black  rounded-3xl w-44">
                      <div className="flex flex-col justify-center items-center gap-4 p-7 ">
                        <p className="text-black font-semibold">{d.review}</p>
                      </div>
                    </div>

                    <p className="flex flex-col justify-center items-center gap-4 p-6 fontStyle w-44">
                      {d.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewList;
