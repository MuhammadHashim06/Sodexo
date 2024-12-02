import React, { useEffect, useState } from "react";
import "./Header.css";
import "./Header-res.css";
import sodexo_top_navhamburger_icon from "../../assets/Icons/sodexo-top-nav-hamburger-icon.svg";
import topNavPhoneIcon from "../../assets/Icons/top-nav-phone-icon.svg";
import config from "../../config"; // Import the config file

function Header() {
  const [apiData, setApiData] = useState(null);
  const [headerData, setHeaderData] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility

  // Fetch the header data from the API
  useEffect(() => {
    fetch(`${config.apiBaseUrl}/headers?populate=*`)
      .then((response) => response.json())
      .then((data) => {
        setHeaderData(data.data); // Set the fetched data
        console.log("Fetched header data:", data.data); // Console log to check the data structure
      })
      .catch((error) => {
        console.error("Error fetching header data:", error);
      });
  }, []);

  // Fetch additional data from the new API endpoint
  useEffect(() => {
    fetch(
      `${config.apiBaseUrl}/headers?populate[HeaderRight][populate]=Right_Content`
    )
      .then((response) => response.json())
      .then((data) => {
        setApiData(data.data); // Store the new data
        console.log("Fetched additional header data:", data.data); // Console log to check the data structure
      })
      .catch((error) => {
        console.error("Error fetching additional header data:", error);
      });
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible); // Toggle the dropdown visibility
  };

  useEffect(() => {
    const navMenuIcon = document.querySelector(".sodexo-top-nav-hamburger");

    if (navMenuIcon) {
      const dropDownMenu = document.querySelector(".dropdown-menu");

      const handleClick = () => {
        navMenuIcon.classList.toggle("nav-menu-icon-active");
        if (dropDownMenu) {
          dropDownMenu.classList.toggle("dropdown-menu-active");
        }
      };

      navMenuIcon.addEventListener("click", handleClick);

      // Clean up the event listener when the component unmounts
      return () => {
        navMenuIcon.removeEventListener("click", handleClick);
      };
    }
  }, []);

  useEffect(() => {
    const topNavMenuMb = document.querySelectorAll(".grid-item h3");
    const topNavSubMenuMb = document.querySelectorAll(".grid-item ul");
  
    if (topNavMenuMb) {
      // Loop through the NodeList of h3 elements
      topNavMenuMb.forEach((menu, index) => {
        const subMenu = topNavSubMenuMb[index]; // Corresponding ul element for this h3
        
        // Function to toggle class on click
        const handleClick = () => {
          subMenu.classList.toggle("top-nav-sub-menu-active");
        };
  
        // Attach event listener
        menu.addEventListener("click", handleClick);
  
        // Cleanup function to remove the event listener on unmount
        return () => {
          menu.removeEventListener("click", handleClick);
        };
      });
    }
  }, []);
  

  // Use useEffect to manipulate the DOM after rendering

  return (
    <div>
      <header className="sodexo-header-container">
        <div className="sodexo-header">
          {/* Top Navigation Bar */}
          <nav className="sodexo-top-nav-container">
            <div className="sodexo-top-nav-hamburger" onClick={toggleDropdown}>
              <img src={sodexo_top_navhamburger_icon} alt="menu icon" />
              <p>Menu</p>
            </div>
            <div className="header-top-content">
              {/* Display Title Images */}
              <div className="title-images-container">
                {headerData &&
                  headerData[0]?.titleImage?.map((image, index) => (
                    <div key={index} className="title-image-item">
                      {/* Displaying the image with 50px width */}
                      <img
                        src={config.apiBaseUrl.replace("/api", "") + image.url}
                        alt={`Title Image ${index + 1}`}
                        // style={{
                        //   width: "100px",
                        //   height: "100px",
                        //   objectFit: "cover",
                        // }} // 50px size
                      />
                      {/* Optional caption or additional details */}
                      {image.caption && <p>{image.caption}</p>}
                    </div>
                  ))}
              </div>
            </div>
            <a href="/" className="sodexo-top-nav-btn">
              Partner with us
            </a>
            <a href="/" className="sodexo-top-nav-btn-mb">
              <img src={topNavPhoneIcon} alt="" />
            </a>
          </nav>
          <div className="dropdown-menu">
            {/* ----------------------------------------------------------------------------------- */}
            <div className="dropdown-menu-inner">
              {/* ----------------------------------------------------------------------------------- */}
              <div className="header-left-content">
                {headerData && headerData[0]?.headerLeftImage?.url ? (
                  <img
                    src={
                      config.apiBaseUrl.replace("/api", "") +
                      headerData[0].headerLeftImage.url
                    }
                    alt="Header Left"
                  />
                ) : (
                  <p>No image available</p>
                )}
                <div>
                  {headerData &&
                    headerData[0]?.HeaderLeft?.leftContent.map(
                      (content, index) => {
                        // Ensure content and children are defined
                        if (!content || !content.children) return null;

                        // Handle headings
                        if (content.type === "heading") {
                          const HeadingTag = `h${content.level}`; // Dynamically set the heading tag based on the level
                          return (
                            <HeadingTag key={index}>
                              {content.children[0].text}{" "}
                              {/* Display the text inside the heading */}
                            </HeadingTag>
                          );
                        }

                        // Handle paragraphs (which may include links and text)
                        else if (content.type === "paragraph") {
                          return (
                            <p key={index}>
                              {content.children.map((child, childIndex) => {
                                // Handle links inside the paragraph
                                if (child.type === "link") {
                                  return (
                                    <a
                                      key={childIndex}
                                      href={child.url}
                                      target={child.newTab ? "_blank" : "_self"}
                                      rel={
                                        child.newTab
                                          ? "noopener noreferrer"
                                          : undefined
                                      }
                                    >
                                      {child.children[0].text}{" "}
                                      {/* Render the link text */}
                                    </a>
                                  );
                                }
                                // Handle text inside the paragraph
                                else if (child.type === "text") {
                                  return (
                                    <span key={childIndex}>{child.text}</span>
                                  ); // Render the text as a span to inline with other elements
                                }
                                return null; // Fallback for unsupported types
                              })}
                            </p>
                          );
                        }

                        // Handle standalone text
                        else if (content.type === "text") {
                          return <p key={index}>{content.children[0].text}</p>;
                        }

                        // Handle standalone links
                        else if (content.type === "link") {
                          return (
                            <a
                              key={index}
                              href={content.url}
                              target={content.newTab ? "_blank" : "_self"}
                              rel={
                                content.newTab
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            >
                              {content.children[0].text}
                            </a>
                          );
                        }

                        return null; // Fallback for unsupported types
                      }
                    )}
                </div>
              </div>

              {/* ----------------------------------------------------------------------------------- */}
              <div className="header-right-content">
                <div className="grid-container">
                  {apiData &&
                    apiData.map((item, index) => (
                      <div key={index} className="grid-row">
                        {/* Display all contentMainTitle */}
                        {item.HeaderRight.map(
                          (headerRightItem, headerRightIndex) => (
                            <div key={headerRightIndex} className="grid-item">
                              <h3>{headerRightItem.contentMainTitle}</h3>
                              {/* Loop through Right_Content to display contentTitle and contentLink */}
                              <ul>
                                {headerRightItem.Right_Content.map(
                                  (content, contentIndex) => (
                                    <li key={contentIndex}>
                                      <a
                                        href={content.contentLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {content.contentTitle}
                                      </a>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    ))}
                </div>

                {/* ----------------------------------------------------------------------------------- */}

                <div className="header-bottom-content">
                  {/* Display headerBottomImage1 */}
                  <div className="header-bottom-image-container">
                    {/* Display headerBottomImage1 */}
                    {headerData && headerData[0]?.headerBottomImage1 && (
                      <div className="header-bottom-image-item">
                        <img
                          src={
                            config.apiBaseUrl.replace("/api", "") +
                            headerData[0].headerBottomImage1.url
                          }
                          alt="Header Bottom Image 1"
                        />
                      </div>
                    )}

                    {/* Display headerBottomImage2 */}
                    {headerData && headerData[0]?.headerBottomImage2 && (
                      <div className="header-bottom-image-item">
                        <img
                          src={
                            config.apiBaseUrl.replace("/api", "") +
                            headerData[0].headerBottomImage2.url
                          }
                          alt="Header Bottom Image 2"
                        />
                      </div>
                    )}
                  </div>
                  {/* Dynamically render bottom content */}

                  <div className="bottom-content">
                    {headerData &&
                      headerData[0]?.HeaderBottom?.bottomContent.map(
                        (content, index) => {
                          // Handle headings
                          if (content.type === "heading") {
                            const HeadingTag = `h${content.level}`; // Dynamically set the heading tag based on the level
                            return (
                              <HeadingTag key={index}>
                                {content.children.map((child, childIndex) => {
                                  if (child.type === "text") {
                                    return (
                                      <span key={childIndex}>{child.text}</span>
                                    );
                                  }
                                  return null; // Fallback for unsupported types
                                })}
                              </HeadingTag>
                            );
                          }

                          // Handle paragraphs (which may include text and links)
                          else if (content.type === "paragraph") {
                            return (
                              <p key={index}>
                                {content.children.map((child, childIndex) => {
                                  if (child.type === "text") {
                                    return (
                                      <span key={childIndex}>{child.text}</span>
                                    ); // Render the text
                                  } else if (child.type === "link") {
                                    return (
                                      <a
                                        key={childIndex}
                                        href={child.url}
                                        target={
                                          child.newTab ? "_blank" : "_self"
                                        }
                                        rel={
                                          child.newTab
                                            ? "noopener noreferrer"
                                            : undefined
                                        }
                                      >
                                        {child.children[0]?.text}{" "}
                                        {/* Render the link text */}
                                      </a>
                                    );
                                  }
                                  return null; // Fallback for unsupported child types
                                })}
                              </p>
                            );
                          }

                          // Handle standalone text
                          else if (content.type === "text") {
                            return (
                              <p key={index}>{content.children[0].text}</p>
                            );
                          }

                          // Handle standalone links
                          else if (content.type === "link") {
                            return (
                              <a
                                key={index}
                                href={content.url}
                                target={content.newTab ? "_blank" : "_self"}
                                rel={
                                  content.newTab
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                {content.children[0].text}{" "}
                                {/* Render link text */}
                              </a>
                            );
                          }

                          return null; // Fallback for unsupported types
                        }
                      )}
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------------------------------------- */}
            </div>
          </div>
          {/* Dropdown Menu */}
          {/* {isDropdownVisible && (
            
          )} */}
        </div>
      </header>
    </div>
  );
}

export default Header;
