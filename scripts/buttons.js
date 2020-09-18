const _ = require('lodash');
const Color = require('color');

/* Creates default button */
const createDefault = options => {

    return {
        [`${options.baseClass}`]: {
            borderRadius: options.borderRadius,
            cursor: options.cursor,
            display: 'inline-block',
            fontSize: options.fontSize,
            fontWeight: options.fontWeight,
            lineHeight: options.lineHeight,
            padding: options.padding,
            textDecoration: 'none',
            transition: options.transition
        } 
    }
}

/* Creates solid colored buttons */
const createSolid = (colorConfig, options) => {

    if (_.isEmpty(colorConfig)) return {};

    let buttonStyles = {};

    _.forIn(Object.entries(colorConfig), config => {

        let [key, properties] = config;

        Object.assign(buttonStyles, {
            [`${options.baseClass}-${key}`]: {
                backgroundColor: properties['background'],
                color: properties['text'],
                cursor: _.get(properties, 'cursor', options.cursor),
                opacity: _.get(properties, 'opacity', '1'),
                pointerEvents: _.get(properties, 'pointerEvents', 'auto'),
                '&:hover': {
                    backgroundColor: _.get(properties, 'hoverBackground', Color(properties.background).darken(0.1).hex().toString()),
                    color: _.get(properties, 'hoverText', properties.text)
                },
                '&:active': {
                    backgroundColor: _.get(properties, 'activeBackground', Color(properties.background).darken(0.1).hex().toString()),
                    color: _.get(properties, 'activeText', properties.text)
                }
            }
        });
    });
    
    return buttonStyles;
}

/* Creates outlined buttons */
const createOutlined = (colorConfig, options) => {

    if (_.isEmpty(colorConfig)) return {};

    let buttonStyles = {};

    _.forIn(Object.entries(colorConfig), config => {

        let [key, properties] = config;

        let textColor = (key === 'default' || key === 'disabled') ? `${properties.text}` : `${properties.background}`;

        let buttonProperties = {
            backgroundColor: 'transparent',
            border: `solid ${options.borderWidth}px ${properties.background}`,
            color: textColor,
            cursor: _.get(properties, 'cursor', options.cursor),
            opacity: _.get(properties, 'opacity', '1'),
            pointerEvents: _.get(properties, 'pointerEvents', 'auto'),
        };

        Object.assign(buttonStyles, {
            [`${options.baseClass}-outlined-${key}`]: {
                ...buttonProperties,
                '&:hover': {
                    borderColor: _.get(properties, 'hoverBorderColor', Color(properties.background).darken(0.2).hex().toString()),
                    borderWidth: _.get(properties, 'hoverBorderWidth', options.borderWidth),
                    color: _.get(properties, 'hoverText', textColor)
                },
                '&:active': {
                    borderColor: _.get(properties, 'activeBorderColor', Color(properties.background).darken(0.2).hex().toString()),
                    borderWidth: _.get(properties, 'activeBorderWidth', options.borderWidth),
                    color: _.get(properties, 'activeText', textColor)
                }
            }
        },
        {
            [`${options.baseClass}-outlined-alt-${key}`]: {
                ...buttonProperties,
                '&:hover': {
                    backgroundColor: _.get(properties, 'hoverBackground', properties.background),
                    color: _.get(properties, 'hoverText', '#fff')
                },
                '&:active': {
                    borderColor: _.get(properties, 'hoverBorderColor', properties.background),
                    color: _.get(properties, 'activeText', '#fff')
                }
            }
        });
    });

    return buttonStyles;
}

/* Creates rounded buttons */
function createRounded(options) {
    return {
        [`${options.baseClass}-rounded`] : {
            borderRadius: '25px'
        },
    }
}

/* Creates gradient buttons */
function createGradient(colorConfig, options) {

    if (_.isEmpty(colorConfig)) return {};

    let buttonStyles = {};

    _.forIn(Object.entries(colorConfig), config => {

        let [key, properties] = config;

        let dark = Color(properties.background).darken(0.2).hex().toString();

        let light = Color(properties.background).lighten(0.1).hex().toString();

        Object.assign(buttonStyles, {
            [`${options.baseClass}-gradient-${key}`]: {
                backgroundImage: `linear-gradient(to right, ${dark} 0%, ${light} 51%, ${dark} 100%)`,
                backgroundSize: '200% auto',
                color: '#fff',
                '&:hover': {
                    backgroundPosition: 'right center'
                }
            }
        });
    });
    
    return buttonStyles;
}

/* Creates button sizes */
function createSizes(options) {

    let buttonSizes = {};

    Object.entries(options.sizes).forEach(size => {

        let [key, properties] = size;

        Object.assign(buttonSizes, {
            [`${options.baseClass}-${key}`]: {
                fontSize: properties.fontSize,
                padding: properties.padding
            }
        })
    });

    return buttonSizes;
}

module.exports = {
    createDefault,
    createSolid,
    createOutlined,
    createRounded,
    createGradient,
    createSizes
}