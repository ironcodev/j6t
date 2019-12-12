# j6t
A lightweight template library using es6 tagged template literals based on jQuery.

## Basic
### base Component class
j6t resembles React in a sense that there is a base Component class from which you can derive your components.
```javascript
class App extends j6t.Component {
}
```
### Component.render()
Each component should override a render() method it inherits from Component and return its own output in this method.
```javascript
class App extends j6t.Component {
    render() {
        return `
            <div>
                Welcome to j6t!
            </div>`
    }
}
```
### Using template literals in render()
There is no rendering language such as JSX in j6t. Instead, you return component's output as simple strings.
```javascript
class App extends j6t.Component {
    render() {
        return "<div>" +
                "Welcome to j6t" +
                "</div>"
    }
}
```
Using ES6 template literals and interpolations is a great way to specify componet's output.
```javascript
class App extends j6t.Component {
    render() {
        const name = 'j6t';
        
        return `
            <div>
                Welcome to ${name}.
            </div>`
    }
}
```
### j6t.render()
Finally to render your component and display it in the page, you need to pass it to j6t.render(). This method has two arguments and works nearly in the same way as ReactDOM.render(). The first argument is a component. The second is a DOM node to which the component will be rendered to.

```javascript
class App extends j6t.Component {
    render() {
        const name = 'j6t'
        
        return `
            <div>
                Wecome to ${name}.
            </div>`
    }
}

const app = new App();

j6t.render(app, '#app')
```

jsfiddle:
https://jsfiddle.net/omrani/znksgp6v/4/

### props and constructor
j6t's components have a props property (similar to React with some restrictions). You can pass your properties to your component's constructor as an object when instantiating from your component. Pay attention that you need to specify an explicit constructor for your component and call super() in it.

```javascript
class App extends j6t.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { name } = this.props;
        
        return `
            <div>
                Wecome to ${name}.
            </div>`
    }
}

const app = new App({ name: 'j6t' });
```
jsfiddle:
https://jsfiddle.net/omrani/znksgp6v/6/

## Component.parse() and HTMLEncode by default
j6t's Component comes with an intelligent parse() method, and it is then when the interesting part begins.

Instead of returning a template literal, you can pass your template literal to parse() method and return its result as your return value.

```javascript
class App extends j6t.Component {
    ...
    render() {
        ...
        return this.parse`
            <div>
                Welcome to ${name}.
            </div>`
    }
}
```
jsfiddle:
https://jsfiddle.net/omrani/znksgp6v/9/

Component.parse() is a tag function. It html encodes interpolated expressions by default. This prevents XSS injection attacks which normal template literals potentially have.

So, name variable will be html encoded in the following example.

```javascript
class App extends j6t.Component {
    ...
    render() {
        ...
        return this.parse`
            <div>
                ${this.name}
            </div>`
    }
}

const app = new App({ name: '<script>alert("XSS succeeded!")</script>j6t'});

j6t.render(app, '#app')
```
## Writing raw HTML values

If you want your interpolated expression be written as raw HTML, prepend an excalamtion mark before $ sign in your template literal.

```javascript
class App extends j6t.Component {
    render() {
        return this.parse`
            <div>
                Welcome to !${'<b>j6t</b>'}
            </div>`
    }
}
```
jsfiddle:
https://jsfiddle.net/omrani/znksgp6v/15/

## HTML Attributes
ES6 template literals really eases using HTML attributes.
```javascript
class Button extends j6t.Component {
    ...
    render() {
        const { type, size, text } = this.props;
        
        return `
            <button id="btn1" class="btn btn-${type}" style="width: ${size}">
                ${text}
            </button>`
    }
}

const btn = new Button({ type: 'primary', size: '60px', text: 'Click me' })
```
But as we stated earlier, this pure template literals are prone to XSS. It is better to use parse() to return your content in your render() method.

j6t introduces also another shorter syntax for attributes. If we prepend the name of the attribute before an interpolated expression, j6t adds the extra quotation marks before and after the value. Here is an example:

```javascript
class Input extends j6t.Component {
    ...
    render() {
        const { type, value } = this.props;
        
        return this.parse`<input type${type} value${value} />`
    }
}
```
jsfiddle:
https://jsfiddle.net/omrani/znksgp6v/19/

The above code is equivalent to the following code.

```javascript
class Input extends j6t.Component {
    ...
    render() {
        const { type, value } = this.props;
        
        return this.parse`<input type="${type}" value="${value}" />`
    }
}
```
### Styles
We can specify styles for an element using pure style="..." or style${'...'}. However, style${...} has a major benefit. We can specify a javascript object for style${...}. j6t converts the object to a css style string.

```javascript
class App extends j6t.Component {
    ...
    render() {
        return this.parse`
            <div style${{ backgroundColor: 'red', width: '100px', height: '100px'}}></div>
        `
    }
}
```
The final style attribute for the above <div> would be as below:

<div style="background-color: red; width: 100px; height: 100px"> ...
    
    
## j6t special HTML attributes
Component.parse() supports special HTML attributes.

### id${...}, #${...}
j6t has a dynamic DOM id generator. In order to generate dynamic ids for your tags, use id${}. You need to specify an integer as an index for the id being generated.
```javascript
class Button extends j6t.Component {
    ...
    render() {
        ...
        
        return this.parse`
            <button id${0} class="btn btn-${type}" style="width: ${size}">
                ${text}
            </button>`
    }
}
```
Later in your component you can refer to the generated id using #${...} and specify its index.

```javascript
class Button extends j6t.Component {
    ...
    render() {
        ...
        
        return this.parse`
            <button id${0} class="btn btn-${type}" style="width: ${size}">
                ${text}
            </button>
            <script>
                const btn = document.getElementById('#${0}');
                btn.onclick = function() {
                    alert('Hello World from j6t!');
                }
            </script>
            `
    }
}
```
Dynamic ids is important when creating reusable components. If you specify a fixed or static id for your component its id might collide with another element which has the same id.

#### Component's wrapper and its id
While you can specify the content of a component in render() method freely, it is necessary for a component to have a main or root container in order to refresh and work correctly. To this need, j6t checks if the user has specified a root container for the component. This happens at the end of rendering and producing the component's output. Each component has a unique id which is generated for it automatically. In order to specify the main or root container for a component, we need to use id${'#'} or id#{'.'}. Here is an example:

```javascript
class Button extends j6t.Component {
    ...
    render() {
        ...
        
        return this.parse`
            <div id${'#'}>
                <button id${0} class="btn btn-${type}" style="width: ${size}">
                    ${text}
                </button>
            </div>`
    }
}
```

Here, the <div> is the root container for Button component. It is not necessary to wrap your tags inside a <div> though. If you have only a single tag, you can specify id${'#'} for that tag and make it the root container.
    
```javascript
class Button extends j6t.Component {
    ...
    render() {
        ...
        
        return this.parse`
            <button id${'#'} class="btn btn-${type}" style="width: ${size}">
                ${text}
            </button>`
    }
}
```

If j6t sees that a component doesn't have a root container, it adds a defualt <div id${'#'}> to the conent returned by render().

#### Access current component's id
In order to access current component's id we can use #${'.'}.

```javascript
class Button extends j6t.Component {
    ...
    render() {
        ...
        
        return this.parse`
            <div id${'#'}>
                <button id${0} class="btn btn-${type}" style="width: ${size}">
                    ${text}
                </button>
            </div>
            <style
                #${'.'} button { width: 80px }
            </style>
            `
    }
}
```

Here the CSS rule is only applied to the button inside our component, not any <button> in the page.
    
### Specify manual id for a component
When using id${...} we can specify a manual id for current component.
```javascript
class App extends j6t.Component {
    ...
    render() {
        ...
        
        return this.parse`
            <div id${'myapp'}>
                ...
            </div>`
    }
}
```
It doesn't matter to start the id with # or not. j6t omits # from an id if it sees the manual id starts with #.

It is not recommended though to specify a static id for your component, because multiple instances of the component will have the same id which is an incorrect thing in HTML.

## Events
If you specify an id using id${...}, you can then specify event handlers using xxx${callback} where xxx is the event name and callback is your event handler function. This simplifies defining events. Events names are case-sensitive and should be lowercased always.

```javascript
class Button extends j6t.Component {
    ...
    btnClicked(e) {
        alert('Hello World from j6t!');
    }
    render() {
        ...
        return this.parse`
            <button id${0} onclick${this.btnClicked}>
                ${text}
            </button>`
    }
}
```
Here onclick is assigned to the recent node whose id is specified using id${}. Another example can clarify what elements will be chosen as targets of event.

```javascript
class Card extends j6t.Component {
    ...
    moveUp(id) {
        console.log('moved up')
    }
    moveDown(id) {
        console.log('moved up')
    }
    render() {
        const { id, title } = this.props;
        
        return this.parse`
            <button id${0} onclick${() => this.moveUp(id)}>Up</button>
            <button id${1} onclick${() => this.moveDown(id)}>Down</button>
            
            <span>${title}</span>
            `
    }
}
```

Here the first onclick will be attached for id${0} and the second goes for id${1}.

j6t knows main events in HTML specification, like click, dbclick, mousedown, mouseup, etc. In case we have a custom event, we can specify it by prepending a # before the name of the event.

```javascript
class Button extends j6t.Component {
    ...
    onPageResized(e) {
        ...
    }
    render() {
        ...
        return this.parse`
            <button #onPageResized${this.onPageResized}>
                ${text}
            </button>`
    }
}
```

### Specify events using bind${...}
Sometimes you might want to assign the same event handler for a group of items using a css selector, not a single element. You can specify this event handler using bind${...}. Here is an example.

```javascript
class Pagination extends j6t.Component {
    ...
    liClicked(e) {
        
    }
    render() {
        const colors = [ 'red', 'green', 'blue', 'yellow', 'orange', 'black', 'white' }
        
        return this.parse`
            <ul id${0}>
            ${numbers.map(n => `<li>${n}</li>`).join('')}
            </ul>
            
            bind${{ event: 'click', target: 'ul#0 li', handler: this.liClicked }}
            `
    }
}
```

Here the click event is specified for all <li> elements inside <ul>. There is a single function to handle the event. Note that, we didn't know id of <ul> since its automatically generated, but we are still able to refer to it in our css selector to target the <li> elements. Here, the click events is assigned only to the <li> element inside current component's <ul> not any <li> inside any <ul>.
    
The structure of the object we pass to bind${ ...} is as follows:
```
{
    event: string,  // event name e.g. click, mousedown, keydown, etc.
    target: string, // css selector
    handler: fnEventHandler // function
}
```
To refer to the root container of current component in our css selector, we can use #.

bind${{ event: 'click', target: 'ul## li', handler: this.liClicked }}

We can even specify nothing.

bind${{ event: 'click', target: 'ul# li', handler: this.liClicked }}




