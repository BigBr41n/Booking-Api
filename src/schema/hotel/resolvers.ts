import { ApolloError } from 'apollo-server-express';
import {
  addNewHotel,
  updateHotelDetails,
  removeHotel,
  updateAvailableRooms,
  searchHotels,
  getHotelById,
  getAllHotels
} from '../../services/hotels.services';
import * as _ from '../../resources_schema.ts/hotel.schema'

const resolvers = {
  Query: {
    searchHotels: async (_: any, { criteria }: { criteria: any }) => {
      try {
        return await searchHotels(criteria);
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
    getHotelById: async (_: any, { hotelId }: { hotelId: string }) => {
      try {
        _.hotelIdSchema(hotelId) 
        return await getHotelById(hotelId);
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
    getAllHotels: async () => {
      try {
        return await getAllHotels();
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
  },

  Mutation: {
    addNewHotel: async (_: any, { hotelData }: { hotelData: any }) => {
      try {
        _.hotelDataSchema(hotelData)  ;
        return await addNewHotel(hotelData);
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
    updateHotelDetails: async (_: any, { hotelId, hotelData }: { hotelId: string, hotelData: any }) => {
      try {
        _.partialHotelDataSchema.parse(hotelData) ;
        return await updateHotelDetails(hotelId, hotelData);
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
    removeHotel: async (_: any, { hotelId }: { hotelId: string }) => {
      try {
        return await removeHotel(hotelId);
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
    updateAvailableRooms: async (_: any, { hotelId, roomsAvailable }: { hotelId: string, roomsAvailable: number }) => {
      try {
        _.updateAvailableRoomsSchema({ hotelId, roomsAvailable }) ;   ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;  ;
        return await updateAvailableRooms(hotelId, roomsAvailable);
      } catch (error: any) {
        throw new ApolloError(error.message, error.code);
      }
    },
  },
};



export default resolvers;