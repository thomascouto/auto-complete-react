1. What is the difference between Component and PureComponent? give an
example where it might break my app.

R: The class PureComponent in React extends Component. It has all
functionalities of it's parent class, but this class implements and
handle the method shouldComponentUpdate for you. It means that
this class will shallow compare props/state (only works primitives types).
Acording with this comparison the component will re render, or not.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
3. Describe 3 ways to pass information from a component to its PARENT.

R:  1. Using callbacks functions: Passing it via props to its childs, and the childs calls this function which could set a state, for example.
   	2. Using context api: Useful when the all components envolved by a provider could have access to the context,
		without having to pass from component to component.
	3. Using events: A parent could define a function with an event as an argument and use this event acordingly.
		The child, could create an internal event and pass this event as an argument to the parent's method:

		PARENT:

		handleEvent(event) {
			...event handling...
		}

		CHILD:

		const ChildComponent ({ onEvent }: ChildProps ) {

			const handleClick = () => {
				const myCustomEvent = new CustomEvent('childEvent', {
					detail: 'let the animation begin!'
				})

				onEvent(myCustomEvent)

			}
		}

4. Give 2 ways to prevent components from re-rendering.
R:  1. Using memo() function. The component will re-render only if props and/or
   state values change.
	2. Using callback hook - useCallback(). Function reference remains the same unless the dependency array have changed.


5. What is a fragment and why do we need it? Give an example where it might break my app.

	R: Fragment is a way found by React team to group childs without creating new/extra nodes to the DOM. It might break my app in a case of a loop in a render method, without key prop.

6. Give 3 examples of the HOC pattern.

R: 6.1
	const withLoading = (WrappedComponent) => {
		return ({ isLoading, ...props }) => {
			if (isLoading) {
				return <Spinner />
			}

			return <WrappedComponent {...props} />
		}
	}

	6.2

	const withLogging = (WrappedComponent) => {
		return (props) => {
			const logError = (error) => {
				console.error(`Error in ${WrappedComponent.name:`}, error)
			}

			return (
				<WrappedComponent
					{...props}
					logError={logError}
				/>
			)
		}
	}

	6.3

	const withCard = (WrappedComponent) => {
		return (props) => {
			return (
				<CardComponent>
					<WrappedComponent {...props} />
				</CardComponent>
			)
		}
	}

7. what's the difference in handling exceptions in promises, callbacks and async...await.

R:
	Promises - The errors are handled in a catch(err) method. This method returns a rejected promise with
			the rejected object, usually an Error object.

	Callbacks - Errors are handled by the callback function passed via parameter, callbacks should be called
				when the main operation has ended, for ex:

				... fetch process completed ...
					callback(null, data)

				... fetch process completed with error ...
					callback(error)

	Async/Await - Using a try/catch, the catch block will be called if an error ocurred in the try { ... } block.

8. How many arguments does setState take and why is it async.
R:
	setState take 2 arguments. The first one and most used is the new state to be updated, for example:

	this.setState({
		count: 10
	});

	The second argument is a callback, but its optional. This is interesting and useful if you need to execute some function just after the state is updated.

	If you call setState({ ... some state ...}) and just after console.log
	the previous state, you will realize that the state is not updated yet.
	This is why useState is considered an async operation and React is going to schedule this state update in some point in future.

	I believe this function is async to improve UX/App performance, because
	React can accumulate several setState functions and execute them sequentially at once.

9. List the steps needed to migrate a Class to Function Component.
R:	How i would do this migration:

	9.1 I think the understanding of component's at all and how the component works.

	9.2 Identify all life cycle methos
	9.3 Identify all state updates/access
	9.4 Create a new functional component
	9.5 I believe starting with an static functional component with only
		the function return would be a good starting strategy.
	9.6 Start converting class method (if exists) to functions and updating
	it's internal content to functional component if needed (for ex, removing 'this' class syntax).
	9.7 Change from state to functional component useState function, or useReducer, depending on object complexibility...
	9.8 Update the lifecycle methods to react useEffect custom hook
	9.9 It's a good oportunity to verify if this component could be divided
	into components.
	9.10 Write unit tests for the new component, using, for example, react-testing-library to verify the component's behavior.
	9.11 remove unecessary code, if exists, try to optimize functions, if needed.
	9.12 Test your new component

10. List a few ways styles can be used with components.
R:
	1. Inline styles: You can style HTML elements by using the tag 'style'
	this tag accepts css properties, with small differences from common css:
		1.1 It uses camelCase syntax, for ex:
			background-color -> backgroundColor

		1.2 Properties are passed as strings:
			[css]    background-color: #ccc;
			[inline] backgroundColor: '#ccc'

		1.3 The separation between properties in inline style is made
			using comma, not semicolon.

			[css]

			{
				background-color: #ccc;
				margin: 0 auto;
			}

			[inline]

			{
				backgroundColor: '#ccc',
				margin: '0 auto',
			}

		The full element with inline style could be, for ex:

		<div style={{
			backgroundColor: '#ccc',
			margin: '0 auto',
		}}>
			...my content...
		</div>

		Personally, I don't like this way of styling because it could
		add too much css lines to the component and it might make the
		component less readable.

	2. Css Module: By creating a file, for ex, style.module.css.
	This file is modular and reusable by your component.

	//style.module.css
	.inputbutton {
		background-color: #dea
	}

	//component
	import styles from './style.module.css'
	...
	...
	<button className={styles.inputbutton}>.......</button>

	3. Using styling libraries like Styled components, sass, less.

	Personally I'm a fan :smile: of styled components due to the
	possibility to reuse components and create pre-styled components,
	I think this is very useful and keep your project organized and
	professional.

11. How to render an HTML string coming from the server.
R: Using div with dangerouslySetInnerHTML tag. For ex.:

```
function ListItem({ itemValue }: ListItemProps) {
  return <div dangerouslySetInnerHTML={{ __html: itemValue }} />;
}

export default ListItem;
```


This tag starts with 'dangerously' because it should used only when necessary, due to security risks.