/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BedType } from '../types/room';

type RegisterRoomState = {
  largeBuildingType: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
  maximumGuestCount: number;
  bedroomCount: number;
  bedCount: number;
  bedList: { id: number; beds: { type: BedType; count: number }[] }[];
  publicBedList: { type: BedType; count: number }[];
  bathroomCount: number;
  bathroomType: 'private' | 'public' | null;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  amentities: string[];
  conveniences: string[];
  photos: string[];
  description: string;
};

const initialState: RegisterRoomState = {
  largeBuildingType: null,
  buildingType: null,
  roomType: null,
  isSetUpForGuest: null,
  maximumGuestCount: 1,
  bedroomCount: 0,
  bedCount: 1,
  bedList: [],
  publicBedList: [],
  bathroomCount: 1,
  bathroomType: null,
  country: '',
  city: '',
  district: '',
  streetAddress: '',
  detailAddress: '',
  postcode: '',
  latitude: 0,
  longitude: 0,
  amentities: [],
  conveniences: [],
  photos: [
    'https://lmw-bucket.s3.ap-northeast-2.amazonaws.com/PhotoView__ee0eb0c9-b499-46b9-958a-cae9c8724296.jpeg',
    'https://lmw-bucket.s3.ap-northeast-2.amazonaws.com/PhotoView__ee0eb0c9-b499-46b9-958a-cae9c8724296.jpeg',
    'https://lmw-bucket.s3.ap-northeast-2.amazonaws.com/PhotoView__ee0eb0c9-b499-46b9-958a-cae9c8724296.jpeg',
    'https://lmw-bucket.s3.ap-northeast-2.amazonaws.com/PhotoView__ee0eb0c9-b499-46b9-958a-cae9c8724296.jpeg',
    'https://lmw-bucket.s3.ap-northeast-2.amazonaws.com/PhotoView__ee0eb0c9-b499-46b9-958a-cae9c8724296.jpeg',
  ],
  description: '',
};

const registerRoom = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    setLargeBulidingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.largeBuildingType = null;
      }
      state.largeBuildingType = action.payload;
      return state;
    },
    setBulidingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
    setRoomType(state, action: PayloadAction<'entire' | 'private' | 'public'>) {
      state.roomType = action.payload;
      return state;
    },
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },
    setMaximumGuestCount(state, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state;
    },
    setBedroomCount(state, action: PayloadAction<number>) {
      const bedroomCount = action.payload;
      state.bedroomCount = bedroomCount;
      state.bedList = Array.from(Array(bedroomCount), (_, index) => ({ id: index + 1, beds: [] }));
      return state;
    },
    setBedCount(state, action: PayloadAction<number>) {
      state.bedCount = action.payload;
      return state;
    },
    setBedTypeCount(state, action: PayloadAction<{ bedroomId: number; type: BedType; count: number }>) {
      const { bedroomId, type, count } = action.payload;
      const bedroom = state.bedList[bedroomId - 1];
      const prevBeds = bedroom.beds;
      const index = prevBeds.findIndex((bed) => bed.type === type);

      if (index === -1) {
        state.bedList[bedroomId - 1].beds = [...prevBeds, { type, count }];
        return state;
      }

      if (count === 0) {
        state.bedList[bedroomId - 1].beds.splice(index, 1);
      } else {
        state.bedList[bedroomId - 1].beds[index].count = count;
      }

      return state;
    },
    setPublicBedTypeCount(state, action: PayloadAction<{ type: BedType; count: number }>) {
      const { type, count } = action.payload;

      const index = state.publicBedList.findIndex((bed) => bed.type === type);

      if (index === -1) {
        state.publicBedList = [...state.publicBedList, { type, count }];

        return state;
      }

      if (count === 0) {
        state.publicBedList.splice(index, 1);
      } else {
        state.publicBedList[index].count = count;
      }

      return state;
    },
    setBathroomCount(state, action: PayloadAction<number>) {
      state.bathroomCount = action.payload;
      return state;
    },
    setBathroomType(state, action: PayloadAction<'private' | 'public'>) {
      state.bathroomType = action.payload;
      return state;
    },
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
      return state;
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
      return state;
    },
    setDistrict(state, action: PayloadAction<string>) {
      state.district = action.payload;
      return state;
    },
    setStreetAddress(state, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
      return state;
    },
    setDetailAddress(state, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
      return state;
    },
    setPostcode(state, action: PayloadAction<string>) {
      state.postcode = action.payload;
      return state;
    },
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
      return state;
    },
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
      return state;
    },
    setAmentities(state, action: PayloadAction<string[]>) {
      state.amentities = action.payload;
    },
    setConveniences(state, action: PayloadAction<string[]>) {
      state.conveniences = action.payload;
    },
    setPhoto(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };
export default registerRoom;
