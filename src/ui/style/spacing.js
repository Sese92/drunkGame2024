import { StyleSheet } from 'react-native';

const base = 4;
const iterator = (prefix) => {
  const result = {};
  for (let index = 0; index < 14; index++) {
    const value = index * base;
    const id = prefix.charAt(0);
    result[`${id}${index}`] = {
      [`${prefix}`]: value,
    };
    result[`${id}t${index}`] = {
      [`${prefix}Top`]: value,
    };
    result[`${id}b${index}`] = {
      [`${prefix}Bottom`]: value,
    };
    result[`${id}l${index}`] = {
      [`${prefix}Left`]: value,
    };
    result[`${id}r${index}`] = {
      [`${prefix}Right`]: value,
    };
    result[`${id}x${index}`] = {
      [`${prefix}Horizontal`]: value,
    };
    result[`${id}y${index}`] = {
      [`${prefix}Vertical`]: value,
    };
  }
  return result;
};

export const margins = StyleSheet.create(iterator('margin'));

export const paddings = StyleSheet.create(iterator('padding'));
