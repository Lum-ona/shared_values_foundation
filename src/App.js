import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { db } from "./FirebaseConfig";
import { onValue, ref } from "firebase/database";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

const pages = [
  "map",
  "home",
  "about",
  "health",
  "nasike",
  "lucyBio",
  "economic",
  "education",
];

export default function App() {
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    const starCountRef = ref(db, "pages");

    onValue(
      starCountRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const pageMap = pages.reduce((acc, page) => {
            acc[page] = data.find((pageData) => pageData.pageName === page);
            return acc;
          }, {});
          setPageData(pageMap);
        } else {
          console.log("No data available");
        }
      },
      (error) => console.log("Error fetching data:", error)
    );
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          {pages.map((page, index) => (
            <Route
              key={page}
              path={`/${page === "home" ? "" : page}`}
              element={React.createElement(
                require(`./pages/${page}/${
                  page.charAt(0).toUpperCase() + page.slice(1)
                }`).default,
                { data: pageData[page], dataIndex: index }
              )}
            />
          ))}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
