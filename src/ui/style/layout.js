import { StyleSheet } from 'react-native';

export const size = StyleSheet.create({
  cover: { height: '100%', width: '100%' },
  coverx: { width: '100%' },
  covery: { height: '100%' },
});

export const flex = StyleSheet.create({
  on: { flex: 1 },
  row: {
    flexDirection: 'row',
  },
  rowr: {
    flexDirection: 'row-reverse',
  },
  col: {
    flexDirection: 'column',
  },
  colr: {
    flexDirection: 'column-reverse',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerXContent: {
    flex: 1,
    alignItems: 'center',
  },
  centerYContent: {
    flex: 1,
    justifyContent: 'center',
  },
  centerX: {
    alignItems: 'center',
  },
  centerY: {
    justifyContent: 'center',
  },
  grow: {
    flexGrow: 1,
  },
  wrap: {
    flexWrap: 'wrap',
  },
  nowrap: {
    flexWrap: 'nowrap',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
});

export const border = StyleSheet.create({
  rounded: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  rounded2: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  rounded3: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  notRounded: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  roundedTop: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  roundedBot: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  bottomized: {
    borderBottomWidth: 1,
  },
  width1: {
    borderWidth: 1,
  },
});

export const position = StyleSheet.create({
  a: {
    position: 'absolute',
  },
  r: {
    position: 'relative',
  },
  cover: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  bottom: {
    bottom: 40,
    left: 0,
    right: 0,
  },
  top: {
    top: 40,
    left: 0,
    right: 0,
  },
});
