// https://www.i18next.com/
// https://react.i18next.com/
//
// Example usage:
//
// dictionary/en.json
// {
//   translation: {
//     basic: {
//       greetings: "Hello {{name}}!"
//       other: "Some other"
//     }
//     common: {
//       ...
//     }
//   }
// }
//
// import { Translation } from 'src/ui/atoms/typography/Translation';
// <Translation tkey="basic:greeting" values={{ name: "Marta" }} />
//
// outputs
//
// Hello Marta!

import React from 'react';
import { useTranslation } from 'react-i18next';

export const Translation = ({ tkey, values = {} }) => {
  const { t } = useTranslation();
  return <React.Fragment>{t(tkey, values)}</React.Fragment>;
};
