import React from "react";
import { Link } from "react-router-dom";

function Pagination({ nPages, currentPage, setCurrentPage }) {
  //Function to go to next page with pagination :-
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  //Function to go to previous page with pagination :-
  const prevPage = () => {
    if (currentPage !== 0) setCurrentPage(currentPage - 1);
  };
  return (
    <div>
      <nav aria-label="Page navigation example ">
        <ul className="pagination mt-5">
          {/* To change page perivous page :- */}
          <li className="page-item">
            <Link
              to=""
              onClick={prevPage}
              className={
                currentPage === 0
                  ? "page-link d-none text-success"
                  : "page-link text-success"
              }
              tabIndex="-1"
              aria-disabled="true"
            >
              <i className="fa-solid fa-angles-left"></i>
            </Link>
            {/* No of pagination:- */}
          </li>{" "}
          {(nPages || []).map((pgNumber, i) => {
            return (
              <li
                className={`page-item${currentPage === pgNumber ? "active " : "text-success"
                  } `}
                key={i}
              >
                <Link
                  to=""
                  // className="page-link "
                  onClick={() => setCurrentPage(pgNumber)}
                  className={`page-link ${currentPage === pgNumber
                      ? "active bg-success"
                      : "text-success"
                    } `}
                >
                  {pgNumber + 1}
                </Link>
              </li>
            );
          })}
          {/* To change page next page :- */}
          <li className="page-item">
            <Link
              onClick={nextPage}
              className={
                currentPage === nPages.length - 1
                  ? "page-link d-none text-success"
                  : "page-link text-success"
              }
            >
              <i className="fa-solid fa-angles-right"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
