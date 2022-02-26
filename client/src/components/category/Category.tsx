import React, {
  useState,
  useCallback,
  ChangeEvent,
  FormEventHandler,
  ChangeEventHandler,
} from 'react';
import styled from 'styled-components';
import { METHOD_DATA } from '../../assets/data/categoryData';
import { OCC_DATA } from '../../assets/data/categoryData';
import { KIND_DATA } from '../../assets/data/categoryData';
import SearchBar from '../search/SearchBar';
import Button from '../button/Button';
import CategoryOption from './CategoryOption';

const Category: React.FC = () => {
  /* 스테이트는 부모컴포넌트에서 관리 */
  const [option, setOption] = useState({
    kind: '페스코',
    method: '전체',
    occ: '전체',
  });
  const [searchInput, setSearchInput] = useState('');

  const handleSelectOpt = useCallback(
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

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInput(e.target.value);
  };

  const handleFetchSearchResult: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <CategoryContainer>
        <CategoryTitle>조건별 검색</CategoryTitle>
        <form
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
          onSubmit={handleFetchSearchResult}
        >
          <SearchBar
            onChange={handleChangeInput}
            placeholder='레시피 재료를 입력하세요.'
          />
          <Button>검색</Button>
        </form>
        {
          <form>
            <hr />
            <CategoryOption
              data={KIND_DATA}
              onChange={handleSelectOpt}
              option={option.kind}
            >
              종류별
            </CategoryOption>
            <CategoryOption
              data={METHOD_DATA}
              onChange={handleSelectOpt}
              option={option.method}
            >
              방법별
            </CategoryOption>
            <CategoryOption
              data={OCC_DATA}
              onChange={handleSelectOpt}
              option={option.occ}
            >
              상황별
            </CategoryOption>
          </form>
        }
      </CategoryContainer>
    </>
  );
};

export default Category;

const CategoryContainer = styled.div`
  margin: 8rem auto 0;
  padding: 2rem 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  width: fit-content;
`;

const CategoryTitle = styled.h2`
  margin-bottom: 1rem;
  text-align: center;
  color: black;
`;
