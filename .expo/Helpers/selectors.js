import { Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
const getFontFamily = (fontFamilyAndroid, fontFamilyIOS) => {
  if (Platform.OS === 'android') {
    return fontFamilyAndroid;
  } else if (Platform.OS === 'ios') {
    return fontFamilyIOS;
  } else {
    // În cazul altor platforme, poți reveni la un font implicit sau să adaugi logica specifică
    return fontFamilyAndroid;
  }
};

export default getFontFamily;
