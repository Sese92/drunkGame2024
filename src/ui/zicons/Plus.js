import React from 'react';
import { Svg, Circle, G, Path, Use, Defs } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';

// original Widht and Height
const oW = 30;
const oH = 30;
const aspectRatio = oW / oH;

export const IconPlus = ({
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
          d="M8.836 7.164h6.328c.462 0 .836.374.836.836 0 .462-.374.836-.836.836H8.836v6.328c0 .462-.374.836-.836.836-.462 0-.836-.374-.836-.836V8.836H.836C.374 8.836 0 8.462 0 8c0-.462.374-.836.836-.836h6.328V.836C7.164.374 7.538 0 8 0c.462 0 .836.374.836.836v6.328z"
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
