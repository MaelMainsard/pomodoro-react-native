import {dark, light} from '@eva-design/eva';

export const customTheme = {
    ...light,

    // Background colors (mapped to `primary` colors for background usage)
    'color-primary-50': '#feb1c0',
    'color-primary-100': '#a0cafd',
    'color-primary-200': '#fabb73',

    // Primary colors (these are typically used for buttons, highlights, etc.)
    'color-primary-300': '#8d4a5a',
    'color-primary-400': '#36618e',
    'color-primary-500': '#825414',

    // Text colors (mapped to `basic` colors)
    'color-basic-50': '#000000',  // Default text color (dark)
    'color-basic-100': '#ffffff',  // Text on dark backgrounds
    'color-basic-200': '#ff0000',  // Error or special text color
    'color-basic-300': '#22181a',  // Another custom text color
};
