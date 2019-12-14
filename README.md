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
### CSS, Styles and HTML class attribute
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

jsfiddle:
https://jsfiddle.net/omrani/znksgp6v/20/

The final style attribute for the above &lt;div&gt; would be as below:

&lt;div style="background-color: red; width: 100px; height: 100px"&gt; ...

Similar to style${...}, we can also use class${...} to specify CSS class(s) of a tag.

```javascript
class App extends j6t.Component {
    ...
    render() {
        return this.parse`
            <button class${'btn btn-default'}>Submit</button>
        `
    }
}
```

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
        const { type, size, text } = this.props;
        
        return this.parse`
            <button id${0} class="btn btn-${type}" style="width: ${size}">
                ${text}
            </button>
            <script>
                const btn = document.getElementById('${0}');
                btn.onclick = function() {
                    alert('Welcome to j6t');
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

Here, the &lt;div&gt; is the root container for Button component. It is not necessary to wrap your tags inside a &lt;div&gt; though. If you have only a single tag, you can specify id${'#'} for that tag and make it the root container.
    
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

If j6t sees that a component doesn't have a root container, it adds a defualt &lt;div id${'#'}> to the conent returned by render().

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
        alert('Welcome to j6t');
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

jsfiddle:
https://jsfiddle.net/omrani/znksgp6v/27/

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

j6t knows main events in HTML specification, like click, dbclick, mousedown, mouseup, etc. In case we have a custom event, we can specify it by prepending a # sign before the name of the event.

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
class App extends j6t.Component {
    ...
    liClicked(e) {
        const text = $(this).text();
        
        alert(text);
    }
    render() {
        const colors = [ 'red', 'green', 'blue', 'yellow', 'orange', 'black', 'white' ]
        
        return this.parse`
            <ul id${0}>
            !${colors.map(x => `<li>${x}</li>`).join('')}
            </ul>
            
            bind${{ event: 'click', target: 'ul#0 li', handler: this.liClicked }}
            `
    }
}
```
jsfiddle:
https://jsfiddle.net/omrani/znksgp6v/30/

Here the click event is specified for all &lt;li&gt; elements inside &lt;ul&gt;. There is a single function to handle the event. Note that, we didn't know id of &lt;ul&gt; since its automatically generated, but we are still able to refer to it in our css selector to target the &lt;li&gt; elements. Here, the click events is assigned only to the &lt;li&gt; element inside current component's &lt;ul&gt; not any &lt;li&gt; inside any &lt;ul&gt;.
    
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

## HTML Tags
In addition to the normal method of using plain tags in the content we return in the render() method, we can make use of j6t HTML tags to have a more concise content. We can create an HTML tag by appending its name to the $ sign and specify its attributes using an interpolated expression. Here is an example:

```javascript
class App extends j6t.Component {
    ...
    render() {
        const { title, description } = this.props;
        
        return this.parse`
            h1${title}
            p${description}
            a${{ href: '/', text: 'Return', 'class': 'btn btn-primary' }}
            `
    }
}
```

Here, the content contains an &lt;h1&gt;, &lt;p&gt; and an &lt;a&gt; tag.

If the tag we intend to create is a container tag such as &lt;h1&gt;, &lt;p&gt;, &lt;div&gt;, etc., we can specify content of the tag using 'text' or 'html' property in the object we specify in the interpolated expression. The value for the 'text' property will be HTML encoded, while the value of 'html' property will not be encoded and is placed in the content directly.

# Nested Components
The benefit of the component-based design is breaking down the UI into smaller reusable parts that are eaiser  to maintain. Similar to the way we can create tags using $ sign, we can instantiate and render another component inside a component. Here is an example:

```javascript
class Alert extends j6t.Component {
    render() {
        const { type, message } = this.props;
        
        return `<div class="alert alert-${type}">${message}</div>`
    }
}
class App extends j6t.Component {
    render() {
        const { type, message } = this.props;
        
        return this.parse`
            Alert${{ type: 'success', message: 'j6t is loaded and active. Welcome!' }}
        `
    }
}
```

## Component's Children
By default when we use tag${...} notation to render tags or create sub-components inside a component using component${...} syntax, j6t adds the created tags or component instance into a collection named 'children' to the parent component. Using the children proeprty in a component we can access its sub-components or tags.

Whereas components derive from a base Component class, all tag objects derive from a BaseTag class. Similarly all attribute objects derive from a BaseAttribute class.

## Refreshing components
Components don't have something like state in React. User is allowed to manipulate any components' props and attributes. However, this doesn't update that component's view. In order to update or re-render a component, we need to call its refresh() method manually. Here is an example:

```javascript
class Grid extends j6t.Component {
	render() {
		const { data } = this.props;

		return this.parse`
			<table class="table table-striped" ${data}>
				!${x => this.parse`
					<tr>
						<td>${x.name}</td>
						<td>${x.job}</td>
					</tr>
				`}
			</table>`
	}
}
class App extends j6t.Component {
	btnLoadClicked() {
		const grid = this.children[0];
		
		grid.props.data = [
			{ name: 'John', job: 'Developer' },
			{ name: 'David', job: 'Manager' },
			{ name: 'Mark', job: 'Tester' },
			{ name: 'Simon', job: 'DBA' },
		];
		
		grid.refresh()
	}
	render() {
		const data = [];

		return this.parse`
			<button id${0} onclick${() => this.btnLoadClicked()}>Load Grid</button>
			Grid${{ data: data }}`
	}
}
```

### Forcing tags and attributes
When Component.parse() method sees xxx${...} in the string content, it uses a specific prioritarization on how to render xxx${...}. the details of this process is a little lengthy and could be out of the reader's interest. But here is the short explanation.

j6t distinguishes HTML tags and attributes by default. If xxx is an HTML tag, j6t renders xxx${...} as  tag. If xxx is an html attribute, j6t renders it as an attribute. If there is a class named xxx in the current context which has a render() method, j6t instantiates from the xxx class and calls its render() method. And if xxx is a function, j6t calls the function.

It is not far to happen though that j6t acts incorrectly. To force something to be rendered as a tag we can prepend its name with an extra $ sign, like $mytag${...} and to force something to be rendered as an attribute we can prepend the name with ^ like ^myattr${...}.

## Iterating Arrays
j6t's Component.parse() method distinguishes arrays in interpolated expressions and preserve them in a local variable. After that we can specify a function in the next expression. Component.parse() automatically iterates over the recent array and passes current item to our function. It is easy to produce HTML lists. Here is an example:

```javascript
class App extends j6t.Component {
    render() {
        return this.parse`
            <table class="table table-striped">
                <thead>
                    <th>Row</th>
                    <th>Name</th>
                    <th>Occupation</th>
                </thead>
                <tbody ${this.props.data}>
            !${(x, index) => this.parse`
                <tr>
                    <td>${index + 1}</td>
                    <td>${x.Name}</td>
                    <td>${x.Occupation}</td>
                </tr>
            `}
                </tbody>
            </table>`
    }
}

const app = new App({ data: [
        { Name: 'John', Occupation: 'Developer' },
        { Name: 'Mark', Occupation: 'Tester' },
        { Name: 'David', Occupation: 'Manager' },
        { Name: 'Simon', Occupation: 'DBA' }
    ]})

j6t.render(app, '#app')
```

It doesn't matter where you mention the ${array} in the template literal. Component.parse() reserves the array and doesn't produce anything for this expression. But it is important to specify the function for iterating the array in the exact next expression. Also, we need an exclamation mark before the ${fnIterate} if our content is HTML, since as stated earlier, Component.parse() HTML encodes expressions bu default.

jsfiddle:
https://jsfiddle.net/omrani/znksgp6v/41/

## Commands
j6t provides a mechanism for components to support user-defined command execution. The syntaxt is to use an asterisk or star character before the tag or name that is attached to the $ sign before an interpolated expression. Here is an example:

```javascript
class App extends j6t.Component {
    ...
    render() {
        const name = 'mark Twain'
        
        return this.parse`
            <b>lower(name)</b>:      *lower${name}      <br/> <!--result: mark twain -->
	    <b>upper(name)</b>:      *upper${name}      <br/> <!--result: MARK TWAIN -->
	    <b>reverse(name)</b>:    *reverse${name}    <br/> <!--result: niawt kram -->
	    <b>capitalize(name)</b>: *capitalize${name} <br/> <!--result: Mark Twain -->
            `
    }
}
```
Each component has an exec() method that is provided for command execution.
```
exec(command, value) {
   ...
}
```

Here 'command' is the tag or name before $ sign. 'value' is the interpolated expression passed to the ${...}.

j6t internally supports various commands that is listed below:

| command | description | example | result |
|---------|-------------|---------|--------|
|lower	|toLowerCase()|*lower${name}	|mark twain|
|upper	|toUpperCase()|*upper${name}	|MARK TWAIN|
|capitalize|capitalize	|*capitalize${name}	|Mark Twain|
|urlencode|url encode	|*urlencode${name}	|mark%20Twain|
|urldecode|url decode	|*urldecode${'mark%20twain'}	|mark twain|
|htmldecode|html decode	|*htmldecode${'<b>mark</>'}	|mark|
|reverse| reverse string	|*reverse${name}	|niawT kram|
|trim	|trim string|*trim${" mark twain "}	|"mark twain"|
|b	|decimal to binary|*b${20}	|10100|
|x	|decimal to hex|*x${20}	|14|
|o	|decimal to octal|*o${20}	|24|
|bd	|binary to decimal|*bd${1101}	|13|
|bx	|binary to hex|*bx${1101}	|d|
|bo	|binary to octal|*bo${1101}	|15|
|od	|octal to decimal|*od${24}	|20|
|ox	|octal to hex|*ox${24}	|14|
|ob	|octal to binary|*ob${24}	|10100|
|xd	|hex to decimal|*xd${14}	|20|
|xo	|hex to octal|*xo${14}	|24|
|xb	|hex to binary|*xb${14}	|10100|

It is possible though to extend the internal commands or even revoke them completely. In order to do this, we need to override exec() method. If we want to extend internal commands, we should check given command first. If it is among those we want to extend or support, we should prepare the result, otherwise we should call super.exec(command, value). Here is an exmplae:

```javascript
class App extends j6t.Component {
   exec(command, value) {
      switch (command) {
         case 'json': return JSON.stringify(value);
         default:
            return super.exec(command, value);
      }
   }
}
```

## Dynamic Tag/Class/Component Invocation
In addition to the normal way of instantiating from tags/classes/sub-components using xxx${...} syntax, j6t provides a flexible and dynamic method of instantiation by which we can instantiate from a tag/class/component whose name is stored in a variable. The syntax is as follows:

@${xxx}${value}

Here is an example:

```javascript
class App extends j6t.Component {
   render() {
      const tag = 'button'
      
      return this.parse`
      	@${tag}${{ text: 'Submit' }}
      `
   }
}
```
It is important to stick the interpolated expressions together and there shouldn't be anything even a single space between them.
