import React from 'react';
import { Svg, Circle, G, Path, Use, Defs } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';

// original Widht and Height
const oW = 30;
const oH = 30;
const aspectRatio = oW / oH;

export const IconMinus = ({
  unique,
  width,
  height,
  background,
  iconBackgroundColor,
  iconStrokeColor,
  iconLineColor,
}) => {
  const uniqueKey = unique;
  const a = uniqueKey + 'minus_a';
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
          d="M14.514 0H.8C.358 0 0 .358 0 .8c0 .442.358.8.8.8h13.714c.442 0 .8-.358.8-.8 0-.442-.358-.8-.8-.8z"
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
            background ? 'translate(7,7)scale(0.5)' : 'translate(4 10)'
          }>
          <Use xlinkHref={`#${a}`} />
        </G>
      </G>
    </Svg>
  );
};
