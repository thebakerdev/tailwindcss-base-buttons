const _ = require('lodash');
const defaultConfig = require('tailwindcss/defaultConfig');

const defaultColors = _.omit(defaultConfig.theme.colors, [
    'transparent',
    'current'
]);

/* Sets default colors options from Tailwindcss' config */
function setDefaultColorOptions() {

    const colorOptions = {};

    const override = {
        black: {
            background: defaultColors['black'],
            text: defaultColors['white']
        },
        white: {
            background: defaultColors['white'],
            text: defaultColors['black']
        }
    }

    _.forIn(defaultColors, (value, key) => {

        colorOptions[key] = {
            background: _.get(override[key], 'background', value[500]),
            text: _.get(override[key], 'text', defaultColors['white'])
        };
     }); 

    return colorOptions;
}

/* Sets the default theme colors */
function setDefaultThemeColors() {

    return {
        primary: {
            background: defaultColors['blue'][500],
            text: defaultColors['white']
        },
        secondary: {
            background: defaultColors['teal'][500],
            text: defaultColors['white']
        },
        danger: {
            background: defaultColors['red'][500],
            text: defaultColors['white']
        },
        default: {
            background: '#e0e1e2',
            text: defaultColors['gray'][700],
            hoverText: defaultColors['gray'][700],
            activeText: defaultColors['gray'][700]
        },
        disabled: {
            background: '#e0e1e2',
            cursor: 'default',
            hoverBackground: '#e0e1e2',
            hoverText: defaultColors['gray'][700],
            opacity: '.45',
            pointerEvents: 'none',
            text: defaultColors['gray'][700]
        }
    }
}

module.exports = function() {
    return {
        baseClass: '.btn',
        borderRadius: '.25rem',
        borderWidth: '1',
        colors: {
            default: setDefaultColorOptions,
            theme: setDefaultThemeColors
        },
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        lineHeight: '1.25',
        padding: '.75em 1.5em',
        sizes: {
            xs: {
                fontSize: '0.75rem',
                padding: '0.5625rem 1.125rem'
            },
            sm: {
                fontSize: '0.875rem',
                padding: '0.65625rem 1.3125rem'
            },
            md: {
                fontSize: '1rem',
                padding: '.75em 1.5em',
            },
            lg: {
                fontSize: '1.125rem',
                padding: '0.84375rem 1.6875rem'
            },
            xl: {
                fontSize: '1.25rem',
                padding: '0.9525rem 1.905rem'
            }
        },
        transition: 'all .2s ease-out'
    }
}
