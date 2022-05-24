import styled from 'styled-components';

import {
  METHOD_DATA,
  OCC_DATA,
  SERVINGS_DATA,
  TIME_DATA,
} from '../../../assets/data/categoryData';

import CategoryOption from '../../category/CategoryOption';

const CategoryInput = ({ onChangeOption, option }) => {
  return (
    <CategoryOptionContainer>
      <CategoryOption
        data={SERVINGS_DATA.slice(1)}
        onChange={onChangeOption}
        option={option.serving}
      >
        인분:
      </CategoryOption>
      <CategoryOption
        data={TIME_DATA.slice(1)}
        onChange={onChangeOption}
        option={option.time}
      >
        시간:
      </CategoryOption>
      <CategoryOption
        data={METHOD_DATA.slice(1)}
        onChange={onChangeOption}
        option={option.method}
      >
        방법:
      </CategoryOption>
      <CategoryOption
        data={OCC_DATA.slice(1)}
        onChange={onChangeOption}
        option={option.occ}
      >
        상황:
      </CategoryOption>
    </CategoryOptionContainer>
  );
};

export default CategoryInput;

const CategoryOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 30px;
`;
