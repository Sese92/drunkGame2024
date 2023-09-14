import React from 'react';
import { Svg, Circle, G, Path, Use, Defs } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';

// original Widht and Height
const oW = 30;
const oH = 30;
const aspectRatio = oW / oH;

export const IconArrow = ({
  unique,
  width,
  height,
  background,
  iconBackgroundColor,
  iconStrokeColor,
  iconLineColor,
  rotate,
  style,
}) => {
  const uniqueKey = unique;
  const a = uniqueKey + '_chevron_a';
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
      style={style}
      viewBox="0 0 24 24">
      <Defs>
        <Path
          id={a}
          fill={iconLineColor || colors.primary}
          d="M4.659 17.233l7.247-7.905c.253-.277.662-.277.915-.001l7.247 7.906c.38.414.995.414 1.375 0 .379-.413.379-1.085 0-1.499L14.196 7.83c-1.01-1.105-2.652-1.105-3.664 0l-7.247 7.905c-.38.414-.38 1.086 0 1.5.379.413.994.413 1.374 0z"
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
        <G fillRule="evenodd">
          <Use
            transform={
              rotate
                ? `rotate(${rotate} 12.364 12.272)`
                : 'rotate(0 12.364 12.272)'
            }
            xlinkHref={`#${a}`}
          />
        </G>
      </G>
    </Svg>
  );
};
