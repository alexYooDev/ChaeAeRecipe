import React, { Dispatch } from 'react';
import styled from 'styled-components';
import IngredientTagList from '../ingredients/IngredientTagList';

type Props = {
  ingredientList: string[];
  seasoningList: string[];
  onChangeIngredient: Dispatch<React.SetStateAction<never[] | any>>;
  onChangeSeasoning: Dispatch<React.SetStateAction<never[] | any>>;
};

const IngredientInput: React.FC<Props> = ({
  ingredientList,
  seasoningList,
  onChangeIngredient,
  onChangeSeasoning,
}) => {
  return (
    <>
      <p>사용 재료</p>
      <IngredientContainer>
        <IngredientTagList
          text='사용 재료'
          list={ingredientList}
          onChangeList={onChangeIngredient}
        />
      </IngredientContainer>
      <p>사용 양념</p>
      <IngredientContainer>
        <IngredientTagList
          text='사용 양념'
          list={seasoningList}
          onChangeList={onChangeSeasoning}
        />
      </IngredientContainer>
    </>
  );
};

export default IngredientInput;

const IngredientContainer = styled.div`
  display: flex;
  align-items: center;
`;
