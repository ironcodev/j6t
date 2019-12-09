# j6t
A lightweight template library using es6 tagged template literals based on jQuery.

## Hello World example
```javascript
class App extends j6t.Component {
    render() {
        return this.parse`
            <div id${'#'}>
                ${'Welcome to j6t'}
            </div>`
    }
}

const app = new App();

j6t.render(app, '#app')
```
