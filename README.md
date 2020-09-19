# Tailwind CSS Base Buttons
This plugin adds a bunch of base button classes in your Tailwindcss components which can be customized based on your theme colors.

<a href="https://tailwindcss-base-buttons.netlify.app/">Demo & Documentation</a>

## Install
1. Install the plugin:
```
npm install tailwindcss-base-buttons --save-dev
```
2. Add it inside your `tailwind.config.js` file:
```
module.exports = {
    // ...
    plugins: [
        require('tailwindcss-base-buttons')()
    ]
}
```
## Documentation 
Out of the box, the plugin will generate these classes for styling your buttons. 
- `btn-{color}` - Colors are the default Tailwind colors. Ex: `btn-indigo`.
- `btn-{theme}` - These classes are theme based colors. Ex: `btn-primary`. Other options are `secondary`, `danger`, `default` & `disabled`.
- `btn-outlined-{color|theme}` - These are outlined button based on default and theme colors. Ex: `btn-outlined-primary` or `btn-outlined-red`.
- `btn-outlined-alt-{color|theme}` - Same as outlined button but with solid backround on hover.
- `btn-gradient-{color|theme}` -These are gradient buttons based on default and theme colors. Ex: `btn-gradient-primary` or `btn-gradient-pink`.
- `btn-{size}` - These are button size classes. Ex: `btn-xs`. Other options are `sm`,`md`(default), `lg`,`xl`,
- `btn-rounded` - These makes rounded buttons

## Customization
The appearance of the button can be customized by passing an option object as a first argument of the plugin. Ex:
```
module.exports = {
    // ...
    plugins: [
        require('tailwindcss-base-buttons')({
            baseClass: '.button',
            borderRadius: '.5rem',
            padding: '.5rem 1rem',
            colors: {
                theme: {
                    primary: {
                        background: red,
                        text: white
                    },
                    secondary: {
                        background: blue,
                        text: black
                    }
                }
            }
        })
    ]
}

```
The example above will generate classes like `.button-*` with border-radius `.5rem` and padding `.5rem 1rem`. The theme colors generated would be `.button-primary` & `.button-secondary`. 

You can also add your custom button styles by adding an object or a callback that generates your button style object as a second argument. 
Ex: using an object. This adds the `.btn-sample` class 
```
module.exports = {
    // ...
    plugins: [
        require('tailwindcss-base-buttons')({
            baseClass: '.btn'
        },{
            '.btn-sample': {
                color: 'red',
                width: '200px'
            }
        })
    ]
}
```
Ex: using a callback. By using a callback, you can access the `colorConfig` and `options` which contains the default and theme colors and the options. This will add `.btn-sample-{color|theme}` classes. 
```
    module.exports = {
    // ...
    plugins: [
        require('tailwindcss-base-buttons')({
            baseClass: '.btn'
        },(colorConfig, options) => {

            let additionalStyles = {};

            Object.entries(colorConfig, config => {

                let [key, properties] = config;

                Object.assign(additionalStyles, {
                    [`${options.baseClass}-sample-${key}`]: {
                        backgroundColor: properties['background'],
                        width: '200px'
                    }
                })
            });

            return additionalStyles;
        })
    ]
}
```


