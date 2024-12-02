// import React, { useEffect, useState } from "react";
// import "./Header.css";
// import sodexo_top_navhamburger_icon from "../../assets/Icons/sodexo-top-nav-hamburger-icon.svg";
// import sodexo_top_nav_logo from "../../assets/Icons/sodexo-top-nav-logo.svg";
// import config from "../../config"; // Import the config file

// function Header() {
//   const [headerData, setHeaderData] = useState(null); // State to store the fetched data
//   const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility

//   useEffect(() => {
//     // Fetch data from the API
//     fetch(`${config.apiBaseUrl}/headers?populate=*`)
//       .then((response) => response.json())
//       .then((data) => {
//         setHeaderData(data.data); // Set the fetched data
//         console.log("test", data.data); // Console log to check the data structure
//       })
//       .catch((error) => {
//         console.error("Error fetching header data:", error);
//       });
//   }, []);

//   const toggleDropdown = () => {
//     setIsDropdownVisible(!isDropdownVisible); // Toggle the dropdown visibility
//   };

//   return (
//     <div>
//       {/* header */}
//       <header className="sodexo-header-container">
//         <div className="sodexo-header">
//           <nav className="sodexo-top-nav-container">
//             <div className="sodexo-top-nav-hamburger" onClick={toggleDropdown}>
//               <img src={sodexo_top_navhamburger_icon} alt="menu icon" />
//               <p>Menu</p>
//             </div>

//             {isDropdownVisible && (
//               <div className="dropdown-menu">
//                 {/* Display the headerImage if it exists */}
//                 {headerData && headerData[0].headerImage && (
//                   <div className="top-nav-inner-1">
//                     <img
//                       src={config.apiBaseUrl.replace("/api", "") + headerData[0].headerImage.url} 
//                       alt="Header"
//                       className="header-image"
//                     />
//                     <h3>Independents by Sodexo</h3>
//                     <p>
//                       We are your creative partner for best in class
//                       <br />
//                       dining. Bringing your school together through
//                       <br />
//                       food.
//                     </p>
//                     <a href="">about us</a>
//                   </div>
//                 )}

//                 {/* Display the first 3 items with their contentTitle */}
//                 {headerData &&
//                   headerData.slice(0, 3).map((item) => (
//                     <div key={item.id} className="dropdown-item">
//                       <h3>{item.title}</h3> {/* Display the title */}
//                       {item.ContentLinks.map((link) => (
//                         <a
//                           key={link.id}
//                           href={link.link.trim()}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           {link.contentTitle} {/* Display the contentTitle */}
//                         </a>
//                       ))}
//                     </div>
//                   ))}

//                 <div className="top-nav-inner-2">
//                   <div className="inner-2-links"></div>
//                   <div className="inner-2-bottom">
//                     {/* <img src={sodexo_nav_bottom_img} alt="" /> */}
//                     <div>
//                       <h5>Meet our team</h5>
//                       <p>
//                         Our experienced and specialist independent school
//                         <br />
//                         culinary teams make meals your pupils love to eat.
//                       </p>
//                       <p>Explore more</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <img
//               src={sodexo_top_nav_logo}
//               alt="sodexo logo"
//               className="sodexo-top-nav-logo"
//             />
//             <a href="/" className="sodexo-top-nav-btn">
//               Partner with us
//             </a>
//           </nav>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default Header;
