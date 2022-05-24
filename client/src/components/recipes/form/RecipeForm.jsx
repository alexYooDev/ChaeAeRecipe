import { useCallback, useState } from 'react';
import Input from '../../ui/input/Input';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import styled from 'styled-components';

import {
  METHOD_DATA,
  OCC_DATA,
  KIND_DATA,
  SERVINGS_DATA,
  TIME_DATA,
} from '../../../assets/data/categoryData';

import IngredientList from '../ingredients/IngredientTagList';
import RecipeSteps from './RecipeStepInput';

import PhotoInput from '../../ui/input/PhotoInput';
import Button from '../../ui/button/Button';
import Modal from '../../ui/modal/Modal';
import LoadingSpinner from '../../ui/animation/LoadingSpinner';

import CategoryOption from '../../category/CategoryOption';
import IconOption from '../../category/IconOption';

import { registerRecipe } from '../../../api/recipes';
import { filterState } from '../../../store/store';
import CookingStep from './CookingStep';
import CategoryInput from './CategoryInput';
import IngredientInput from './IngredientInput';

const RecipeForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);
  const [seasoningList, setSeasoningList] = useState([]);
  const [message, setMessage] = useState('');
  const [imageContent, setImageContent] = useState({
    files: {},
    url: {},
  });

  const [option, setOption] = useRecoilState(filterState);
  const resetOption = useResetRecoilState(filterState);

  const [cookingStep, setCookingStep] = useState({});
  const [stepNum, setStepNum] = useState([0]);

  const formData = new FormData();

  const [newRecipe, setNewRecipe] = useState({
    recipe_name: '',
    method: '',
    occation: '',
    kind: '',
    cooking_step: [],
    step_count: 0,
    serving: '',
    time: '',
    total_ingredients: { 재료: {}, 양념: {} },
  });

  const {
    data,
    isLoading,
    refetch: registerNewRecipe,
  } = useQuery('register-recipe', () => registerRecipe(formData), {
    enabled: false,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  });

  /* 레시피 제목 변경 */
  const handleChangeRecipeTitle = useCallback(
    (e) => {
      const title = e.target.value.trim();
      setNewRecipe({ ...newRecipe, recipe_name: title });
    },
    [newRecipe]
  );

  const handleChangeOption = useCallback(
    (value) => {
      const tagType = value.target.name;
      const tagName = value.target.id.slice(1, value.target.id.length);

      setOption({
        ...option,
        [tagType]: tagName,
      });
    },
    [option]
  );

  const handleSumbitRecipe = () => {
    formData.append('data', JSON.stringify(newRecipe));
    Object.entries(imageContent.files).forEach((item) =>
      formData.append(item[0], item[1])
    );
    setIsModalOpen(false);
    registerNewRecipe();
  };

  /* 레시피 작성 취소 */
  const handleCancelSubmit = () => {
    setIsModalOpen(false);
  };

  /* 재료 */
  const totalIngredient = Object.fromEntries(ingredientList);

  /* 양념 */
  const totalSeasoning = Object.fromEntries(seasoningList);

  /* 조리 단계 */
  const totalCookingStep = Object.values(cookingStep);

  /* 스텝 추가 */
  const handleAddSteps = (e) => {
    e.preventDefault();
    setStepNum((prev) => [
      ...prev,
      prev.length ? Number(prev[prev.length - 1]) + 1 : 0,
    ]);
  };

  const isCookingStepAdded =
    newRecipe.cooking_step === '' || imageContent.files.length <= 1
      ? 0
      : stepNum.length;

  const handleCompleteRecipe = (e) => {
    e.preventDefault();
    setNewRecipe({
      ...newRecipe,
      cooking_step: totalCookingStep,
      total_ingredients: JSON.stringify({
        재료: totalIngredient,
        양념: totalSeasoning,
      }),
      kind: option.kind,
      method: option.method,
      occation: option.occ,
      serving: option.serving,
      time: option.time,
      step_count: isCookingStepAdded,
    });

    setIsModalOpen(true);
    setMessage('레시피 작성을 완료하셨나요?');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (data?.data.success) {
    resetOption();
    return <Navigate to={`/recipes/${data.data.recipe_id}`} />;
  }

  return (
    <>
      {isModalOpen && (
        <Modal
          onConfirm={handleSumbitRecipe}
          onCancel={handleCancelSubmit}
          message={message}
        />
      )}
      <RecipeFormContainer onSubmit={handleCompleteRecipe}>
        <RecipeFormHeader>
          <h2>작성 레시피</h2>
          <hr />
        </RecipeFormHeader>
        <MainOptionContainer>
          <MainOptionContainer
            onChangeTitle={handleChangeRecipeTitle}
            value={newRecipe.recipe_name}
            onChangeImg={setImageContent}
            imageContent={imageContent}
          />
          <CategoryInput onChangeOption={handleChangeOption} option={option} />
        </MainOptionContainer>
        <IngredientInput
          ingredientList={ingredientList}
          seasoningList={seasoningList}
          onChangeIngredient={setIngredientList}
          onChangeSeansoning={setSeasoningList}
        />
        <CookingStep
          stepNum={stepNum}
          setStepNum={setStepNum}
          cookingStep={cookingStep}
          setCookingStep={setCookingStep}
          imageContent={imageContent}
          onChangeImg={setImageContent}
        />
        <Button className='add-step' onClick={handleAddSteps}>
          순서 추가
        </Button>
        <Button type='submit' className='submit'>
          작성 완료
        </Button>
      </RecipeFormContainer>
    </>
  );
};

export default RecipeForm;

const RecipeFormContainer = styled.form`
  margin: 3rem auto;
  height: fit-content;
  width: 60rem;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 960px) {
    width: 90%;
    margin-left: 1rem;
  }

  @media (max-width: 390px) {
    width: 370px;
    margin-left: 1rem;
  }
`;

const RecipeFormHeader = styled.header`
  margin: 0 0 2rem auto;
  padding-top: 1rem;
  width: 100%;
  background-color: green;
  border-radius: 8px 8px 0 0;
  opacity: 0.9;
  > h2 {
    color: white;
    text-align: center;
    margin: 1rem;
  }
`;

const MainOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    margin-top: 1.5rem;
    font-size: 1.2rem;
  }
`;
