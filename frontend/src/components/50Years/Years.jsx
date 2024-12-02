import React from "react";

function Years() {
  return (
    <div>
      {/* 50 years */}
      <div className="sodexo-50-year-container">
        <div className="sodexo-50-year-inner">
          <div className="sodexo-50-year-inner-1">
            <img
              src="./Assets/Images/sodexo-50-year-img.png"
              alt=""
              className="sodexo-50-year-img"
            />
            <div className="sodexo-50-year-img-bg" />
          </div>
          <div className="sodexo-50-year-inner-2">
            <h2>
              50 YEARS OF
              <br />
              CULINARY CREATIVITY
            </h2>
            <p>
              For over half a century we’ve made the food that turns
              <br />
              schools into families. We build lasting, creative
              <br />
              relationships with our schools, designing menus that <br />
              nourish the imagination and wellbeing of every student.
              <br />
              We’re honoured to be a part of your school’s journey,
              <br />
              offering dining experiences rooted in tradition, innovation
              <br />
              and care.
            </p>
            <img src="./Assets/Icons/signature-simon.svg" alt="" />
            <h5>Simon Knight</h5>
            <p>Managing Director</p>
          </div>
        </div>
        <div className="sodexo-50-year-bg" />
      </div>
    </div>
  );
}

export default Years;
