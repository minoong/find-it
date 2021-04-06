import Link from 'next/link';
import React from 'react';
import Button from '../../common/Button';
import SearchIcon from '../../../public/static/svg/search/white_search.svg';

const SearchRoomButton: React.FC = () => {
  return (
    <Link href="/room">
      <a>
        <Button icon={<SearchIcon />} color="amaranth" width="5.5625rem">
          검색
        </Button>
      </a>
    </Link>
  );
};

export default SearchRoomButton;
