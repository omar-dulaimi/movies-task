import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Card, Spin, Alert, Statistic, Divider } from "antd";
import apiClient from "../../apiClient";
import { variables } from "../../config/variables";
import CenteredSpace from "../CenteredSpace/CenteredSpace.lazy";
import "./MovieDetails.css";

const { Meta } = Card;

const MovieDetails = () => {
  const params = useParams();
  const { movieId } = params;
  const [movieData, setMovieData] = useState(null);
  const [loadingState, setLoadingState] = useState({
    type: "default",
    message: "",
  });

  useEffect(() => {
    setLoadingState({ type: "fetching" });
    apiClient
      .get("/movie", {
        params: {
          movieId,
        },
      })
      .then((response) => {
        setMovieData(response?.data?.data);
        setLoadingState({ type: "success" });
      })
      .catch((error) => {
        setLoadingState({ type: "error", message: error.message });
      });

    return () => {};
  }, []);

  return (
    <div className="MovieDetails">
      {loadingState?.type === "fetching" ? (
        <CenteredSpace>
          <Spin size="large" />
        </CenteredSpace>
      ) : loadingState?.type === "error" || !movieData ? (
        <CenteredSpace>
          <Alert
            message="An error occurred"
            description={loadingState.message}
            type="error"
          />
        </CenteredSpace>
      ) : (
        <CenteredSpace>
          <Col key={movieId} xs={24} sm={12} md={10} lg={8} xl={6}>
            <Card
              className="movie-details-card"
              hoverable
              cover={
                <img
                  alt={movieData["title"]}
                  src={`${variables.imagesBaseUrl}${movieData["poster_path"]}`}
                />
              }
            >
              <Meta
                title={movieData["title"]}
                description={movieData["overview"]}
              />
              <Divider orientation="left" plain>
                Statistics
              </Divider>

              <Statistic
                title="Budget"
                value={movieData["budget"]}
                precision={2}
              />
              <Statistic
                title="Revenue"
                value={movieData["revenue"]}
                precision={2}
              />
              <Statistic
                title="Popularity"
                value={movieData["popularity"] + "%"}
              />
            </Card>
          </Col>
        </CenteredSpace>
      )}
    </div>
  );
};

export default MovieDetails;
