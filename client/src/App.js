import React from 'react';

const App = () => {
	return (
		<div>
			<h2>Form</h2>
			<form>
				<div>
					<label>Title</label>
					<input type="text" name="title" value="" onChange={2} />
				</div>
				<div>
					<label>Text</label>
					<textarea name="body" cols="30" rows="10" onChange={2} />
				</div>
				<button>Submit</button>
			</form>
		</div>
	);
};

export default App;
