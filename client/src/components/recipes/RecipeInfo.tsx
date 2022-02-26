import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { HighLight } from '../../components/text/Highlight';
import { useQuery } from 'react-query';
import { fetchDetailInfo } from '../../api/recipes';
import LoadingSpinner from '../LoadingSpinner';
import StarRatings from 'react-star-ratings';

const RecipeInfo: React.FC = () => {
  const params = useParams().id;

  const { data, isLoading } = useQuery('recipe-detail', () =>
    fetchDetailInfo(params)
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <DetailContainer>
        <h2>{data?.data.recipe_name}</h2>
        <hr style={{ width: '97%', marginBottom: '2rem' }} />
        <PhotoContainer
          style={{ backgroundImage: `url(${data?.data.main_image})` }}
        />
        <div>
          <p>
            <p>
              <HighLight>작성자: </HighLight>
              {data?.data.user_nickname}
            </p>
            <HighLight>평점: </HighLight>
            <StarRatings
              rating={data?.data.mean_rating}
              starDimension='30px'
              starSpacing='1px'
            />
          </p>
          <p>
            <HighLight>상황: </HighLight>
            {data?.data.occation}
          </p>
          <p>
            <HighLight>종류: </HighLight>
            {data?.data.kind}
          </p>
          <p>
            <HighLight>필요 재료: </HighLight>
            {data?.data.total_ingredients}
          </p>
          <IconsWrapper>
            <IconContainer>
              <img
                style={{ width: '40px' }}
                src='/images/people.png'
                alt={data?.data.serving}
              />
              <p>{data?.data.serving}</p>
            </IconContainer>
            <IconContainer>
              <img
                style={{ width: '40px' }}
                src='/images/clock.png'
                alt={data?.data.time}
              />
              <p>{data?.data.time}</p>
            </IconContainer>
          </IconsWrapper>
          <p>{data?.data.created_at}</p>
        </div>
      </DetailContainer>
    </div>
  );
};

export default RecipeInfo;

const IconContainer = styled.div`
  background-color: lightgrey;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    margin-top: 5px;
  }
`;

const PhotoContainer = styled.div`
  height: 500px;
  width: 500px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const DetailContainer = styled.div`
  margin-top: 3rem;
  height: fit-content;
  width: 60rem;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h2 {
    margin: 2rem;
  }
`;
