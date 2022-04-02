import React from "react";
import { Row, Col, Card, Spin, Alert, Pagination, Divider } from "antd";
import { Link } from "react-router-dom";
import { variables } from "../../config/variables";
import PropTypes from "prop-types";
import "./MoviesList.css";
import CenteredSpace from "../CenteredSpace/CenteredSpace";

const { Meta } = Card;

const MoviesList = (props) => {
  const {
    moviesData,
    loadingState,
    setCurrentPage,
    currentPage,
    selectedYear,
  } = props;
  return (
    <div className="MoviesList">
      <Row>
        {loadingState?.type === "fetching" ? (
          <CenteredSpace>
            <Spin size="large" />
          </CenteredSpace>
        ) : loadingState?.type === "error" ? (
          <CenteredSpace>
            <Alert
              message="An error occurred"
              description={loadingState.message}
              type="error"
            />
          </CenteredSpace>
        ) : (
          <>
            {moviesData?.results.map((movie) => (
              <Col key={movie.id} xs={24} sm={12} md={10} lg={8} xl={6}>
                <Link to={`/movie/${movie.id}`}>
                  <Card
                    className="movie-card"
                    hoverable
                    cover={
                      <img
                        alt={movie["title"]}
                        src={`${variables.imagesBaseUrl}${movie["poster_path"]}`}
                      />
                    }
                  >
                    <Meta title={movie["title"]} />
                  </Card>
                </Link>
              </Col>
            ))}

            {!selectedYear && (
              <>
                <Divider plain />
                <Pagination
                  defaultCurrent={1}
                  current={currentPage}
                  total={
                    moviesData["total_results"] <= 5000
                      ? moviesData["total_results"]
                      : 5000
                  }
                  showSizeChanger={false}
                  pageSizeOptions={{}}
                  onChange={(page) => {
                    setCurrentPage(page);
                  }}
                  className="movies-list-paginator"
                />
              </>
            )}
          </>
        )}
      </Row>
    </div>
  );
};

MoviesList.propTypes = {
  moviesData: PropTypes.object,
  loadingState: PropTypes.object,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

MoviesList.defaultProps = {
  moviesData: null,
  loadingState: {
    type: "default",
    message: "",
  },
  currentPage: 1,
  setCurrentPage: () => {
    throw new Error("Can't set current page due to not passed setter");
  },
};

export default MoviesList;
