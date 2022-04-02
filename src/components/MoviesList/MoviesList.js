import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spin, Alert } from "antd";
import apiClient from "../../apiClient";
import { variables } from "../../config/variables";
import PropTypes from "prop-types";
import "./MoviesList.css";
import CenteredSpace from "../CenteredSpace/CenteredSpace";

const { Meta } = Card;

const MoviesList = () => {
  const [moviesData, setMoviesData] = useState(null);
  const [loadingState, setLoadingState] = useState({
    type: "default",
    message: "",
  });

  useEffect(() => {
    setLoadingState({ type: "fetching" });
    apiClient
      .get("/popular", {
        params: {
          page: 1,
        },
      })
      .then((response) => {
        setMoviesData(response?.data);
        setLoadingState({ type: "success" });
      })
      .catch((error) => {
        setLoadingState({ type: "error", message: error.message });
      });

    return () => {};
  }, []);

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
          moviesData?.data?.results.map((movie) => (
            <Col key={movie.id} xs={24} sm={12} md={10} lg={8} xl={6}>
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
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

MoviesList.propTypes = {};

MoviesList.defaultProps = {};

export default MoviesList;
