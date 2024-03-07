import React from "react";
import Cake from "./Cakes.png";
import JarCakes from "./JarCakes.png";
import Pastry from "./pastry.png";
import "./Category.css";

export default function CategoryProductSlider() {
  <div className="productCategory">
    <div>
      <img src={Cake} alt="Cake" className="CategoryCake" />
      <h4>Cakes</h4>
    </div>
    <div>
      <img src={JarCakes} alt="JarCakes" className="CategoryJarCakes" />
      <h4>Pastry</h4>
    </div>
    <div>
      <img src={Pastry} alt="Pastry" className="CategoryPastry" />
      <h4>Jar Cakes</h4>
    </div>
  </div>;
}
