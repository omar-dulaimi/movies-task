import React from "react";
import { Row, Col, Card } from "antd";
import { variables } from "../../config/variables";
import PropTypes from "prop-types";
import "./MoviesList.css";
import movies from "../../data.json";

const { Meta } = Card;

const MoviesList = () => {
  return (
    <div className="MoviesList">
      <Row>
        {movies.data.results.map((movie) => (
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
