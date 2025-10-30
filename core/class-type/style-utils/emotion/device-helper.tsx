// class-type/style-utils/emotion/device-helpers.tsx
import { css } from '@emotion/react';
import { getClassTypes } from '../../index';

const currentClasses = getClassTypes();
const hasClass = (className: string) => currentClasses.includes(className);

export const deviceTypeStyles = {
    mobile: (styles: string) => css`
        ${hasClass('device-mobile') && css(styles)}
    `,
    tablet: (styles: string) => css`
        ${hasClass('device-tablet') && css(styles)}
    `,
    pc: (styles: string) => css`
        ${hasClass('device-pc') && css(styles)}
    `
};

export const osStyles = {
    ios: (styles: string) => css`
        ${hasClass('os-ios') && css(styles)}
    `,
    android: (styles: string) => css`
        ${hasClass('os-android') && css(styles)}
    `
};

export const buttonStyles = css`
    padding: 10px 20px;
    
    ${deviceTypeStyles.mobile(`
        padding: 8px 16px;
    `)}
    
    ${osStyles.ios(`
        border-radius: 8px;
    `)}
`;