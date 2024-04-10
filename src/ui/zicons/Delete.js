import React from 'react';
import { Svg, Circle, G, Path, Use, Defs } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';

// original Widht and Height
const oW = 30;
const oH = 30;
const aspectRatio = oW / oH;

export const IconDelete = ({
  unique,
  width,
  height,
  background,
  iconBackgroundColor,
  iconStrokeColor,
  iconLineColor,
}) => {
  const uniqueKey = unique;
  const a = uniqueKey + '_plus_b';
  const { colors } = useTheme();
  let fheight = height;
  let fwidth = width;
  if (!height) {
    fheight = width ? width * aspectRatio : oH;
  }
  if (!width) {
    fwidth = height ? height * aspectRatio : oW;
  }

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMin"
      width={fwidth}
      height={fheight}
      viewBox="0 0 24 24">
      <Defs>
        <Path
          id={a}
          fill={iconLineColor || colors.primary}
          d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"
        />
      </Defs>
      <G>
        {background ? (
          <Circle
            cx="12"
            cy="12"
            r="11"
            stroke={iconStrokeColor || colors.primary}
            fill={iconBackgroundColor || colors.secondary}
            strokeWidth="2%"
          />
        ) : null}
        <G
          fill="none"
          fillRule="evenodd"
          transform={
            background ? 'translate(7,7)scale(0.5)' : 'translate(4 3)'
          }>
          <Use xlinkHref={`#${a}`} />
        </G>
      </G>
    </Svg>
  );
};
