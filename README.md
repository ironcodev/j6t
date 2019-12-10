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

## Component.parse() and HTML Encoding by default
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
Component.parse() supports special HTML attributes.

## j6t special HTML attributes
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

### events
If you specify an id using id${...}, you can then specify event handlers using xxx${callback} where xxx is the event name and callback is your event handler function. This simplifies defining events.

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



