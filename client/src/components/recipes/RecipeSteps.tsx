import React, { ChangeEventHandler, MouseEventHandler } from 'react';
import Button from '../ui/button/Button';

type Props = {
  id: string;
  onChangeStep: ChangeEventHandler;
  cookingStep: any;
  stepNum: number[];
  onChangeNum: any;
  imgContent: File;
  onChangeImg: any;
};

const RecipeSteps: React.FC<Props> = ({
  cookingStep,
  onChangeStep,
  id,
  stepNum,
  onChangeNum,
  imgContent,
  onChangeImg,
  children,
}) => {
  /* 각 인풋 동적으로 변경 */

  const handleStepChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangeStep({
      ...cookingStep,
      [e.target.id]: e.target.value,
    });
  };

  const handleDeleteStep: MouseEventHandler = (event) => {
    event.preventDefault();
    if (stepNum.length > 1) {
      const reducedStep = stepNum.filter((item) => item.toString() !== id);
      onChangeNum(reducedStep);
      onChangeStep({
        ...cookingStep,
        [id]: '',
      });
    }
    if (stepNum.length === 1) {
      onChangeStep({
        ...cookingStep,
        [id]: '',
      });
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            id={id}
            type='textarea'
            style={{ height: '10rem', width: '20rem', marginRight: '50px' }}
            value={cookingStep[id]}
            placeholder='조리 단계를 상세히 입력해 주세요'
            onChange={handleStepChange}
          />
          {children}
        </div>
        <Button id={id} className='delete' onClick={handleDeleteStep}>
          삭제
        </Button>
      </div>
    </div>
  );
};

export default RecipeSteps;
