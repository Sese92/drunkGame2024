import { StyleSheet } from 'react-native';

const black = '#000';
const info = '#FFB703';

export const shadows = StyleSheet.create({
  L0: {
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  L05: {
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.05,
    elevation: 8,
  },
  L1: {
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  L1Info: {
    shadowColor: info,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 1,
  },
  L1Black: {
    shadowColor: black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.7,
    elevation: 1,
  },
});
