import PhotoInput from '../../ui/input/PhotoInput';
import RecipeStepInput from './RecipeStepInput';
import styled from 'styled-components';

const CookingStep = ({
  stepNum,
  setStepNum,
  cookingStep,
  setCookingStep,
  imageContent,
  onChangeImg,
}) => {
  return (
    <StepContainer>
      {stepNum.map((idx) => (
        <div key={idx}>
          <h3>조리 단계 {Number(Object.keys(stepNum).splice(idx, 1)) + 1}</h3>
          <RecipeStepInput
            key={idx}
            id={idx.toString()}
            cookingStep={cookingStep}
            onChangeStep={setCookingStep}
            stepNum={stepNum}
            onChangeNum={setStepNum}
            imgContent={imageContent}
            onChangeImg={onChangeImg}
          >
            <PhotoInput
              id={`step${idx + 1}`}
              images={imageContent}
              onChangeImg={onChangeImg}
              placeholder='단계별 사진을 업로드 해주세요.'
            />
          </RecipeStepInput>
        </div>
      ))}
    </StepContainer>
  );
};

export default CookingStep;

const StepContainer = styled.div`
  margin: 20px;
`;
