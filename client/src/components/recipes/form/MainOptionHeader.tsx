import React from 'react';

import Input from '../../ui/input/Input';
import PhotoInput from '../../ui/input/PhotoInput';
import IconOption from '../../category/IconOption';

import { KIND_DATA } from '../../../assets/data/categoryData';

type Props = {
  onChangeTitle: () => void;
  onChangeImg: any;
  imageContent: { files: any; url: any };
  value: string;
};

const MainOptionHeader: React.FC<Props> = ({
  onChangeTitle,
  onChangeImg,
  imageContent,
  value,
}) => {
  return (
    <>
      <Input
        type='text'
        className='title'
        placeholder='제목을 입력해주세요'
        onChange={onChangeTitle}
        value={value}
      />
      <PhotoInput
        id='main_image'
        className='main-image'
        imageContent={imageContent}
        onChangeImg={onChangeImg}
        placeholder='메인사진을 업로드 해주세요.'
      />
      <p>요리 종류</p>
      <IconOption data={KIND_DATA} />
    </>
  );
};

export default MainOptionHeader;
