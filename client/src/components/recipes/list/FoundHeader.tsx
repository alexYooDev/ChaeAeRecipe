import styled from 'styled-components';
import { HighLight } from '../../text/Highlight';
import Button from '../../ui/button/Button';
import { useNavigate } from 'react-router-dom';

type Props = {
  recipeCount: number;
};

const FoundHeader: React.FC<Props> = ({ recipeCount }) => {
  const navigate = useNavigate();

  return (
    <FoundHeaderContainer>
      <h2>
        총 <HighLight>{recipeCount}</HighLight>
        건의 레시피를 찾았습니다!
      </h2>
      <Button className='submit' onClick={() => navigate('/word-search')}>
        직접 검색으로 찾기
      </Button>
    </FoundHeaderContainer>
  );
};

export default FoundHeader;

const FoundHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
