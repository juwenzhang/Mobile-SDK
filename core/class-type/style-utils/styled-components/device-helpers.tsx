import styled, { css } from "styled-components";
import { getClassTypes } from "../..";

const currentClasses = getClassTypes();
const hasClass = (className: string) => currentClasses.includes(className);

export const deviceType = {
    mobile: (styles: TemplateStringsArray) => css`
        ${hasClass('device-mobile') && css(styles)}
    `,
    tablet: (styles: TemplateStringsArray) => css`
        ${hasClass('device-tablet') && css(styles)}
    `,
    pc: (styles: TemplateStringsArray) => css`
        ${hasClass('device-pc') && css(styles)}
    `,
}

export const os = {
    ios: (styles: TemplateStringsArray) => css`
    ${hasClass('os-ios') && css(styles)}
    `,
    android: (styles: TemplateStringsArray) => css`
        ${hasClass('os-android') && css(styles)}
    `
}

export const browser = {
    chrome: (styles: TemplateStringsArray) => css`
        ${hasClass('browser-chrome') && css(styles)}
    `,
    firefox: (styles: TemplateStringsArray) => css`
        ${hasClass('browser-firefox') && css(styles)}
    `,
    safari: (styles: TemplateStringsArray) => css`
        ${hasClass('browser-safari') && css(styles)}
    `,
    edge: (styles: TemplateStringsArray) => css`
        ${hasClass('browser-edge') && css(
            styles
        )}
    `,
    opera: (styles: TemplateStringsArray) => css`
        ${hasClass('browser-opera') && css(styles)}
    `,
    wechat: (styles: TemplateStringsArray) => css`
        ${hasClass('browser-wechat') && css(styles)}
    `
}

export const touch = {
    support: (styles: TemplateStringsArray) => css`
        ${hasClass('support-touch') && css(styles)}
    `,
    noSupport: (styles: TemplateStringsArray) => css`
        ${hasClass('no-support-touch') && css(styles)}
    `
};

export const StyledButton = styled.button`
    padding: 10px 20px;

    ${deviceType.mobile`
        padding: 8px 16px;
    `}

    ${os.ios`
        border-radius: 8px;
    `}
    
    ${browser.wechat`
        background: #07C160;
    `}
`;
