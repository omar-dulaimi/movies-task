import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import apiClient from "../../apiClient";
import { variables } from "../../config/variables";
import PropTypes from "prop-types";
import "./MoviesList.css";

const { Meta } = Card;

const MoviesList = () => {
  const [moviesData, setMoviesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("/popular", {
        params: {
          page: 1,
        },
      })
      .then((response) => {
        setMoviesData(response?.data);
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: MoviesList.js ~ line 21 ~ useEffect ~ error",
          error
        );
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {};
  }, []);

  return (
    <div className="MoviesList">
      <Row>
        {moviesData?.data?.results.map((movie) => (
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
        ))}
      </Row>
    </div>
  );
};

MoviesList.propTypes = {};

MoviesList.defaultProps = {};

export default MoviesList;
