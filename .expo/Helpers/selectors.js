import { Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
const getFontFamily = (fontFamilyAndroid, fontFamilyIOS) => {
  if (Platform.OS === 'android') {
    return fontFamilyAndroid;
  } else if (Platform.OS === 'ios') {
    return fontFamilyIOS;
  } else {
    return fontFamilyAndroid;
  }
};

export default getFontFamily;
