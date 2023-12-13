# Q1: Explain using code examples what is meant by props and state in React JS
In React - Props and State are two concepts used to manage and pass data within components.
**Props** or properties are used to pass data from a parent to a child component. Props are used to render dynamic data.
### Example:
```javascript
function Parent_component(){
  const stringdata = "go to bed!!";
  return <ChildComponent parent_message={message} />;
}

function Child_component(props){
  return <h1>{props.parent_message}</h1>;
}
```

**State** is used to manage data within a component. The state object is where you store property values that belong to the component.
### Example:
``` javascript
const Component = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```
The shows how to use state to manage and display a count that increments when a button is clicked.

# Q2: In functional programming, what does the term functor mean? Can you give an example in JavaScript?
A data structure that implements the map() method is called a **functor**. The map function is given a function as an argument, and then **applies that function to the other arguments** in the map function, hence the name functor.
### Example:
``` javascript
const numlist = [5,10,15,20];
const addfive = (value) => value + 5;
const new_list = numlist.map(addFive);

console.log(newlist)//expected output: [10,15,20,25]
```
# Q3:We have looked at three kinds of asynchronous programming mechanisms, namely callbacks, promises and streams. Mention one advantage and one disadvantage of each type
**Callbacks**
Advantage - Widely supported in javascript, and simple.
Disadvantage - Code can be difficult to maintain or read when dealing with multiple nested callbacks.
**Promises**
Advantage - More readable than callbacks and has a structured approach to asynschronous operation handling.
Disadvantage - More complex syntax when compared to async/await
**Streams**
Advantage - Efficient for processing large data and reduces memory usage.
Disadvantage - Most complex out of the three. Callbacks and Promises are more beginner friendly
# Q4:With the aid of a diagram and example code, describe the Cascading Style Sheets (CSS) Box Model and show how it can be used to space DOM elements
The CSS Box Model describes how elements are visually represented in a web page. Each box has 4 components: content, padding, margin, border.
```css
.box{
      width: 200px;
      height: 100px;
      padding: 20px;
      border: 2px solid #000;
      margin: 10px;
    }
```
```
+--------------------------------------+
|            Margin                    |
| +-----------------------------+      |
| |          Border             |      |
| | +-----------------------+   |      |
| | |        Padding        |   |      |
| | | +-------------------+ |   |      |
| | | |      Content      | |   |      |
| | | +-------------------+ |   |      |
| | +-----------------------+   |      |
| +-----------------------------+      |
+--------------------------------------+
```
# Q5:Detail how the browser loads and bootstraps a rich web application from an initial URL
**URL Request**: When a user enters a URL the browser initiates a http request to the server for the specified URL.

**Server Response**: The server responds by sending the HTML file associated with the URL back to the browser.

**Resource Parsing**: The browser parses the HTML, identifying and loading additional resources like stylesheets and images.

**JS Execution and API Calls**: Javascript code is executed,which initializes the web appliacation framework.

**Rendering**: The website is then rendered, and the user can interact with the user interface.

**Continuous Interaction**: The users interactions and data changes trigger updates to the user interface, ensuring a responsive web app UI.
